import React, {
  useEffect,
  useMemo,
  useCallback,
  useState
} from "react";

/* ========================================
   MODAIS
======================================== */

import ConquistaModal from "./components/modals/ConquistaModal";

/* ========================================
   SERVICES / DADOS
======================================== */

import { getReceitas } from "./services/receitasService";

import mensagens from "./data/mensagens.json";

/* ========================================
   HOOKS
======================================== */

import { useStorage } from "./hooks/useStorage";
import { useListas } from "./hooks/useListas";

/* ========================================
   LAYOUT
======================================== */

import MenuLateral from "./components/layout/MenuLateral";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

/* ========================================
   NAVEGAÇÃO
======================================== */

import { renderPagina } from "./navigation/renderPagina";

export default function MainApp() {

  /* ========================================
     CONFIG
  ======================================== */

  const liberarNoPC = true;

  /* ========================================
     ESTADOS GLOBAIS
  ======================================== */

  const [pagina, setPagina] =
    useState("home");

  const [menuAberto, setMenuAberto] =
    useState(false);

  const [
    receitaSelecionada,
    setReceitaSelecionada
  ] = useState(null);

  const [rotacionado, setRotacionado] =
    useState(false);

  // 🔥 mantém origem da navegação
  const [origem, setOrigem] =
    useState("home");

  /* ========================================
     MODAL CONQUISTA
  ======================================== */

  const [
    conquistaModal,
    setConquistaModal
  ] = useState(null);

  /* ========================================
     FILTROS / LISTAS
  ======================================== */

  const [buscaNome, setBuscaNome] =
    useState("");

  const [
    buscaCategoria,
    setBuscaCategoria
  ] = useState("");

  const [
    modoExibicao,
    setModoExibicao
  ] = useState("grid");

  const [limite, setLimite] =
    useState(10);

  const [
    paginaAtual,
    setPaginaAtual
  ] = useState(1);

  /* ========================================
     RECEITAS
  ======================================== */

  const receitas = useMemo(
    () => getReceitas(),
    []
  );

  /* ========================================
     STORAGE
  ======================================== */

  const {
    favoritos,
    progresso,
    toggleFavorito,
    marcarVideo,
    ultimaReceitaId,
    setUltimaReceitaId
  } = useStorage();

  /* ========================================
     LISTAS FILTRADAS
  ======================================== */

  const {
    receitasFiltradas,
    favoritosFiltrados,
    receitasPage,
    favoritosPage,
    categorias
  } = useListas({
    receitas,
    favoritos,
    buscaNome,
    buscaCategoria,
    limite,
    paginaAtual
  });

  /* ========================================
     SCROLL AO TROCAR DE TELA
  ======================================== */

  useEffect(() => {

    const content =
      document.querySelector(
        ".app-content"
      );

    if (content) {

      content.scrollTo({
        top: 0,
        behavior: "auto"
      });

    }

  }, [pagina]);

  /* ========================================
     CONTROLE ROTAÇÃO
  ======================================== */

  useEffect(() => {

    const check = () => {

      setRotacionado(
        window.innerWidth >
        window.innerHeight
      );

    };

    check();

    window.addEventListener(
      "resize",
      check
    );

    return () => {

      window.removeEventListener(
        "resize",
        check
      );

    };

  }, []);

  /* ========================================
     NAVEGAÇÃO
  ======================================== */

  const irPara = (destino) => {

    setPagina(destino);

    setMenuAberto(false);

    setPaginaAtual(1);

  };

  /* ========================================
     ABRIR RECEITA
  ======================================== */

  const abrirReceita = (
    receita,
    origemTela = pagina
  ) => {

    setReceitaSelecionada(receita);

    setUltimaReceitaId(receita.id);

    setOrigem(origemTela);

    setPagina("receita");

  };

  /* ========================================
     PROGRESSO
  ======================================== */

  const percentual = (receita) => {

    if (!receita?.videos?.length) {
      return 0;
    }

    const vistos =
      progresso[receita.id]
        ?.vistos?.length || 0;

    return Math.round(
      (
        vistos /
        receita.videos.length
      ) * 100
    );

  };

  /* ========================================
     TEXTO DOS MATERIAIS
  ======================================== */

  const listaMateriaisTexto =
    useCallback(() => {

      if (!receitaSelecionada) {
        return "";
      }

      const linhas =
        receitaSelecionada
          .materiais?.linhas || [];

      const itens =
        receitaSelecionada
          .materiais?.itens || [];

      return `
🧶 Materiais - ${receitaSelecionada.nome}

LINHAS:
${linhas
  .map((l) => `• ${l}`)
  .join("\n")}

OUTROS MATERIAIS:
${itens
  .map((i) => `• ${i}`)
  .join("\n")}

💛 Real Triarte
`.trim();

    }, [receitaSelecionada]);

  /* ========================================
     ÚLTIMA RECEITA EM ANDAMENTO
  ======================================== */

  const ultimaReceita =
    receitas.find((r) => {

      if (r.id !== ultimaReceitaId) {
        return false;
      }

      const pct = percentual(r);

      // 🔥 NÃO mostra receitas 100%
      return pct > 0 && pct < 100;

    });

  /* ========================================
     MENSAGEM HOME
  ======================================== */

  const mensagemAtual =
    mensagens[0];

  /* ========================================
     RECEITAS ALEATÓRIAS
  ======================================== */

  const receitasRandom =
    useMemo(() => {

      const embaralhado =
        [...receitas].sort(
          () => Math.random() - 0.5
        );

      return embaralhado.slice(0, 8);

    }, [receitas]);

  /* ========================================
     BLOQUEIO ROTAÇÃO
  ======================================== */

  if (
    rotacionado &&
    !liberarNoPC
  ) {

    return (
      <div className="screen-center">

        <h2>
          📱 Gire o celular
        </h2>

        <p className="text-muted">
          Use o app na vertical
        </p>

      </div>
    );
  }

  /* ========================================
     RENDER
  ======================================== */

  return (

    <div
      className={
        `app-wrapper ${
          liberarNoPC
            ? "desktop"
            : ""
        }`
      }
    >

      <div
        className={
          `app-container ${
            liberarNoPC
              ? "desktop"
              : ""
          }`
        }
      >

        {/* ========================================
            HEADER
        ======================================== */}

        <Header
          irPara={irPara}
          abrirMenu={() =>
            setMenuAberto(true)
          }
        />

        {/* ========================================
            MENU LATERAL
        ======================================== */}

        <MenuLateral
          aberto={menuAberto}
          fechar={() =>
            setMenuAberto(false)
          }
          irPara={irPara}
          pagina={pagina}
        />

        {/* ========================================
            CONTEÚDO
        ======================================== */}

        <div className="app-content">

          {renderPagina({

            pagina,

            mensagemAtual,

            ultimaReceita,

            receitas,

            receitasRandom,

            abrirReceita,

            percentual,

            toggleFavorito,

            favoritos,

            irPara,

            receitasFiltradas,

            receitasPage,

            buscaNome,

            setBuscaNome,

            buscaCategoria,

            setBuscaCategoria,

            categorias,

            modoExibicao,

            setModoExibicao,

            limite,

            setLimite,

            paginaAtual,

            setPaginaAtual,

            favoritosFiltrados,

            favoritosPage,

            receitaSelecionada,

            marcarVideo,

            progresso,

            origem,

            listaMateriaisTexto,

            // 🔥 modal conquista
            setConquistaModal

          })}

        </div>

        {/* ========================================
            FOOTER
        ======================================== */}

        <Footer
          pagina={pagina}
          irPara={irPara}
          abrirMenu={() =>
            setMenuAberto(true)
          }
        />

        {/* ========================================
            MODAL CONQUISTA
        ======================================== */}

        {conquistaModal && (

          <ConquistaModal
            conquista={conquistaModal}
            onClose={() =>
              setConquistaModal(null)
            }
          />

        )}

      </div>

    </div>
  );
}