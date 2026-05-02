import React from "react";
import receitas from "./data/receitas.json";
import mensagens from "./data/mensagens.json";
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

function App() {

  // 🔥 PWA DETECÇÃO
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone;

  const [podeInstalar, setPodeInstalar] = React.useState(false);
  const [promptInstalar, setPromptInstalar] = React.useState(null);
  const [mostrarAvisoApp, setMostrarAvisoApp] = React.useState(false);
  const [instalado, setInstalado] = React.useState(
  localStorage.getItem("appInstalado") === "true"
);
  
  
 // 🔥 DETECTA QUANDO INSTALOU O APP
      React.useEffect(() => {
        const handleInstalled = () => {
          console.log("App instalado!");

          localStorage.setItem("appInstalado", "true");
          setInstalado(true);
          setMostrarAvisoApp(true);

          setTimeout(() => {
            window.location.href = window.location.origin;
          }, 800);
        };

        window.addEventListener("appinstalled", handleInstalled);

        return () => {
          window.removeEventListener("appinstalled", handleInstalled);
        };
      }, []);


// 🔥 DETECTA SE PODE INSTALAR
React.useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    setPromptInstalar(e);
    setPodeInstalar(true);
  };

  window.addEventListener("beforeinstallprompt", handler);

  return () => {
    window.removeEventListener("beforeinstallprompt", handler);
  };
}, []);

  // 🔥 BLOQUEIO ROTAÇÃO
  const [rotacionado, setRotacionado] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      setRotacionado(window.innerWidth > window.innerHeight);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  // 🚫 BLOQUEIA ROTAÇÃO
  if (rotacionado) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px"
      }}>
        <div>
          <h2>📱 Gire o celular</h2>
          <p>Use o app na vertical</p>
        </div>
      </div>
    );
  }





  
  const [pagina, setPagina] = React.useState("home");
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = React.useState(null);
  const [buscaNome, setBuscaNome] = React.useState("");
  const [buscaCategoria, setBuscaCategoria] = React.useState("");
  const [modoExibicao, setModoExibicao] = React.useState("grid");
  const [limite, setLimite] = React.useState(10);
  const [paginaAtual, setPaginaAtual] = React.useState(1);
  const [favoritos, setFavoritos] = React.useState(() => {
    const salvo = localStorage.getItem("favoritos");
    return salvo ? JSON.parse(salvo) : [];
  });
  const [progresso, setProgresso] = React.useState(() => {
    const salvo = localStorage.getItem("progressoReceitas");
    return salvo ? JSON.parse(salvo) : {};
  });
  const [ultimaReceita, setUltimaReceita] = React.useState(() => {
    const salvo = localStorage.getItem("ultimaReceita");
    return salvo ? JSON.parse(salvo) : null;
  });
  const [mensagemAtual, setMensagemAtual] = React.useState(null);

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
    if (!mensagens.length) return;

    const tipo = pagina === "home" ? "boasvindas" : "dica";
    const filtradas = mensagens.filter((m) => m.tipo === tipo);
    const escolhida =
      filtradas[Math.floor(Math.random() * filtradas.length)];

    setMensagemAtual(escolhida);
  }, [pagina]);
  React.useEffect(() => {
    setPaginaAtual(1);
  }, [buscaNome, buscaCategoria, limite, pagina]);

  React.useEffect(() => {
    if (mostrarAvisoApp) {
      setTimeout(() => {
        setMostrarAvisoApp(false);
      }, 3000);
    }
  }, [mostrarAvisoApp]);



  // =========================
  // FUNÇÕES
  // =========================
  const irPara = (p) => {
    setPagina(p);
    setMenuAberto(false);
  };
  const abrirReceita = (r) => {
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
    const vistos = progresso[receita.id]?.vistos?.length || 0;
    const total = receita.videos?.length || 0;
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
    const linhas = receitaSelecionada?.materiais?.linhas || [];
    const itens = receitaSelecionada?.materiais?.itens || [];

    return [
      `Materiais - ${receitaSelecionada?.nome}`,
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
  const receitasAtivas = receitas.filter((r) => r.ativo);
  // 🔥 DATA ATUAL
  const hoje = new Date();  
  // 🔥 IDENTIFICA RECEITAS EM DESTAQUE (CARROSSEL)
  const receitasDestaque = receitasAtivas.filter((r) => {
  if (!r.destaqueInicio || !r.destaqueFim) return false;
  const inicio = new Date(r.destaqueInicio);
  const fim = new Date(r.destaqueFim);
  return hoje >= inicio && hoje <= fim;
});

// 🔥 STATE PARA FIXAR RANDOM
    const [receitasRandom, setReceitasRandom] = React.useState([]);

// 🔥 RANDOM SEM REPETIR DESTAQUES (SÓ QUANDO ENTRA NA HOME)
  React.useEffect(() => {
  if (pagina !== "home") return;

  const idsDestaque = receitasDestaque.map((r) => r.id);

  const lista = [...receitasAtivas]
    .filter((r) => !idsDestaque.includes(r.id))
    .sort(() => Math.random() - 0.5);

  setReceitasRandom(lista);
}, [pagina]);

// 🔥 CATEGORIAS
  const categorias = [
  ...new Set(receitasAtivas.map((r) => r.categoria))
];

// 🔥 FILTRO DE BUSCA
  const receitasFiltradas = React.useMemo(() => {
    return receitasAtivas.filter((r) => {
      const nome = buscaNome.toLowerCase();

      return (
        (nome.length < 3 || r.nome.toLowerCase().includes(nome)) &&
        (buscaCategoria === "" || r.categoria === buscaCategoria)
      );
    });
  }, [receitasAtivas, buscaNome, buscaCategoria]);

// 🔥 PAGINAÇÃO
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
  }, [totalPaginas]);
  // =========================
  // LAYOUT
  // =========================
  return (
    <div style={{ maxWidth: "430px", margin: "0 auto", minHeight: "100vh", background: "#f5f5f5" }}>

     {/* HEADER FIXO */}
    <div
      style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%",  maxWidth: "430px", zIndex: 1000,

        background: "#fff",
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
      }}
