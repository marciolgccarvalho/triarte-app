import { useMemo } from "react";

export function useListas({
  receitas,
  favoritos,
  buscaNome,
  buscaCategoria,
  limite,
  paginaAtual
}) {

  const filtrarLista = (lista) => {
    const nome = buscaNome.toLowerCase();

    return lista.filter((r) => {
      return (
        (nome.length < 3 || r.nome.toLowerCase().includes(nome)) &&
        (buscaCategoria === "" || r.categoria === buscaCategoria)
      );
    });
  };

  const receitasFiltradas = useMemo(
    () => filtrarLista(receitas),
    [receitas, buscaNome, buscaCategoria]
  );

  const receitasFavoritas = useMemo(
    () => receitas.filter((r) => favoritos.includes(r.id)),
    [receitas, favoritos]
  );

  const favoritosFiltrados = useMemo(
    () => filtrarLista(receitasFavoritas),
    [receitasFavoritas, buscaNome, buscaCategoria]
  );

  const paginar = (lista) => {
    const totalPaginas = Math.max(1, Math.ceil(lista.length / limite));

    const itens = lista.slice(
      (paginaAtual - 1) * limite,
      paginaAtual * limite
    );

    return { itens, totalPaginas };
  };

  const receitasPage = useMemo(
    () => paginar(receitasFiltradas),
    [receitasFiltradas, limite, paginaAtual]
  );

  const favoritosPage = useMemo(
    () => paginar(favoritosFiltrados),
    [favoritosFiltrados, limite, paginaAtual]
  );

  const categorias = useMemo(
    () => [...new Set(receitas.map((r) => r.categoria))],
    [receitas]
  );

  return {
    receitasFiltradas,
    favoritosFiltrados,
    receitasPage,
    favoritosPage,
    categorias
  };
}