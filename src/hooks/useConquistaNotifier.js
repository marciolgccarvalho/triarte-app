import { useEffect, useRef, useState } from "react";

const audio = new Audio("/sounds/conquista.mp3");

export default function useConquistaNotifier(lista) {

  const anteriores = useRef([]);
  const [nova, setNova] = useState(null);

  useEffect(() => {

    const novasConquistas = lista.filter(c =>
      c.status === "concluido" &&
      !anteriores.current.includes(c.id)
    );

    if (novasConquistas.length > 0) {

      const conquista = novasConquistas[0];

      setNova(conquista);

      // 🔊 SOM
      try {
        audio.currentTime = 0;
        audio.play();
      } catch (e) {}

      // 📳 VIBRAÇÃO (mobile)
      if (navigator.vibrate) {
        navigator.vibrate(120);
      }

      setTimeout(() => {
        setNova(null);
      }, 2000);
    }

    anteriores.current = lista
      .filter(c => c.status === "concluido")
      .map(c => c.id);

  }, [lista]);

  return nova;
}