import React from "react";
import { IMAGES } from "../assets/images";

export default function MenuLateral({ aberto, fechar = () => {}, irPara = () => {} }) {
  if (!aberto) return null;

  return (
    <div
      onClick={fechar}
      className="modal-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sidebar"
      >
        {/* LOGO */}
        <div className="text-center mb-md">
          <img
            src={IMAGES.ui.logo}
            alt="Logo"
            style={{ width: "70px", borderRadius: "50%" }}
          />
          <h3 className="mt-sm">Real Triarte</h3>
        </div>

        {/* MENU */}
        <div className="list">
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
      className="sidebar-item flex"
      style={{ alignItems: "center", gap: "12px" }}
    >
      <img
        src={icone || IMAGES.ui.logo}
        alt={texto}
        style={{ width: "28px" }}
      />
      <span className="title">
        {texto || ""}
      </span>
    </div>
  );
}