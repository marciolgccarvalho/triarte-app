import React from "react";
import MainApp from "./MainApp";
import InstallGate from "./InstallGate";

import SplashScreen from "@/components/SplashScreen";

function App() {

  const [isStandalone, setIsStandalone] =
    React.useState(false);

  const [isDesktop, setIsDesktop] =
    React.useState(false);

  const [instalando, setInstalando] =
    React.useState(false);

  const [promptInstalar, setPromptInstalar] =
    React.useState(null);

  const [loadingSplash, setLoadingSplash] =
    React.useState(true);

  const liberarNoPC = false;

  // SPLASH PREMIUM
  React.useEffect(() => {

    const timer = setTimeout(() => {
      setLoadingSplash(false);
    }, 2800);

    return () => clearTimeout(timer);

  }, []);

  // DETECTA STANDALONE / DESKTOP
  React.useEffect(() => {

    const check = () => {

      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      setIsStandalone(standalone);

      setIsDesktop(
        window.innerWidth > 768
      );

    };

    check();

    const timeout1 =
      setTimeout(check, 1000);

    const timeout2 =
      setTimeout(check, 2500);

    return () => {

      clearTimeout(timeout1);
      clearTimeout(timeout2);

    };

  }, []);

  // CAPTURA PROMPT DE INSTALAÇÃO
  React.useEffect(() => {

    const handler = (e) => {

      e.preventDefault();

      setPromptInstalar(e);

    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );

    };

  }, []);

  // INSTALAÇÃO INICIADA PELO ANDROID
  React.useEffect(() => {

    const handleInstalled = () => {

      setInstalando(true);

    };

    window.addEventListener(
      "appinstalled",
      handleInstalled
    );

    return () => {

      window.removeEventListener(
        "appinstalled",
        handleInstalled
      );

    };

  }, []);

  // INSTALAR APP
  const instalarApp = async () => {

    if (!promptInstalar) {

      alert(
        "Use o menu do navegador para instalar"
      );

      return;

    }

    setInstalando(true);

    promptInstalar.prompt();

    const escolha =
      await promptInstalar.userChoice;

    // usuário cancelou
    if (escolha.outcome !== "accepted") {

      setInstalando(false);

    }

    // limpa prompt após uso
    setPromptInstalar(null);

  };

  // COMPONENTE CENTRAL
  const TelaCentro = ({
    titulo,
    texto
  }) => (

    <div className="screen-center">

      <div>

        <h2>{titulo}</h2>

        <p className="small text-muted mt-sm">
          {texto}
        </p>

      </div>

    </div>

  );

  // SPLASH PREMIUM INICIAL
  if (loadingSplash) {

    return <SplashScreen />;

  }

  // INSTALAÇÃO EM ANDAMENTO
  if (!isStandalone && instalando) {

    return (

      <TelaCentro
        titulo="⏳ Instalando aplicativo..."
        texto="Aguarde a confirmação de “App instalado” do Android. Quando o ícone do aplicativo aparecer na tela inicial do dispositivo, você pode fechar esta página."
      />

    );

  }

  // APP ABERTO NORMALMENTE
  if (
    isStandalone ||
    (liberarNoPC && isDesktop)
  ) {

    return <MainApp />;

  }

  // TELA DE INSTALAÇÃO
  return (
    <InstallGate
      instalarApp={instalarApp}
    />
  );

}

export default App;