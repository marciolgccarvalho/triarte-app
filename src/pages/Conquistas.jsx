import React from "react";

export default function Conquistas({ voltar, progresso, receitas, favoritos }) {

  const conquistas = [
    { id: "primeiro_passo", imgOn: "/images/conquistas/primeiropasso2.png", imgOff: "/images/conquistas/primeiropasso1.png" },
    { id: "iniciante", imgOn: "/images/conquistas/iniciante2.png", imgOff: "/images/conquistas/iniciante1.png" },
    { id: "dedicado", imgOn: "/images/conquistas/dedicado2.png", imgOff: "/images/conquistas/dedicado1.png" },
    { id: "primeira_receita", imgOn: "/images/conquistas/primeirareceita2.png", imgOff: "/images/conquistas/primeirareceita1.png" },
    { id: "criador", imgOn: "/images/conquistas/criadoriniciante2.png", imgOff: "/images/conquistas/criadoriniciante1.png" },
    { id: "artesao", imgOn: "/images/conquistas/artesaodedicado2.png", imgOff: "/images/conquistas/artesaodedicado1.png" },
    { id: "mestre", imgOn: "/images/conquistas/mestredoamigurumi2.png", imgOff: "/images/conquistas/mestredoamigurumi1.png" },
    { id: "explorador", imgOn: "/images/conquistas/explorador2.png", imgOff: "/images/conquistas/explorador1.png" },
    { id: "colecionador", imgOn: "/images/conquistas/colecionador2.png", imgOff: "/images/conquistas/colecionador1.png" },
    { id: "persistente", imgOn: "/images/conquistas/persistente2.png", imgOff: "/images/conquistas/persistente1.png" },
    { id: "focado", imgOn: "/images/conquistas/focado2.png", imgOff: "/images/conquistas/focado1.png" },
    { id: "imparavel", imgOn: "/images/conquistas/imparavel2.png", imgOff: "/images/conquistas/imparavel1.png" }
  ];

  // =========================
  // CÁLCULOS
  // =========================

  const totalVideosAssistidos = Object.values(progresso).reduce(
    (total, r) => total + (r.vistos?.length || 0),
    0
  );

  const receitasCompletas = receitas.filter((r) => {
    const vistos = progresso[r.id]?.vistos?.length || 0;
    const total = r.videos?.length || 0;
    return total > 0 && vistos === total;
  }).length;

  const receitasIniciadas = receitas.filter((r) => {
    const vistos = progresso[r.id]?.vistos?.length || 0;
    return vistos > 0;
  }).length;

  const maiorProgresso = Math.max(
    ...receitas.map((r) => {
      const vistos = progresso[r.id]?.vistos?.length || 0;
      const total = r.videos?.length || 0;
      return total === 0 ? 0 : (vistos / total) * 100;
    }),
    0
  );

  return (
    <div>

      {/* BOTÃO VOLTAR */}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={voltar}
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          <img src="/images/icons/anterior.png" style={{ width: "25px" }} />
        </button>
      </div>

      <h2>Conquistas</h2>
      <p style={{ color: "#666", marginBottom: "15px" }}>
        Acompanhe sua evolução no app 💛
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px"
        }}
      >
        {conquistas.map((c) => {

          let conquistado = false;

          switch (c.id) {
            case "primeiro_passo":
              conquistado = totalVideosAssistidos >= 1;
              break;
            case "iniciante":
              conquistado = totalVideosAssistidos >= 5;
              break;
            case "dedicado":
              conquistado = totalVideosAssistidos >= 20;
              break;
            case "imparavel":
              conquistado = totalVideosAssistidos >= 100;
              break;
            case "primeira_receita":
              conquistado = receitasCompletas >= 1;
              break;
            case "criador":
              conquistado = receitasCompletas >= 5;
              break;
            case "artesao":
              conquistado = receitasCompletas >= 10;
              break;
            case "mestre":
              conquistado = receitasCompletas >= 25;
              break;
            case "explorador":
              conquistado = favoritos.length >= 3;
              break;
            case "colecionador":
              conquistado = favoritos.length >= 10;
              break;
            case "persistente":
              conquistado = receitasIniciadas >= 3;
              break;
            case "focado":
              conquistado = maiorProgresso >= 50;
              break;
          }

          return (
            <div
              key={c.id}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "10px",
                textAlign: "center",
                height: "140px", // 🔥 TAMANHO FIXO
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={conquistado ? c.imgOn : c.imgOff}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain" // 🔥 GARANTE PROPORÇÃO
                }}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}