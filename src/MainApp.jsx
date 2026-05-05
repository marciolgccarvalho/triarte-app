import React from "react";
import { getReceitas } from "./services/receitasService";
import mensagens from "./data/mensagens.json";
import { useStorage } from "./hooks/useStorage";
import { useListas } from "./hooks/useListas";

import MenuLateral from "./components/MenuLateral";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { renderPagina } from "./navigation/renderPagina";

export default function MainApp() {
  const liberarNoPC = true;

  const [pagina, setPagina] = React.useState("home");
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = React.useState(null);
  const [rotacionado, setRotacionado] = React.useState(false);

  // 🔥 NOVO (não interfere em nada existente)
  const [origem, setOrigem] = React.useState("home");

  const [buscaNome, setBuscaNome] = React.useState("");
  const [buscaCategoria, setBuscaCategoria] = React.useState("");
  const [modoExibicao, setModoExibicao] = React.useState("grid");
  const [limite, setLimite] = React.useState(10);
  const [paginaAtual, setPaginaAtual] = React.useState(1);

  const receitas = React.useMemo(() => getReceitas(), []);

  // STORAGE
  const {
    favoritos,
    progresso,
    toggleFavorito,
    marcarVideo,
    ultimaReceitaId,
    setUltimaReceitaId
  } = useStorage();

  // LISTAS
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

  React.useEffect(() => {
    const check = () => {
      setRotacionado(window.innerWidth > window.innerHeight);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const irPara = (destino) => {
    setPagina(destino);
    setMenuAberto(false);
    setPaginaAtual(1);
  };

  // 🔥 CORRIGIDO (com origem, sem quebrar nada)
  const abrirReceita = (receita, origemTela = pagina) => {
    setReceitaSelecionada(receita);
    setUltimaReceitaId(receita.id);
    setOrigem(origemTela); // 🔥 NOVO
    setPagina("receita");
  };

  const percentual = (receita) => {
    if (!receita?.videos?.length) return 0;

    const vistos = progresso[receita.id]?.vistos?.length || 0;
    return Math.round((vistos / receita.videos.length) * 100);
  };

  const ultimaReceita = receitas.find(
    (r) => r.id === ultimaReceitaId
  );

  const mensagemAtual = mensagens[0];

  const receitasRandom = React.useMemo(() => {
    const embaralhado = [...receitas].sort(() => Math.random() - 0.5);
    return embaralhado.slice(0, 8);
  }, [receitas]);

  if (rotacionado && !liberarNoPC) {
    return (
      <div className="screen-center">
        <h2>📱 Gire o celular</h2>
        <p className="text-muted">Use o app na vertical</p>
      </div>
    );
  }

  return (
    <div className={`app-wrapper ${liberarNoPC ? "desktop" : ""}`}>
      <div className={`app-container ${liberarNoPC ? "desktop" : ""}`}>

        {/* HEADER */}
        <Header
          irPara={irPara}
          abrirMenu={() => setMenuAberto(true)}
        />

        <MenuLateral
          aberto={menuAberto}
          fechar={() => setMenuAberto(false)}
          irPara={irPara}
        />

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

            origem // 🔥 NOVO (não quebra nada)
          })}
        </div>

        {/* FOOTER */}
        <Footer
          pagina={pagina}
          irPara={irPara}
          abrirMenu={() => setMenuAberto(true)}
        />

      </div>
    </div>
  );
}