
import React from "react";
import receitas from "./data/receitas.json";
import mensagens from "./data/mensagens.json";

function App() {
  const [pagina, setPagina] = React.useState("home");
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = React.useState(null);


  
  const [buscaNome, setBuscaNome] = React.useState("");
  const [buscaCategoria, setBuscaCategoria] = React.useState("");

  const [indexCarrossel, setIndexCarrossel] = React.useState(0);
  const [receitasRandom, setReceitasRandom] = React.useState([]);

  const [favoritos, setFavoritos] = React.useState(() => {
  const salvo = localStorage.getItem("favoritos");
  return salvo ? JSON.parse(salvo) : [];
});
  
  const [sobreAberto, setSobreAberto] = React.useState(null);
  const [ultimaReceita, setUltimaReceita] = React.useState(null);
  const [mostrarContinuar, setMostrarContinuar] = React.useState(true);
  const [mensagemAtual, setMensagemAtual] = React.useState("");

  const [linha, setLinha] = React.useState(0);
  const [olhos, setOlhos] = React.useState(0);
  const [enchimento, setEnchimento] = React.useState(0);
  const [outros, setOutros] = React.useState(0);

  const [horas, setHoras] = React.useState(0);
  const [valorHora, setValorHora] = React.useState(0);

  const [margem, setMargem] = React.useState(100);
  const [calcular, setCalcular] = React.useState(false);

  const [progresso, setProgresso] = React.useState(() => {
    const salvo = localStorage.getItem("progressoReceitas");
    return salvo ? JSON.parse(salvo) : {};
  });

  const [pontos, setPontos] = React.useState(() => {
    return Number(localStorage.getItem("pontosUsuario")) || 0;
  });

  

const inputStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
  width: "100%",
  boxSizing: "border-box"
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  marginBottom: "4px",
  color: "#444"
};

const paragraphStyle = {
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.65",
  margin: "0 0 10px",
  textAlign: "left"
};

const sectionTitleStyle = {
  margin: "0 0 8px",
  fontSize: "15px",
  color: "#222"
};

const sectionBoxStyle = {
  background: "#fff",
  padding: "14px",
  borderRadius: "12px",
  marginBottom: "10px",
  border: "1px solid #eee"
};

const listStyle = {
  margin: "8px 0 12px 18px",
  padding: 0,
  color: "#555",
  fontSize: "14px",
  lineHeight: "1.7"
};

const infoHeaderStyle = {
  background: "#fff8cc",
  border: "1px solid #f0dd73",
  padding: "12px",
  borderRadius: "12px",
  marginBottom: "12px",
  display: "grid",
  gap: "4px",
  color: "#222",
  fontSize: "14px"
};

const contactBoxStyle = {
  background: "#fff",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #eee",
  textAlign: "center"
};

const emailButtonStyle = {
  marginTop: "10px",
  width: "100%",
  padding: "12px",
  background: "#ffd400",
  border: "none",
  borderRadius: "10px",
  fontWeight: "800",
  cursor: "pointer",
  color: "#222"
};

  React.useEffect(() => {
    localStorage.setItem("progressoReceitas", JSON.stringify(progresso));
  }, [progresso]);

  React.useEffect(() => {
    localStorage.setItem("pontosUsuario", pontos);
  }, [pontos]);

  React.useEffect(() => {
  const salva = localStorage.getItem("ultimaReceita");
  if (salva) {
    setUltimaReceita(JSON.parse(salva));
  }
}, []);

  React.useEffect(() => {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}, [favoritos]);

