import { IMAGES } from "@/assets/images";

export default function ConquistaHeader({ resumo }) {
  return (
    <div className="cq-header">

      <div className="cq-stat">
        <img
          src={IMAGES.topoConquistas.conquistas.active}
          alt="Conquistas"
          className="cq-stat-icon-img"
        />

        <strong className="cq-stat-value">
          {resumo.concluidas}/{resumo.total}
        </strong>

        <p className="cq-stat-label">
          Conquistas
        </p>
      </div>

      <div className="cq-stat">
        <img
          src={IMAGES.topoConquistas.concluidas.active}
          alt="Concluído"
          className="cq-stat-icon-img"
        />

        <strong className="cq-stat-value">
          {resumo.percentual}%
        </strong>

        <p className="cq-stat-label">
          Concluído
        </p>
      </div>

      <div className="cq-stat">
        <img
          src={IMAGES.topoConquistas.progresso.active}
          alt="Em progresso"
          className="cq-stat-icon-img"
        />

        <strong className="cq-stat-value">
          {resumo.emProgresso}
        </strong>

        <p className="cq-stat-label">
          Em progresso
        </p>
      </div>

      <div className="cq-stat">
        <img
          src={IMAGES.topoConquistas.lendarias.active}
          alt="Lendárias"
          className="cq-stat-icon-img"
        />

        <strong className="cq-stat-value">
          {resumo.lendarias}
        </strong>

        <p className="cq-stat-label">
          Lendárias
        </p>
      </div>

    </div>
  );
}