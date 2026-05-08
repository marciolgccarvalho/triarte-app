import React, { useState } from "react";

import { IMAGES } from "@/assets/images";

import "@/styles/pages/informacoes.css";

export default function Informacoes({
  irPara = () => {}
}) {

  const [aberto, setAberto] = useState(null);

  const toggle = (secao) => {
    setAberto(aberto === secao ? null : secao);
  };

  return (
    <div className="page info-page">

      {/* HERO */}
      <section className="info-hero">

        <div className="info-hero-topo">

          <img
            src={IMAGES.ui.logo}
            alt="Real Triarte"
            className="info-logo"
          />

          <div>

            <span className="info-badge">
              Aplicativo Oficial
            </span>

            <h1 className="page-title info-title">
              Informações
            </h1>

          </div>

        </div>

        <p className="info-descricao info-fade-up">
          O Real Triarte é um aplicativo desenvolvido para apoiar
          artesãos e apaixonados por amigurumi com receitas,
          simuladores, organização de materiais, progresso de vídeos,
          favoritos e conteúdos exclusivos.
        </p>

      </section>

      {/* STATUS */}
      <section className="info-status-row">

        <div className="info-status-card">
          <strong>Receitas</strong>

          <span>
            Organização prática e intuitiva.
          </span>
        </div>

        <div className="info-status-card">
          <strong>Offline</strong>

          <span>
            Dados importantes armazenados localmente.
          </span>
        </div>

        <div className="info-status-card">
          <strong>Atualizações</strong>

          <span>
            Novos conteúdos continuamente.
          </span>
        </div>

      </section>

      {/* SOBRE */}
      <section className="info-card">

        <div className="info-card-header">

          <img
            src={IMAGES.icons.sobre.active}
            alt="Sobre"
            className="info-card-icon"
          />

          <h2>
            Sobre o aplicativo
          </h2>

        </div>

        <div className="info-card-content">

          <p>
            O aplicativo Real Triarte foi criado com foco em
            simplicidade, conforto visual e facilidade de uso,
            especialmente para artesãos que desejam acessar receitas,
            acompanhar progresso e organizar materiais de forma prática.
          </p>

          <p>
            Toda a experiência do aplicativo foi planejada para ser
            intuitiva, leve e agradável, oferecendo uma navegação
            simples e organizada tanto para iniciantes quanto para
            usuários mais experientes.
          </p>

        </div>

      </section>

      {/* RECURSOS */}
      <section className="info-card">

        <div className="info-card-header">

          <img
            src={IMAGES.icons.projeto.active}
            alt="Recursos"
            className="info-card-icon"
          />

          <h2>
            Recursos disponíveis
          </h2>

        </div>

        <div className="info-recursos-grid">

          <div className="info-recurso-item">
            <strong>Receitas</strong>

            <span>
              Acesso organizado às receitas do canal.
            </span>
          </div>

          <div className="info-recurso-item">
            <strong>Favoritos</strong>

            <span>
              Salve receitas para acessar rapidamente.
            </span>
          </div>

          <div className="info-recurso-item">
            <strong>Simulador</strong>

            <span>
              Auxílio para cálculos e planejamento.
            </span>
          </div>

          <div className="info-recurso-item">
            <strong>Materiais</strong>

            <span>
              Organização inteligente dos itens necessários.
            </span>
          </div>

          <div className="info-recurso-item">
            <strong>Conquistas</strong>

            <span>
              Sistema de progresso e acompanhamento.
            </span>
          </div>

          <div className="info-recurso-item">
            <strong>Linhas</strong>

            <span>
              Catálogo visual de cores e fios.
            </span>
          </div>

        </div>

      </section>

      {/* POLÍTICAS */}
      <section className="info-card">

        <div className="info-card-header">

          <img
            src={IMAGES.icons.configuracoes.active}
            alt="Informações legais"
            className="info-card-icon"
          />

          <h2>
            Informações legais
          </h2>

        </div>

        <Accordion
          titulo="Política de Privacidade"
          aberto={aberto === "privacidade"}
          onClick={() => toggle("privacidade")}
        >

          <p>
            O Real Triarte respeita sua privacidade e busca utilizar o
            mínimo possível de dados necessários para o funcionamento do
            aplicativo.
          </p>

          <p>
            Informações locais como favoritos, progresso e preferências
            podem ser armazenadas apenas no dispositivo do usuário para
            melhorar a experiência de uso.
          </p>

          <p>
            O aplicativo não comercializa dados pessoais e não realiza
            compartilhamento indevido de informações com terceiros.
          </p>

          <p>
            Alguns recursos externos, como links para plataformas,
            vídeos e marketplaces, podem seguir políticas próprias de
            privacidade.
          </p>

        </Accordion>

        <Accordion
          titulo="Termos de Uso"
          aberto={aberto === "termos"}
          onClick={() => toggle("termos")}
        >

          <p>
            Ao utilizar o aplicativo Real Triarte, o usuário concorda em
            utilizar os conteúdos de forma responsável e respeitosa.
          </p>

          <p>
            As receitas, imagens, materiais e conteúdos presentes no
            aplicativo são destinados ao uso pessoal e educativo.
          </p>

          <p>
            É proibida a reprodução, redistribuição ou comercialização
            indevida do conteúdo sem autorização prévia.
          </p>

          <p>
            O aplicativo poderá receber melhorias, atualizações e novos
            recursos continuamente visando aprimorar a experiência dos
            usuários.
          </p>

        </Accordion>

        <Accordion
          titulo="Política de Dados"
          aberto={aberto === "dados"}
          onClick={() => toggle("dados")}
        >

          <p>
            O aplicativo pode armazenar informações locais relacionadas
            ao progresso do usuário, favoritos e configurações para
            manter uma experiência consistente entre os acessos.
          </p>

          <p>
            Nenhuma informação financeira é processada diretamente pelo
            aplicativo.
          </p>

          <p>
            Serviços externos eventualmente acessados através de links
            possuem responsabilidade própria sobre dados e políticas.
          </p>

        </Accordion>

        <Accordion
          titulo="Aviso Legal"
          aberto={aberto === "legal"}
          onClick={() => toggle("legal")}
        >

          <p>
            O conteúdo disponibilizado no aplicativo possui caráter
            informativo e educacional.
          </p>

          <p>
            Apesar do esforço contínuo para manter informações corretas e
            atualizadas, o Real Triarte não garante ausência total de
            erros, alterações externas ou indisponibilidades temporárias.
          </p>

          <p>
            O uso do aplicativo é de responsabilidade do usuário.
          </p>

        </Accordion>

      </section>

      {/* SUPORTE */}
      <section
        className="info-suporte"
        onClick={() => irPara("contato")}
      >

        <div className="info-suporte-topo">

          <div className="info-suporte-icon-wrapper">

            <img
              src={IMAGES.icons.contato.active}
              alt="Contato"
              className="info-card-icon"
            />

          </div>

          <div className="info-suporte-content">

            <strong>
              Precisa de ajuda?
            </strong>

            <span>
              Nossa página de contato reúne redes sociais,
              email e canais oficiais do Real Triarte.
            </span>

          </div>

        </div>

        <button
          className="info-suporte-button"
        >

          <span>
            Abrir página de contato
          </span>

        </button>

      </section>

      {/* FOOTER */}
      <section className="info-footer">

        <span>
          Real Triarte
        </span>

        <small>
          Desenvolvido com carinho para a comunidade de artesanato.
        </small>

      </section>

    </div>
  );
}

function Accordion({
  titulo,
  aberto,
  onClick,
  children
}) {

  return (
    <div className="info-accordion">

      <button
        onClick={onClick}
        className="info-accordion-header"
      >

        <span>
          {titulo}
        </span>

        <strong>
          {aberto ? "−" : "+"}
        </strong>

      </button>

      {aberto && (
        <div className="info-accordion-content">
          {children}
        </div>
      )}

    </div>
  );
}