React.useEffect(() => {
  if (!mensagens.length) return;

  const tipo = pagina === "home" ? "boasvindas" : "dica";
  const filtradas = mensagens.filter((m) => m.tipo === tipo);
  const escolhida = filtradas[Math.floor(Math.random() * filtradas.length)];

  if (escolhida) {
    setMensagemAtual(escolhida.texto);
  }
}, [pagina]);


  const irPara = (novaPagina) => {
    setPagina(novaPagina);
    setMenuAberto(false);
  };

  const abrirReceita = (receita) => {
    setReceitaSelecionada(receita);
    localStorage.setItem("ultimaReceita", JSON.stringify(receita))
    setPagina("receita");
  };

  const toggleFavorito = (id) => {
    setFavoritos((anterior) =>
      anterior.includes(id)
        ? anterior.filter((f) => f !== id)
        : [...anterior, id]
    );
  };

  const marcarVideo = (receitaId, index) => {
    setProgresso((anterior) => {
      const vistos = anterior[receitaId]?.vistos || [];
      const jaViu = vistos.includes(index);

      if (!jaViu) setPontos((p) => p + 1);

      const novos = jaViu
        ? vistos.filter((i) => i !== index)
        : [...vistos, index];

      return {
        ...anterior,
        [receitaId]: { vistos: novos }
      };
    });
  };

  const percentual = (receita) => {
    const vistos = progresso[receita.id]?.vistos?.length || 0;
    const total = receita.videos?.length || 0;
    return total === 0 ? 0 : Math.round((vistos / total) * 100);
  };

  const receitasAtivas = receitas.filter((r) => r.ativo);
  const hoje = new Date();

	const receitasDestaque = receitasAtivas.filter((r) => {
	  if (!r.destaqueInicio || !r.destaqueFim) return false;

	  const inicio = new Date(r.destaqueInicio);
	  const fim = new Date(r.destaqueFim);

	  return hoje >= inicio && hoje <= fim;
	});

    React.useEffect(() => {
      const lista = receitasAtivas
        .filter((r) => !receitasDestaque.includes(r))
        .sort(() => Math.random() - 0.5);

      setReceitasRandom(lista);
    }, []);


  React.useEffect(() => {
  if (receitasDestaque.length === 0) return;


  const intervalo = setInterval(() => {
    setIndexCarrossel((i) =>
      i === receitasDestaque.length - 1 ? 0 : i + 1
    );
  }, 6000);

  return () => clearInterval(intervalo);
}, [receitasDestaque]);
  
  const categorias = [...new Set(receitasAtivas.map((r) => r.categoria))];

  const receitasFiltradas = receitasAtivas.filter((r) => {
    const nome = buscaNome.toLowerCase();

    return (
      (nome.length < 3 || r.nome.toLowerCase().includes(nome)) &&
      (buscaCategoria === "" || r.categoria === buscaCategoria)
    );
  });

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
        color: "#222"
      }}
    >
      <img src={icone} style={{ width: "34px", height: "34px" }} />
      {texto}
    </button>
  );

		  const CardReceita = ({ receita }) => (
		  <div
			onClick={() => abrirReceita(receita)}
			style={{
			  background: "#fff",
			  borderRadius: "14px",
			  overflow: "hidden",
			  boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
			  cursor: "pointer"
			}}
		  >
			<div style={{ position: "relative" }}>
  <img
    src={receita.imagem}
    alt={receita.nome}
    style={{
      width: "100%",
      height: "140px",
      objectFit: "cover"
    }}
  />

  {/* BOTÃO FAVORITO */}
  <div
    onClick={(e) => {
      e.stopPropagation();
      toggleFavorito(receita.id);
    }}
    style={{
      position: "absolute",
      top: "8px",
      right: "8px",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.85)",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }}
  >
    <img
      src={
        favoritos.includes(receita.id)
          ? "/images/icons/favoritos.png"
          : "/images/icons/favoritos2.png"
      }
      style={{ width: "26px" }}
    />
  </div>
</div>

			<div style={{ padding: "12px" }}>
			  <strong style={{ fontSize: "15px" }}>
				{receita.nome}
			  </strong>

			  <p style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
				{receita.categoria}
			  </p>

			  {/* BARRA DE PROGRESSO */}
			  <div
				style={{
				  width: "100%",
				  height: "6px",
				  background: "#e0e0e0",
				  borderRadius: "6px",
				  overflow: "hidden"
				}}
			  >
				<div
				  style={{
					width: `${percentual(receita)}%`,
					height: "100%",
					background: "#ffd400"
				  }}
				/>
			  </div>

			  <p style={{ fontSize: "12px", marginTop: "4px", color: "#444" }}>
				{percentual(receita)}% concluído
			  </p>
			</div>
		  </div>
		);

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

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#f5f5f5"
      }}
    >
      {menuAberto && (
        <div
          onClick={() => setMenuAberto(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "75%",
              height: "100%",
              background: "#fff",
              padding: "20px"
            }}
          >
            {menuItem("/images/icons/home.png", "Home", "home")}
            {menuItem("/images/icons/receitas.png", "Receitas", "receitas")}
            {menuItem("/images/icons/favoritos.png", "Favoritos", "favoritos")}
            {menuItem("/images/icons/busca.png", "Busca", "busca")}
            {menuItem("/images/icons/calculo.png", "Simulador", "simulador")}
            {menuItem("/images/icons/conquistas.png", "Progresso", "progresso")}
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
          width: "100%",
          maxWidth: "430px",
          zIndex: 1000,

          background: "#fff",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
        }}
      >
        {/* LOGO ESQUERDA */}
        <img
          onClick={() => irPara("sobre")}
          src="/images/logo/logo.png"
          alt="Logo"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            cursor: "pointer"
          }}

        />

        {/* TEXTO CENTRAL */}
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "700",
            color: "#222",
            textAlign: "center",
            flex: 1
          }}
        >
          Real Triarte
        </h2>

        {/* MENU DIREITA */}
        <button
          onClick={() => setMenuAberto(true)}
          style={{
            background: "transparent",
            border: "none",
            padding: 0
          }}
        >
          <img
            src="/images/icons/menu.png"
            style={{
              width: "48px",
              height: "48px"
            }}
          />
        </button>
      </div>

      <div style={{ padding: "80px 15px 90px" }}>
       {pagina === "home" && (
               
  
<>
{/* BLOCO DE BOAS-VINDAS */}
<div
  style={{
    background: "linear-gradient(135deg, #ffd400, #fff3a0)",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
  }}
>
  <p
    style={{
      margin: "0 0 4px",
      fontSize: "13px",
      fontWeight: "700",
      color: "#5a4a00"
    }}
  >
    {mensagemAtual || "Bem-vindo ao Real Triarte 🧶"}
  </p>

  <h2
    style={{
      margin: "0 0 8px",
      fontSize: "22px",
      lineHeight: "1.2",
      color: "#222"
    }}
  >
    Aprenda amigurumi com receitas organizadas
  </h2>

  <p
    style={{
      margin: 0,
      fontSize: "14px",
      color: "#444",
      lineHeight: "1.5"
    }}
  >
    Acompanhe vídeos passo a passo, salve favoritos e continue sua evolução no artesanato.
  </p>
</div>

{ultimaReceita && mostrarContinuar && (
  <div
    onClick={() => {
      setReceitaSelecionada(ultimaReceita);
      setMostrarContinuar(false);
      setPagina("receita");
    }}
    style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "16px",
      marginBottom: "16px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
      cursor: "pointer"
    }}
  >
    <p style={{ margin: "0 0 8px", fontWeight: "700", color: "#222" }}>
      Continuar de onde parei 👇
    </p>

    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <img
        src={ultimaReceita.imagem}
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "10px",
          objectFit: "cover"
        }}
      />

      <div>
        <strong style={{ fontSize: "14px" }}>
          {ultimaReceita.nome}
        </strong>
        <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
          Toque para continuar
        </p>
      </div>
    </div>
  </div>
)}


    {/* CARROSSEL */}
    {receitasDestaque.length > 0 && (
  <div style={{ marginBottom: "20px" }}>
    <div
      onClick={() => abrirReceita(receitasDestaque[indexCarrossel])}
    style={{
      position: "relative",
      borderRadius: "16px",
      overflow: "hidden",
      cursor: "pointer"
    }}
  >
    {/* IMAGEM */}
    <img
      src={receitasDestaque[indexCarrossel].imagem}
      style={{
        width: "100%",
        height: "200px",
        objectFit: "cover"
      }}
    />

    {/* OVERLAY ESCURO */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))"
      }}
    />

    {/* TEXTO */}
    <div
      style={{
        position: "absolute",
        bottom: "12px",
        left: "12px",
        right: "12px",
        color: "#fff"
      }}
    >
      <strong style={{ fontSize: "18px" }}>
        {receitasDestaque[indexCarrossel].nome}
      </strong>

      <p style={{ margin: "4px 0", fontSize: "13px" }}>
        Toque para assistir a receita
      </p>

      {/* BARRA */}
      <div
        style={{
          marginTop: "6px",
          width: "100%",
          height: "6px",
          background: "rgba(255,255,255,0.3)",
          borderRadius: "6px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${percentual(receitasDestaque[indexCarrossel])}%`,
            height: "100%",
            background: "#ffd400"
          }}
        />
      </div>

      <span style={{ fontSize: "11px" }}>
        {percentual(receitasDestaque[indexCarrossel])}% concluído
      </span>
    </div>


    {/* FAVORITO NO CARROSSEL */}
    <div
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorito(receitasDestaque[indexCarrossel].id);
      }}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.85)",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
    >
      <img
        src={
          favoritos.includes(receitasDestaque[indexCarrossel].id)
            ? "/images/icons/favoritos.png"
            : "/images/icons/favoritos2.png"
        }
        style={{ width: "28px" }}
      />
    </div>



    {/* BOTÕES */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIndexCarrossel((i) =>
          i === 0 ? receitasDestaque.length - 1 : i - 1
        );
      }}
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        background: "#ffd400",
        border: "none",
        borderRadius: "50%",
        width: "36px",
        height: "36px"
      }}
    >
      ‹
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        setIndexCarrossel((i) =>
          i === receitasDestaque.length - 1 ? 0 : i + 1
        );
      }}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        background: "#ffd400",
        border: "none",
        borderRadius: "50%",
        width: "36px",
        height: "36px"
      }}
    >
      ›
    </button>
  </div>
