import React from "react";
import ParabensModal from "../components/ParabensModal";
import { IMAGES } from "../assets/images";
import "../styles/components/receita-detalhe.css";

export default function ReceitaDetalhe({
  receita,
  marcarVideo,
  percentual,
  progresso,
  favoritos = [],            // 🔥 evita crash
  toggleFavorito = () => {}, // 🔥 evita crash
  voltar,
  irPara
}) {
  const [mostrarParabens, setMostrarParabens] = React.useState(false);
  const prevPercentual = React.useRef(0);

  if (!receita) {
    return (
      <div className="page">
        <h2>Nenhuma receita selecionada</h2>
      </div>
    );
  }

  const agora = new Date();

  function aindaEhMembro(video) {
    if (!video.liberacao) return false;

    const [dia, mes, ano] = video.liberacao.split("/");
    const dataLiberacao = new Date(`20${ano}`, mes - 1, dia, 16, 30);

    return agora < dataLiberacao;
  }

  React.useEffect(() => {
    const atual = percentual(receita);

    if (prevPercentual.current === 0 && atual === 100) {
      prevPercentual.current = atual;
      return;
    }

    if (prevPercentual.current < 100 && atual === 100) {
      setMostrarParabens(true);
    }

    prevPercentual.current = atual;
  }, [progresso, receita]);

  return (
    <div className="page">

      {/* BOTÃO VOLTAR */}
      <button onClick={voltar} className="btn-voltar">
        <img
          src={IMAGES.icons.anterior.active}
          alt="Voltar"
        />
      </button>

      {/* IMAGEM + FAVORITO */}
      <div className="receita-hero-wrapper">
        <img
          src={receita.imagem}
          alt={receita.nome}
          className="receita-hero"
        />

        <button
          className={`receita-fav ${favoritos.includes(receita.id) ? "ativo" : ""}`}
          onClick={() => toggleFavorito(receita.id)}
        >
          <img
            src={IMAGES.icons.favoritos.active}
            alt="Favoritar"
          />
        </button>
      </div>

      {/* TÍTULO */}
      <h2 className="receita-titulo">{receita.nome}</h2>

      {/* DESCRIÇÃO */}
      <p className="receita-sub">{receita.descricao}</p>

      {/* BOTÃO MATERIAIS */}
      <div className="acoes">
        <button
          onClick={() => irPara("materiais")}
          className="btn btn-primary btn-full"
        >
          Ver materiais
        </button>
      </div>

      {/* PROGRESSO */}
      <div className="progresso-card">
        <strong>{percentual(receita)}% concluído</strong>

        <div className="progress-bar mt-sm">
          <div
            className="progress-fill"
            style={{ width: `${percentual(receita)}%` }}
          />
        </div>
      </div>

      {/* VÍDEOS */}
      <div className="etapas">
        {receita.videos?.map((video, index) => {
          const vistos = progresso[receita.id]?.vistos || [];
          const visto = vistos.includes(index);

          const podeMarcar =
            index === 0 || vistos.includes(index - 1);

          const podeDesmarcar =
            !vistos.includes(index + 1);

          const ativo =
            (!visto && podeMarcar) ||
            (visto && podeDesmarcar);

          const bloqueado = aindaEhMembro(video);

          return (
            <div key={index} className="etapa-item">
              <div className="etapa-left">
                <span className="etapa-icon">
                  {visto ? "✔" : "▶"}
                </span>

                <span>{video.titulo}</span>
              </div>

              <div className="flex gap-sm">

                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${video.youtubeId}`,
                      "_blank"
                    )
                  }
                  className="btn btn-primary"
                >
                  {bloqueado ? "Membros" : "Assistir"}
                </button>

                <button
                  onClick={() => {
                    if (!visto && podeMarcar) {
                      marcarVideo(receita.id, index);
                    }

                    if (visto && podeDesmarcar) {
                      marcarVideo(receita.id, index);
                    }
                  }}
                  className={`btn btn-check ${visto ? "checked" : ""}`}
                  disabled={!ativo}
                >
                  ✓
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <ParabensModal
        aberto={mostrarParabens}
        fechar={() => setMostrarParabens(false)}
        receita={receita}
      />
    </div>
  );
}