import "../styles/components/conquistas.css";

import {
  gerarConquistas,
  gerarResumo
} from "../features/conquistas/conquistasEngine";

import ConquistaCard from "../components/conquistas/ConquistaCard";
import ConquistaHeader from "../components/conquistas/ConquistaHeader";
import ConquistaPopup from "../components/conquistas/ConquistaPopup";
import useConquistaNotifier from "../hooks/useConquistaNotifier";

export default function Conquistas({ progresso, receitas, favoritos }) {
  const lista = gerarConquistas({ progresso, receitas, favoritos });
  const resumo = gerarResumo(lista);
  const novaConquista = useConquistaNotifier(lista);

  return (
    <div className="page-container cq-page">
      <h2 className="cq-page-title">Conquistas</h2>
      <p className="cq-page-subtitle">Acompanhe sua evolução 💛</p>

      <ConquistaHeader resumo={resumo} />

      <div className="cq-grid">
        {lista.map((c) => (
          <ConquistaCard key={c.id} c={c} />
        ))}
      </div>

      <ConquistaPopup conquista={novaConquista} />
    </div>
  );
}
