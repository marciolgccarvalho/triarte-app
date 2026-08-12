import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const baseRecipesPath = path.join(projectRoot, "src", "data", "receitas.json");
const generatedRecipesPath = path.join(projectRoot, "src", "data", "receitas.youtube.json");
const overridesPath = path.join(projectRoot, "src", "data", "youtube-sync-overrides.json");
const localEnvPath = path.join(projectRoot, ".env.local");
const triarteEnvPath = path.resolve(projectRoot, "..", "triarte", ".env.local");

const YOUTUBE_SEARCH_API_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_PLAYLISTS_API_URL = "https://www.googleapis.com/youtube/v3/playlists";
const YOUTUBE_PLAYLIST_ITEMS_API_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const playlistItemsCache = new Map();

function parseDotenv(content) {
  const env = {};
  const lines = String(content || "").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

async function readJson(filePath, fallbackValue) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallbackValue;
  }
}

async function loadEnv() {
  const env = { ...process.env };

  for (const filePath of [localEnvPath, triarteEnvPath]) {
    try {
      const content = await fs.readFile(filePath, "utf8");
      Object.assign(env, parseDotenv(content));
    } catch {
      // arquivo opcional
    }
  }

  return env;
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toDateOnly(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}

function buildQuery(params) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  }

  return searchParams.toString();
}

async function fetchYoutubeJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`YouTube API ${response.status}: ${errorText}`);
  }

  return response.json();
}

async function listAllChannelPlaylists({ apiKey, channelId }) {
  const items = [];
  let pageToken = "";

  while (true) {
    const query = buildQuery({
      part: "snippet,contentDetails",
      channelId,
      maxResults: 50,
      pageToken,
      key: apiKey,
    });

    const payload = await fetchYoutubeJson(`${YOUTUBE_PLAYLISTS_API_URL}?${query}`);
    const pageItems = Array.isArray(payload.items) ? payload.items : [];
    items.push(...pageItems);

    if (!payload.nextPageToken) {
      break;
    }

    pageToken = payload.nextPageToken;
  }

  return items.map((item) => ({
    id: item.id,
    title: item.snippet?.title || "",
  }));
}

function scorePlaylistCandidate(title, query, recipeId) {
  const normalizedTitle = normalizeText(title);
  const normalizedQuery = normalizeText(query);
  const normalizedId = normalizeText(recipeId);

  let score = 0;

  if (!normalizedTitle || !normalizedQuery) {
    return score;
  }

  if (normalizedTitle === normalizedQuery) {
    score += 1000;
  }

  if (normalizedTitle.includes(normalizedQuery)) {
    score += 500;
  }

  for (const token of normalizedQuery.split(" ")) {
    if (token && normalizedTitle.includes(token)) {
      score += 50;
    }
  }

  if (normalizedId && normalizedTitle.includes(normalizedId)) {
    score += 150;
  }

  score -= Math.abs(normalizedTitle.length - normalizedQuery.length);

  return score;
}

async function findPlaylistForRecipe({ apiKey, channelId, recipe, override }) {
  const explicitPlaylistId = override?.playlistId || recipe.youtubePlaylistId;

  if (explicitPlaylistId) {
    const query = buildQuery({
      part: "snippet,contentDetails",
      id: explicitPlaylistId,
      key: apiKey,
    });

    const payload = await fetchYoutubeJson(`${YOUTUBE_PLAYLISTS_API_URL}?${query}`);
    const [playlist] = payload.items || [];

    if (!playlist) {
      throw new Error(`Playlist fixa não encontrada para ${recipe.nome}: ${explicitPlaylistId}`);
    }

    return {
      id: playlist.id,
      title: playlist.snippet?.title || recipe.nome,
    };
  }

  const searchTerm = override?.searchTerm || recipe.youtubeSearchTerm || recipe.nome;
  const knownVideoIds = (recipe.videos || [])
    .map((video) => video?.youtubeId)
    .filter(Boolean);

  if (knownVideoIds.length > 0) {
    const channelPlaylists = await listAllChannelPlaylists({ apiKey, channelId });
    const rankedByOverlap = [];

    for (const playlist of channelPlaylists) {
      const playlistItems = await listAllPlaylistItems({
        apiKey,
        playlistId: playlist.id,
      });
      const playlistVideoIds = new Set(
        playlistItems
          .map((item) => item.contentDetails?.videoId || item.snippet?.resourceId?.videoId)
          .filter(Boolean)
      );
      const overlapCount = knownVideoIds.filter((videoId) => playlistVideoIds.has(videoId)).length;

      if (overlapCount > 0) {
        rankedByOverlap.push({
          id: playlist.id,
          title: playlist.title,
          score: overlapCount * 2000 + scorePlaylistCandidate(playlist.title, searchTerm, recipe.id),
        });
      }
    }

    rankedByOverlap.sort((a, b) => b.score - a.score);

    if (rankedByOverlap[0]) {
      return rankedByOverlap[0];
    }
  }

  const query = buildQuery({
    part: "snippet",
    channelId,
    maxResults: 10,
    q: searchTerm,
    type: "playlist",
    key: apiKey,
  });

  const payload = await fetchYoutubeJson(`${YOUTUBE_SEARCH_API_URL}?${query}`);
  const candidates = Array.isArray(payload.items) ? payload.items : [];

  if (candidates.length === 0) {
    return null;
  }

  const ranked = candidates
    .map((item) => ({
      id: item.id?.playlistId,
      title: item.snippet?.title || "",
      score: scorePlaylistCandidate(item.snippet?.title, searchTerm, recipe.id),
    }))
    .filter((item) => item.id)
    .sort((a, b) => b.score - a.score);

  return ranked[0] || null;
}

