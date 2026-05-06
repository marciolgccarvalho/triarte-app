import { CONQUISTAS } from "./conquistasData";

/* =========================
   MÉTRICAS DO USUÁRIO
========================= */
function calcularMetricas({ progresso, receitas, favoritos }) {

  const totalVideosAssistidos = Object.values(progresso).reduce(
    (total, r) => total + (r.vistos?.length || 0),
    0
  );

  const receitasCompletas = receitas.filter((r) => {
    const vistos = progresso[r.id]?.vistos?.length || 0;
    const total = r.videos?.length || 0;
    return total > 0 && vistos === total;
  }).length;

  const receitasIniciadas = receitas.filter((r) => {
    const vistos = progresso[r.id]?.vistos?.length || 0;
    return vistos > 0;
  }).length;

  const maiorProgresso = Math.max(
    ...receitas.map((r) => {
      const vistos = progresso[r.id]?.vistos?.length || 0;
      const total = r.videos?.length || 0;
      return total === 0 ? 0 : (vistos / total) * 100;
    }),
    0
  );

  const favoritosCount = favoritos?.length || 0;

  return {
    videos: totalVideosAssistidos,
    receitas_completas: receitasCompletas,
    receitas_iniciadas: receitasIniciadas,
    maior_progresso: maiorProgresso,
    favoritos: favoritosCount
  };
}

/* =========================
   CALCULA STATUS
========================= */
function calcularStatus(atual, meta) {
  if (atual >= meta) return "concluido";
  if (atual > 0) return "progresso";
  return "bloqueado";
}

/* =========================
   NORMALIZA PROGRESSO
========================= */
function calcularPorcentagem(atual, meta) {
  if (meta === 0) return 0;
  return Math.min((atual / meta) * 100, 100);
}

/* =========================
   ENGINE PRINCIPAL
========================= */
export function gerarConquistas(dadosUsuario) {

  const metricas = calcularMetricas(dadosUsuario);

  const conquistasProcessadas = CONQUISTAS.map((c) => {

    const atual = metricas[c.tipo] || 0;

    const progresso = calcularPorcentagem(atual, c.meta);

    const status = calcularStatus(atual, c.meta);

    return {
      ...c,

      atual,
      progresso,       // % (0–100)
      status,          // bloqueado | progresso | concluido

      concluido: status === "concluido"
    };
  });

  return conquistasProcessadas;
}

/* =========================
   RESUMO (HEADER)
========================= */
export function gerarResumo(conquistas) {

  const total = conquistas.length;

  const concluidas = conquistas.filter(c => c.status === "concluido").length;

  const emProgresso = conquistas.filter(c => c.status === "progresso").length;

  const bloqueadas = conquistas.filter(c => c.status === "bloqueado").length;

  const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  const lendarias = conquistas.filter(
    c => c.raridade === "lendario" && c.status === "concluido"
  ).length;

  return {
    total,
    concluidas,
    emProgresso,
    bloqueadas,
    percentual,
    lendarias
  };
}   