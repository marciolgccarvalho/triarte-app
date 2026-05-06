export default function ConquistaPopup({ conquista }) {

  if (!conquista) return null;

  return (
    <div className="cq-popup">

      <div className="cq-popup-card">

        <div className="cq-popup-icon">
          {conquista.icone}
        </div>

        <div>
          <strong>Nova conquista!</strong>
          <p>{conquista.titulo}</p>
        </div>

      </div>

    </div>
  );
}