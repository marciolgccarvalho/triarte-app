import React, { useState } from "react";

export default function Configuracoes() {
  const [aberto, setAberto] = useState(null);

  const toggle = (item) => {
    setAberto(aberto === item ? null : item);
  };

  return (
    <div className="page">

      <h1 className="page-title">Configurações</h1>

      {/* BLOCO: PRIVACIDADE */}
      <div className="card">

        <Item
          titulo="Política de Privacidade"
          aberto={aberto === "privacidade"}
          onClick={() => toggle("privacidade")}
        >
          <p>
            Este app não coleta dados pessoais sensíveis. Informações como progresso e favoritos são armazenadas apenas no seu dispositivo.
          </p>
        </Item>

        <Item
          titulo="Termos de Uso"
          aberto={aberto === "termos"}
          onClick={() => toggle("termos")}
        >
          <p>
            O uso deste aplicativo é destinado a fins educacionais e recreativos relacionados ao amigurumi.
          </p>
        </Item>

        <Item
          titulo="Política de Dados"
          aberto={aberto === "dados"}
          onClick={() => toggle("dados")}
        >
          <p>
            Nenhuma informação é enviada para servidores externos. Todos os dados permanecem localmente no seu navegador.
          </p>
        </Item>

        <Item
          titulo="Aviso Legal"
          aberto={aberto === "legal"}
          onClick={() => toggle("legal")}
        >
          <p>
            O conteúdo apresentado é de responsabilidade do autor e pode ser alterado sem aviso prévio.
          </p>
        </Item>

      </div>

    </div>
  );
}

function Item({ titulo, aberto, onClick, children }) {
  return (
    <div className="config-item">
      <button onClick={onClick} className="config-header">
        <strong>{titulo}</strong>
        <span>{aberto ? "−" : "+"}</span>
      </button>

      {aberto && (
        <div className="config-content">
          {children}
        </div>
      )}
    </div>
  );
}