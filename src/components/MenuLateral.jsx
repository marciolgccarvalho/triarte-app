import React from "react";

export default function MenuLateral({ aberto, fechar = () => {}, irPara = () => {} }) {
  if (!aberto) return null;

  return (
    <div
      onClick={fechar}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "260px",
          height: "100%",
          background: "#f5f5f5",
          padding: "20px",
          boxShadow: "2px 0 10px rgba(0,0,0,0.2)"
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/images/logo/logo.webp"
            alt="Logo"
            style={{ width: "70px", borderRadius: "50%" }}
          />
          <h3 style={{ marginTop: "10px" }}>Real Triarte</h3>
        </div>

        {/* MENU */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Item icone="/images/icons/home.png" texto="Home" onClick={() => irPara("home")} />
          <Item icone="/images/icons/receitas.png" texto="Receitas" onClick={() => irPara("receitas")} />
          <Item icone="/images/icons/favoritos.png" texto="Favoritos" onClick={() => irPara("favoritos")} />
          <Item icone="/images/icons/calculo.png" texto="Simulador" onClick={() => irPara("simulador")} />
          <Item icone="/images/icons/conquistas.png" texto="Conquistas" onClick={() => irPara("conquistas")} />
          <Item icone="/images/icons/abreviacao.png" texto="Abreviações" onClick={() => irPara("abreviatura")} />
          <Item icone="/images/icons/sobre.png" texto="Sobre" onClick={() => irPara("sobre")} />
          <Item icone="/images/icons/contato.png" texto="Contato" onClick={() => irPara("contato")} />
        </div>
      </div>
    </div>
  );
}

function Item({ icone, texto, onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        padding: "10px",
        borderRadius: "10px",
        transition: "background 0.2s"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#eaeaea")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <img
        src={icone || "/images/logo/logo.webp"}
        alt={texto}
        style={{ width: "28px" }}
      />
      <span style={{ fontSize: "15px", fontWeight: "600", color: "#333" }}>
        {texto || ""}
      </span>
    </div>
  );
}