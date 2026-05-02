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

  // AUTO PLAY CARROSSEL
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
            src={ultimaReceita?.imagem || "/images/logo/logo.png"}
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
            style={{ borderRadius: "16px", overflow: "hidden" }}
          >
            <img
              src={receitaAtual?.imagem || "/images/logo/logo.png"}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            <div style={{ padding: "10px", background: "#000", color: "#fff" }}>
              <strong>{receitaAtual?.nome}</strong>
              <div style={{ fontSize: "12px" }}>
                {percentual(receitaAtual)}% concluído
              </div>
            </div>
          </div>
        </div>
      )}

      <h2>Receitas para você hoje</h2>

      {/* GRID */}
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