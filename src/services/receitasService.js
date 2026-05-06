import receitas from '@/data/receitas.json'
import { IMAGES } from '@/assets/images'

// 🔒 REGRA ÚNICA DE LIBERAÇÃO (16:30 BR)
export function isVideoLiberado(video) {
  if (!video.liberacao) return true;

  const dataLiberacao = new Date(video.liberacao);
  dataLiberacao.setHours(16, 30, 0, 0);

  return new Date() >= dataLiberacao;
}

export function getReceitas() {
  return receitas.map((r) => ({
    ...r,

    // imagem agora vem do index
    imagem: IMAGES.personagens[r.id],

    // garante estrutura segura
    materiais: {
      linhas: r.materiais?.linhas || [],
      itens: r.materiais?.itens || []
    },

    // trata vídeos
    videos: (r.videos || []).map((v, index) => ({
      ...v,
      id: index + 1,
      liberado: isVideoLiberado(v) // ✅ regra centralizada
    }))
  }))
}