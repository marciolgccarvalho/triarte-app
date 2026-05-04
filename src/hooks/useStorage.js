import { useState, useEffect } from "react";

export function useStorage() {
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritos") || "[]");
  });

  const [progresso, setProgresso] = useState(() => {
    return JSON.parse(localStorage.getItem("progresso") || "{}");
  });

  // ✅ NOVO — última receita aberta
  const [ultimaReceitaId, setUltimaReceitaId] = useState(() => {
    return localStorage.getItem("ultimaReceitaId") || null;
  });

  // =========================
  // PERSISTÊNCIA
  // =========================

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem("progresso", JSON.stringify(progresso));
  }, [progresso]);

  useEffect(() => {
    if (ultimaReceitaId) {
      localStorage.setItem("ultimaReceitaId", ultimaReceitaId);
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
      const vistos = atual[receitaId]?.vistos || [];

      const novosVistos = vistos.includes(index)
        ? vistos.filter((v) => v !== index)
        : [...vistos, index];

      return {
        ...atual,
        [receitaId]: { vistos: novosVistos }
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

    // ✅ NOVO
    ultimaReceitaId,
    setUltimaReceitaId
  };
}