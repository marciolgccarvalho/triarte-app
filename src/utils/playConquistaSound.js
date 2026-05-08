let audio = null;

export function playConquistaSound() {

  try {

    if (!audio) {
      audio = new Audio("/sounds/conquista.mp3");
    }

    audio.currentTime = 0;

    audio.play().catch(() => {});

  } catch (error) {

    console.error(
      "Erro ao tocar som:",
      error
    );
  }
}