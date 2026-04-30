
import React from "react";
import receitas from "./data/receitas.json";

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


  React.useEffect(() => {
    localStorage.setItem("progressoReceitas", JSON.stringify(progresso));
  }, [progresso]);

  React.useEffect(() => {
    localStorage.setItem("pontosUsuario", pontos);
  }, [pontos]);

  React.useEffect(() => {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}, [favoritos]);

  const irPara = (novaPagina) => {
    setPagina(novaPagina);
    setMenuAberto(false);
  };

  const abrirReceita = (receita) => {
    setReceitaSelecionada(receita);
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
    {/* CARROSSEL */}
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

    {/* GRID 2 COLUNAS */}
    <h2>Receitas</h2>

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
            <h2>Sobre</h2>

            {[
              {
                id: "sobre",
                titulo: "Sobre a Triarte",
                texto: `Bem-vindo ao Real Triarte 🧶✨


                Aqui você transforma fios em personagens incríveis com receitas de amigurumi organizadas, vídeos passo a passo e lista completa de materiais para facilitar cada etapa.

                Nosso objetivo é tornar o aprendizado simples, leve e acessível para todos — do iniciante ao avançado — sempre com carinho, criatividade e aquele toque artesanal que faz toda a diferença.

                Desde 2020, o Real Triarte já ajudou milhares de pessoas a aprender, criar e evoluir no mundo do amigurumi, transformando um hobby em paixão e, muitas vezes, em fonte de renda.

                Crie, aprenda e evolua com a gente 💛`
              },
              {
                id: "privacidade",
                titulo: "Política de Privacidade",
                texto: `Política de Privacidade – Real Triarte

                O aplicativo Real Triarte valoriza a privacidade dos usuários e se compromete a proteger suas informações.

                1. Coleta de Dados
                O aplicativo não coleta dados pessoais sensíveis diretamente, como nome, e-mail ou localização.

                Podemos armazenar dados localmente no dispositivo do usuário, como:
                - Progresso nas receitas
                - Receitas favoritas

                Esses dados são utilizados exclusivamente para melhorar a experiência dentro do aplicativo.

                2. Uso de Dados
                Os dados armazenados são utilizados para:
                - Salvar seu progresso nas receitas
                - Personalizar sua experiência no aplicativo
                - Facilitar o acesso às suas receitas favoritas

                3. Serviços de Terceiros
                O aplicativo pode conter links para serviços externos, como:
                - YouTube (para reprodução de vídeos)
                - Mercado Livre (para compra de materiais)

                Esses serviços possuem suas próprias políticas de privacidade, e não temos controle sobre a coleta ou uso de dados por essas plataformas.

                No futuro, o aplicativo poderá utilizar serviços de terceiros, como plataformas de anúncios (ex: Google AdMob), que podem coletar dados anônimos de uso e navegação.

                4. Armazenamento e Segurança
                Os dados do usuário são armazenados localmente no dispositivo e não são compartilhados com servidores externos pelo aplicativo.

                5. Controle do Usuário
                O usuário pode, a qualquer momento:
                - Limpar os dados do aplicativo nas configurações do dispositivo
                - Remover favoritos e progresso diretamente no app

                6. Alterações nesta Política
                Esta política pode ser atualizada a qualquer momento para refletir melhorias ou mudanças no aplicativo.

                7. Contato
                Em caso de dúvidas, entre em contato:
                📧 contato@triarte.com.br

                Ao utilizar o aplicativo, você concorda com esta Política de Privacidade.`
              },
              {
                id: "termos",
                titulo: "Termos de Uso",
                texto: `Ao utilizar o aplicativo Real Triarte, você concorda com os seguintes termos:

                  O conteúdo disponibilizado no aplicativo, incluindo receitas, vídeos e materiais, é destinado exclusivamente para uso pessoal e não comercial.

                  As receitas e vídeos podem estar hospedados em plataformas externas, como o YouTube, sendo de responsabilidade dessas plataformas o funcionamento e disponibilidade do conteúdo.

                  Não é permitida a reprodução, redistribuição ou comercialização do conteúdo sem autorização prévia.

                  O aplicativo pode conter links para sites externos, como Mercado Livre ou outras plataformas. Não nos responsabilizamos pelo conteúdo, políticas ou práticas desses serviços.

                  O uso do aplicativo é por sua conta e risco. Embora busquemos manter as informações atualizadas e corretas, não garantimos ausência de erros ou interrupções.

                  Reservamo-nos o direito de atualizar estes termos a qualquer momento, sem aviso prévio.

                  Ao continuar utilizando o aplicativo, você declara estar ciente e de acordo com estes termos.`
              },
              {
                id: "dados",
                titulo: "Política de Dados",
                texto: `Este aplicativo pode armazenar dados localmente no seu dispositivo, como progresso e receitas favoritas, com o objetivo de melhorar sua experiência.

                  Não coletamos dados pessoais sensíveis diretamente.

                  O aplicativo pode conter links externos (como YouTube e Mercado Livre) e, futuramente, poderá utilizar serviços de terceiros, como plataformas de anúncios. Esses serviços podem coletar dados anônimos, como informações de uso e navegação, de acordo com suas próprias políticas de privacidade.

                  Você pode, a qualquer momento, limpar os dados do aplicativo diretamente nas configurações do seu dispositivo.

                  Ao utilizar este aplicativo, você concorda com estas condições.`
              }
            ].map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  marginBottom: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                }}
              >
                {/* CABEÇALHO */}
                <div
                  onClick={() =>
                    setSobreAberto(sobreAberto === item.id ? null : item.id)
                  }
                  style={{
                    padding: "12px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  {item.titulo}
                </div>

                {/* CONTEÚDO */}
                {sobreAberto === item.id && (
                  <div style={{ padding: "12px", borderTop: "1px solid #eee" }}>
                    {item.id === "sobre" && (
                      <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <img
                          src="/images/logo/logo.png"
                          style={{ width: "80px", borderRadius: "50%" }}
                        />
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        textAlign: "justify",
                        lineHeight: "1.6"
                      }}
                    >
                      {item.texto}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* VERSÃO DO APP */}
            <div
              style={{
                marginTop: "20px",
                background: "#f2f2f2",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
                color: "#444"
              }}
            >
              <strong>Versão do App</strong>

              <p style={{ margin: "8px 0 4px", fontSize: "14px" }}>
                Real Triarte v1.0.0
              </p>

              <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                Lançamento oficial 2026
              </p>

              <p style={{ marginTop: "10px", fontSize: "12px", color: "#777" }}>
                Desenvolvido por Real Triarte • Brasil
              </p>

              <p style={{ fontSize: "12px", color: "#777" }}>
                Este aplicativo pode conter links externos e conteúdo incorporado do YouTube.
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
                <span>E-mail</span>
              </div>

              {/* SITE */}
              <div
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
                <span>Site</span>
              </div>

              {/* YOUTUBE */}
              <div
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