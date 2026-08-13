import receitasBase from '@/data/receitas.json'
import receitasGold from '@/data/receitas.gold.json'
import receitasYoutube from '@/data/receitas.youtube.json'
import { IMAGES } from '@/assets/images'

const receitas = Array.isArray(receitasGold) && receitasGold.length > 0
  ? receitasGold
  : Array.isArray(receitasYoutube) && receitasYoutube.length > 0
    ? receitasYoutube
    : receitasBase

// 🔒 REGRA ÚNICA DE LIBERAÇÃO (16:30 BR)
export function isVideoLiberado(video) {
  if (!video.liberacao) return true

  const dataLiberacao = new Date(video.liberacao)
  dataLiberacao.setHours(16, 30, 0, 0)

  return new Date() >= dataLiberacao
}

export function getReceitas() {
  return receitas
    .map((r) => ({
      ...r,

      // capa sempre prioriza o video 1 em thumbnail widescreen
      imagem: r.videos?.[0]?.youtubeId
        ? `https://img.youtube.com/vi/${r.videos[0].youtubeId}/mqdefault.jpg`
        : r.imagem || IMAGES.personagens[r.id] || IMAGES.ui.logo,

      // garante estrutura segura
      materiais: {
        linhas: r.materiais?.linhas || [],
        itens: r.materiais?.itens || []
      },

      // trata vídeos
      videos: (r.videos || []).map((v, index) => ({
        ...v,
        id: index + 1,
        liberado: isVideoLiberado(v)
      }))
    }))
    .sort((a, b) => (Number(b?.ordem) || 0) - (Number(a?.ordem) || 0))
}
