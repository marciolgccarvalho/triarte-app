import React from "react";

import { IMAGES } from "../../assets/images";

const ITEMS = [
  ["home", IMAGES.icons.home.active, "Início"],
  ["receitas", IMAGES.icons.receitas.active, "Receitas"],
  ["simulador", IMAGES.icons.calculo.active, "Simulador"],
  ["conquistas", IMAGES.icons.conquistas.active, "Conquistas"],
  ["mais", IMAGES.icons.menu.active, "Mais"]
];

export default function Footer({
  pagina,
  irPara,
  abrirMenu
}) {

  return (

    <nav className="app-footer">

      {ITEMS.map(([page, icon, label]) => {

        const ativo = pagina === page;

        return (

          <button
            key={page}
            type="button"
            className={`
              app-footer-item
              ${ativo ? "app-footer-item-active" : ""}
            `}
            onClick={() =>
              page === "mais"
                ? abrirMenu()
                : irPara(page)
            }
          >

            <div className="app-footer-icon-wrapper">

              <img
                src={icon}
                alt={label}
                className="app-footer-icon"
              />

            </div>

            <span className="app-footer-text">
              {label}
            </span>

          </button>

        );

      })}

    </nav>

  );

}