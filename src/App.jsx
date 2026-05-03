import React from "react";
import MainApp from "./MainApp";
import InstallGate from "./InstallGate";

function App() {
  const [isStandalone, setIsStandalone] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      setIsStandalone(standalone);
      setIsDesktop(window.innerWidth > 768);
    };

    check();

    setTimeout(check, 1000);
    setTimeout(check, 2500);
  }, []);

  const liberarNoPC = true;

  const [instalando, setInstalando] = React.useState(false);
  const [promptInstalar, setPromptInstalar] = React.useState(null);
  const [foiInstalado, setFoiInstalado] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptInstalar(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  React.useEffect(() => {
    const handleInstalled = () => {
      setInstalando(true);

      setTimeout(() => {
        setFoiInstalado(true);
        setInstalando(false);
      }, 2000);
    };

    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const instalarApp = async () => {
    if (!promptInstalar) {
      alert("Use o menu do navegador para instalar");
      return;
    }

    promptInstalar.prompt();

    const escolha = await promptInstalar.userChoice;

    if (escolha.outcome === "accepted") {
      setInstalando(true);
    }
  };

  const TelaCentro = ({ titulo, texto }) => (
    <div className="screen-center">
      <div>
        <h2>{titulo}</h2>
        <p className="small text-muted mt-sm">{texto}</p>
      </div>
    </div>
  );

  if (!isStandalone && instalando) {
    return (
      <TelaCentro
        titulo="⏳ Instalando aplicativo..."
        texto="Aguarde alguns segundos"
      />
    );
  }

  if (isStandalone || (liberarNoPC && isDesktop)) {
    return <MainApp />;
  }

  if (foiInstalado) {
    return (
      <TelaCentro
        titulo="✅ App instalado"
        texto="Feche esta página e abra o app pela tela inicial"
      />
    );
  }

  return <InstallGate instalarApp={instalarApp} />;
}

export default App;