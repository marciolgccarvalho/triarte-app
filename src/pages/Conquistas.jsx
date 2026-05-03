import React from "react";
import { IMAGES } from "../assets/images";

export default function Conquistas({ voltar, progresso, receitas, favoritos }) {

  const conquistas = [
    { id: "primeiro_passo", imgOn: IMAGES.conquistas.primeiroPasso.active, imgOff: IMAGES.conquistas.primeiroPasso.inactive },
    { id: "iniciante", imgOn: IMAGES.conquistas.iniciante.active, imgOff: IMAGES.conquistas.iniciante.inactive },
    { id: "dedicado", imgOn: IMAGES.conquistas.dedicado.active, imgOff: IMAGES.conquistas.dedicado.inactive },
    { id: "primeira_receita", imgOn: IMAGES.conquistas.primeiraReceita.active, imgOff: IMAGES.conquistas.primeiraReceita.inactive },
    { id: "criador", imgOn: IMAGES.conquistas.criadorIniciante.active, imgOff: IMAGES.conquistas.criadorIniciante.inactive },
    { id: "artesao", imgOn: IMAGES.conquistas.artesaoDedicado.active, imgOff: IMAGES.conquistas.artesaoDedicado.inactive },
    { id: "mestre", imgOn: IMAGES.conquistas.mestreDoAmigurumi.active, imgOff: IMAGES.conquistas.mestreDoAmigurumi.inactive },
    { id: "explorador", imgOn: IMAGES.conquistas.explorador.active, imgOff: IMAGES.conquistas.explorador.inactive },
    { id: "colecionador", imgOn: IMAGES.conquistas.colecionador.active, imgOff: IMAGES.conquistas.colecionador.inactive },
    { id: "persistente", imgOn: IMAGES.conquistas.persistente.active, imgOff: IMAGES.conquistas.persistente.inactive },
    { id: "focado", imgOn: IMAGES.conquistas.focado.active, imgOff: IMAGES.conquistas.focado.inactive },
    { id: "imparavel", imgOn: IMAGES.conquistas.imparavel.active, imgOff: IMAGES.conquistas.imparavel.inactive }
  ];

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

      {/* VOLTAR */}
      <div className="mb-sm">
        <button onClick={voltar}>
          <img src={IMAGES.icons.anterior.active} style={{ width: "25px" }} />
        </button>
      </div>

      <h2 className="mb-sm">Conquistas</h2>

      <p className="text-muted mb-md">
        Acompanhe sua evolução no app 💛
      </p>

      <div className="grid gap-md" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
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
              className="card flex-center"
              style={{ height: "140px" }}
            >
              <img
                src={conquistado ? c.imgOn : c.imgOff}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}