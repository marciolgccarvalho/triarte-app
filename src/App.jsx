import React from "react";
import MainApp from "./MainApp";
import InstallGate from "./InstallGate";

function App() {
  // =========================
  // DETECÇÃO APP (CORRIGIDA)
  // =========================
  const [isStandalone, setIsStandalone] = React.useState(false);

  React.useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true ||
        window.location.href.includes("android-app://");

      setIsStandalone(standalone);
    };

    checkStandalone();

    // 🔥 revalidação (corrige bug pós-instalação Android)
    setTimeout(checkStandalone, 1200);
    setTimeout(checkStandalone, 2500);
    setTimeout(checkStandalone, 4000);
  }, []);

  // =========================
  // ESTADOS INSTALAÇÃO
  // =========================
  const [instalando, setInstalando] = React.useState(false);
  const [promptInstalar, setPromptInstalar] = React.useState(null);
  const [instalado, setInstalado] = React.useState(
    localStorage.getItem("appInstalado") === "true"
  );

  // captura evento de instalação
  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptInstalar(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // quando instala
  React.useEffect(() => {
    const handleInstalled = () => {
      setInstalando(true);

      // 🔥 simula tempo de instalação real
      setTimeout(() => {
        localStorage.setItem("appInstalado", "true");
        setInstalado(true);
        setInstalando(false);
      }, 2500);
    };

    window.addEventListener("appinstalled", handleInstalled);

    return () =>
      window.removeEventListener("appinstalled", handleInstalled);
  }, []);

  // =========================
  // FUNÇÃO INSTALAR
  // =========================
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

  // =========================
  // TELA INSTALANDO
  // =========================
  if (!isStandalone && instalando) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px"
        }}
      >
        <div>
          <h2>⏳ Instalando aplicativo...</h2>
          <p>Aguarde alguns segundos</p>
        </div>
      </div>
    );
  }

  // =========================
  // ACESSO PELO APP
  // =========================
  if (isStandalone) {
    return <MainApp />;
  }

  // =========================
  // NAVEGADOR (INSTALADO)
  // =========================
  if (instalado) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px"
        }}
      >
        <div>
          <h2>✅ App já instalado</h2>
          <p>
            Feche esta página e abra o aplicativo pelo seu celular
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // NAVEGADOR (NÃO INSTALADO)
  // =========================
  return <InstallGate instalarApp={instalarApp} />;
}

export default App;