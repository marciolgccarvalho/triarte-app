import React from "react";

export default function InstallGate({ instalarApp }) {
  return (
    <div className="screen-center">
      <div>

        <h2>Instale o aplicativo</h2>

        <p className="mt-sm text-muted">
          Para uma melhor experiência, instale o app no seu dispositivo
        </p>

        <button
          onClick={instalarApp}
          className="btn btn-primary mt-md btn-full"
        >
          📱 Instalar App
        </button>

        <p className="small text-muted mt-md">
          Caso o botão não funcione, use o menu do navegador (⋮) e toque em
          "Instalar aplicativo"
        </p>

      </div>
    </div>
  );
}