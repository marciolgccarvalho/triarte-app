import React from "react";
import receitas from "./data/receitas.json";

function App() {
  const [pagina, setPagina] = React.useState("home");
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = React.useState(null);
  const [videoSelecionado, setVideoSelecionado] = React.useState(null);
  const [slideAtual, setSlideAtual] = React.useState(0);

  const [installPrompt, setInstallPrompt] = React.useState(null);
  const [podeInstalar, setPodeInstalar] = React.useState(false);

  const [buscaNome, setBuscaNome] = React.useState("");
  const [buscaCategoria, setBuscaCategoria] = React.useState("");
  const [buscaData, setBuscaData] = React.useState("");

  const [progresso, setProgresso] = React.useState(() => {
    const salvo = localStorage.getItem("progressoReceitas");
    return salvo ? JSON.parse(salvo) : {};
  });

  const [favoritos, setFavoritos] = React.useState(() => {
    const salvo = localStorage.getItem("receitasFavoritas");
    return salvo ? JSON.parse(salvo) : [];
  });

  const [valorLinha, setValorLinha] = React.useState("");
  const [valorOlhos, setValorOlhos] = React.useState("");
  const [valorEnchimento, setValorEnchimento] = React.useState("");
  const [outrosCustos, setOutrosCustos] = React.useState("");
  const [valorHora, setValorHora] = React.useState("");
  const [horasGastas, setHorasGastas] = React.useState("");
  const [precoSugerido, setPrecoSugerido] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem("progressoReceitas", JSON.stringify(progresso));
  }, [progresso]);

  React.useEffect(() => {
    localStorage.setItem("receitasFavoritas", JSON.stringify(favoritos));
  }, [favoritos]);

  React.useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    setInstallPrompt(e);
    setPodeInstalar(true);
  };

  window.addEventListener("beforeinstallprompt", handler);

  return () => {
    window.removeEventListener("beforeinstallprompt", handler);
  };
}, []);


  const hoje = new Date();

  const receitasAtivas = receitas.filter((receita) => receita.ativo);

  const categorias = [...new Set(receitasAtivas.map((r) => r.categoria))]
    .filter(Boolean)
    .sort();

  const receitaEstaEmDestaque = (receita) => {
    if (!receita.destaqueInicio || !receita.destaqueFim) return false;

    const inicio = new Date(`${receita.destaqueInicio}T00:00:00`);
    const fim = new Date(`${receita.destaqueFim}T23:59:59`);

    return hoje >= inicio && hoje <= fim;
  };

  const receitasDestaque = receitasAtivas.filter(receitaEstaEmDestaque);

  const receitasNormaisAleatorias = React.useMemo(() => {
    const normais = receitasAtivas.filter(
      (receita) => !receitaEstaEmDestaque(receita)
    );

    return [...normais].sort(() => Math.random() - 0.5).slice(0, 8);
  }, []);

  const receitasFavoritas = receitasAtivas.filter((receita) =>
    favoritos.includes(receita.id)
  );

  const receitasFiltradas = receitasAtivas.filter((receita) => {
    const nomeDigitado = buscaNome.trim().toLowerCase();

    const passaNome =
      nomeDigitado.length < 3 ||
      receita.nome.toLowerCase().includes(nomeDigitado);

    const passaCategoria =
      buscaCategoria === "" || receita.categoria === buscaCategoria;

    const passaData =
      buscaData === "" || receita.destaqueInicio === buscaData;

    return passaNome && passaCategoria && passaData;
  });

  React.useEffect(() => {
    if (receitasDestaque.length <= 1) return;

    const intervalo = setInterval(() => {
      setSlideAtual((atual) => (atual + 1) % receitasDestaque.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, [receitasDestaque.length]);

  const irPara = (novaPagina) => {
    setPagina(novaPagina);
    setMenuAberto(false);
  };

  const abrirReceita = (receita) => {
    setReceitaSelecionada(receita);
    setVideoSelecionado(null);
    setPagina("receita");
    setMenuAberto(false);
  };

  const abrirVideo = (video, index) => {
    setVideoSelecionado({ ...video, index });
    setPagina("video");
  };

  const transformarNumero = (valor) => {
  return Number(String(valor).replace(",", ".")) || 0;
};

  const calcularPreco = () => {
  const linha = transformarNumero(valorLinha);
  const olhos = transformarNumero(valorOlhos);
  const enchimento = transformarNumero(valorEnchimento);
  const outros = transformarNumero(outrosCustos);
  const hora = transformarNumero(valorHora);
  const horas = transformarNumero(horasGastas);

  const custoMateriais = linha + olhos + enchimento + outros;
  const maoDeObra = hora * horas;
  const custoTotal = custoMateriais + maoDeObra;

  const precoFinal = custoTotal * 3;

  setPrecoSugerido(precoFinal);
  };

  const receitaFavorita = (receitaId) => favoritos.includes(receitaId);

  const alternarFavorito = (receitaId) => {
    setFavoritos((atuais) =>
      atuais.includes(receitaId)
        ? atuais.filter((id) => id !== receitaId)
        : [...atuais, receitaId]
    );
  };

  const getVideosVistos = (receitaId) => {
    return progresso[receitaId]?.vistos || [];
  };

  const videoFoiVisto = (receitaId, index) => {
    return getVideosVistos(receitaId).includes(index);
  };

  const alternarVideoVisto = (receitaId, index) => {
    setProgresso((anterior) => {
      const vistosAtuais = anterior[receitaId]?.vistos || [];

      const novosVistos = vistosAtuais.includes(index)
        ? vistosAtuais.filter((item) => item !== index)
        : [...vistosAtuais, index];

      return {
        ...anterior,
        [receitaId]: {
          vistos: novosVistos
        }
      };
    });
  };

  const calcularPercentual = (receita) => {
    const vistos = getVideosVistos(receita.id).length;
    const total = receita.videos.length;

    if (total === 0) return 0;

    return Math.round((vistos / total) * 100);
  };

  const botaoLink = {
    width: "100%",
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    background: "#ffd400",
    color: "#222",
    fontSize: "15px",
    fontWeight: "700",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  };

  const menuItem = (icone, texto, destino) => (
  <button
    onClick={() => irPara(destino)}
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 0",
      background: "transparent",
      border: "none",
      fontSize: "17px",
      fontWeight: "600",
      color: "#222",
      cursor: "pointer"
    }}
  >
    <img
      src={icone}
      style={{
        width: "34px",
        height: "34px"
      }}
    />

    {texto}
  </button>
);

const menuLink = (icone, texto, link) => (
  <button
    onClick={() => {
      window.open(link, "_blank");
      setMenuAberto(false);
    }}
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 0",
      background: "transparent",
      border: "none",
      fontSize: "17px",
      fontWeight: "600",
      color: "#222",
      cursor: "pointer"
    }}
  >
    <img
      src={icone}
      style={{
        width: "34px",
        height: "34px"
      }}
    />

    {texto}
  </button>
);

  const BotaoLink = ({ icone, texto, link }) => (
    <button style={botaoLink} onClick={() => window.open(link, "_blank")}>
      <img src={icone} style={{ width: "28px", height: "28px" }} />
      {texto}
    </button>
  );

  const BotaoFavorito = ({ receita }) => {
    const favorito = receitaFavorita(receita.id);

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          alternarFavorito(receita.id);
        }}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(255,255,255,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 7px rgba(0,0,0,0.25)",
          zIndex: 5
        }}
      >
        <img
          src={
            favorito
              ? "/images/icons/favoritos.png"
              : "/images/icons/favoritos2.png"
          }
          style={{ width: "28px", height: "28px" }}
        />
      </button>
    );
  };

  const BarraProgresso = ({ receita, corTexto = "#333" }) => {
  const percentual = calcularPercentual(receita);

  return (
    <div style={{ marginTop: "8px" }}>
      <div
        style={{
          height: "8px",
          background: "#e5e5e5",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${percentual}%`,
            height: "100%",
            background: "#ffd400"
          }}
        />
      </div>

      <small
        style={{
          fontSize: "12px",
          fontWeight: "800",
          color: corTexto
        }}
      >
        {percentual}% concluído
      </small>
    </div>
  );
};

  const CardReceita = ({ receita }) => (
    <button
      onClick={() => abrirReceita(receita)}
      style={{
        background: "#ffffff",
        border: "none",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
        textAlign: "left",
        padding: 0,
        position: "relative"
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={receita.imagem}
          alt={receita.nome}
          style={{
            width: "100%",
            height: "145px",
            objectFit: "cover",
            display: "block"
          }}
        />

        <BotaoFavorito receita={receita} />
      </div>

      <div style={{ padding: "10px" }}>
        <strong
          style={{
            fontSize: "15px",
            color: "#222",
            display: "block",
            lineHeight: "1.25"
          }}
        >
          {receita.nome}
        </strong>

        <span style={{ fontSize: "13px", color: "#666" }}>
          {receita.categoria}
        </span>

        <BarraProgresso receita={receita} />
      </div>
    </button>
  );

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        height: "100vh",
        overflowY: "auto",
        background: "#f5f5f5",
        position: "relative",
        zIndex: 3000
      }}
    >
      {menuAberto && (
        <div
          onClick={() => setMenuAberto(false)}
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "95%",
            maxWidth: "430px",
            height: "100vh",
            background: "rgba(0,0,0,0.45)",
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#ffffff",
              width: "78%",
              height: "100%",
              padding: "18px",
              boxShadow: "4px 0 12px rgba(0,0,0,0.2)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px"
              }}
            >
              <h2 style={{ margin: 0, fontSize: "24px" }}>Menu</h2>

              <button
                onClick={() => setMenuAberto(false)}
                style={{ background: "transparent", border: "none" }}
              >
                <img
                  src="/images/icons/fechar.png"
                  style={{ width: "36px", height: "36px" }}
                />
              </button>
            </div>

            {menuItem("/images/icons/home.png", "Início", "home")}
            {menuItem("/images/icons/receitas.png", "Receitas", "receitas")}
            {menuItem("/images/icons/favoritos.png", "Favoritos", "favoritos")}
            {menuItem("/images/icons/busca.png", "Buscar", "busca")}
            {menuItem("/images/icons/calculo.png", "Simulador de Preço", "calculo")}
            {menuLink(
              "/images/icons/triarteicon.png",
              "Receitas PDF",
              "https://triarte.com.br"
            )}
            {menuLink(
              "/images/icons/mercadolivre.png",
              "Materiais ML",
              "https://mercadolivre.com/sec/1AW2X78"
            )}
            {menuItem("/images/icons/sobre.png", "Sobre", "sobre")}
            {menuItem("/images/icons/contato.png", "Contato", "contato")}
          </div>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "95%",
          maxWidth: "430px",
          background: "#ffffff",
          padding: "10px 15px",
          zIndex: 999,
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <img
          src="/images/logo/logo.png"
          style={{ width: "42px", height: "42px", borderRadius: "50%" }}
        />

        <h1 style={{ fontSize: "22px", margin: 0 }}>Real Triarte</h1>

        <button
          onClick={() => setMenuAberto(true)}
          style={{ background: "transparent", border: "none" }}
        >
          <img
            src="/images/icons/menu.png"
            style={{ width: "38px", height: "38px" }}
          />
        </button>
      </div>

      <div style={{ padding: "85px 15px 115px 15px" }}>
        {pagina === "home" && (
          <>
            {receitasDestaque.length > 0 && (
              <div
                onClick={() => abrirReceita(receitasDestaque[slideAtual])}
                style={{
                  height: "230px",
                  borderRadius: "18px",
                  marginBottom: "18px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  cursor: "pointer"
                }}
              >
                <img
                  src={receitasDestaque[slideAtual].imagem}
                  alt={receitasDestaque[slideAtual].nome}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />

                <BotaoFavorito receita={receitasDestaque[slideAtual]} />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.05))",
                    pointerEvents: "none"
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "16px",
                    right: "16px",
                    bottom: "16px",
                    color: "#fff",
                    pointerEvents: "none"
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      background: "#ffd400",
                      color: "#222",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "800",
                      marginBottom: "8px"
                    }}
                  >
                    Receita em destaque
                  </div>

                  <h2 style={{ margin: 0, fontSize: "25px" }}>
                    {receitasDestaque[slideAtual].nome}
                  </h2>

                  <p style={{ margin: "5px 0 0", fontSize: "15px" }}>
                    Toque para assistir a receita
                  </p>

                  <BarraProgresso
                    receita={receitasDestaque[slideAtual]}
                    corTexto="#ffffff"
                  />
                </div>
              </div>
            )}


            {podeInstalar && (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "16px",
                  marginBottom: "15px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.10)"
                }}
              >
                <h3 style={{ margin: "0 0 8px", fontSize: "22px" }}>
                  📱 Instale o App
                </h3>

                <p style={{ margin: "0 0 14px", color: "#555" }}>
                  Acesso rápido às receitas no seu celular.
                </p>

                <button
                  onClick={async () => {
                    if (!installPrompt) return;

                    installPrompt.prompt();

                    const choice = await installPrompt.userChoice;

                    if (choice.outcome === "accepted") {
                      setPodeInstalar(false);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background: "#FFD400",
                    color: "#222",
                    fontSize: "18px",
                    fontWeight: "800"
                  }}
                >
                  Instalar Agora
                </button>
              </div>
            )}



            <h2 style={{ fontSize: "22px", margin: "8px 0 12px" }}>
              Receitas para você hoje
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px"
              }}
            >
              {receitasNormaisAleatorias.map((receita) => (
                <CardReceita key={receita.id} receita={receita} />
              ))}
            </div>

            <button
              onClick={() => irPara("receitas")}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "15px",
                borderRadius: "14px",
                border: "none",
                background: "#ffd400",
                color: "#222",
                fontSize: "17px",
                fontWeight: "800",
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)"
              }}
            >
              Ver todas as receitas
            </button>
          </>
        )}

        {pagina === "receitas" && (
          <>
            <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>
              Todas as receitas
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px"
              }}
            >
              {receitasAtivas.map((receita) => (
                <CardReceita key={receita.id} receita={receita} />
              ))}
            </div>
          </>
        )}

        {pagina === "busca" && (
          <>
            <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>
              Buscar receitas
            </h2>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "15px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
              }}
            >
              <label style={{ fontWeight: "800", fontSize: "14px" }}>
                Nome da receita
              </label>

              <input
                type="text"
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
                placeholder="Digite pelo menos 3 letras"
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  marginTop: "6px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />

              <label style={{ fontWeight: "800", fontSize: "14px" }}>
                Categoria
              </label>

              <select
                value={buscaCategoria}
                onChange={(e) => setBuscaCategoria(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  marginTop: "6px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  background: "#fff"
                }}
              >
                <option value="">Todas as categorias</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>

              <label style={{ fontWeight: "800", fontSize: "14px" }}>
                Data de postagem
              </label>

              <input
                type="date"
                value={buscaData}
                onChange={(e) => setBuscaData(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  marginTop: "6px",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />

              <button
                onClick={() => {
                  setBuscaNome("");
                  setBuscaCategoria("");
                  setBuscaData("");
                }}
                style={{
                  width: "100%",
                  marginTop: "14px",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#333",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "800"
                }}
              >
                Limpar filtros
              </button>
            </div>

            <p style={{ fontWeight: "700", marginBottom: "12px" }}>
              {receitasFiltradas.length} receita(s) encontrada(s)
            </p>

            {receitasFiltradas.length === 0 ? (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "15px",
                  padding: "25px",
                  textAlign: "center"
                }}
              >
                <h3>Nenhuma receita encontrada</h3>
                <p style={{ color: "#666" }}>
                  Tente buscar por outro nome, categoria ou data.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px"
                }}
              >
                {receitasFiltradas.map((receita) => (
                  <CardReceita key={receita.id} receita={receita} />
                ))}
              </div>
            )}
          </>
        )}

        {pagina === "favoritos" && (
          <>
            <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>
              Minhas receitas favoritas
            </h2>

            {receitasFavoritas.length === 0 ? (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "15px",
                  padding: "25px",
                  textAlign: "center"
                }}
              >
                <img
                  src="/images/icons/favoritos2.png"
                  style={{ width: "70px", height: "70px", marginBottom: "10px" }}
                />

                <h3>Nenhuma receita favorita ainda</h3>

                <p style={{ color: "#666", lineHeight: "1.5" }}>
                  Toque no coração das receitas para salvar suas favoritas aqui.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px"
                }}
              >
                {receitasFavoritas.map((receita) => (
                  <CardReceita key={receita.id} receita={receita} />
                ))}
              </div>
            )}
          </>
        )}

        {pagina === "receita" && receitaSelecionada && (
          <div>
            <button
              onClick={() => irPara("home")}
              style={{
                marginBottom: "12px",
                background: "transparent",
                border: "none",
                fontSize: "16px",
                fontWeight: "700"
              }}
            >
              ← Voltar
            </button>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={receitaSelecionada.imagem}
                  alt={receitaSelecionada.nome}
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />

                <BotaoFavorito receita={receitaSelecionada} />
              </div>

              <div style={{ padding: "18px" }}>
                <h2 style={{ margin: "0 0 6px", fontSize: "26px" }}>
                  {receitaSelecionada.nome}
                </h2>

                <p style={{ margin: "0 0 12px", color: "#666" }}>
                  {receitaSelecionada.categoria}
                </p>

                <p style={{ lineHeight: "1.6", color: "#333" }}>
                  {receitaSelecionada.descricao}
                </p>

                <div
                  style={{
                    background: "#f7f7f7",
                    padding: "14px",
                    borderRadius: "14px",
                    margin: "18px 0"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      fontWeight: "800"
                    }}
                  >
                    <span>Seu progresso</span>
                    <span>{calcularPercentual(receitaSelecionada)}%</span>
                  </div>

                  <div
                    style={{
                      height: "14px",
                      background: "#ddd",
                      borderRadius: "20px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        width: `${calcularPercentual(receitaSelecionada)}%`,
                        height: "100%",
                        background: "#ffd400"
                      }}
                    />
                  </div>

                  <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#555" }}>
                    {getVideosVistos(receitaSelecionada.id).length} de{" "}
                    {receitaSelecionada.videos.length} partes concluídas
                  </p>
                </div>

                <h3 style={{ fontSize: "21px", marginTop: "20px" }}>
                  Partes da receita
                </h3>

                <div style={{ display: "grid", gap: "10px" }}>
                  {receitaSelecionada.videos.map((video, index) => {
                    const visto = videoFoiVisto(receitaSelecionada.id, index);

                    return (
                      <div
                        key={index}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 52px",
                          gap: "8px"
                        }}
                      >
                        <button
                          onClick={() => abrirVideo(video, index)}
                          style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "12px",
                            border: visto
                              ? "2px solid #35a853"
                              : "1px solid #ddd",
                            background: visto ? "#eaffef" : "#fff8cc",
                            fontSize: "17px",
                            fontWeight: "700",
                            textAlign: "left"
                          }}
                        >
                          {visto ? "✅" : "▶"} {video.titulo}
                        </button>

                        <button
                          onClick={() =>
                            alternarVideoVisto(receitaSelecionada.id, index)
                          }
                          style={{
                            borderRadius: "12px",
                            border: "none",
                            background: visto ? "#35a853" : "#ddd",
                            color: visto ? "#fff" : "#333",
                            fontSize: "22px",
                            fontWeight: "800"
                          }}
                        >
                          ✓
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {pagina === "video" && receitaSelecionada && videoSelecionado && (
          <div>
            <button
              onClick={() => irPara("receita")}
              style={{
                marginBottom: "12px",
                background: "transparent",
                border: "none",
                fontSize: "16px",
                fontWeight: "700"
              }}
            >
              ← Voltar para receita
            </button>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
              }}
            >
              <h2 style={{ marginTop: 0 }}>{receitaSelecionada.nome}</h2>
              <h3>{videoSelecionado.titulo}</h3>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "#000"
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoSelecionado.youtubeId}`}
                  title={videoSelecionado.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none"
                  }}
                />
              </div>

              <button
                onClick={() =>
                  alternarVideoVisto(
                    receitaSelecionada.id,
                    videoSelecionado.index
                  )
                }
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "15px",
                  borderRadius: "14px",
                  border: "none",
                  background: videoFoiVisto(
                    receitaSelecionada.id,
                    videoSelecionado.index
                  )
                    ? "#35a853"
                    : "#ffd400",
                  color: videoFoiVisto(
                    receitaSelecionada.id,
                    videoSelecionado.index
                  )
                    ? "#fff"
                    : "#222",
                  fontSize: "17px",
                  fontWeight: "800"
                }}
              >
                {videoFoiVisto(receitaSelecionada.id, videoSelecionado.index)
                  ? "✅ Parte concluída"
                  : "Marcar como concluída"}
              </button>
              
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "12px"
                }}
              >
                {videoSelecionado.index > 0 && (
                  <button
                    onClick={() => {
                      const novoIndex = videoSelecionado.index - 1;
                      abrirVideo(receitaSelecionada.videos[novoIndex], novoIndex);
                    }}
                    style={{
                      padding: "14px",
                      borderRadius: "14px",
                      border: "none",
                      background: "#333",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "800"
                    }}
                  >
                    ← Vídeo anterior
                  </button>
                )}

                {videoSelecionado.index < receitaSelecionada.videos.length - 1 && (
                  <button
                    onClick={() => {
                      const novoIndex = videoSelecionado.index + 1;
                      abrirVideo(receitaSelecionada.videos[novoIndex], novoIndex);
                    }}
                    style={{
                      padding: "14px",
                      borderRadius: "14px",
                      border: "none",
                      background: "#ffd400",
                      color: "#222",
                      fontSize: "16px",
                      fontWeight: "800"
                    }}
                  >
                    Próximo vídeo →
                  </button>
                )}
              </div>

              <div
                style={{
                  background: "#fff4b8",
                  borderRadius: "14px",
                  padding: "16px",
                  marginTop: "14px",
                  textAlign: "center"
                }}
              >
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#222",
                    lineHeight: "1.5"
                  }}
                >
                  ⭐ Seja membro e tenha acesso antecipado a todos os vídeos do canal.
                </p>

                <button
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/@RealTriarte/join",
                      "_blank"
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background: "#ff0000",
                    color: "#fff",
                    fontSize: "17px",
                    fontWeight: "800"
                  }}
                >
                  Seja Membro do Canal
                </button>
              </div>


              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "16px",
                  marginTop: "14px",
                  textAlign: "center",
                  border: "1px solid #eee"
                }}
              >
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#222"
                  }}
                >
                  🛍 Materiais recomendados para suas receitas
                </p>

                <button
                  onClick={() =>
                    window.open(
                      "https://mercadolivre.com/sec/1AW2X78",
                      "_blank"
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background: "#FFE600",
                    color: "#222",
                    fontSize: "17px",
                    fontWeight: "800"
                  }}
                >
                  Ver produtos no Mercado Livre
                </button>
              </div>


            </div>
          </div>
        )}

