// ==========================
// PERSONAGENS
// ==========================
import demogorgon from './personagens/demogorgon.webp'
import duncan from './personagens/duncan.webp'
import egg from './personagens/egg.webp'
import gatodebotas from './personagens/gatodebotas.webp'
import gengar from './personagens/gengar.webp'
import judy from './personagens/judy.webp'
import mira from './personagens/mira.webp'
import rumi from './personagens/rumi.webp'
import shadow from './personagens/shadow.webp'
import squirtle from './personagens/squirtle.webp'
import zoey from './personagens/zoey.webp'

// ==========================
// ICONS
// ==========================
import youtubeActive from './icons/youtube-active.png'
import tiktokActive from './icons/tiktok-active.png'

import sobreActive from './icons/sobre-active.png'
import sobreInactive from './icons/sobre-inactive.png'

import siteActive from './icons/site-active.png'

import receitasActive from './icons/receitas-active.png'
import receitasInactive from './icons/receitas-inactive.png'

import proximaActive from './icons/proxima-active.png'
import anteriorActive from './icons/anterior-active.png'

import menuActive from './icons/menu-active.png'

import listaActive from './icons/lista-active.png'
import listaInactive from './icons/lista-inactive.png'
import listaActiveHome from './icons/lista-active-home.png' // 🔥 NOVO

import instagramActive from './icons/instagram-active.png'

import homeActive from './icons/home-active.png'
import homeInactive from './icons/home-inactive.png'

import gridActive from './icons/grid-active.png'
import gridInactive from './icons/grid-inactive.png'

import favoritosActive from './icons/favoritos-active.png'
import favoritosInactive from './icons/favoritos-inactive.png'

import facebookActive from './icons/facebook-active.png'
import emailActive from './icons/email-active.png'

import contatoActive from './icons/contato-active.png'
import contatoInactive from './icons/contato-inactive.png'

import conquistasActive from './icons/conquistas-active.png'
import conquistasInactive from './icons/conquistas-inactive.png'

import calculoActive from './icons/calculo-active.png'
import calculoInactive from './icons/calculo-inactive.png'

import abreviacaoActive from './icons/abreviacao-active.png'
import abreviacaoInactive from './icons/abreviacao-inactive.png'

// ==========================
// CONQUISTAS
// ==========================
import artesaoDedicadoActive from './conquistas/artesao-dedicado-active.png'
import artesaoDedicadoInactive from './conquistas/artesao-dedicado-inactive.png'

import colecionadorActive from './conquistas/colecionador-active.png'
import colecionadorInactive from './conquistas/colecionador-inactive.png'

import criadorInicianteActive from './conquistas/criador-iniciante-active.png'
import criadorInicianteInactive from './conquistas/criador-iniciante-inactive.png'

import dedicadoActive from './conquistas/dedicado-active.png'
import dedicadoInactive from './conquistas/dedicado-inactive.png'

import exploradorActive from './conquistas/explorador-active.png'
import exploradorInactive from './conquistas/explorador-inactive.png'

import focadoActive from './conquistas/focado-active.png'
import focadoInactive from './conquistas/focado-inactive.png'

import imparavelActive from './conquistas/imparavel-active.png'
import imparavelInactive from './conquistas/imparavel-inactive.png'

import inicianteActive from './conquistas/iniciante-active.png'
import inicianteInactive from './conquistas/iniciante-inactive.png'

import mestreDoAmigurumiActive from './conquistas/mestre-do-amigurumi-active.png'
import mestreDoAmigurumiInactive from './conquistas/mestre-do-amigurumi-inactive.png'

import persistenteActive from './conquistas/persistente-active.png'
import persistenteInactive from './conquistas/persistente-inactive.png'

import primeiraReceitaActive from './conquistas/primeira-receita-active.png'
import primeiraReceitaInactive from './conquistas/primeira-receita-inactive.png'

import primeiroPassoActive from './conquistas/primeiro-passo-active.png'
import primeiroPassoInactive from './conquistas/primeiro-passo-inactive.png'

// ==========================
// UI
// ==========================
import logo from './ui/logo.webp'

// ==========================
// EXPORTAÇÃO CENTRAL
// ==========================
export const IMAGES = {
  personagens: {
    demogorgon,
    duncan,
    egg,
    gatodebotas,
    gengar,
    judy,
    mira,
    rumi,
    shadow,
    squirtle,
    zoey
  },

  icons: {
    youtube: { active: youtubeActive },
    tiktok: { active: tiktokActive },

    sobre: { active: sobreActive, inactive: sobreInactive },
    site: { active: siteActive },

    receitas: { active: receitasActive, inactive: receitasInactive },

    proxima: { active: proximaActive },
    anterior: { active: anteriorActive },

    menu: { active: menuActive },

    lista: {
      active: listaActive,
      inactive: listaInactive,
      home: listaActiveHome // 🔥 NOVO
    },

    instagram: { active: instagramActive },

    home: { active: homeActive, inactive: homeInactive },

    grid: { active: gridActive, inactive: gridInactive },

    favoritos: { active: favoritosActive, inactive: favoritosInactive },

    facebook: { active: facebookActive },
    email: { active: emailActive },

    contato: { active: contatoActive, inactive: contatoInactive },

    conquistas: { active: conquistasActive, inactive: conquistasInactive },

    calculo: { active: calculoActive, inactive: calculoInactive },

    abreviacao: { active: abreviacaoActive, inactive: abreviacaoInactive }
  },

  conquistas: {
    artesaoDedicado: { active: artesaoDedicadoActive, inactive: artesaoDedicadoInactive },
    colecionador: { active: colecionadorActive, inactive: colecionadorInactive },
    criadorIniciante: { active: criadorInicianteActive, inactive: criadorInicianteInactive },
    dedicado: { active: dedicadoActive, inactive: dedicadoInactive },
    explorador: { active: exploradorActive, inactive: exploradorInactive },
    focado: { active: focadoActive, inactive: focadoInactive },
    imparavel: { active: imparavelActive, inactive: imparavelInactive },
    iniciante: { active: inicianteActive, inactive: inicianteInactive },
    mestreDoAmigurumi: { active: mestreDoAmigurumiActive, inactive: mestreDoAmigurumiInactive },
    persistente: { active: persistenteActive, inactive: persistenteInactive },
    primeiraReceita: { active: primeiraReceitaActive, inactive: primeiraReceitaInactive },
    primeiroPasso: { active: primeiroPassoActive, inactive: primeiroPassoInactive }
  },

  ui: {
    logo
  }
}