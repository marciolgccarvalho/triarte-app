import React from "react";
import { IMAGES } from "../assets/images";

export default function MenuLateral({
  aberto,
  fechar = () => {},
  irPara = () => {}
}) {
  if (!aberto) return null;

  // 🔥 melhora UX: fecha menu ao navegar
  const handleClick = (destino) => {
    irPara(destino);
    fechar();
  };

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

        {/* MENU PRINCIPAL */}
        <div className="sidebar-list">
          <Item icone={IMAGES.icons.home.active} texto="Início" onClick={() => handleClick("home")} />
          <Item icone={IMAGES.icons.receitas.active} texto="Receitas" onClick={() => handleClick("receitas")} />
          <Item icone={IMAGES.icons.favoritos.active} texto="Favoritos" onClick={() => handleClick("favoritos")} />
          <Item icone={IMAGES.icons.calculo.active} texto="Simulador" onClick={() => handleClick("simulador")} />
          <Item icone={IMAGES.icons.conquistas.active} texto="Conquistas" onClick={() => handleClick("conquistas")} />
          <Item icone={IMAGES.icons.abreviacao.active} texto="Abreviações" onClick={() => handleClick("abreviatura")} />
        </div>

        {/* DIVISOR */}
        <div className="sidebar-divider" />

        {/* MENU SECUNDÁRIO */}
        <div className="sidebar-list">
          <Item icone={IMAGES.icons.sobre.active} texto="Sobre" onClick={() => handleClick("sobre")} />

          {/* CONFIGURAÇÕES (CORRETO) */}
          <Item
            icone={IMAGES.icons.configuracoes.active}
            texto="Configurações"
            onClick={() => handleClick("configuracoes")}
          />

          <Item icone={IMAGES.icons.contato.active} texto="Contato" onClick={() => handleClick("contato")} />
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
        src={icone}
        alt={texto}
        className="sidebar-item-icon"
      />

      <span className="sidebar-item-text">
        {texto}
      </span>
    </button>
  );
}