{pagina === "calculo" && (
  <div
    style={{
      background: "#ffffff",
      borderRadius: "15px",
      padding: "22px",
      color: "#222"
    }}
  >
    <h2
      style={{
        fontSize: "26px",
        marginBottom: "18px",
        textAlign: "center"
      }}
    >
      Simulador de Preço
    </h2>

    <div style={{ textAlign: "center", marginBottom: "18px" }}>
      <img
        src="/images/icons/calculo.png"
        style={{ width: "82px", height: "82px" }}
      />
    </div>

    <div style={{ display: "grid", gap: "14px" }}>
      <CampoCalculo
        label="Valor gasto com linha"
        valor={valorLinha}
        setValor={setValorLinha}
      />

      <CampoCalculo
        label="Valor gasto com olhos"
        valor={valorOlhos}
        setValor={setValorOlhos}
      />

      <CampoCalculo
        label="Valor gasto com enchimento"
        valor={valorEnchimento}
        setValor={setValorEnchimento}
      />

      <CampoCalculo
        label="Outros custos"
        valor={outrosCustos}
        setValor={setOutrosCustos}
      />

      <CampoCalculo
        label="Valor por hora trabalhada"
        valor={valorHora}
        setValor={setValorHora}
      />

      <CampoCalculo
        label="Quantidade de horas gastas"
        valor={horasGastas}
        setValor={setHorasGastas}
      />

      <button
        onClick={calcularPreco}
        style={{
          background: "#FFD91A",
          border: "none",
          borderRadius: "14px",
          padding: "15px",
          fontSize: "18px",
          fontWeight: "700",
          color: "#222",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Calcular preço sugerido
      </button>

      <button
        onClick={() => {
          setValorLinha("");
          setValorOlhos("");
          setValorEnchimento("");
          setOutrosCustos("");
          setValorHora("");
          setHorasGastas("");
          setPrecoSugerido(null);
        }}
        style={{
          background: "#333",
          border: "none",
          borderRadius: "14px",
          padding: "15px",
          fontSize: "17px",
          fontWeight: "700",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Zerar simulador
      </button>

      {precoSugerido !== null && (
        <div
          style={{
            background: "#fff4b8",
            borderRadius: "14px",
            padding: "18px",
            marginTop: "15px",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "16px", marginBottom: "8px" }}>
            Preço sugerido:
          </div>

          <strong style={{ fontSize: "30px" }}>
            R$ {precoSugerido.toFixed(2).replace(".", ",")}
          </strong>
        </div>
      )}
    </div>
  </div>
)}



        {pagina === "sobre" && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "15px",
              padding: "22px",
              lineHeight: "1.8",
              color: "#222",
              textAlign: "justify"
            }}
          >
            <h2 style={{ fontSize: "26px", marginBottom: "15px", textAlign: "center" }}>
              Sobre o Real Triarte
            </h2>

            <p>Bem-vindos ao canto da criatividade!</p>

            <p>
              No <strong>Real Triarte</strong>, você transforma fios em
              personagens incríveis, com receitas de amigurumi, passo a passo
              simples, dicas para todos os níveis e carinho artesanal.
            </p>

            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <img
                src="/images/logo/logo.png"
                style={{ width: "90px", height: "90px" }}
              />
            </div>

            <p>
              Este aplicativo foi criado para facilitar o acesso às receitas,
              organizar conteúdos e aproximar ainda mais nossa comunidade.
            </p>

            <div
              style={{
                background: "#fff4b8",
                borderRadius: "12px",
                padding: "15px",
                margin: "20px 0",
                textAlign: "center"
              }}
            >
              <strong>Mais de 800 vídeos publicados</strong>
              <br />
              Conteúdos para todos os níveis.
            </div>

            <p>
              O canal está no YouTube desde{" "}
              <strong>11 de novembro de 2020</strong>, com milhares de inscritos
              e milhões de visualizações.
            </p>

            <div
              style={{
                background: "#f3f3f3",
                borderRadius: "12px",
                padding: "15px",
                marginTop: "20px",
                textAlign: "center"
              }}
            >
              <strong>Versão do App</strong>
              <br />
              Real Triarte v1.0.0
              <br />
              Lançamento oficial 2026
            </div>

              <button
              onClick={() => window.location.reload()}
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#FFD91A",
                color: "#222",
                fontSize: "16px",
                fontWeight: "800"
              }}
            >
              Verificar novas receitas
            </button>


            <div style={{ marginTop: "25px", display: "grid", gap: "12px" }}>
              <BotaoLink
                icone="/images/icons/site.png"
                texto="Visite nosso Site"
                link="https://triarte.com.br"
              />

              <BotaoLink
                icone="/images/icons/youtube.png"
                texto="Visite nosso Canal"
                link="https://www.youtube.com/@RealTriarte"
              />

              <BotaoLink
                icone="/images/icons/redes.png"
                texto="Visite nossas Redes"
                link="https://real.triarte.com.br"
              />
            </div>
          </div>
        )}

        {pagina === "contato" && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "15px",
              padding: "22px",
              lineHeight: "1.8",
              color: "#222",
              textAlign: "center"
            }}
          >
            <h2 style={{ fontSize: "26px", marginBottom: "15px" }}>Contato</h2>

            <img
              src="/images/logo/logo.png"
              style={{ width: "90px", height: "90px", marginBottom: "18px" }}
            />

            <p>Para dúvidas, sugestões ou parcerias, fale conosco pelo e-mail:</p>

            <div
              style={{
                background: "#fff4b8",
                borderRadius: "12px",
                padding: "16px",
                marginTop: "20px",
                fontWeight: "700",
                fontSize: "18px"
              }}
            >
              contato@triarte.com.br
            </div>
          </div>
        )}
      </div>

      {![
  "home",
  "receitas",
  "busca",
  "favoritos",
  "receita",
  "video",
  "calculo",
  "sobre",
  "contato"
].includes(pagina) && (
  <div
    style={{
      background: "#ffffff",
      borderRadius: "15px",
      padding: "25px",
      textAlign: "center",
      color: "#222"
    }}
  >
    <img
      src="/images/logo/logo.png"
      style={{
        width: "85px",
        height: "85px",
        marginBottom: "18px"
      }}
    />

    <h2 style={{ fontSize: "26px", marginBottom: "12px" }}>
      Ops! Algo deu errado
    </h2>

    <p style={{ color: "#666", lineHeight: "1.6" }}>
      Não conseguimos carregar esta página.
      <br />
      Toque abaixo para voltar ao início.
    </p>

    <button
      onClick={() => irPara("home")}
      style={{
        marginTop: "18px",
        background: "#FFD91A",
        border: "none",
        borderRadius: "14px",
        padding: "15px 20px",
        fontSize: "17px",
        fontWeight: "800",
        color: "#222",
        width: "100%"
      }}
    >
      Voltar para Início
    </button>
  </div>
)}

      <div
  style={{
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "95%",
    maxWidth: "430px",
    background: "#333",
    padding: "12px",
    display: "flex",
    justifyContent: "space-around",
    borderTopLeftRadius: "18px",
    borderTopRightRadius: "18px",
    zIndex: 3000
  }}
>
        <button
          style={{ background: "transparent", border: "none" }}
          onClick={() => irPara("home")}
        >
          <img
            src="/images/icons/home.png"
            style={{ width: "42px", height: "42px" }}
          />
        </button>

        <button
          style={{ background: "transparent", border: "none" }}
          onClick={() => irPara("favoritos")}
        >
          <img
            src="/images/icons/favoritos.png"
            style={{ width: "42px", height: "42px" }}
          />
        </button>

        <button
          style={{ background: "transparent", border: "none" }}
          onClick={() => irPara("busca")}
        >
          <img
            src="/images/icons/busca.png"
            style={{ width: "42px", height: "42px" }}
          />
        </button>
      </div>
    </div>
  );
}

function CampoCalculo({ label, valor, setValor }) {
  return (
    <label
      style={{
        display: "grid",
        gap: "6px",
        fontWeight: "700",
        fontSize: "15px"
      }}
    >
      {label}

      <input
        type="number"
        inputMode="decimal"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="0,00"
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          fontSize: "17px",
          boxSizing: "border-box"
        }}
      />
    </label>
  );
}


export default App;