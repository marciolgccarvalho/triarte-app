import React from "react";
import { IMAGES } from "../assets/images";

export default function Sobre() {
  const [sobreAberto, setSobreAberto] = React.useState(null);

  const paragraphStyle = {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.65",
    margin: "0 0 10px",
    textAlign: "left"
  };

  const sectionTitleStyle = {
    margin: "0 0 8px",
    fontSize: "15px",
    color: "#222"
  };

  const sectionBoxStyle = {
    background: "#fff",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "1px solid #eee"
  };

  const listStyle = {
    margin: "8px 0 12px 18px",
    padding: 0,
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.7"
  };

  const infoHeaderStyle = {
    background: "#fff8cc",
    border: "1px solid #f0dd73",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "12px",
    display: "grid",
    gap: "4px",
    color: "#222",
    fontSize: "14px"
  };

  const contactBoxStyle = {
    background: "#fff",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #eee",
    textAlign: "center"
  };

  const emailButtonStyle = {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#ffd400",
    border: "none",
    borderRadius: "10px",
    fontWeight: "800",
    cursor: "pointer",
    color: "#222"
  };

  const secoes = [
    {
      id: "quemSomos",
      titulo: "Quem Somos",
      conteudo: (
        <div>
          <div style={{ textAlign: "center", marginBottom: "18px" }}>
            <img
              src={IMAGES.ui.logo}
              alt="Real Triarte"
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
            />

            <h3 style={{ margin: "12px 0 4px", color: "#222" }}>
              Real Triarte
            </h3>

            <p style={{ margin: 0, fontSize: "13px", color: "#777" }}>
              Amigurumi com carinho, criatividade e passo a passo organizado.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>Nossa história</h4>
            <p style={paragraphStyle}>
              O Real Triarte nasceu para compartilhar receitas de amigurumi de
              forma simples, acessível e acolhedora.
            </p>

            <p style={paragraphStyle}>
              Desde 2020, ajudamos pessoas apaixonadas por artesanato a
              aprender, praticar e evoluir no mundo do amigurumi.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>O que você encontra aqui</h4>
            <ul style={listStyle}>
              <li>Receitas organizadas por personagem e categoria</li>
              <li>Vídeos passo a passo no YouTube</li>
              <li>Lista de materiais</li>
              <li>Favoritos para salvar suas receitas preferidas</li>
              <li>Progresso para acompanhar sua evolução</li>
              <li>Simulador de preço para venda de amigurumi</li>
            </ul>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>Nossa missão</h4>
            <p style={paragraphStyle}>
              Tornar o aprendizado do amigurumi mais leve, prático e
              organizado, ajudando cada pessoa a transformar fios em peças
              cheias de encanto.
            </p>
          </div>

          <div
            style={{
              background: "#fff8cc",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #f0dd73",
              textAlign: "center"
            }}
          >
            <strong style={{ color: "#222" }}>
              Obrigado por fazer parte da comunidade Real Triarte 💛
            </strong>
          </div>
        </div>
      )
    },

    {
      id: "privacidade",
      titulo: "Política de Privacidade",
      conteudo: (
        <div>
          <div style={infoHeaderStyle}>
            <strong>Política de Privacidade</strong>
            <span>Última atualização: 2026</span>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>1. Coleta de dados</h4>
            <p style={paragraphStyle}>
              O aplicativo Real Triarte não coleta dados pessoais sensíveis,
              como nome, telefone, e-mail ou localização.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>2. Dados armazenados no dispositivo</h4>
            <p style={paragraphStyle}>
              O app pode salvar algumas informações localmente no seu aparelho:
            </p>

            <ul style={listStyle}>
              <li>Progresso nas receitas</li>
              <li>Receitas favoritas</li>
              <li>Pontuação e evolução dentro do aplicativo</li>
            </ul>

            <p style={paragraphStyle}>
              Esses dados ficam apenas no dispositivo do usuário e não são
              enviados para servidores externos.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>3. Uso das informações</h4>
            <p style={paragraphStyle}>
              As informações armazenadas localmente são utilizadas apenas para
              melhorar a experiência dentro do aplicativo.
            </p>

            <ul style={listStyle}>
              <li>Salvar seu progresso</li>
              <li>Manter suas receitas favoritas</li>
              <li>Personalizar sua navegação</li>
            </ul>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>4. Serviços de terceiros</h4>
            <p style={paragraphStyle}>
              O aplicativo pode conter links para plataformas externas:
            </p>

            <ul style={listStyle}>
              <li>YouTube</li>
              <li>Mercado Livre</li>
              <li>Redes sociais</li>
            </ul>

            <p style={paragraphStyle}>
              Ao acessar esses serviços, você estará sujeito às políticas de
              privacidade de cada plataforma.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>5. Controle do usuário</h4>
            <p style={paragraphStyle}>
              O usuário pode limpar os dados do aplicativo a qualquer momento
              pelas configurações do navegador ou do dispositivo.
            </p>
          </div>

          <div style={contactBoxStyle}>
            <strong>Dúvidas sobre privacidade?</strong>
            <button
              onClick={() =>
                (window.location.href = "mailto:contato@triarte.com.br")
              }
              style={emailButtonStyle}
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
          <div style={infoHeaderStyle}>
            <strong>Termos de Uso</strong>
            <span>Última atualização: 2026</span>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>1. Uso do aplicativo</h4>
            <p style={paragraphStyle}>
              O Real Triarte é destinado ao aprendizado, organização e
              acompanhamento de receitas de amigurumi.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>2. Conteúdo</h4>
            <p style={paragraphStyle}>
              O aplicativo pode reunir receitas, listas de materiais, vídeos,
              links externos e ferramentas de apoio ao artesanato.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>3. Uso pessoal</h4>
            <p style={paragraphStyle}>
              O conteúdo disponibilizado é voltado para uso pessoal e
              educacional. Não é permitida a redistribuição ou revenda sem
              autorização.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>4. Links externos</h4>
            <p style={paragraphStyle}>
              O app pode direcionar o usuário para serviços externos, como
              YouTube, Mercado Livre e redes sociais. O Real Triarte não se
              responsabiliza pelas políticas ou funcionamento dessas
              plataformas.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>5. Alterações</h4>
            <p style={paragraphStyle}>
              O aplicativo e estes termos podem ser atualizados a qualquer
              momento para melhorias, correções ou ajustes de conteúdo.
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
          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>Dados locais</h4>
            <p style={paragraphStyle}>
              O aplicativo utiliza armazenamento local para salvar progresso,
              favoritos e pontuação.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>Sem cadastro obrigatório</h4>
            <p style={paragraphStyle}>
              O app não exige criação de conta, senha ou envio de dados pessoais
              para funcionar.
            </p>
          </div>

          <div style={sectionBoxStyle}>
            <h4 style={sectionTitleStyle}>Serviços externos</h4>
            <p style={paragraphStyle}>
              Ao acessar links externos, como YouTube, Mercado Livre ou redes
              sociais, o usuário passa a seguir as regras dessas plataformas.
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
          <div style={sectionBoxStyle}>
            <p style={paragraphStyle}>
              O Real Triarte apresenta criações artesanais e conteúdos
              inspirados no universo do amigurumi e da cultura pop.
            </p>

            <p style={paragraphStyle}>
              Este aplicativo não possui vínculo oficial, licença, parceria ou
              associação com marcas, empresas, personagens ou franquias
              eventualmente citadas ou referenciadas.
            </p>

            <p style={paragraphStyle}>
              Todas as marcas pertencem aos seus respectivos proprietários.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <h2 style={{ marginBottom: "6px" }}>Quem Somos</h2>

      <p style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>
        Conheça o Real Triarte, nossa missão e as informações oficiais do
        aplicativo.
      </p>

      {secoes.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#fff",
            borderRadius: "16px",
            marginBottom: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            border: "1px solid #eee"
          }}
        >
          <div
            onClick={() =>
              setSobreAberto(sobreAberto === item.id ? null : item.id)
            }
            style={{
              padding: "15px",
              fontWeight: "800",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#222"
            }}
          >
            <span>{item.titulo}</span>
            <span style={{ fontSize: "20px", color: "#999" }}>
              {sobreAberto === item.id ? "−" : "+"}
            </span>
          </div>

          {sobreAberto === item.id && (
            <div
              style={{
                padding: "14px",
                borderTop: "1px solid #eee",
                background: "#fafafa"
              }}
            >
              {item.conteudo}
            </div>
          )}
        </div>
      ))}

      <div
        style={{
          marginTop: "20px",
          background: "#222",
          color: "#fff",
          padding: "18px",
          borderRadius: "16px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
        }}
      >
        <strong style={{ fontSize: "15px" }}>Versão do App</strong>

        <p style={{ margin: "8px 0 4px", fontSize: "14px" }}>
          Real Triarte v1.0.0
        </p>

        <p style={{ margin: 0, fontSize: "12px", color: "#ddd" }}>
          Desenvolvido por Real Triarte • Brasil
        </p>

        <p style={{ marginTop: "10px", fontSize: "12px", color: "#ccc" }}>
          App educacional de apoio ao aprendizado de amigurumi.
        </p>
      </div>
    </>
  );
}