import React from "react";
import CardReceita from "../components/CardReceita";

export default function Home({
  mensagemAtual,
  ultimaReceita,
  receitas = [],
  receitasRandom = [],
  abrirReceita = () => {},
  percentual = () => 0,
  toggleFavorito = () => {},
  favoritos = []
}) {
  const [indexCarrossel, setIndexCarrossel] = React.useState(0);

  const hoje = React.useMemo(() => new Date(), []);

  const receitasDestaque = React.useMemo(() => {
    return (Array.isArray(receitas) ? receitas : []).filter((r) => {
      if (!r || !r.destaqueInicio || !r.destaqueFim) return false;

      const inicio = new Date(r.destaqueInicio);
      const fim = new Date(r.destaqueFim);

      if (isNaN(inicio) || isNaN(fim)) return false;

      return hoje >= inicio && hoje <= fim;
    });
  }, [receitas, hoje]);

  React.useEffect(() => {
    if (indexCarrossel >= receitasDestaque.length) {
      setIndexCarrossel(0);
    }
  }, [indexCarrossel, receitasDestaque.length]);

  React.useEffect(() => {
    if (receitasDestaque.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndexCarrossel((i) =>
        i === receitasDestaque.length - 1 ? 0 : i + 1
      );
    }, 6000);

    return () => clearInterval(intervalo);
  }, [receitasDestaque.length]);

  const receitaAtual = receitasDestaque[indexCarrossel] || null;

  const proximo = (e) => {
    e.stopPropagation();
    setIndexCarrossel((i) =>
      i === receitasDestaque.length - 1 ? 0 : i + 1
    );
  };

  const anterior = (e) => {
    e.stopPropagation();
    setIndexCarrossel((i) =>
      i === 0 ? receitasDestaque.length - 1 : i - 1
    );
  };

  return (
    <>
      {/* MENSAGEM */}
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <strong style={{ fontSize: "15px", color: "#333" }}>
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
            background: "#fff",
            border: "1.5px solid #f4c542",
            borderRadius: "12px",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          <img
            src={ultimaReceita?.imagem || "/images/logo/logo.webp"}
            loading="lazy"
            decoding="async"
            style={{ width: "44px", height: "44px", borderRadius: "8px" }}
          />

          <div style={{ marginLeft: "10px" }}>
            <strong>{ultimaReceita?.nome || "Receita"}</strong>
            <div style={{ fontSize: "11px" }}>Continuar</div>
          </div>
        </div>
      )}

      {/* CARROSSEL */}
      {receitaAtual && (
        <div style={{ marginBottom: "20px" }}>
          <div
            onClick={() => abrirReceita(receitaAtual)}
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer"
            }}
          >
            {/* IMAGEM PRINCIPAL (SEM LAZY) */}
            <img
              src={receitaAtual?.imagem || "/images/logo/logo.webp"}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover"
              }}
            />

            {receitasDestaque.length > 1 && (
              <img
                src="/images/icons/anterior.png"
                onClick={anterior}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  zIndex: 5
                }}
              />
            )}

            {receitasDestaque.length > 1 && (
              <img
                src="/images/icons/proxima.png"
                onClick={proximo}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  zIndex: 5
                }}
              />
            )}

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))"
              }}
            />

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
                {receitaAtual?.nome}
              </strong>

              <p style={{ margin: "4px 0", fontSize: "13px" }}>
                Toque para assistir a receita
              </p>

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
                    width: `${percentual(receitaAtual)}%`,
                    height: "100%",
                    background: "#ffd400"
                  }}
                />
              </div>

              <span style={{ fontSize: "11px" }}>
                {percentual(receitaAtual)}% concluído
              </span>
            </div>
          </div>
        </div>
      )}

      <h2>Receitas para você hoje</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {(Array.isArray(receitasRandom) ? receitasRandom : [])
          .slice(0, 8)
          .filter(Boolean)
          .map((r) => (
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