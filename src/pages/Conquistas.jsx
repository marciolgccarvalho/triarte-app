import {
  gerarConquistas,
  gerarResumo
} from "@/features/conquistas/conquistasEngine";

import ConquistaCard
  from "@/components/conquistas/ConquistaCard";

import ConquistaHeader
  from "@/components/conquistas/ConquistaHeader";

import ConquistaModal
  from "@/components/modals/ConquistaModal";

import useConquistaNotifier
  from "@/hooks/useConquistaNotifier";

export default function Conquistas({
  progresso,
  receitas,
  favoritos
}) {

  /* ========================================
     CONQUISTAS
  ======================================== */

  const lista =
    gerarConquistas({
      progresso,
      receitas,
      favoritos
    });

  const resumo =
    gerarResumo(lista);

  /* ========================================
     NOTIFICAÇÃO
  ======================================== */

  const {
    nova,
    fechar
  } = useConquistaNotifier(
    lista
  );

  /* ========================================
     RENDER
  ======================================== */

  return (

    <div className="page-container cq-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <h2 className="cq-page-title">
        Conquistas
      </h2>

      <p className="cq-page-subtitle">
        Acompanhe sua evolução 💛
      </p>

      {/* ========================================
          RESUMO
      ======================================== */}

      <ConquistaHeader
        resumo={resumo}
      />

      {/* ========================================
          GRID
      ======================================== */}

      <div className="cq-grid">

        {lista.map((c) => (

          <ConquistaCard
            key={c.id}
            c={c}
          />

        ))}

      </div>

      {/* ========================================
          MODAL
      ======================================== */}

      {nova && (

        <ConquistaModal
          conquista={nova}
          onClose={fechar}
        />

      )}

    </div>
  );
}
