export default function ConquistaPopup({ conquista }) {
  if (!conquista) return null;

  return (
    <div className="cq-popup">
      <div className="cq-popup-card">
        <div className="cq-popup-icon">{conquista.icone}</div>

        <div className="cq-popup-content">
          <strong className="cq-popup-title">Nova conquista!</strong>
          <p className="cq-popup-text">{conquista.titulo}</p>
        </div>
      </div>
    </div>
  );
}
