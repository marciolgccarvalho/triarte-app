import React from "react";
import { IMAGES } from "../assets/images";

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
            src={IMAGES.ui.logo}
            alt="Logo"
            style={{ width: "70px", borderRadius: "50%" }}
          />
          <h3 style={{ marginTop: "10px" }}>Real Triarte</h3>
        </div>

        {/* MENU */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Item icone={IMAGES.icons.home.active} texto="Home" onClick={() => irPara("home")} />
          <Item icone={IMAGES.icons.receitas.active} texto="Receitas" onClick={() => irPara("receitas")} />
          <Item icone={IMAGES.icons.favoritos.active} texto="Favoritos" onClick={() => irPara("favoritos")} />
          <Item icone={IMAGES.icons.calculo.active} texto="Simulador" onClick={() => irPara("simulador")} />
          <Item icone={IMAGES.icons.conquistas.active} texto="Conquistas" onClick={() => irPara("conquistas")} />
          <Item icone={IMAGES.icons.abreviacao.active} texto="Abreviações" onClick={() => irPara("abreviatura")} />
          <Item icone={IMAGES.icons.sobre.active} texto="Sobre" onClick={() => irPara("sobre")} />
          <Item icone={IMAGES.icons.contato.active} texto="Contato" onClick={() => irPara("contato")} />
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
        src={icone || IMAGES.ui.logo}
        alt={texto}
        style={{ width: "28px" }}
      />
      <span style={{ fontSize: "15px", fontWeight: "600", color: "#333" }}>
        {texto || ""}
      </span>
    </div>
  );
}