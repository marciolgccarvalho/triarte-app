import { useEffect, useState } from "react";

const STORAGE_KEY = "conquistas_notificadas";

function lerNotificadas() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

export default function useConquistaNotifier(lista) {
  const [nova, setNova] = useState(null);

  useEffect(() => {
    // =========================================
    // SSR
    // =========================================
    if (typeof window === "undefined") return;

    // =========================================
    // EVITA LOOP
    // =========================================
    if (nova) return;

    const jaNotificadas = lerNotificadas();

    const novas = lista.filter(
      (c) =>
        c.status === "concluido" &&
        !jaNotificadas.includes(c.id)
    );

    if (novas.length === 0) return;

    const conquista = novas[0];

    // =========================================
    // MOSTRA POPUP
    // =========================================
    setNova(conquista);

    // =========================================
    // SALVA COMO NOTIFICADA
    // =========================================
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        ...jaNotificadas,
        conquista.id
      ])
    );

    // =========================================
    // SOM
    // =========================================
    try {
      const audio = new Audio("/sounds/conquista.mp3");

      audio.currentTime = 0;

      audio.play().catch(() => {});
    } catch {}

    // =========================================
    // VIBRAÇÃO
    // =========================================
    if (navigator.vibrate) {
      navigator.vibrate(120);
    }

    // =========================================
    // FECHA AUTOMATICAMENTE
    // =========================================
    const timer = setTimeout(() => {
      setNova(null);
    }, 3500);

    return () => clearTimeout(timer);

  }, [lista, nova]);

  return nova;
}