import {
  useEffect,
  useRef,
  useState
} from "react";

import html2canvas
  from "html2canvas";

import { IMAGES }
  from "@/assets/images";

/* ========================================
   STATUS
======================================== */

const STATUS_LABEL = {

  concluido:
    "Concluída",

  progresso:
    "Em progresso",

  bloqueado:
    "Bloqueada"

};

const STATUS_CLASS = {

  concluido:
    "cq-status-concluido",

  progresso:
    "cq-status-progresso",

  bloqueado:
    "cq-status-bloqueado"

};

/* ========================================
   RARIDADE
======================================== */

const RARIDADE_CLASS = {

  comum:
    "cq-raridade-comum",

  raro:
    "cq-raridade-raro",

  epico:
    "cq-raridade-epico",

  lendario:
    "cq-raridade-lendario"

};

export default function
ConquistaCard({ c }) {

  /* ========================================
     ESTADOS
  ======================================== */

  const [animar, setAnimar] =
    useState(false);

  const statusAnterior =
    useRef(c.status);

  const cardRef =
    useRef(null);

  /* ========================================
     ANIMAÇÃO
  ======================================== */

  useEffect(() => {

    if (

      statusAnterior.current !==
        "concluido" &&

      c.status ===
        "concluido"

    ) {

      setAnimar(true);

      const timer =
        setTimeout(() => {

          setAnimar(false);

        }, 800);

      statusAnterior.current =
        c.status;

      return () =>
        clearTimeout(timer);

    }

    statusAnterior.current =
      c.status;

  }, [c.status]);

  /* ========================================
     SHARE
  ======================================== */

  const compartilhar =
    async (e) => {

      e.stopPropagation();

      try {

        if (!cardRef.current) {
          return;
        }

        /* ========================================
           CAPTURA CARD
        ======================================== */

        const canvas =
          await html2canvas(

            cardRef.current,

            {
              backgroundColor: null,
              scale: 2
            }

          );

        /* ========================================
           CONVERTE PARA BLOB
        ======================================== */

        const blob =
          await new Promise(

            (resolve) =>

              canvas.toBlob(resolve)

          );

        if (!blob) return;

        /* ========================================
           FILE
        ======================================== */

        const file =
          new File(

            [blob],

            "conquista-real-triarte.png",

            {
              type: "image/png"
            }

          );

        /* ========================================
           SHARE NATIVO
        ======================================== */

        if (

          navigator.canShare &&

          navigator.canShare({
            files: [file]
          })

        ) {

          await navigator.share({

            title:
              "Conquista desbloqueada!",

            text:
              `Acabei de desbloquear "${c.titulo}" no Real Triarte 💛`,

            files: [file]

          });

        } else {

          /* ========================================
             FALLBACK DOWNLOAD
          ======================================== */

          const link =
            document.createElement("a");

          link.href =
            URL.createObjectURL(blob);

          link.download =
            "conquista-real-triarte.png";

          link.click();

        }

      } catch (erro) {

        console.log(erro);

      }

    };

  /* ========================================
     CLASSES
  ======================================== */

  const statusClass =

    STATUS_CLASS[c.status] ||

    "cq-status-bloqueado";

  const raridadeClass =

    RARIDADE_CLASS[c.raridade] ||

    "cq-raridade-comum";

  /* ========================================
     RENDER
  ======================================== */

  return (

    <div

      ref={cardRef}

      className={`
        cq-card
        ${raridadeClass}
        ${statusClass}
        ${
          animar
            ? "cq-card-animando"
            : ""
        }
      `}
    >

      {/* ========================================
          BADGE
      ======================================== */}

      <span className="cq-badge">

        {c.raridade}

      </span>

      {/* ========================================
          SHARE
      ======================================== */}

      {c.status === "concluido" && (

        <button
          onClick={(e) =>
            compartilhar(e)
          }
          className="cq-share-btn"
          type="button"
        >

          <img
            src={
              IMAGES.icons
                .compartilhar.active
            }
            alt="Compartilhar"
          />

        </button>

      )}

      {/* ========================================
          ICON
      ======================================== */}

      <div className="cq-icon">

        <img
          src={c.icone}
          alt={c.titulo}
          className="cq-icon-img"
        />

      </div>

      {/* ========================================
          INFO
      ======================================== */}

      <h4 className="cq-card-title">

        {c.titulo}

      </h4>

      <p className="cq-card-description">

        {c.descricao}

      </p>

      {/* ========================================
          PROGRESSO
      ======================================== */}

      <div className="cq-progress">

        <div
          className="cq-progress-fill"
          style={{
            width:
              `${c.progresso}%`
          }}
        />

      </div>

      <div className="cq-progress-info">

        {Math.round(

          Math.min(
            c.atual,
            c.meta
          )

        )} / {c.meta}

      </div>

      {/* ========================================
          STATUS
      ======================================== */}

      <div
        className={`
          cq-status
          ${statusClass}
        `}
      >

        {
          STATUS_LABEL[c.status] ||
          "Bloqueada"
        }

      </div>

    </div>
  );
}