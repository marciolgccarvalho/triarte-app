import React from "react";
import html2canvas from "html2canvas";

export default function ParabensModal({ aberto, fechar, receita }) {
  if (!aberto) return null;

  const dataHoje = new Date().toLocaleDateString("pt-BR");

  const salvarImagem = async () => {
    const elemento = document.getElementById("print-area");
    if (!elemento) return;

    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    const link = document.createElement("a");
    link.download = "real-triarte-conquista.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        id="print-area"
        style={{
          width: "100%",
          maxWidth: "360px",
          background: "#fff",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          textAlign: "center"
        }}
      >
        {/* HEADER FIXO */}
        <div
          style={{
            padding: "10px",
            textAlign: "left",
            position: "relative",
            zIndex: 2,
            background: "#fff"
          }}
        >
          <button
            onClick={fechar}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        {/* IMAGEM ESTILO INSTAGRAM (CORRIGIDO) */}
        <div
          style={{
            width: "100%",
            height: "220px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* FUNDO BLUR */}
          <img
            src={receita?.imagem}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(18px) brightness(0.7)",
              transform: "scale(1.2)"
            }}
          />

          {/* IMAGEM PRINCIPAL */}
          <img
            src={receita?.imagem}
            alt="receita"
            style={{
              position: "relative",
              maxWidth: "90%",
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />
        </div>

        {/* CONTEÚDO */}
        <div style={{ padding: "18px", position: "relative", zIndex: 2 }}>
          {/* LOGO */}
          <img
            src="/images/logo/logo.png"
            style={{
              width: "65px",
              borderRadius: "50%",
              marginTop: "-40px",
              border: "4px solid #fff",
              background: "#fff"
            }}
          />

          {/* TEXTO */}
          <div style={{ marginTop: "10px" }}>
            <div style={{ fontSize: "26px" }}>🎉</div>

            <h2 style={{ margin: "6px 0", fontSize: "22px" }}>
              Parabéns!
            </h2>

            <p style={{ color: "#666", fontSize: "14px" }}>
              Você concluiu o projeto
            </p>

            <strong
              style={{
                display: "block",
                fontSize: "17px",
                marginTop: "6px",
                color: "#222"
              }}
            >
              {receita?.nome}
            </strong>

            <div
              style={{
                marginTop: "4px",
                fontSize: "13px",
                color: "#888"
              }}
            >
              {dataHoje}
            </div>
          </div>

          {/* BOTÃO */}
          <button
            onClick={salvarImagem}
            style={{
              marginTop: "18px",
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #ff5a5a, #ff7a7a)",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "800",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(255,90,90,0.4)"
            }}
          >
            📸 Salve este momento
          </button>
        </div>
      </div>
    </div>
  );
}