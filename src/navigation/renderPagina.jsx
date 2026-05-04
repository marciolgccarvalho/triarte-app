import React from "react";

import Home from "../pages/Home";
import Receitas from "../pages/Receitas";
import Favoritos from "../pages/Favoritos";
import Conquistas from "../pages/Conquistas";
import Simulador from "../pages/Simulador";
import Abreviatura from "../pages/Abreviatura";
import Sobre from "../pages/Sobre";
import Contato from "../pages/Contato";
import ReceitaDetalhe from "../pages/ReceitaDetalhe";
import Materiais from "../pages/Materiais";
import Configuracoes from "../pages/Configuracoes";

export function renderPagina({
  pagina,
  mensagemAtual,
  ultimaReceita,
  receitas,
  receitasRandom,
  abrirReceita,
  percentual,
  toggleFavorito,
  favoritos,
  irPara,

  receitasFiltradas,
  receitasPage,

  buscaNome,
  setBuscaNome,
  buscaCategoria,
  setBuscaCategoria,

  categorias,

  modoExibicao,
  setModoExibicao,

  limite,
  setLimite,

  paginaAtual,
  setPaginaAtual,

  favoritosFiltrados,
  favoritosPage,

  receitaSelecionada,
  marcarVideo,
  progresso
}) {
  switch (pagina) {
    case "home":
      return (
        <Home
          mensagemAtual={mensagemAtual}
          ultimaReceita={ultimaReceita}
          receitas={receitas}
          receitasRandom={receitasRandom}
          abrirReceita={abrirReceita}
          percentual={percentual}
          toggleFavorito={toggleFavorito}
          favoritos={favoritos}
          irPara={irPara}
        />
      );

    case "receitas":
      return (
        <Receitas
          receitasFiltradas={receitasFiltradas}
          receitasPaginadas={receitasPage.itens}
          totalPaginas={receitasPage.totalPaginas}

          buscaNome={buscaNome}
          setBuscaNome={setBuscaNome}
          buscaCategoria={buscaCategoria}
          setBuscaCategoria={setBuscaCategoria}

          categorias={categorias}

          modoExibicao={modoExibicao}
          setModoExibicao={setModoExibicao}

          limite={limite}
          setLimite={setLimite}

          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}

          abrirReceita={abrirReceita}
          toggleFavorito={toggleFavorito}
          favoritos={favoritos}
          percentual={percentual}
        />
      );

    case "favoritos":
      return (
        <Favoritos
          receitasFiltradas={favoritosFiltrados}
          receitasPaginadas={favoritosPage.itens}
          totalPaginas={favoritosPage.totalPaginas}

          buscaNome={buscaNome}
          setBuscaNome={setBuscaNome}
          buscaCategoria={buscaCategoria}
          setBuscaCategoria={setBuscaCategoria}

          categorias={categorias}

          modoExibicao={modoExibicao}
          setModoExibicao={setModoExibicao}

          limite={limite}
          setLimite={setLimite}

          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}

          abrirReceita={abrirReceita}
          toggleFavorito={toggleFavorito}
          favoritos={favoritos}
          percentual={percentual}

          irPara={irPara}
        />
      );

    case "receita":
      return (
        <ReceitaDetalhe
          receita={receitaSelecionada}
          marcarVideo={marcarVideo}
          percentual={percentual}
          progresso={progresso}
          favoritos={favoritos}               // ✅ ADICIONADO
          toggleFavorito={toggleFavorito}     // ✅ ADICIONADO
          voltar={() => irPara("home")}
          irPara={irPara}
        />
      );

    case "conquistas":
      return (
        <Conquistas
          voltar={() => irPara("home")}
          progresso={progresso}
          receitas={receitas}
          favoritos={favoritos}
        />
      );

    case "simulador":
      return <Simulador />;

    case "abreviatura":
      return <Abreviatura voltar={() => irPara("home")} />;

    case "sobre":
      return <Sobre />;

    case "configuracoes":
      return <Configuracoes />;

    case "contato":
      return <Contato />;

    case "materiais":
      return (
        <Materiais
          receita={receitaSelecionada}
          voltar={() => irPara("receita")}
        />
      );

    default:
      return null;
  }
}