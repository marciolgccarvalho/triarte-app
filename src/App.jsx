import React from "react";
import MainApp from "./MainApp";
import InstallGate from "./InstallGate";

function App() {
  const [isStandalone, setIsStandalone] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  const [instalando, setInstalando] = React.useState(false);
  const [promptInstalar, setPromptInstalar] = React.useState(null);
  const [foiInstalado, setFoiInstalado] = React.useState(false);

  const liberarNoPC = true;

  React.useEffect(() => {
    const check = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      setIsStandalone(standalone);
      setIsDesktop(window.innerWidth > 768);
    };

    check();

    const timeout1 = setTimeout(check, 1000);
    const timeout2 = setTimeout(check, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

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
      setInstalando(false);
      setFoiInstalado(true);

      // garante atualização do standalone após instalação
      setTimeout(() => {
        const standalone =
          window.matchMedia("(display-mode: standalone)").matches ||
          window.navigator.standalone === true;

        setIsStandalone(standalone);
      }, 500);
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

    setInstalando(true);

    promptInstalar.prompt();

    const escolha = await promptInstalar.userChoice;

    // usuário cancelou instalação
    if (escolha.outcome !== "accepted") {
      setInstalando(false);
    }

    // limpa prompt após uso
    setPromptInstalar(null);
  };

  const TelaCentro = ({ titulo, texto }) => (
    <div className="screen-center">
      <div>
        <h2>{titulo}</h2>
        <p className="small text-muted mt-sm">{texto}</p>
      </div>
    </div>
  );

  // tela durante instalação REAL
  if (!isStandalone && instalando) {
    return (
      <TelaCentro
        titulo="⏳ Instalando aplicativo..."
        texto="Aguarde alguns segundos"
      />
    );
  }

  // app aberto corretamente
  if (isStandalone || (liberarNoPC && isDesktop)) {
    return <MainApp />;
  }

  // instalação concluída REAL
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