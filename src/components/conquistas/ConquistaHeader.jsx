export default function ConquistaHeader({ resumo }) {
  return (
    <div className="cq-header">
      <div className="cq-stat">
        <span className="cq-stat-icon">🏆</span>
        <strong className="cq-stat-value">
          {resumo.concluidas}/{resumo.total}
        </strong>
        <p className="cq-stat-label">Conquistas</p>
      </div>

      <div className="cq-stat">
        <span className="cq-stat-icon">⭐</span>
        <strong className="cq-stat-value">{resumo.percentual}%</strong>
        <p className="cq-stat-label">Concluído</p>
      </div>

      <div className="cq-stat">
        <span className="cq-stat-icon">🔥</span>
        <strong className="cq-stat-value">{resumo.emProgresso}</strong>
        <p className="cq-stat-label">Em progresso</p>
      </div>

      <div className="cq-stat">
        <span className="cq-stat-icon">💎</span>
        <strong className="cq-stat-value">{resumo.lendarias}</strong>
        <p className="cq-stat-label">Lendárias</p>
      </div>
    </div>
  );
}
