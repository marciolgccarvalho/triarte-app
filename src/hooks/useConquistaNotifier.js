import { useEffect, useState } from "react";

const STORAGE_KEY = "conquistas_notificadas";

function lerNotificadas() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function useConquistaNotifier(lista) {
  const [nova, setNova] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const jaNotificadas = lerNotificadas();

    const novas = lista.filter(
      (c) => c.status === "concluido" && !jaNotificadas.includes(c.id)
    );

    if (novas.length === 0) return;

    const conquista = novas[0];

    setNova(conquista);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...jaNotificadas, conquista.id])
    );

    try {
      const audio = new Audio("/sounds/conquista.mp3");
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}

    if (navigator.vibrate) {
      navigator.vibrate(120);
    }

    const timer = setTimeout(() => {
      setNova(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [lista]);

  return nova;
}
