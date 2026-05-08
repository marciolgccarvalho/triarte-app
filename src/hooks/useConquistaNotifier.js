import {
  useEffect,
  useState
} from "react";

import {
  playConquistaSound
} from "@/utils/playConquistaSound";

/* ========================================
   STORAGE
======================================== */

const STORAGE_KEY =
  "conquistas_notificadas";

/* ========================================
   LER STORAGE
======================================== */

function lerNotificadas() {

  try {

    return JSON.parse(

      localStorage.getItem(
        STORAGE_KEY
      ) || "[]"

    );

  } catch {

    return [];

  }

}

/* ========================================
   HOOK
======================================== */

export default function
useConquistaNotifier(lista = []) {

  const [nova, setNova] =
    useState(null);

  useEffect(() => {

    /* ========================================
       SSR
    ======================================== */

    if (
      typeof window === "undefined"
    ) return;

    /* ========================================
       EVITA LOOP
    ======================================== */

    if (nova) return;

    /* ========================================
       JÁ NOTIFICADAS
    ======================================== */

    const jaNotificadas =
      lerNotificadas();

    /* ========================================
       FILTRA NOVAS
    ======================================== */

    const novas =
      lista.filter(

        (c) =>

          c.status ===
            "concluido" &&

          !jaNotificadas.includes(
            c.id
          )

      );

    if (novas.length === 0) {
      return;
    }

    /* ========================================
       PRIMEIRA NOVA
    ======================================== */

    const conquista =
      novas[0];

    /* ========================================
       ABRE MODAL
    ======================================== */

    setNova(conquista);

    /* ========================================
       SALVA STORAGE
    ======================================== */

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify([
        ...jaNotificadas,
        conquista.id
      ])

    );

    /* ========================================
       SOM
    ======================================== */

    playConquistaSound();

    /* ========================================
       VIBRAÇÃO
    ======================================== */

    if (
      navigator.vibrate
    ) {

      navigator.vibrate(120);

    }

  }, [lista, nova]);

  /* ========================================
     API
  ======================================== */

  return {

    nova,

    fechar: () => {

      setNova(null);

    }

  };

}