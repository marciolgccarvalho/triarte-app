import React from "react";
import MainApp from "./MainApp";
import InstallGate from "./InstallGate";

function App() {
  // =========================
  // DETECÇÃO STANDALONE (REAL)
  // =========================
  const [isStandalone, setIsStandalone] = React.useState(false);

  React.useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      setIsStandalone(standalone);
    };

    checkStandalone();

    // 🔥 revalidação (ajuda pós-instalação Android)
    setTimeout(checkStandalone, 1000);
    setTimeout(checkStandalone, 2500);
  }, []);

  // =========================
  // 🔓 LIBERAÇÃO TEMPORÁRIA NO PC (REMOVER DEPOIS)
  // =========================
  const liberarNoPC = true; // ⬅️ MUDAR PARA false quando publicar
  const isDesktop = window.innerWidth > 768;

  // =========================
  // ESTADOS INSTALAÇÃO
  // =========================
  const [instalando, setInstalando] = React.useState(false);
  const [promptInstalar, setPromptInstalar] = React.useState(null);
  const [foiInstalado, setFoiInstalado] = React.useState(false);

  // =========================
  // CAPTURA EVENTO INSTALL
  // =========================
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

  // =========================
  // QUANDO INSTALA
  // =========================
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
  // ACESSO PELO APP INSTALADO OU PC (TEMPORÁRIO)
  // =========================
  if (isStandalone || (liberarNoPC && isDesktop)) {
    return <MainApp />;
  }

  // =========================
  // INSTALOU AGORA (feedback)
  // =========================
  if (foiInstalado) {
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
          <h2>✅ App instalado</h2>
          <p>Feche esta página e abra o app pela tela inicial</p>
        </div>
      </div>
    );
  }

  // =========================
  // NAVEGADOR → MOSTRA INSTALAÇÃO
  // =========================
  return <InstallGate instalarApp={instalarApp} />;
}

export default App;