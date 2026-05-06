import React, { useState } from "react";
import "../styles/components/configuracoes.css";

export default function Configuracoes() {
  const [aberto, setAberto] = useState(null);

  const toggle = (item) => {
    setAberto(aberto === item ? null : item);
  };

  return (
    <div className="page cfg-page">
      <h1 className="page-title">Configurações</h1>

      <div className="cfg-card">
        <Item
          titulo="Política de Privacidade"
          aberto={aberto === "privacidade"}
          onClick={() => toggle("privacidade")}
        >
          <p>
            Sua privacidade é importante para nós. O Real Triarte não coleta
            dados pessoais sensíveis como nome, e-mail, localização ou
            informações bancárias.
          </p>

          <p className="mt-sm">
            Todas as informações relacionadas ao uso do aplicativo, como
            progresso, favoritos e preferências, são armazenadas exclusivamente
            no seu dispositivo.
          </p>

          <p className="mt-sm">
            Não utilizamos sistemas de rastreamento, não compartilhamos dados
            com terceiros e não realizamos qualquer tipo de monitoramento
            externo.
          </p>

          <p className="mt-sm">
            Ao utilizar o aplicativo, você concorda com esta política.
          </p>
        </Item>

        <Item
          titulo="Termos de Uso"
          aberto={aberto === "termos"}
          onClick={() => toggle("termos")}
        >
          <p>
            O Real Triarte é um aplicativo voltado ao aprendizado de amigurumi
            com fins educacionais e recreativos.
          </p>

          <p className="mt-sm">
            Todo o conteúdo disponibilizado, incluindo textos, receitas, vídeos
            e materiais, é protegido por direitos autorais e não pode ser
            reproduzido, distribuído ou comercializado sem autorização prévia.
          </p>

          <p className="mt-sm">
            O uso do aplicativo é de responsabilidade do usuário, sendo vedado
            qualquer uso indevido ou que viole direitos de terceiros.
          </p>

          <p className="mt-sm">
            O aplicativo pode ser atualizado, modificado ou descontinuado a
            qualquer momento, sem aviso prévio.
          </p>
        </Item>

        <Item
          titulo="Política de Dados"
          aberto={aberto === "dados"}
          onClick={() => toggle("dados")}
        >
          <p>
            O Real Triarte funciona de forma local, sem envio de dados para
            servidores externos.
          </p>

          <p className="mt-sm">
            Todas as informações geradas durante o uso do aplicativo permanecem
            armazenadas no seu próprio dispositivo.
          </p>

          <p className="mt-sm">
            Você pode apagar esses dados a qualquer momento, limpando o
            armazenamento do navegador ou do aplicativo.
          </p>

          <p className="mt-sm">
            Não realizamos backup em nuvem nem compartilhamento automático de
            informações.
          </p>
        </Item>

        <Item
          titulo="Aviso Legal"
          aberto={aberto === "legal"}
          onClick={() => toggle("legal")}
        >
          <p>
            O conteúdo apresentado no Real Triarte tem caráter informativo e
            educacional.
          </p>

          <p className="mt-sm">
            Embora busquemos oferecer instruções claras e acessíveis, não
            garantimos resultados específicos, pois o aprendizado depende de
            fatores individuais.
          </p>

          <p className="mt-sm">
            O uso das técnicas e orientações é de responsabilidade do usuário.
          </p>

          <p className="mt-sm">
            O conteúdo pode ser atualizado, alterado ou removido a qualquer
            momento, sem aviso prévio.
          </p>
        </Item>
      </div>

      <div className="cfg-card cfg-futuro">
        <strong>Configurações do usuário</strong>

        <p>Em breve você poderá ajustar:</p>

        <ul>
          <li>Modo escuro</li>
          <li>Tamanho da fonte</li>
          <li>Preferências do app</li>
        </ul>
      </div>
    </div>
  );
}

function Item({ titulo, aberto, onClick, children }) {
  return (
    <div className="cfg-item">
      <button type="button" onClick={onClick} className="cfg-header">
        <strong>{titulo}</strong>
        <span className="cfg-icon">{aberto ? "−" : "+"}</span>
      </button>

      {aberto && <div className="cfg-content">{children}</div>}
    </div>
  );
}