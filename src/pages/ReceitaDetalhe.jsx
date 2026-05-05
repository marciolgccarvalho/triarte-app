import React from "react";
import "../styles/components/receita-detalhe.css";
import { IMAGES } from "../assets/images";
import ParabensModal from "../components/ParabensModal";

export default function ReceitaDetalhe({
  receita,
  favoritos = [],
  toggleFavorito,
  voltar,
  irPara,
  percentual = () => 0,
  progresso = {},
  marcarVideo = () => {}
}) {

  if (!receita) return null;

  const imagem = new URL(
    `../assets/images/personagens/${receita.id}.webp`,
    import.meta.url
  ).href;

  const isFavorito = favoritos.includes(receita.id);

  const [mostrarParabens, setMostrarParabens] = React.useState(false);

  const vistos = progresso?.[receita.id]?.vistos?.length || 0;
  const total = receita.videos?.length || 0;

  const percentualAtual = Number(percentual(receita)) || 0;

  const percentualAnteriorRef = React.useRef(percentualAtual);

  React.useEffect(() => {
    const anterior = percentualAnteriorRef.current;

    if (anterior < 100 && percentualAtual >= 100) {
      setMostrarParabens(true);
    }

    percentualAnteriorRef.current = percentualAtual;
  }, [percentualAtual]);

  return (
    <div className="rd-page rd-debug">

      <div className="rd-layout">

        {/* ===== TOPO ===== */}
        <section className="rd-nome-area">
          <div className="rd-nome-row">

            <div className="rd-col-left">
              <button
                className="rd-btn-voltar"
                onClick={() => voltar && voltar()}
              >
                <img src={IMAGES.icons.anterior.active} alt="Voltar" />
              </button>
            </div>

            <div className="rd-col-center">
              <h1 className="rd-nome">{receita.nome}</h1>
            </div>

            <div className="rd-col-right">
              <button
                className="rd-btn-materiais"
                onClick={() => irPara && irPara("materiais")}
              >
                <img
                  src={IMAGES.icons.lista.active}
                  alt=""
                  className="rd-materiais-icon"
                />
                <span>Ver materiais</span>
              </button>
            </div>

          </div>
        </section>

        {/* ===== IMAGEM ===== */}
        <section className="rd-imagem-area">
          <div className="rd-imagem-wrapper">

            <img src={imagem} alt={receita.nome} className="rd-imagem" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorito && toggleFavorito(receita.id);
              }}
              className={`card-favorito ${isFavorito ? "ativo" : ""}`}
            >
              <img
                src={IMAGES.icons.favoritos.active}
                alt="Favorito"
                className="card-favorito-icon"
              />
            </button>

          </div>
        </section>

        {/* ===== PROGRESSO + DESCRIÇÃO (CARD PREMIUM) ===== */}
        <section className="rd-progresso-card">

          <p className="rd-descricao">
            {receita.descricao}
          </p>

          <div className="rd-progresso-header">
            <span className="rd-progresso-titulo">
              Seu progresso
            </span>

            <span className="rd-progresso-info">
              {percentualAtual}% • {vistos}/{total} vídeos
            </span>
          </div>

          <div className="rd-progress-bar">
            <div
              className="rd-progress-fill"
              style={{ width: `${percentualAtual}%` }}
            />
          </div>

        </section>

        {/* ===== LISTA DE VÍDEOS ===== */}
        <section className="rd-videos-area">

          <div className="rd-videos-header">
            <span className="rd-videos-title">Continue sua receita</span>
          </div>

          <div className="rd-videos-lista">
            {receita.videos?.map((video, index) => {

              const agora = new Date();

              let liberado = true;

              if (video.liberacao) {
                const dataLiberacao = new Date(`${video.liberacao}T16:30:00`);
                liberado = agora >= dataLiberacao;
              }

              const vistosLista = progresso?.[receita.id]?.vistos || [];

              const ultimoVisto = vistosLista.length > 0
                ? Math.max(...vistosLista)
                : -1;

              const proximoIndex = ultimoVisto + 1;
              const isProximo = index === proximoIndex;

              const isVisto = vistosLista.includes(index);

              const podeMarcar = index === ultimoVisto + 1;
              const podeDesmarcar = index === ultimoVisto;

              return (
                <div
                  key={index}
                  className={`rd-video-row ${isProximo ? "rd-proximo" : ""}`}
                >

                  <div className="rd-video-col rd-col-thumb">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rd-thumb-link"
                    >
                      <div className="rd-thumb-wrapper">

                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.titulo}
                          className="rd-video-thumb"
                        />

                        <div className="rd-thumb-overlay">
                          ▶
                        </div>

                      </div>
                    </a>
                  </div>

                  <div className="rd-video-col rd-col-info">
                    <div className="rd-video-info-box">

                      <span className="rd-video-titulo">
                        {video.titulo}
                      </span>

                      {liberado ? (
                        <span className="rd-video-status liberado">
                          ● Liberado
                        </span>
                      ) : (
                        <>
                          <span className="rd-video-status bloqueado">
                            🔒 Exclusivo para membros
                          </span>

                          <span className="rd-video-data">
                            Libera em: {new Date(video.liberacao).toLocaleDateString("pt-BR")}
                          </span>
                        </>
                      )}

                    </div>
                  </div>

                  <div className="rd-video-col rd-col-acoes">
                    <div className="rd-acoes-box">

                      <button
                        className={`rd-btn-check ${isVisto ? "ativo" : ""}`}
                        disabled={!podeMarcar && !podeDesmarcar}
                        onClick={() => {
                          if (podeMarcar || podeDesmarcar) {
                            marcarVideo(receita.id, index);
                          }
                        }}
                      >
                        {isVisto ? "✔ Já vi" : "☐ Marcar"}
                      </button>

                      {!liberado && (
                        <a
                          href="https://www.youtube.com/channel/UCCw427skU7og9hPNGIcPbrQ/join"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rd-btn-membro"
                        >
                           Seja membro
                        </a>
                      )}

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* CTA FINAL */}
        <section className="rd-cta-membro">
          <div className="rd-cta-box">
            <div className="rd-cta-text">
              <strong>Tenha acesso antecipado</strong>
              <span>Desbloqueie os próximos vídeos antes de todo mundo</span>
            </div>

            <a
              href="https://www.youtube.com/channel/UCCw427skU7og9hPNGIcPbrQ/join"
              target="_blank"
              rel="noopener noreferrer"
              className="rd-cta-button"
            >
             Seja membro
            </a>
          </div>
        </section>

      </div>

      <ParabensModal
        aberto={mostrarParabens}
        fechar={() => setMostrarParabens(false)}
        receita={{ ...receita, imagem }}
      />

    </div>
  );
}