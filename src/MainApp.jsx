import React from "react";
import { getReceitas } from "./services/receitasService";
import mensagens from "./data/mensagens.json";
import { IMAGES } from "./assets/images";

// COMPONENTES
import MenuLateral from "./components/MenuLateral";

// PÁGINAS
import Home from "./pages/Home";
import Receitas from "./pages/Receitas";
import Favoritos from "./pages/Favoritos";
import ReceitaDetalhe from "./pages/ReceitaDetalhe";
import Materiais from "./pages/Materiais";
import Simulador from "./pages/Simulador";
import Abreviatura from "./pages/Abreviatura";
import Conquistas from "./pages/Conquistas";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";

function MainApp() {
  // 🔓 LIBERAR ACESSO NO PC
  // true = libera no PC para testar
  // false = bloqueia rotação no PC/produção, se desejar
  const liberarNoPC = true;


  // =========================
  // BLOQUEIO ROTAÇÃO
  // =========================
  const [rotacionado, setRotacionado] = React.useState(false);
  React.useEffect(() => {
  const check = () => {
    setRotacionado(window.innerWidth > window.innerHeight);
  };

  check();
  window.addEventListener("resize", check);

  return () => window.removeEventListener("resize", check);
}, []);

  // =========================
  // STATES PRINCIPAIS
  // =========================
  const [pagina, setPagina] = React.useState("home");
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = React.useState(null);

  const [buscaNome, setBuscaNome] = React.useState("");
  const [buscaCategoria, setBuscaCategoria] = React.useState("");
  const [modoExibicao, setModoExibicao] = React.useState("grid");
  const [limite, setLimite] = React.useState(10);
  const [paginaAtual, setPaginaAtual] = React.useState(1);

  const [favoritos, setFavoritos] = React.useState(() => {
    try {
      const salvo = localStorage.getItem("favoritos");
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  const [progresso, setProgresso] = React.useState(() => {
    try {
      const salvo = localStorage.getItem("progressoReceitas");
      return salvo ? JSON.parse(salvo) : {};
    } catch {
      return {};
    }
  });

  const [ultimaReceita, setUltimaReceita] = React.useState(() => {
    try {
      const salvo = localStorage.getItem("ultimaReceita");
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  const [mensagemAtual, setMensagemAtual] = React.useState(null);
  const [receitasRandom, setReceitasRandom] = React.useState([]);

  // =========================
  // EFFECTS
  // =========================
  React.useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  React.useEffect(() => {
    localStorage.setItem("progressoReceitas", JSON.stringify(progresso));
  }, [progresso]);

  React.useEffect(() => {
    if (!mensagens || !mensagens.length) return;

    const tipo = pagina === "home" ? "boasvindas" : "dica";
    const filtradas = mensagens.filter((m) => m.tipo === tipo);

    if (!filtradas.length) {
      setMensagemAtual(null);
      return;
    }

    const escolhida =
      filtradas[Math.floor(Math.random() * filtradas.length)];

    setMensagemAtual(escolhida);
  }, [pagina]);

  React.useEffect(() => {
    setPaginaAtual(1);
  }, [buscaNome, buscaCategoria, limite, pagina]);

  // =========================
  // FUNÇÕES
  // =========================
  const irPara = (p) => {
    setPagina(p);
    setMenuAberto(false);
  };

  const abrirReceita = (r) => {
    if (!r) return;

    setReceitaSelecionada(r);
    setUltimaReceita(r);
    localStorage.setItem("ultimaReceita", JSON.stringify(r));
    setPagina("receita");
  };

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const percentual = (receita) => {
    if (!receita || !receita.id) return 0;

    const vistos = progresso?.[receita.id]?.vistos?.length || 0;
    const total = receita?.videos?.length || 0;

    return total === 0 ? 0 : Math.round((vistos / total) * 100);
  };

  const marcarVideo = (receitaId, index) => {
    setProgresso((anterior) => {
      const vistos = anterior[receitaId]?.vistos || [];
      const jaViu = vistos.includes(index);

      const novos = jaViu
        ? vistos.filter((i) => i !== index)
        : [...vistos, index];

      return {
        ...anterior,
        [receitaId]: { vistos: novos }
      };
    });
  };

  const listaMateriaisTexto = () => {
    if (!receitaSelecionada) return "";

    const linhas = receitaSelecionada?.materiais?.linhas || [];
    const itens = receitaSelecionada?.materiais?.itens || [];

    return [
      `Materiais - ${receitaSelecionada?.nome || ""}`,
      "",
      "Linhas:",
      ...linhas.map((item) => `- ${item}`),
      "",
      "Outros materiais:",
      ...itens.map((item) => `- ${item}`),
      "",
      "App Real Triarte"
    ].join("\n");
  };

  // =========================
  // DADOS
  // =========================
  const receitasAtivas = React.useMemo(() => {
    return getReceitas().filter((r) => r && r.ativo);
  }, []);

  const hoje = React.useMemo(() => new Date(), []);

  const receitasDestaque = React.useMemo(() => {
    return receitasAtivas.filter((r) => {
      if (!r.destaqueInicio || !r.destaqueFim) return false;

      const inicio = new Date(r.destaqueInicio);
      const fim = new Date(r.destaqueFim);

      return hoje >= inicio && hoje <= fim;
    });
  }, [receitasAtivas, hoje]);

  React.useEffect(() => {
    if (pagina !== "home") return;

    const idsDestaque = receitasDestaque.map((r) => r.id);

    const lista = [...receitasAtivas]
      .filter((r) => !idsDestaque.includes(r.id))
      .sort(() => Math.random() - 0.5);

    setReceitasRandom(lista);
  }, [pagina, receitasAtivas, receitasDestaque]);

  const categorias = React.useMemo(() => {
    return [
      ...new Set(receitasAtivas.map((r) => r.categoria).filter(Boolean))
    ];
  }, [receitasAtivas]);

  const receitasFiltradas = React.useMemo(() => {
    return receitasAtivas.filter((r) => {
      const nome = buscaNome.toLowerCase();
      const nomeReceita = (r.nome || "").toLowerCase();

      return (
        (nome.length < 3 || nomeReceita.includes(nome)) &&
        (buscaCategoria === "" || r.categoria === buscaCategoria)
      );
    });
  }, [receitasAtivas, buscaNome, buscaCategoria]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(receitasFiltradas.length / limite)
  );

  const receitasPaginadas = React.useMemo(() => {
    return receitasFiltradas.slice(
      (paginaAtual - 1) * limite,
      paginaAtual * limite
    );
  }, [receitasFiltradas, paginaAtual, limite]);

  React.useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(1);
    }
  }, [paginaAtual, totalPaginas]);

  // =========================
  // BLOQUEIO ROTAÇÃO
  // =========================
  if (rotacionado && !liberarNoPC) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          background: "#f5f5f5"
        }}
      >
        <div>
          <h2>📱 Gire o celular</h2>
          <p>Use o app na vertical</p>
        </div>
      </div>
    );
  }


  // =========================
  // LAYOUT
  // =========================
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: liberarNoPC ? "#1a1a1a" : "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {/* APP CELULAR */}
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          height: "100vh",
          background: "#f5f5f5",
          position: "relative",
          overflow: "hidden",
          borderRadius: liberarNoPC ? "20px" : "0",
          boxShadow: liberarNoPC
            ? "0 0 30px rgba(0,0,0,0.45)"
            : "none"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "64px",
            background: "#fff",
            padding: "10px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
          }}
        >
          <img
            src={IMAGES.ui.logo}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer"
            }}
            onClick={() => irPara("home")}
          />

          <strong
            style={{
              fontSize: "22px",
              color: "#222"
            }}
          >
            Real Triarte
          </strong>

          <img
            src={IMAGES.icons.menu.active}
            style={{
              width: "38px",
              height: "38px",
              cursor: "pointer"
            }}
            onClick={() => setMenuAberto(true)}
          />
        </div>

        {/* MENU LATERAL */}
        <MenuLateral
          aberto={menuAberto}
          fechar={() => setMenuAberto(false)}
          irPara={irPara}
        />

        {/* CONTEÚDO ROLÁVEL */}
        <div
          style={{
            position: "absolute",
            top: "64px",
            bottom: "66px",
            left: 0,
            right: 0,
            overflowY: "auto",
            padding: "12px 14px"
          }}
        >

          {pagina === "home" && (
            <Home
              mensagemAtual={mensagemAtual}
              ultimaReceita={ultimaReceita}
              receitas={receitasAtivas}
              receitasRandom={receitasRandom}
              abrirReceita={abrirReceita}
              percentual={percentual}
              toggleFavorito={toggleFavorito}
              favoritos={favoritos}
            />
          )}

          {pagina === "receitas" && (
            <Receitas
              receitas={receitasAtivas}
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
          )}

          {pagina === "favoritos" && (
            <Favoritos
              receitas={receitasAtivas}
              favoritos={favoritos}
              abrirReceita={abrirReceita}
              percentual={percentual}
              toggleFavorito={toggleFavorito}
            />
          )}

          {pagina === "receita" && receitaSelecionada && (
            <ReceitaDetalhe
              receita={receitaSelecionada}
              percentual={percentual}
              marcarVideo={marcarVideo}
              progresso={progresso}
              voltar={() => irPara("receitas")}
              irPara={irPara}
            />
          )}

          {pagina === "materiais" && receitaSelecionada && (
            <Materiais
              receita={receitaSelecionada}
              voltar={() => irPara("receita")}
              listaMateriaisTexto={listaMateriaisTexto}
            />
          )}

          {pagina === "simulador" && <Simulador />}

          {pagina === "conquistas" && (
            <Conquistas
              voltar={() => irPara("home")}
              progresso={progresso}
              receitas={receitasAtivas}
              favoritos={favoritos}
            />
          )}

          {pagina === "abreviatura" && (
            <Abreviatura voltar={() => irPara("home")} />
          )}

          {pagina === "sobre" && <Sobre />}
          {pagina === "contato" && <Contato />}
        </div>

        {/* MENU INFERIOR */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "66px",
            background: "#2b2b2b",
            borderTop: "1px solid #444",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: 10
          }}
        >
          <div
            onClick={() => irPara("receitas")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <img
              src={IMAGES.icons.receitas.active}
              style={{ width: "27px" }}
            />
            <span style={{ fontSize: "10px", color: "#fff" }}>
              Receitas
            </span>
          </div>

          <div
            onClick={() => irPara("favoritos")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <img
              src={IMAGES.icons.favoritos.active}
              style={{ width: "27px" }}
            />
            <span style={{ fontSize: "10px", color: "#fff" }}>
              Favoritos
            </span>
          </div>

          <div
            onClick={() => irPara("conquistas")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <img
              src={IMAGES.icons.conquistas.active}
              style={{ width: "27px" }}
            />
            <span style={{ fontSize: "10px", color: "#fff" }}>
              Conquistas
            </span>
          </div>

          <div
            onClick={() => irPara("simulador")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <img
              src={IMAGES.icons.calculo.active}
              style={{ width: "27px" }}
            />
            <span style={{ fontSize: "10px", color: "#fff" }}>
              Simulador
            </span>
          </div>

          <div
            onClick={() => setMenuAberto(true)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <img
              src={IMAGES.icons.menu.active}
              style={{ width: "27px" }}
            />
            <span style={{ fontSize: "10px", color: "#fff" }}>
              Menu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainApp;