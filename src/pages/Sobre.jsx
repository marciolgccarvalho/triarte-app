import React from "react";
import { IMAGES } from "../assets/images";

export default function Sobre() {
  const [sobreAberto, setSobreAberto] = React.useState(null);

  const secoes = [
    {
      id: "quemSomos",
      titulo: "Quem Somos",
      conteudo: (
        <div>
          <div className="text-center mb-md">
            <img
              src={IMAGES.ui.logo}
              alt="Real Triarte"
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%"
              }}
            />

            <h3 className="mt-sm">Real Triarte</h3>

            <p className="small text-muted">
              Amigurumi com carinho, criatividade e passo a passo organizado.
            </p>
          </div>

          <div className="card mb-sm">
            <h4 className="mb-sm">Nossa história</h4>
            <p className="small text-muted">
              O Real Triarte nasceu para compartilhar receitas de amigurumi de forma simples, acessível e acolhedora.
            </p>
          </div>

          <div className="card mb-sm">
            <h4 className="mb-sm">O que você encontra aqui</h4>
            <ul className="small text-muted">
              <li>Receitas organizadas</li>
              <li>Vídeos passo a passo</li>
              <li>Lista de materiais</li>
              <li>Favoritos</li>
              <li>Progresso</li>
              <li>Simulador de preço</li>
            </ul>
          </div>

          <div className="card mb-sm">
            <h4 className="mb-sm">Nossa missão</h4>
            <p className="small text-muted">
              Tornar o aprendizado do amigurumi mais leve, prático e organizado.
            </p>
          </div>

          <div
            className="card text-center"
            style={{ background: "var(--color-accent)" }}
          >
            <strong>Obrigado por fazer parte 💛</strong>
          </div>
        </div>
      )
    },

    {
      id: "privacidade",
      titulo: "Política de Privacidade",
      conteudo: (
        <div>
          <div className="card mb-sm">
            <strong>Política de Privacidade</strong>
            <p className="small text-muted">Última atualização: 2026</p>
          </div>

          <div className="card mb-sm">
            <h4>Coleta de dados</h4>
            <p className="small text-muted">
              Não coletamos dados pessoais sensíveis.
            </p>
          </div>

          <div className="card mb-sm">
            <h4>Dados locais</h4>
            <p className="small text-muted">
              Progresso e favoritos ficam no dispositivo.
            </p>
          </div>

          <div className="card text-center">
            <strong>Dúvidas?</strong>

            <button
              onClick={() =>
                (window.location.href = "mailto:contato@triarte.com.br")
              }
              className="btn btn-primary mt-sm"
              style={{ width: "100%" }}
            >
              📧 contato@triarte.com.br
            </button>
          </div>
        </div>
      )
    },

    {
      id: "termos",
      titulo: "Termos de Uso",
      conteudo: (
        <div>
          <div className="card mb-sm">
            <h4>Uso do aplicativo</h4>
            <p className="small text-muted">
              Voltado para aprendizado de amigurumi.
            </p>
          </div>

          <div className="card mb-sm">
            <h4>Conteúdo</h4>
            <p className="small text-muted">
              Inclui receitas, vídeos e ferramentas.
            </p>
          </div>

          <div className="card mb-sm">
            <h4>Uso pessoal</h4>
            <p className="small text-muted">
              Conteúdo para uso educacional.
            </p>
          </div>
        </div>
      )
    },

    {
      id: "dados",
      titulo: "Política de Dados",
      conteudo: (
        <div>
          <div className="card mb-sm">
            <p className="small text-muted">
              Dados ficam apenas no dispositivo.
            </p>
          </div>
        </div>
      )
    },

    {
      id: "aviso",
      titulo: "Aviso Legal",
      conteudo: (
        <div>
          <div className="card">
            <p className="small text-muted">
              O app não possui vínculo com marcas externas.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <h2 className="mb-sm">Sobre</h2>

      <p className="small text-muted mb-md">
        Conheça o Real Triarte e informações do app.
      </p>

      {secoes.map((item) => (
        <div key={item.id} className="card mb-sm">

          <div
            onClick={() =>
              setSobreAberto(sobreAberto === item.id ? null : item.id)
            }
            className="flex"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <strong>{item.titulo}</strong>
            <span>{sobreAberto === item.id ? "−" : "+"}</span>
          </div>

          {sobreAberto === item.id && (
            <div className="mt-sm">
              {item.conteudo}
            </div>
          )}
        </div>
      ))}

      <div
        className="card text-center mt-md"
        style={{
          background: "var(--color-surface)"
        }}
      >
        <strong>Versão do App</strong>

        <p className="small mt-sm">
          Real Triarte v1.0.0
        </p>

        <p className="small text-muted">
          Desenvolvido no Brasil
        </p>
      </div>
    </>
  );
}