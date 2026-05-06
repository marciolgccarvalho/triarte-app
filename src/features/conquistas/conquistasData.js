import { IMAGES } from "../../assets/images"

/* =========================
   🏆 CONQUISTAS
========================= */

export const CONQUISTAS = [

  /* =========================
     🎬 VÍDEOS (PROGRESSO)
  ========================= */
  {
    id: "primeiro_passo",
    titulo: "Primeiro Passo",
    descricao: "Assista 5 vídeos",
    tipo: "videos",
    meta: 5,
    raridade: "comum",
    icone: IMAGES.conquistas.primeiroPasso.active
  },

  {
    id: "iniciante",
    titulo: "Iniciante",
    descricao: "Assista 20 vídeos",
    tipo: "videos",
    meta: 20,
    raridade: "raro",
    icone: IMAGES.conquistas.iniciante.active
  },

  {
    id: "dedicado",
    titulo: "Dedicado",
    descricao: "Assista 50 vídeos",
    tipo: "videos",
    meta: 50,
    raridade: "epico",
    icone: IMAGES.conquistas.dedicado.active
  },

  {
    id: "imparavel",
    titulo: "Imparável",
    descricao: "Assista 100 vídeos",
    tipo: "videos",
    meta: 100,
    raridade: "lendario",
    icone: IMAGES.conquistas.imparavel.active
  },

  /* =========================
     🧶 RECEITAS (EVOLUÇÃO)
  ========================= */
  {
    id: "primeira_receita",
    titulo: "Primeiras Receitas",
    descricao: "Complete 5 receitas",
    tipo: "receitas_completas",
    meta: 5,
    raridade: "comum",
    icone: IMAGES.conquistas.primeiraReceita.active
  },

  {
    id: "criador",
    titulo: "Criador Iniciante",
    descricao: "Complete 10 receitas",
    tipo: "receitas_completas",
    meta: 10,
    raridade: "raro",
    icone: IMAGES.conquistas.criadorIniciante.active
  },

  {
    id: "artesao",
    titulo: "Artesão Dedicado",
    descricao: "Complete 25 receitas",
    tipo: "receitas_completas",
    meta: 25,
    raridade: "epico",
    icone: IMAGES.conquistas.artesaoDedicado.active
  },

  {
    id: "mestre",
    titulo: "Mestre do Amigurumi",
    descricao: "Complete 50 receitas",
    tipo: "receitas_completas",
    meta: 50,
    raridade: "lendario",
    icone: IMAGES.conquistas.mestreDoAmigurumi.active
  },

  /* =========================
     ⭐ ENGAJAMENTO
  ========================= */
  {
    id: "explorador",
    titulo: "Explorador",
    descricao: "Favorite 5 receitas",
    tipo: "favoritos",
    meta: 5,
    raridade: "comum",
    icone: IMAGES.conquistas.explorador.active
  },

  {
    id: "colecionador",
    titulo: "Colecionador",
    descricao: "Favorite 15 receitas",
    tipo: "favoritos",
    meta: 15,
    raridade: "raro",
    icone: IMAGES.conquistas.colecionador.active
  },

  /* =========================
     📈 PROGRESSO
  ========================= */
  {
    id: "persistente",
    titulo: "Persistente",
    descricao: "Inicie 5 receitas",
    tipo: "receitas_iniciadas",
    meta: 3,
    raridade: "comum",
    icone: IMAGES.conquistas.persistente.active
  },

  {
    id: "focado",
    titulo: "Focado",
    descricao: "Alcance 50% em uma receita",
    tipo: "maior_progresso",
    meta: 50,
    raridade: "raro",
    icone: IMAGES.conquistas.focado.active
  }

]