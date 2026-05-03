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
        {/* HEADER */}
        <div className="sidebar-header">
          <img
            src={IMAGES.ui.logo}
            alt="Real Triarte"
            className="sidebar-logo"
          />

          <div className="sidebar-header-text">
            <strong>Real Triarte</strong>
            <span className="small text-muted">Menu principal</span>
          </div>
        </div>

        {/* MENU */}
        <div className="sidebar-list">
          <Item icone={IMAGES.icons.home.active} texto="Início" onClick={() => irPara("home")} />
          <Item icone={IMAGES.icons.receitas.active} texto="Receitas" onClick={() => irPara("receitas")} />
          <Item icone={IMAGES.icons.favoritos.active} texto="Favoritos" onClick={() => irPara("favoritos")} />
          <Item icone={IMAGES.icons.calculo.active} texto="Simulador" onClick={() => irPara("simulador")} />
          <Item icone={IMAGES.icons.conquistas.active} texto="Conquistas" onClick={() => irPara("conquistas")} />
          <Item icone={IMAGES.icons.abreviacao.active} texto="Abreviações" onClick={() => irPara("abreviatura")} />
        </div>

        {/* DIVISOR */}
        <div className="sidebar-divider" />

        {/* EXTRA */}
        <div className="sidebar-list">
          <Item icone={IMAGES.icons.sobre.active} texto="Sobre" onClick={() => irPara("sobre")} />
          <Item icone={IMAGES.icons.contato.active} texto="Contato" onClick={() => irPara("contato")} />
        </div>
      </div>
    </div>
  );
}

function Item({ icone, texto, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className="sidebar-item"
    >
      <img
        src={icone || IMAGES.ui.logo}
        alt={texto}
        className="sidebar-item-icon"
      />

      <span className="sidebar-item-text">
        {texto}
      </span>
    </button>
  );
}