import React from "react";
import { IMAGES } from "../../assets/images";

export default function Header({ irPara, abrirMenu }) {
  return (
    <div className="app-header">
      <button onClick={() => irPara("home")}>
        <img src={IMAGES.ui.logo} className="app-logo" />
      </button>

      <strong className="app-title-center">Real Triarte</strong>

      <button onClick={abrirMenu}>
        <img src={IMAGES.icons.menu.active} className="app-menu-icon" />
      </button>
    </div>
  );
}