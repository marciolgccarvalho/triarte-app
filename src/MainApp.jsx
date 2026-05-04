import React from "react";
import { IMAGES } from "./assets/images";
import { getReceitas } from "./services/receitasService";
import mensagens from "./data/mensagens.json";

import MenuLateral from "./components/MenuLateral";

import Home from "./pages/Home";
import Receitas from "./pages/Receitas";
import Favoritos from "./pages/Favoritos";
import Conquistas from "./pages/Conquistas";
import Simulador from "./pages/Simulador";
import Abreviatura from "./pages/Abreviatura";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import ReceitaDetalhe from "./pages/ReceitaDetalhe";
import Materiais from "./pages/Materiais";

export default function MainApp() {
  const liberarNoPC = true;

  const [pagina, setPagina] = React.useState("home");
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = React.useState(null);
  const [rotacionado, setRotacionado] = React.useState(false);

  // 🔥 ESTADOS GLOBAIS (serão reutilizados em favoritos)
  const [buscaNome, setBuscaNome] = React.useState("");
  const [buscaCategoria, setBuscaCategoria] = React.useState("");
  const [modoExibicao, setModoExibicao] = React.useState("grid");
  const [limite, setLimite] = React.useState(10);
  const [paginaAtual, setPaginaAtual] = React.useState(1);

  const receitas = React.useMemo(() => getReceitas(), []);

  const [favoritos, setFavoritos] = React.useState(() => {
    return JSON.parse(localStorage.getItem("favoritos") || "[]");
  });

  const [progresso, setProgresso] = React.useState(() => {
    return JSON.parse(localStorage.getItem("progresso") || "{}");
  });

  React.useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  React.useEffect(() => {
    localStorage.setItem("progresso", JSON.stringify(progresso));
  }, [progresso]);

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
    setPaginaAtual(1); // 🔥 evita bug ao trocar de tela
  };

  const abrirReceita = (receita) => {
    setReceitaSelecionada(receita);
    setPagina("receita");
  };

  const toggleFavorito = (id) => {
    setFavoritos((atual) =>
      atual.includes(id)
        ? atual.filter((item) => item !== id)
        : [...atual, id]
    );
  };

  const marcarVideo = (receitaId, index) => {
    setProgresso((atual) => {
      const vistos = atual[receitaId]?.vistos || [];

      const novosVistos = vistos.includes(index)
        ? vistos.filter((v) => v !== index)
        : [...vistos, index];

      return {
        ...atual,
        [receitaId]: { vistos: novosVistos }
      };
    });
  };

  const percentual = (receita) => {
    if (!receita?.videos?.length) return 0;

    const vistos = progresso[receita.id]?.vistos?.length || 0;
    return Math.round((vistos / receita.videos.length) * 100);
  };

  /* =========================
     🔥 FILTROS BASE
  ========================= */

  const filtrarLista = (lista) => {
    const nome = buscaNome.toLowerCase();

    return lista.filter((r) => {
      return (
        (nome.length < 3 || r.nome.toLowerCase().includes(nome)) &&
        (buscaCategoria === "" || r.categoria === buscaCategoria)
      );
    });
  };

  /* =========================
     🔥 RECEITAS
  ========================= */

  const receitasFiltradas = filtrarLista(receitas);

  /* =========================
     🔥 FAVORITOS (NOVO)
  ========================= */

  const receitasFavoritas = receitas.filter((r) =>
    favoritos.includes(r.id)
  );

  const favoritosFiltrados = filtrarLista(receitasFavoritas);

  /* =========================
     🔥 PAGINAÇÃO (GENÉRICA)
  ========================= */

  const paginar = (lista) => {
    const totalPaginas = Math.max(1, Math.ceil(lista.length / limite));

    const itens = lista.slice(
      (paginaAtual - 1) * limite,
      paginaAtual * limite
    );

    return { itens, totalPaginas };
  };

  const receitasPage = paginar(receitasFiltradas);
  const favoritosPage = paginar(favoritosFiltrados);

  const categorias = [...new Set(receitas.map((r) => r.categoria))];

  const ultimaReceitaId = Object.keys(progresso).find(
    (id) => progresso[id]?.vistos?.length > 0
  );

  const ultimaReceita = receitas.find((r) => r.id === ultimaReceitaId);

  const mensagemAtual = mensagens[0];
  const receitasRandom = receitas.slice(0, 8);

  /* =========================
     RENDER
  ========================= */

  const renderPagina = () => {
    switch (pagina) {
      case "home":
        return (
          <Home
            mensagemAtual={mensagemAtual}
            ultimaReceita={ultimaReceita}
            receitas={receitas}
            receitasRandom={receitasRandom}
            abrirReceita={abrirReceita}
            percentual={percentual}
            toggleFavorito={toggleFavorito}
            favoritos={favoritos}
            irPara={irPara}
          />
        );

      case "receitas":
        return (
          <Receitas
            receitasFiltradas={receitasFiltradas}
            receitasPaginadas={receitasPage.itens}
            totalPaginas={receitasPage.totalPaginas}

            buscaNome={buscaNome}
            setBuscaNome={setBuscaNome}
            buscaCategoria={buscaCategoria}
            setBuscaCategoria={setBuscaCategoria}

            categorias={categorias}

            modoExibicao={modoExibicao}
            setModoExibicao={setModoExibicao}

            limite={limite}
            setLimite={setLimite}

            paginaAtual={paginaAtual}
            setPaginaAtual={setPaginaAtual}

            abrirReceita={abrirReceita}
            toggleFavorito={toggleFavorito}
            favoritos={favoritos}
            percentual={percentual}
          />
        );

      case "favoritos":
      return (
        <Favoritos
          receitasFiltradas={favoritosFiltrados}
          receitasPaginadas={favoritosPage.itens}
          totalPaginas={favoritosPage.totalPaginas}

          buscaNome={buscaNome}
          setBuscaNome={setBuscaNome}
          buscaCategoria={buscaCategoria}
          setBuscaCategoria={setBuscaCategoria}

          categorias={categorias}

          modoExibicao={modoExibicao}
          setModoExibicao={setModoExibicao}

          limite={limite}
          setLimite={setLimite}

          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}

          abrirReceita={abrirReceita}
          toggleFavorito={toggleFavorito}
          favoritos={favoritos}
          percentual={percentual}

          irPara={irPara} // 🔥 ESSENCIAL
        />
      );

      case "receita":
        return (
          <ReceitaDetalhe
            receita={receitaSelecionada}
            marcarVideo={marcarVideo}
            percentual={percentual}
            progresso={progresso}
            voltar={() => irPara("home")}
            irPara={irPara}
          />
        );

      case "conquistas":
        return (
          <Conquistas
            voltar={() => irPara("home")}
            progresso={progresso}
            receitas={receitas}
            favoritos={favoritos}
          />
        );

      case "simulador":
        return <Simulador />;

      case "abreviatura":
        return <Abreviatura voltar={() => irPara("home")} />;

      case "sobre":
        return <Sobre />;

      case "contato":
        return <Contato />;

      case "materiais":
        return (
          <Materiais
            receita={receitaSelecionada}
            voltar={() => irPara("receita")}
          />
        );

      default:
        return null;
    }
  };

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
        <div className="app-header">
          <button onClick={() => irPara("home")}>
            <img src={IMAGES.ui.logo} className="app-logo" />
          </button>

          <strong className="app-title-center">Real Triarte</strong>

          <button onClick={() => setMenuAberto(true)}>
            <img src={IMAGES.icons.menu.active} className="app-menu-icon" />
          </button>
        </div>

        <MenuLateral
          aberto={menuAberto}
          fechar={() => setMenuAberto(false)}
          irPara={irPara}
        />

        <div className="app-content">
          {renderPagina()}
        </div>

        {/* FOOTER */}
        <div className="app-footer">
          {[
            ["home", IMAGES.icons.home.active, "Início"],
            ["receitas", IMAGES.icons.receitas.active, "Receitas"],
            ["favoritos", IMAGES.icons.favoritos.active, "Favoritos"],
            ["conquistas", IMAGES.icons.conquistas.active, "Conquistas"],
            ["mais", IMAGES.icons.menu.active, "Mais"]
          ].map(([page, icon, label]) => (
            <div
              key={page}
              onClick={() =>
                page === "mais"
                  ? setMenuAberto(true)
                  : irPara(page)
              }
              className={`app-footer-item ${pagina === page ? "active" : ""}`}
            >
              <img src={icon} className="app-footer-icon" />
              <span className="app-footer-text">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}