async function listAllPlaylistItems({ apiKey, playlistId }) {
  if (playlistItemsCache.has(playlistId)) {
    return playlistItemsCache.get(playlistId);
  }

  const items = [];
  let pageToken = "";

  while (true) {
    const query = buildQuery({
      part: "snippet,contentDetails",
      playlistId,
      maxResults: 50,
      pageToken,
      key: apiKey,
    });

    const payload = await fetchYoutubeJson(`${YOUTUBE_PLAYLIST_ITEMS_API_URL}?${query}`);
    const pageItems = Array.isArray(payload.items) ? payload.items : [];
    items.push(...pageItems);

    if (!payload.nextPageToken) {
      break;
    }

    pageToken = payload.nextPageToken;
  }

  playlistItemsCache.set(playlistId, items);
  return items;
}

function buildFallbackVideoTitle(index) {
  return `Parte ${String(index + 1).padStart(2, "0")}`;
}

function mergeVideos(recipe, playlistItems) {
  const existingVideosById = new Map(
    (recipe.videos || [])
      .filter((video) => video?.youtubeId)
      .map((video) => [video.youtubeId, video])
  );

  return playlistItems
    .map((item, index) => {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;

      if (!videoId) {
        return null;
      }

      const existingVideo = existingVideosById.get(videoId);
      const playlistTitle = item.snippet?.title || "";
      const publishedAt = item.contentDetails?.videoPublishedAt || null;
      const addedAt = item.snippet?.publishedAt || null;

      return {
        titulo: existingVideo?.titulo || playlistTitle || buildFallbackVideoTitle(index),
        youtubeId: videoId,
        liberacao: existingVideo?.liberacao || toDateOnly(publishedAt) || null,
        publicadoEm: toDateOnly(publishedAt),
        adicionadoNaPlaylistEm: toDateOnly(addedAt),
      };
    })
    .filter(Boolean);
}

async function syncRecipes() {
  const env = await loadEnv();
  const apiKey = String(env.YOUTUBE_API_KEY || "").trim();
  const channelId = splitList(env.YOUTUBE_CHANNEL_IDS)[0] || String(env.YOUTUBE_CHANNEL_ID || "").trim();

  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY não encontrado. Defina em triarte-app/.env.local ou reutilize ../triarte/.env.local.");
  }

  if (!channelId) {
    throw new Error("YOUTUBE_CHANNEL_IDS/YOUTUBE_CHANNEL_ID não encontrado.");
  }

  const recipes = await readJson(baseRecipesPath, []);
  const overrides = await readJson(overridesPath, {});
  const syncedRecipes = [];

  for (const recipe of recipes) {
    const override = overrides?.[recipe.id] || {};
    const playlist = await findPlaylistForRecipe({
      apiKey,
      channelId,
      recipe,
      override,
    });

    if (!playlist?.id) {
      syncedRecipes.push({
        ...recipe,
        youtubeSync: {
          ok: false,
          error: "playlist_not_found",
          syncedAt: new Date().toISOString(),
        },
      });

      console.warn(`[youtube-sync] Playlist não encontrada para ${recipe.nome}`);
      continue;
    }

    const playlistItems = await listAllPlaylistItems({
      apiKey,
      playlistId: playlist.id,
    });

    syncedRecipes.push({
      ...recipe,
      youtubePlaylistId: playlist.id,
      youtubePlaylistTitle: playlist.title,
      videos: mergeVideos(recipe, playlistItems),
      youtubeSync: {
        ok: true,
        syncedAt: new Date().toISOString(),
        playlistId: playlist.id,
        playlistTitle: playlist.title,
        totalVideos: playlistItems.length,
      },
    });

    console.log(`[youtube-sync] ${recipe.nome}: ${playlistItems.length} vídeo(s) via playlist ${playlist.id}`);
  }

  await fs.writeFile(generatedRecipesPath, `${JSON.stringify(syncedRecipes, null, 2)}\n`, "utf8");
}

syncRecipes()
  .then(() => {
    console.log(`[youtube-sync] Arquivo gerado em ${path.relative(projectRoot, generatedRecipesPath)}`);
  })
  .catch((error) => {
    console.error("[youtube-sync] Falha ao sincronizar receitas:", error.message);
    process.exitCode = 1;
  });
