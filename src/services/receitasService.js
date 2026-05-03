import receitas from '@/data/receitas.json'
import { IMAGES } from '@/assets/images'

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
      liberado: !v.liberacao || new Date(v.liberacao) <= new Date()
    }))
  }))
}