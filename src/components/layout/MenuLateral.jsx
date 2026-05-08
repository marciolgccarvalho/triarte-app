import React from "react";
import { IMAGES } from "../../assets/images";
import "../../styles/components/menu-lateral.css";

export default function MenuLateral({
  aberto,
  fechar = () => {},
  irPara = () => {},
  pagina
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

          <Item
            icone={IMAGES.icons.home.active}
            texto="Início"
            ativo={pagina === "home"}
            onClick={() => handleClick("home")}
          />

          <Item
            icone={IMAGES.icons.receitas.active}
            texto="Receitas"
             ativo={pagina === "receitas"}
            onClick={() => handleClick("receitas")}
          />

          <Item
            icone={IMAGES.icons.calculo.active}
            texto="Simulador"
             ativo={pagina === "simulador"}
            onClick={() => handleClick("simulador")}
          />

          <Item
            icone={IMAGES.icons.conquistas.active}
            texto="Conquistas"
            ativo={pagina === "conquistas"}
            onClick={() => handleClick("conquistas")}
          />

          <Item
            icone={IMAGES.icons.projeto.active}
            texto="Projetos"
            ativo={pagina === "projetos"}
            onClick={() => handleClick("projetos")}
          />

          <Item
            icone={IMAGES.icons.favoritos.active}
            texto="Favoritos"
             ativo={pagina === "favoritos"}
            onClick={() => handleClick("favoritos")}
          />

          <Item
            icone={IMAGES.icons.linha.active}
            texto="Linhas"
             ativo={pagina === "linhas"}
            onClick={() => handleClick("linhas")}
          />

          <Item
            icone={IMAGES.icons.abreviacao.active}
            texto="Abreviações"
             ativo={pagina === "abreviacoes"}
            onClick={() => handleClick("abreviacoes")}
          />

        </div>

        {/* DIVISOR */}
        <div className="sidebar-divider" />

        {/* MENU SECUNDÁRIO */}
        <div className="sidebar-list">

          <Item
            icone={IMAGES.icons.sobre.active}
            texto="Sobre"
            onClick={() => handleClick("sobre")}
          />

          <Item
            icone={IMAGES.icons.contato.active}
            texto="Contato"
            onClick={() => handleClick("contato")}
          />

          <Item
            icone={IMAGES.icons.configuracoes.active}
            texto="Configurações"
            onClick={() => handleClick("configuracoes")}
          />

        </div>
      </div>
    </div>
  );
}

function Item({ icone, texto, onClick = () => {}, ativo = false }) {

  return (
    <button
      onClick={onClick}
      className={` sidebar-item  ${ativo ? "sidebar-item-active" : ""} `}
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