import React from "react";
import ParabensModal from "../components/ParabensModal";
import { IMAGES } from "../assets/images";

export default function ReceitaDetalhe({
  receita,
  marcarVideo,
  percentual,
  progresso,
  voltar,
  irPara
}) {
  const [mostrarParabens, setMostrarParabens] = React.useState(false);
  const prevPercentual = React.useRef(0);

  if (!receita) {
    return (
      <div className="p-md">
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
    <div>
      {/* VOLTAR */}
      <div className="mt-sm">
        <button onClick={voltar}>
          <img src={IMAGES.icons.anterior.active} style={{ width: "25px" }} />
        </button>
      </div>

      {/* IMAGEM */}
      <img
        src={receita.imagem}
        alt={receita.nome}
        className="mt-sm"
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "14px"
        }}
      />

      {/* TÍTULO */}
      <h2 className="mt-sm">{receita.nome}</h2>

      {/* DESCRIÇÃO */}
      <p className="text-muted">{receita.descricao}</p>

      {/* BOTÃO MATERIAIS */}
      <div className="mt-sm">
        <button
          onClick={() => irPara("materiais")}
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Ver materiais
        </button>
      </div>

      {/* PROGRESSO */}
      <div className="mt-md">
        <strong>{percentual(receita)}% concluído</strong>

        <div
          style={{
            marginTop: "8px",
            width: "100%",
            height: "10px",
            background: "var(--color-surface)",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${percentual(receita)}%`,
              height: "100%",
              background: "var(--color-success)"
            }}
          />
        </div>
      </div>

      {/* VÍDEOS */}
      <div className="grid gap-sm mt-md">
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
            <div key={index} className="card">
              <strong>
                {visto ? "✅" : "▶"} {video.titulo}
              </strong>

              {bloqueado && (
                <>
                  <div className="mt-sm" />

                  <button
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/channel/UCCw427skU7og9hPNGIcPbrQ/join",
                        "_blank"
                      )
                    }
                    className="btn"
                    style={{
                      background: "var(--color-danger)",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: "700",
                      width: "fit-content"
                    }}
                  >
                    Seja Membro e veja todos os vídeos
                  </button>

                  <div className="small mt-sm">
                    Liberado para todos dia {video.liberacao} às 16:30
                  </div>
                </>
              )}

              <div className="flex gap-sm mt-sm">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${video.youtubeId}`,
                      "_blank"
                    )
                  }
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  {bloqueado ? "Liberado para Membros" : "Assistir"}
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
                  className="btn"
                  style={{
                    width: "60px",
                    background: visto
                      ? "var(--color-success)"
                      : "var(--color-surface)",
                    color: "#fff",
                    opacity: ativo ? 1 : 0.3,
                    cursor: ativo ? "pointer" : "not-allowed"
                  }}
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