import React from "react";
import { IMAGES } from "../assets/images";

export default function Footer({ pagina, irPara, abrirMenu }) {
  return (
    <div className="app-footer">
      {[
        ["home", IMAGES.icons.home.active, "Início"],
        ["receitas", IMAGES.icons.receitas.active, "Receitas"],
        ["favoritos", IMAGES.icons.favoritos.active, "Favoritos"],
        ["conquistas", IMAGES.icons.conquistas.active, "Conquistas"],
        ["mais", IMAGES.icons.menu.active, "Mais"]
      ].map(([page, icon, label]) => (
        <div
          key={page}
          onClick={() =>
            page === "mais" ? abrirMenu() : irPara(page)
          }
          className={`app-footer-item ${pagina === page ? "active" : ""}`}
        >
          <img src={icon} className="app-footer-icon" />
          <span className="app-footer-text">{label}</span>
        </div>
      ))}
    </div>
  );
}