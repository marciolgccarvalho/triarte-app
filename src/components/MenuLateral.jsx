import React from "react";
import { IMAGES } from "../assets/images";

export default function MenuLateral({
  aberto,
  fechar = () => {},
  irPara = () => {}
}) {
  if (!aberto) return null;

  return (
    <div onClick={fechar} className="modal-overlay">
      <div
        onClick={(e) => e.stopPropagation()}
        className="sidebar"
      >
        {/* LOGO */}
        <div className="sidebar-header text-center mb-md">
          <img
            src={IMAGES.ui.logo}
            alt="Logo"
            className="sidebar-logo"
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
      className="sidebar-item flex sidebar-item-layout"
    >
      <img
        src={icone || IMAGES.ui.logo}
        alt={texto}
        className="sidebar-item-icon"
      />
      <span className="title">
        {texto || ""}
      </span>
    </div>
  );
}