>
  {/* LOGO */}
  <img
    src="/images/logo/logo.png"
    style={{
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      cursor: "pointer"
    }}
    onClick={() => irPara("home")}
  />

  {/* TÍTULO */}
  <strong
    style={{
      fontSize: "38px",
      color: "#222"
    }}
  >
    Real Triarte
  </strong>

  {/* MENU */}
  <img
    src="/images/icons/menu.png"
    style={{
      width: "40px",
      height: "40px",
      cursor: "pointer"
    }}
    onClick={() => setMenuAberto(true)}
  />
</div>

      {/* MENU */}
      <MenuLateral aberto={menuAberto} fechar={() => setMenuAberto(false)} irPara={irPara} />

      {/* CONTEÚDO */}

{podeInstalar && !isStandalone && !instalado && (
  <div style={{ textAlign: "center", marginBottom: "10px" }}>
    <button
      onClick={() => {
        if (!promptInstalar) return;
        promptInstalar.prompt();
      }}
      style={{
        padding: "12px 16px",
        background: "#ffd400",
        border: "none",
        borderRadius: "12px",
        fontWeight: "800",
        cursor: "pointer"
      }}
    >
      📱 Instalar App
    </button>
  </div>
)}

     {!isStandalone && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffeeba",
            padding: "10px",
            borderRadius: "10px",
            margin: "10px",
            textAlign: "center",
            fontSize: "13px"
          }}
        >
          📲 Instale o app para melhor experiência
        </div>
      )}

      <div style={{ padding: "80px 15px 90px" }}>

        {pagina === "home" && (
          <Home
            mensagemAtual={mensagemAtual}
            ultimaReceita={ultimaReceita}
            receitas={receitasAtivas}        // ✅ CORREÇÃO PRINCIPAL
            receitasRandom={receitasRandom}  // ✅ RANDOM CORRETO
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

      
      {/* MENU INFERIOR ESTILO LATERAL */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          maxWidth: "430px",
          background: "#2b2b2b",
          borderTop: "1px solid #444",

          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",

          padding: "10px 0"
        }}
      >

        {/* RECEITAS */}
        <div
          onClick={() => irPara("receitas")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <img src="/images/icons/receitas.png" style={{ width: "28px" }} />
          <span style={{ fontSize: "11px", color: "#fff" }}>Receitas</span>
        </div>

        {/* FAVORITOS */}
        <div
          onClick={() => irPara("favoritos")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <img src="/images/icons/favoritos.png" style={{ width: "28px" }} />
          <span style={{ fontSize: "11px", color: "#fff" }}>Favoritos</span>
        </div>

        {/* CONQUISTAS */}
        <div
          onClick={() => irPara("conquistas")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <img src="/images/icons/conquistas.png" style={{ width: "28px" }} />
          <span style={{ fontSize: "11px", color: "#fff" }}>Conquistas</span>
        </div>

        {/* SIMULADOR */}
        <div
          onClick={() => irPara("simulador")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <img src="/images/icons/calculo.png" style={{ width: "28px" }} />
          <span style={{ fontSize: "11px", color: "#fff" }}>Simulador</span>
        </div>

        {/* MENU */}
          <div
            onClick={() => setMenuAberto(true)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
        >
          <img src="/images/icons/menu.png" style={{ width: "28px" }} />
          <span style={{ fontSize: "11px", color: "#fff" }}>Menu</span>
        </div>
      </div>
    </div>
  );
}
export default App;