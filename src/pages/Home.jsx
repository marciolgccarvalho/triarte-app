import React from "react";
import CardReceita from "../components/CardReceita";

export default function Home({
  mensagemAtual,
  ultimaReceita,
  receitas = [],
  receitasRandom = [],
  abrirReceita,
  percentual,
  toggleFavorito,
  favoritos = []
}) {
  const [indexCarrossel, setIndexCarrossel] = React.useState(0);

  const hoje = new Date();

  const receitasDestaque = (receitas || []).filter((r) => {
    if (!r.destaqueInicio || !r.destaqueFim) return false;

    const inicio = new Date(r.destaqueInicio);
    const fim = new Date(r.destaqueFim);

    return hoje >= inicio && hoje <= fim;
  });

  // AUTO PLAY CARROSSEL
  React.useEffect(() => {
    if (receitasDestaque.length === 0) return;

    const intervalo = setInterval(() => {
      setIndexCarrossel((i) =>
        i === receitasDestaque.length - 1 ? 0 : i + 1
      );
    }, 6000);

    return () => clearInterval(intervalo);
  }, [receitasDestaque]);

  return (
    <>
    {/* MENSAGEM CENTRALIZADA */}
      <div
        style={{
          marginBottom: "10px",
          textAlign: "center"
        }}
      >
        <strong
          style={{
            display: "block",
            fontSize: "15px",
            color: "#333",
            lineHeight: "1.35"
          }}
        >
          💛 {mensagemAtual?.titulo || "Seu próximo amigurumi começa agora"} 
        </strong>
      </div>

      {/* CONTINUAR */}
        {ultimaReceita && (
          <div
            onClick={() => abrirReceita(ultimaReceita)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              background: "#ffffff",
              border: "1.5px solid #f4c542",
              borderRadius: "12px",

              padding: "10px 12px",
              marginBottom: "10px",

              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              cursor: "pointer"
            }}
          >
            {/* TEXTO ESQUERDA */}
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                fontWeight: "600",
                minWidth: "95px",
                lineHeight: "1.2"
              }}
            >
              <div>Continuar de</div>
              <div>onde parei</div>
            </div>

            {/* BOTÃO */}
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "#f4c542",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 8px",
                flexShrink: 0
              }}
            >
              <img
                src="/images/icons/proxima.png"
                style={{
                  width: "16px",
                  height: "16px"
                }}
              />
            </div>

            {/* RECEITA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: 1,
                minWidth: 0
              }}
            >
              <img
                src={ultimaReceita.imagem}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  flexShrink: 0
                }}
              />

              <div
                style={{
                  overflow: "hidden"
                }}
              >
                <strong
                  style={{
                    fontSize: "12px",
                    color: "#222",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {ultimaReceita.nome}
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#777"
                  }}
                >
                  Toque para continuar
                </span>
              </div>
            </div>
          </div>
        )}
      

      {/* CARROSSEL DE DESTAQUE */}
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
            <img
              src={receitasDestaque[indexCarrossel].imagem}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover"
              }}
            />

            {/* OVERLAY */}
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

              {/* PROGRESSO */}
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "6px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${percentual(
                      receitasDestaque[indexCarrossel]
                    )}%`,
                    height: "100%",
                    background: "#ffd400"
                  }}
                />
              </div>

              <span style={{ fontSize: "11px" }}>
                {percentual(receitasDestaque[indexCarrossel])}% concluído
              </span>
            </div>

            {/* FAVORITO */}
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
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
          </div>
        </div>
      )}

      {/* TÍTULO */}
      <h2 style={{ margin: "10px 0" }}>Receitas para você hoje</h2>

      {/* GRID RANDOM */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px"
        }}
      >
        {(receitasRandom || []).slice(0, 8).map((r) => (
          <CardReceita
            key={r.id}
            receita={r}
            abrirReceita={abrirReceita}
            toggleFavorito={toggleFavorito}
            favoritos={favoritos}
            percentual={percentual}
          />
        ))}
      </div>
    </>
  );
}