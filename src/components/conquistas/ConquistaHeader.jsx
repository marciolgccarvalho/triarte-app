export default function ConquistaHeader({ resumo }) {
  return (
    <div className="cq-header">
      <div className="cq-stat">
        <span>🏆</span>
        <strong>{resumo.concluidas}/{resumo.total}</strong>
        <p>Conquistas</p>
      </div>

      <div className="cq-stat">
        <span>⭐</span>
        <strong>{resumo.percentual}%</strong>
        <p>Concluído</p>
      </div>

      <div className="cq-stat">
        <span>🔥</span>
        <strong>{resumo.emProgresso}</strong>
        <p>Em progresso</p>
      </div>

      <div className="cq-stat">
        <span>💎</span>
        <strong>{resumo.lendarias}</strong>
        <p>Lendárias</p>
      </div>
    </div>
  );
}