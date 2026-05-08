import { useState, useEffect } from "react";

export function useStorage() {

  // =========================
  // FAVORITOS
  // =========================

  const [favoritos, setFavoritos] = useState(() => {

    try {
      return JSON.parse(
        localStorage.getItem("favoritos") || "[]"
      );

    } catch (error) {

      console.error(
        "Erro ao carregar favoritos:",
        error
      );

      return [];
    }
  });

  // =========================
  // PROGRESSO
  // =========================

  const [progresso, setProgresso] = useState(() => {

    try {
      return JSON.parse(
        localStorage.getItem("progresso") || "{}"
      );

    } catch (error) {

      console.error(
        "Erro ao carregar progresso:",
        error
      );

      return {};
    }
  });

  // =========================
  // ÚLTIMA RECEITA
  // =========================

  const [ultimaReceitaId, setUltimaReceitaId] = useState(() => {

    try {
      return (
        localStorage.getItem("ultimaReceitaId") || null
      );

    } catch (error) {

      console.error(
        "Erro ao carregar última receita:",
        error
      );

      return null;
    }
  });

  // =========================
  // PERSISTÊNCIA
  // =========================

  useEffect(() => {

    try {
      localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
      );

    } catch (error) {

      console.error(
        "Erro ao salvar favoritos:",
        error
      );
    }

  }, [favoritos]);

  useEffect(() => {

    try {
      localStorage.setItem(
        "progresso",
        JSON.stringify(progresso)
      );

    } catch (error) {

      console.error(
        "Erro ao salvar progresso:",
        error
      );
    }

  }, [progresso]);

  useEffect(() => {

    try {

      if (ultimaReceitaId) {

        localStorage.setItem(
          "ultimaReceitaId",
          ultimaReceitaId
        );
      }

    } catch (error) {

      console.error(
        "Erro ao salvar última receita:",
        error
      );
    }

  }, [ultimaReceitaId]);

  // =========================
  // AÇÕES
  // =========================

  const toggleFavorito = (id) => {

    setFavoritos((atual) =>

      atual.includes(id)

        ? atual.filter((item) => item !== id)

        : [...atual, id]
    );
  };

  const marcarVideo = (receitaId, index) => {

    setProgresso((atual) => {

      const vistos =
        atual[receitaId]?.vistos || [];

      const novosVistos =
        vistos.includes(index)

          ? vistos.filter((v) => v !== index)

          : [...vistos, index];

      return {
        ...atual,

        [receitaId]: {
          vistos: novosVistos
        }
      };
    });
  };

  // =========================
  // RETORNO
  // =========================

  return {

    favoritos,
    progresso,

    toggleFavorito,
    marcarVideo,

    ultimaReceitaId,
    setUltimaReceitaId
  };
}