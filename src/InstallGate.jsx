import React from "react";

export default function InstallGate({ instalarApp }) {
  const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

  const [instalado, setInstalado] = React.useState(
    localStorage.getItem("appInstalado") === "true" || isStandalone
  );

  React.useEffect(() => {
    const handleInstalled = () => {
      localStorage.setItem("appInstalado", "true");
      setInstalado(true);
    };

    window.addEventListener("appinstalled", handleInstalled);

    return () =>
      window.removeEventListener("appinstalled", handleInstalled);
  }, []);

  // JÁ INSTALADO
  if (instalado) {
    return (
      <div style={estilo}>
        <div>
          <h2>✅ App já instalado</h2>
          <p>Feche esta página e abra o app no seu celular</p>
        </div>
      </div>
    );
  }

  // NÃO INSTALADO
  return (
    <div style={estilo}>
      <div>
        <h2>Instale o aplicativo</h2>

        <button onClick={instalarApp} style={botao}>
          📱 Instalar App
        </button>
      </div>
    </div>
  );
}

const estilo = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  background: "#fff"
};

const botao = {
  marginTop: "20px",
  padding: "14px",
  background: "#FFD400",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer"
};