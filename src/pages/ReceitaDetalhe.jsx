import React from "react";
import ParabensModal from "../components/ParabensModal";

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
      <div style={{ padding: "20px" }}>
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

  // 🔥 DETECTA TRANSIÇÃO CORRETA (SEM BUG)
  React.useEffect(() => {
    const atual = percentual(receita);

    // inicializa corretamente ao entrar na tela
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
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={voltar}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer"
          }}
        >
          <img src="/images/icons/anterior.png" style={{ width: "25px" }} />
        </button>
      </div>

      {/* IMAGEM */}
      <img
        src={receita.imagem}
        alt={receita.nome}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "14px",
          marginTop: "12px"
        }}
      />

      {/* TÍTULO */}
      <h2 style={{ marginTop: "12px" }}>{receita.nome}</h2>

      {/* DESCRIÇÃO */}
      <p style={{ color: "#666" }}>{receita.descricao}</p>

      {/* BOTÃO MATERIAIS */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => irPara("materiais")}
          style={{
            width: "100%",
            padding: "14px",
            background: "#ffd400",
            border: "none",
            borderRadius: "12px",
            fontWeight: "800",
            cursor: "pointer"
          }}
        >
          Ver materiais
        </button>
      </div>

      {/* PROGRESSO */}
      <div style={{ margin: "15px 0" }}>
        <strong>{percentual(receita)}% concluído</strong>

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
              width: `${percentual(receita)}%`,
              height: "100%",
              background: "#35a853"
            }}
          />
        </div>
      </div>

      {/* VÍDEOS */}
      <div style={{ display: "grid", gap: "10px" }}>
        {receita.videos?.map((video, index) => {
          const vistos = progresso[receita.id]?.vistos || [];
          const visto = vistos.includes(index);

          const podeMarcar =
            index === 0 || vistos.includes(index - 1);

          const bloqueado = aindaEhMembro(video);

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

              {bloqueado && (
                <>
                  <div style={{ height: "8px" }} />

                  <button
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/channel/UCCw427skU7og9hPNGIcPbrQ/join",
                        "_blank"
                      )
                    }
                    style={{
                      background: "#e53935",
                      color: "#fff",
                      border: "none",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      width: "fit-content"
                    }}
                  >
                    Seja Membro e veja todos os vídeos
                  </button>

                  <div style={{ fontSize: "12px", marginTop: "6px", fontWeight: "600" }}>
                    Liberado para todos dia {video.liberacao} às 16:30
                  </div>
                </>
              )}

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
                    fontWeight: "700",
                    cursor: "pointer"
                  }}
                >
                  {bloqueado ? "Liberado para Membros" : "Assistir"}
                </button>

                <button
                  onClick={() => {
                    if (podeMarcar) {
                      marcarVideo(receita.id, index);
                    }
                  }}
                  style={{
                    width: "60px",
                    background: visto ? "#35a853" : "#ddd",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontWeight: "700",
                    cursor: podeMarcar ? "pointer" : "not-allowed",
                    opacity: podeMarcar ? 1 : 0.3
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