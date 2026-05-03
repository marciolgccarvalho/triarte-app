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
        [receitaId]: {
          vistos: novosVistos
        }
      };
    });
  };

  const percentual = (receita) => {
    if (!receita?.videos?.length) return 0;

    const vistos = progresso[receita.id]?.vistos?.length || 0;
    return Math.round((vistos / receita.videos.length) * 100);
  };

  const listaMateriaisTexto = () => {
    if (!receitaSelecionada) return "";

    const linhas = receitaSelecionada.materiais?.linhas || [];
    const itens = receitaSelecionada.materiais?.itens || [];

    return (
      `🧶 Materiais - ${receitaSelecionada.nome}\n\n` +
      "Linhas:\n" +
      linhas.map((item) => `- ${item}`).join("\n") +
      "\n\nOutros materiais:\n" +
      itens.map((item) => `- ${item}`).join("\n") +
      "\n\nReal Triarte 💛"
    );
  };

  const receitasFiltradas = receitas.filter((r) => {
    const nome = buscaNome.toLowerCase();

    return (
      (nome.length < 3 || r.nome.toLowerCase().includes(nome)) &&
      (buscaCategoria === "" || r.categoria === buscaCategoria)
    );
  });

  const categorias = [...new Set(receitas.map((r) => r.categoria))];

  const totalPaginas = Math.max(1, Math.ceil(receitasFiltradas.length / limite));

  const receitasPaginadas = receitasFiltradas.slice(
    (paginaAtual - 1) * limite,
    paginaAtual * limite
  );

  const ultimaReceitaId = Object.keys(progresso).find(
    (id) => progresso[id]?.vistos?.length > 0
  );

  const ultimaReceita = receitas.find((r) => r.id === ultimaReceitaId);

  const mensagemAtual = mensagens[0];

  const receitasRandom = receitas.slice(0, 8);

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
          />
        );

      case "receitas":
        return (
          <Receitas
            receitas={receitas}
            buscaNome={buscaNome}
            setBuscaNome={setBuscaNome}
            buscaCategoria={buscaCategoria}
            setBuscaCategoria={setBuscaCategoria}
            categorias={categorias}
            receitasPaginadas={receitasPaginadas}
            modoExibicao={modoExibicao}
            setModoExibicao={setModoExibicao}
            limite={limite}
            setLimite={setLimite}
            paginaAtual={paginaAtual}
            setPaginaAtual={setPaginaAtual}
            totalPaginas={totalPaginas}
            abrirReceita={abrirReceita}
            toggleFavorito={toggleFavorito}
            favoritos={favoritos}
            percentual={percentual}
          />
        );

      case "favoritos":
        return (
          <Favoritos
            receitas={receitas}
            favoritos={favoritos}
            abrirReceita={abrirReceita}
            percentual={percentual}
            toggleFavorito={toggleFavorito}
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
            listaMateriaisTexto={listaMateriaisTexto}
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

      default:
        return null;
    }
  };

  if (rotacionado && !liberarNoPC) {
    return (
      <div className="screen-center">
        <div>
          <h2>📱 Gire o celular</h2>
          <p className="text-muted">Use o app na vertical</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-wrapper ${liberarNoPC ? "desktop" : ""}`}>
      <div className={`app-container ${liberarNoPC ? "desktop" : ""}`}>
        <div className="app-header">
          <button
            type="button"
            className="app-logo-button"
            onClick={() => irPara("home")}
            aria-label="Ir para o início"
          >
            <img
              src={IMAGES.ui.logo}
              alt="Real Triarte"
              className="app-logo"
            />
          </button>

          <button
            type="button"
            className="app-menu-button"
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir menu"
          >
            <img
              src={IMAGES.icons.menu.active}
              alt=""
              className="app-menu-icon"
            />
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

        <div className="app-footer">
          {[
            ["home", IMAGES.icons.home?.active || IMAGES.icons.receitas.active, "Início"],
            ["receitas", IMAGES.icons.receitas.active, "Receitas"],
            ["favoritos", IMAGES.icons.favoritos.active, "Favoritos"],
            ["conquistas", IMAGES.icons.conquistas.active, "Conquistas"],
            ["simulador", IMAGES.icons.calculo.active, "Mais"]
          ].map(([page, icon, label]) => (
            <div
              key={page}
              onClick={() => irPara(page)}
              className={`app-footer-item ${pagina === page ? "active" : ""}`}
            >
              <img src={icon} alt={label} className="app-footer-icon" />
              <span className="app-footer-text">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}