import { useEffect, useState } from "react";

export default function useConquistaNotifier(lista) {

  const [nova, setNova] = useState(null);

  useEffect(() => {

    if (typeof window === "undefined") return;

    // 📌 recupera conquistas já notificadas
    const jaNotificadas = JSON.parse(
      localStorage.getItem("conquistas_notificadas") || "[]"
    );

    // 🔎 encontra novas conquistas concluídas
    const novas = lista.filter(c =>
      c.status === "concluido" &&
      !jaNotificadas.includes(c.id)
    );

    if (novas.length > 0) {

      const conquista = novas[0];

      setNova(conquista);

      // 💾 salva como já exibida
      localStorage.setItem(
        "conquistas_notificadas",
        JSON.stringify([...jaNotificadas, conquista.id])
      );

      // 🔊 SOM (seguro)
      try {
        const audio = new Audio("/sounds/conquista.mp3");
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } catch (e) {}

      // 📳 VIBRAÇÃO (mobile)
      if (navigator.vibrate) {
        navigator.vibrate(120);
      }

      // ⏱️ remove popup
      setTimeout(() => {
        setNova(null);
      }, 2000);
    }

  }, [lista]);

  return nova;
}