</div>
)}

{/* GRID 2 COLUNAS */}
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "18px 0 10px"
  }}
>
  <h2 style={{ margin: 0 }}>Receitas</h2>

  <button
    onClick={() => irPara("receitas")}
    style={{
      background: "transparent",
      border: "none",
      color: "#555",
      fontWeight: "700",
      cursor: "pointer"
    }}
  >
    Ver todas
  </button>
</div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px"
      }}
    >
      {receitasRandom.map((r) => (
        <CardReceita key={r.id} receita={r} />
      ))}
    </div>
  </>
)}

        {pagina === "receitas" && (
          <>
            <h2>Todas as receitas</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px"
              }}
            >
              {receitasAtivas.map((r) => (
                <CardReceita key={r.id} receita={r} />
              ))}
            </div>
          </>
        )}

        {pagina === "busca" && (
          <>
            <h2>Buscar</h2>

            <input
              placeholder="Digite o nome..."
              value={buscaNome}
              onChange={(e) => setBuscaNome(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxSizing: "border-box"
              }}
            />

            <select
              value={buscaCategoria}
              onChange={(e) => setBuscaCategoria(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #ddd"
              }}
            >
              <option value="">Todas as categorias</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px"
                }}
              >
              {receitasFiltradas.map((r) => (
                <CardReceita key={r.id} receita={r} />
              ))}
            </div>
          </>
        )}

        {pagina === "favoritos" && (
        <>
          <h2>Minhas receitas favoritas</h2>

          {receitasAtivas.filter((r) => favoritos.includes(r.id)).length === 0 ? (
            <div
              style={{
                marginTop: "20px",
                background: "#fff",
                padding: "30px 20px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
              }}
            >
              <img
                src="/images/icons/favoritos2.png"
                style={{
                  width: "70px",
                  opacity: 0.6,
                  marginBottom: "12px"
                }}
              />

              <h3 style={{ margin: "10px 0 5px" }}>
                Nenhuma receita favorita ainda
              </h3>

              <p style={{ color: "#666", fontSize: "14px" }}>
                Toque no coração das receitas para salvar suas favoritas aqui.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px"
              }}
            >
              {receitasAtivas
                .filter((r) => favoritos.includes(r.id))
                .map((r) => (
                  <CardReceita key={r.id} receita={r} />
                ))}
            </div>
          )}
        </>
      )}


        {pagina === "receita" && receitaSelecionada && (
          <div>
            <button onClick={() => irPara("home")}>← Voltar</button>

            <img
              src={receitaSelecionada.imagem}
              alt={receitaSelecionada.nome}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "14px",
                marginTop: "12px"
              }}
            />

            <h2>{receitaSelecionada.nome}</h2>
            <p>{receitaSelecionada.descricao}</p>

            <button
              onClick={() => irPara("materiais")}
              style={{
                width: "100%",
                padding: "14px",
                background: "#ffd400",
                border: "none",
                borderRadius: "12px",
                fontWeight: "800"
              }}
            >
              Ver materiais
            </button>

            <div style={{ margin: "15px 0" }}>
              <div style={{ margin: "15px 0" }}>
				  <strong>{percentual(receitaSelecionada)}% concluído</strong>

				  <div
					style={{
					  marginTop: "8px",
					  width: "100%",
					  height: "10px",
					  background: "#ddd",
					  borderRadius: "10px",
					  overflow: "hidden"
					}}
				  >
					<div
					  style={{
						width: `${percentual(receitaSelecionada)}%`,
						height: "100%",
						background: "#35a853",
						transition: "0.3s"
					  }}
					/>
				  </div>
				</div>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              {receitaSelecionada.videos.map((video, index) => {
                const visto =
                  progresso[receitaSelecionada.id]?.vistos?.includes(index);

                return (
                  <div
                    key={index}
                    style={{
                      background: "#fff",
                      border: "1px solid #ddd",
                      padding: "12px",
                      borderRadius: "12px"
                    }}
                  >
                    <strong>
                      {visto ? "✅" : "▶"} {video.titulo}
                    </strong>

                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.youtube.com/watch?v=${video.youtubeId}`,
                            "_blank"
                          )
                        }
                        style={{
                          flex: 1,
                          padding: "12px",
                          background: "#ffd400",
                          border: "none",
                          borderRadius: "10px",
                          fontWeight: "700"
                        }}
                      >
                        Assistir no YouTube
                      </button>

                      <button
                        onClick={() => marcarVideo(receitaSelecionada.id, index)}
                        style={{
                          width: "60px",
                          background: visto ? "#35a853" : "#ddd",
                          border: "none",
                          borderRadius: "10px",
                          fontWeight: "700"
                        }}
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {pagina === "materiais" && receitaSelecionada && (
          <div>
            <button onClick={() => irPara("receita")}>← Voltar para receita</button>

            <h2>Materiais</h2>

            <p style={{ color: "#666", lineHeight: "1.5" }}>
              Compre os materiais pelo nosso link do Mercado Livre e ajude o
              Real Triarte a continuar criando receitas gratuitas 🧶
            </p>

            <h3>Linhas</h3>

            <div style={{ display: "grid", gap: "8px" }}>
              {(receitaSelecionada.materiais?.linhas || []).map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#fff8cc",
                    padding: "12px",
                    borderRadius: "10px",
                    fontWeight: "700"
                  }}
                >
                  🧶 {item}
                </div>
              ))}
            </div>

            <h3>Outros materiais</h3>

            <div style={{ display: "grid", gap: "8px" }}>
              {(receitaSelecionada.materiais?.itens || []).map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#fff",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ddd"
                  }}
                >
                  ✔ {item}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(listaMateriaisTexto());
                alert("Lista de materiais copiada!");
              }}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "14px",
                background: "#333",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontWeight: "800"
              }}
            >
              Copiar lista de materiais
            </button>

            <button
              onClick={() =>
                window.open("https://mercadolivre.com/sec/1AW2X78", "_blank")
              }
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "14px",
                background: "#ffd400",
                border: "none",
                borderRadius: "12px",
                fontWeight: "800"
              }}
            >
              Comprar no Mercado Livre
            </button>
          </div>
        )}


        {pagina === "sobre" && (
          <>
            <h2 style={{ marginBottom: "6px" }}>Quem Somos</h2>

            <p style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>
              Conheça o Real Triarte, nossa missão e as informações oficiais do aplicativo.
            </p>

            {[
              {
                id: "quemSomos",
                titulo: "Quem Somos",
                conteudo: (
                  <div>
                    <div style={{ textAlign: "center", marginBottom: "18px" }}>
                      <img
                        src="/images/logo/logo.png"
                        alt="Real Triarte"
                        style={{
                          width: "96px",
                          height: "96px",
                          borderRadius: "50%",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                        }}
                      />

                      <h3 style={{ margin: "12px 0 4px", color: "#222" }}>
                        Real Triarte
                      </h3>

                      <p style={{ margin: 0, fontSize: "13px", color: "#777" }}>
                        Amigurumi com carinho, criatividade e passo a passo organizado.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>Nossa história</h4>
                      <p style={paragraphStyle}>
                        O Real Triarte nasceu para compartilhar receitas de amigurumi de forma
                        simples, acessível e acolhedora.
                      </p>

                      <p style={paragraphStyle}>
                        Desde 2020, ajudamos pessoas apaixonadas por artesanato a aprender,
                        praticar e evoluir no mundo do amigurumi.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>O que você encontra aqui</h4>
                      <ul style={listStyle}>
                        <li>Receitas organizadas por personagem e categoria</li>
                        <li>Vídeos passo a passo no YouTube</li>
                        <li>Lista de materiais</li>
                        <li>Favoritos para salvar suas receitas preferidas</li>
                        <li>Progresso para acompanhar sua evolução</li>
                        <li>Simulador de preço para venda de amigurumi</li>
                      </ul>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>Nossa missão</h4>
                      <p style={paragraphStyle}>
                        Tornar o aprendizado do amigurumi mais leve, prático e organizado,
                        ajudando cada pessoa a transformar fios em peças cheias de encanto.
                      </p>
                    </div>

                    <div
                      style={{
                        background: "#fff8cc",
                        padding: "14px",
                        borderRadius: "12px",
                        border: "1px solid #f0dd73",
                        textAlign: "center"
                      }}
                    >
                      <strong style={{ color: "#222" }}>
                        Obrigado por fazer parte da comunidade Real Triarte 💛
                      </strong>
                    </div>
                  </div>
                )
              },

              {
                id: "privacidade",
                titulo: "Política de Privacidade",
                conteudo: (
                  <div>
                    <div style={infoHeaderStyle}>
                      <strong>Política de Privacidade</strong>
                      <span>Última atualização: 2026</span>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>1. Coleta de dados</h4>
                      <p style={paragraphStyle}>
                        O aplicativo Real Triarte não coleta dados pessoais sensíveis,
                        como nome, telefone, e-mail ou localização.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>2. Dados armazenados no dispositivo</h4>
                      <p style={paragraphStyle}>
                        O app pode salvar algumas informações localmente no seu aparelho:
                      </p>

                      <ul style={listStyle}>
                        <li>Progresso nas receitas</li>
                        <li>Receitas favoritas</li>
                        <li>Pontuação e evolução dentro do aplicativo</li>
                      </ul>

                      <p style={paragraphStyle}>
                        Esses dados ficam apenas no dispositivo do usuário e não são
                        enviados para servidores externos.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>3. Uso das informações</h4>
                      <p style={paragraphStyle}>
                        As informações armazenadas localmente são utilizadas apenas para
                        melhorar a experiência dentro do aplicativo.
                      </p>

                      <ul style={listStyle}>
                        <li>Salvar seu progresso</li>
                        <li>Manter suas receitas favoritas</li>
                        <li>Personalizar sua navegação</li>
                      </ul>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>4. Serviços de terceiros</h4>
                      <p style={paragraphStyle}>
                        O aplicativo pode conter links para plataformas externas:
                      </p>

                      <ul style={listStyle}>
                        <li>YouTube</li>
                        <li>Mercado Livre</li>
                        <li>Redes sociais</li>
                      </ul>

                      <p style={paragraphStyle}>
                        Ao acessar esses serviços, você estará sujeito às políticas de
                        privacidade de cada plataforma.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>5. Controle do usuário</h4>
                      <p style={paragraphStyle}>
                        O usuário pode limpar os dados do aplicativo a qualquer momento
                        pelas configurações do navegador ou do dispositivo.
                      </p>
                    </div>

                    <div style={contactBoxStyle}>
                      <strong>Dúvidas sobre privacidade?</strong>
                      <button
                        onClick={() =>
                          (window.location.href = "mailto:contato@triarte.com.br")
                        }
                        style={emailButtonStyle}
                      >
                        📧 contato@triarte.com.br
                      </button>
                    </div>
                  </div>
                )
              },

              {
                id: "termos",
                titulo: "Termos de Uso",
                conteudo: (
                  <div>
                    <div style={infoHeaderStyle}>
                      <strong>Termos de Uso</strong>
                      <span>Última atualização: 2026</span>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>1. Uso do aplicativo</h4>
                      <p style={paragraphStyle}>
                        O Real Triarte é destinado ao aprendizado, organização e
                        acompanhamento de receitas de amigurumi.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>2. Conteúdo</h4>
                      <p style={paragraphStyle}>
                        O aplicativo pode reunir receitas, listas de materiais, vídeos,
                        links externos e ferramentas de apoio ao artesanato.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>3. Uso pessoal</h4>
                      <p style={paragraphStyle}>
                        O conteúdo disponibilizado é voltado para uso pessoal e
                        educacional. Não é permitida a redistribuição ou revenda sem
                        autorização.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>4. Links externos</h4>
                      <p style={paragraphStyle}>
                        O app pode direcionar o usuário para serviços externos, como
                        YouTube, Mercado Livre e redes sociais. O Real Triarte não se
                        responsabiliza pelas políticas ou funcionamento dessas plataformas.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>5. Alterações</h4>
                      <p style={paragraphStyle}>
                        O aplicativo e estes termos podem ser atualizados a qualquer
                        momento para melhorias, correções ou ajustes de conteúdo.
                      </p>
                    </div>
                  </div>
                )
              },

              {
                id: "dados",
                titulo: "Política de Dados",
                conteudo: (
                  <div>
                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>Dados locais</h4>
                      <p style={paragraphStyle}>
                        O aplicativo utiliza armazenamento local para salvar progresso,
                        favoritos e pontuação.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>Sem cadastro obrigatório</h4>
                      <p style={paragraphStyle}>
                        O app não exige criação de conta, senha ou envio de dados
                        pessoais para funcionar.
                      </p>
                    </div>

                    <div style={sectionBoxStyle}>
                      <h4 style={sectionTitleStyle}>Serviços externos</h4>
                      <p style={paragraphStyle}>
                        Ao acessar links externos, como YouTube, Mercado Livre ou redes
                        sociais, o usuário passa a seguir as regras dessas plataformas.
                      </p>
                    </div>
                  </div>
                )
              },

              {
                id: "aviso",
                titulo: "Aviso Legal",
                conteudo: (
                  <div>
                    <div style={sectionBoxStyle}>
                      <p style={paragraphStyle}>
                        O Real Triarte apresenta criações artesanais e conteúdos
                        inspirados no universo do amigurumi e da cultura pop.
                      </p>

                      <p style={paragraphStyle}>
                        Este aplicativo não possui vínculo oficial, licença, parceria ou
                        associação com marcas, empresas, personagens ou franquias
                        eventualmente citadas ou referenciadas.
                      </p>

                      <p style={paragraphStyle}>
                        Todas as marcas pertencem aos seus respectivos proprietários.
                      </p>
                    </div>
                  </div>
                )
              }
            ].map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  marginBottom: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "1px solid #eee"
                }}
              >
                <div
                  onClick={() =>
                    setSobreAberto(sobreAberto === item.id ? null : item.id)
                  }
                  style={{
                    padding: "15px",
                    fontWeight: "800",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#222"
                  }}
                >
                  <span>{item.titulo}</span>
                  <span style={{ fontSize: "20px", color: "#999" }}>
                    {sobreAberto === item.id ? "−" : "+"}
                  </span>
                </div>

                {sobreAberto === item.id && (
                  <div
                    style={{
                      padding: "14px",
                      borderTop: "1px solid #eee",
                      background: "#fafafa"
                    }}
                  >
                    {item.conteudo}
                  </div>
                )}
              </div>
            ))}

            <div
              style={{
                marginTop: "20px",
                background: "#222",
                color: "#fff",
                padding: "18px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
              }}
            >
              <strong style={{ fontSize: "15px" }}>Versão do App</strong>

              <p style={{ margin: "8px 0 4px", fontSize: "14px" }}>
                Real Triarte v1.0.0
              </p>

              <p style={{ margin: 0, fontSize: "12px", color: "#ddd" }}>
                Desenvolvido por Real Triarte • Brasil
              </p>

              <p style={{ marginTop: "10px", fontSize: "12px", color: "#ccc" }}>
                App educacional de apoio ao aprendizado de amigurumi.
              </p>
            </div>
          </>
        )}

        {pagina === "contato" && (
          <>
            <h2 style={{ marginBottom: "5px" }}>Contato</h2>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "15px"
              }}
            >
              Entre em contato ou acesse nossas redes:
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
              
              {/* EMAIL */}
              <div
                onClick={() => window.location.href = "mailto:contato@triarte.com.br"}
                style={{
                  background: "#fff",
                  padding: "14px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer"
                }}
              >
                <img src="/images/icons/email.png" style={{ width: "32px" }} />
                <span>contato@triarte.com.br</span>
              </div>

              {/* SITE */}
              <div
                onClick={() => window.open("https://triarte.com.br", "_blank")}
                style={{
                  background: "#fff",
                  padding: "14px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer"
                }}
              >
                <img src="/images/icons/site.png" style={{ width: "32px" }} />
                <span>Site Oficial</span>
              </div>

              {/* YOUTUBE */}
              <div
                onClick={() => window.open("https://www.youtube.com/@RealTriarte", "_blank")}
                style={{
                  background: "#fff",
                  padding: "14px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer"
                }}
              >
                <img src="/images/icons/youtube.png" style={{ width: "32px" }} />
                <span>YouTube</span>
              </div>

              {/* INSTAGRAM */}
             <div
              onClick={() => window.open("https://instagram.com/realtriarte", "_blank")}
              style={{
                  background: "#fff",
                  padding: "14px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer"
                }}
            >
              <img src="/images/icons/instagram.png" style={{ width: "32px" }} />
              <span>Instagram</span>
            </div>

              {/* FACEBOOK */}
              <div
                onClick={() => window.open("https://www.facebook.com/realtriarteartesanato", "_blank")}
                style={{
                  background: "#fff",
                  padding: "14px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer"
                }}
              >
                <img src="/images/icons/facebook.png" style={{ width: "32px" }} />
                <span>Facebook</span>
              </div>

             {/* TIKTOK */}
            <div
              onClick={() => window.open("https://www.tiktok.com/@triarteamigurumi", "_blank")}
              style={{
                background: "#fff",
                padding: "14px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer"
              }}
            >
              <img src="/images/icons/tiktok.png" style={{ width: "32px" }} />
              <span>TikTok</span>
            </div>

            </div>
          </>
        )}

          {pagina === "progresso" && (
            <>
              <h2>Meu Progresso</h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "15px"
                }}
              >
                Continue evoluindo e desbloqueie novas conquistas 🧶✨
              </p>


              {/* RESUMO */}
              <div
                style={{
                  background: "#fff",
                  padding: "16px",
                  borderRadius: "14px",
                  marginBottom: "15px",
                  textAlign: "center"
                }}
              >
                <img src="/images/icons/pontos.png" style={{ width: "60px" }} />

                <h3 style={{ margin: "10px 0 5px" }}>
                  {pontos} pontos
                </h3>

                <p style={{ color: "#666", fontSize: "14px" }}>
                  Nível {Math.floor(pontos / 500) + 1}
                </p>
              </div>

              {/* GRID DE STATUS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px"
                }}
              >
                {/* RECEITAS CONCLUÍDAS */}
                <div
                  style={{
                    background: "#fff",
                    padding: "14px",
                    borderRadius: "12px",
                    textAlign: "center"
                  }}
                >
                  <img src="/images/icons/receitasprontas.png" style={{ width: "40px" }} />
                  <p style={{ marginTop: "8px", fontWeight: "600" }}>
                    {receitasAtivas.filter(r => percentual(r) === 100).length}
                  </p>
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    Concluídas
                  </p>
                </div>

                {/* EM ANDAMENTO */}
                <div
                  style={{
                    background: "#fff",
                    padding: "14px",
                    borderRadius: "12px",
                    textAlign: "center"
                  }}
                >
                  <img src="/images/icons/receitas.png" style={{ width: "40px" }} />
                  <p style={{ marginTop: "8px", fontWeight: "600" }}>
                    {receitasAtivas.filter(r => percentual(r) > 0 && percentual(r) < 100).length}
                  </p>
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    Em andamento
                  </p>
                </div>

                {/* MEDALHAS */}
                <div
                  style={{
                    background: "#fff",
                    padding: "14px",
                    borderRadius: "12px",
                    textAlign: "center"
                  }}
                >
                  <img src="/images/icons/medalhas.png" style={{ width: "40px" }} />
                  <p style={{ marginTop: "8px", fontWeight: "600" }}>
                    {Math.floor(pontos / 500)}
                  </p>
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    Medalhas
                  </p>
                </div>

                {/* COMPARTILHAR */}
                <div
                  onClick={() => {
                  const texto = `🧶 Meu progresso no Real Triarte!

                  ⭐ Pontos: ${pontos}
                  🏆 Nível: ${Math.floor(pontos / 500) + 1}

                  📚 Receitas concluídas: ${receitasAtivas.filter(r => percentual(r) === 100).length}
                  🧵 Em andamento: ${receitasAtivas.filter(r => percentual(r) > 0 && percentual(r) < 100).length}
                  🏅 Medalhas: ${Math.floor(pontos / 500)}

                  🎯 Faltam ${500 - (pontos % 500)} pontos para o próximo nível!

                  💛 Estou evoluindo no amigurumi todos os dias!

                  Aprenda também:
                  https://real.triarte.com.br`;

                    if (navigator.share) {
                      navigator.share({
                        title: "Meu progresso no Real Triarte",
                        text: texto
                      });
                    } else {
                      navigator.clipboard.writeText(texto);
                      alert("Texto copiado para compartilhar!");
                    }
                  }}
                  style={{
                    background: "#fff",
                    padding: "14px",
                    borderRadius: "12px",
                    textAlign: "center",
                    cursor: "pointer"
                  }}
                >
                  <img src="/images/icons/compartilhar.png" style={{ width: "40px" }} />
                  <p style={{ marginTop: "8px", fontWeight: "600" }}>
                    Compartilhar
                  </p>
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    Conquista
                  </p>
                </div>
              </div>

              {/* META */}
              <div
                style={{
                  marginTop: "15px",
                  background: "#fff",
                  padding: "14px",
                  borderRadius: "12px",
                  textAlign: "center"
                }}
              >
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Faltam{" "}
                  <strong>{500 - (pontos % 500)}</strong>{" "}
                  pontos para o próximo nível
                </p>
              </div>
            </>
          )}

          {pagina === "simulador" && (
  <>
    {/* TÍTULO */}
    <h2 style={{ marginBottom: "5px" }}>Simulador de Preço</h2>

    <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
      Descubra o valor ideal para vender seu amigurumi 🧶
    </p>

    {/* BLOCO MATERIAIS */}
    <div style={{
      background: "#fff",
      padding: "14px",
      borderRadius: "14px",
      marginBottom: "12px"
    }}>
      <strong>Materiais</strong>

      <div style={{ display: "grid", gap: "8px", marginTop: "10px" }}>
        <div>
  <p style={labelStyle}>Linha utilizada (R$)</p>
  <input style={inputStyle} placeholder="Ex: 12.00" type="number" value={linha} onChange={e => setLinha(Number(e.target.value))} />
</div>
        <div>
  <p style={labelStyle}>Olhos / acessórios (R$)</p>
  <input style={inputStyle} placeholder="Ex: 5.00" type="number" value={olhos} onChange={e => setOlhos(Number(e.target.value))} />
</div>
        <div>
  <p style={labelStyle}>Enchimento (R$)</p>
  <input style={inputStyle} placeholder="Ex: 4.00" type="number" value={enchimento} onChange={e => setEnchimento(Number(e.target.value))} />
</div>
        <div>
  <p style={labelStyle}>Outros custos (R$)</p>
  <input style={inputStyle} placeholder="Ex: embalagem, cola..." type="number" value={outros} onChange={e => setOutros(Number(e.target.value))} />
</div>
      </div>
    </div>

    {/* BLOCO TRABALHO */}
    <div style={{
      background: "#fff",
      padding: "14px",
      borderRadius: "14px",
      marginBottom: "12px"
    }}>
      <strong>Mão de obra</strong>

      <div style={{ display: "grid", gap: "8px", marginTop: "10px" }}>
        <div>
  <p style={labelStyle}>Horas para produzir</p>
  <input style={inputStyle} placeholder="Ex: 3" type="number" value={horas} onChange={e => setHoras(Number(e.target.value))} />
</div>
        <div>
  <p style={labelStyle}>Valor por hora (R$)</p>
  <input style={inputStyle} placeholder="Ex: 10.00" type="number" value={valorHora} onChange={e => setValorHora(Number(e.target.value))} />
</div>
      </div>
    </div>

    {/* BLOCO LUCRO */}
    <div style={{
      background: "#fff",
      padding: "14px",
      borderRadius: "14px",
      marginBottom: "12px"
    }}>
      <strong>Lucro</strong>

      <div>
        <p style={labelStyle}>Margem de lucro (%)</p>
        <input
          style={inputStyle}
          placeholder="Ex: 100"
          type="number"
          value={margem}
          onChange={e => setMargem(Number(e.target.value))}
        />
      </div>
      </div>

    {/* BOTÃO */}
    <button
      onClick={() => setCalcular(true)}
      style={{
        width: "100%",
        padding: "14px",
        background: "#ffd400",
        border: "none",
        borderRadius: "12px",
        fontWeight: "800",
        fontSize: "16px",
        marginTop: "5px"
      }}
    >
      Calcular preço
    </button>

    {/* RESULTADO */}
    {calcular && (
      <div style={{
        marginTop: "15px",
        background: "#fff",
        padding: "16px",
        borderRadius: "14px"
      }}>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Materiais: <strong>R$ {(linha + olhos + enchimento + outros).toFixed(2)}</strong>
        </p>

        <p style={{ fontSize: "14px", color: "#666" }}>
          Mão de obra: <strong>R$ {(horas * valorHora).toFixed(2)}</strong>
        </p>

        <p style={{ fontSize: "15px", marginTop: "5px" }}>
          <strong>Custo total: R$ {(linha + olhos + enchimento + outros + (horas * valorHora)).toFixed(2)}</strong>
        </p>

        <div style={{
          marginTop: "12px",
          padding: "12px",
          background: "#fff8cc",
          borderRadius: "10px",
          textAlign: "center"
        }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
            Preço sugerido
          </p>

          <p style={{
            margin: "5px 0 0",
            fontSize: "22px",
            fontWeight: "800",
            color: "#222"
          }}>
            R$ {((linha + olhos + enchimento + outros + (horas * valorHora)) * (1 + margem / 100)).toFixed(2)}
          </p>
        </div>
      </div>
    )}
  </>
)}


      </div>
      {/* MENU INFERIOR */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "430px",
          height: "70px",
          background: "#333",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          zIndex: 1000
        }}
      >
        <button
          onClick={() => irPara("home")}
          style={{ background: "transparent", border: "none" }}
        >
          <img src="/images/icons/home.png" style={{ width: "40px" }} />
        </button>

        <button
          onClick={() => irPara("favoritos")}
          style={{ background: "transparent", border: "none" }}
        >
          <img src="/images/icons/favoritos.png" style={{ width: "40px" }} />
        </button>

        <button
          onClick={() => irPara("busca")}
          style={{ background: "transparent", border: "none" }}
        >
          <img src="/images/icons/busca.png" style={{ width: "40px" }} />
        </button>
      </div>
    </div>
  );
}

export default App;