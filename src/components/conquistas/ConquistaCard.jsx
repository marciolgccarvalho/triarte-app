import { useEffect, useRef, useState } from "react";

const STATUS_LABEL = {
  concluido: "Concluída",
  progresso: "Em progresso",
  bloqueado: "Bloqueada"
};

const STATUS_CLASS = {
  concluido: "cq-status-concluido",
  progresso: "cq-status-progresso",
  bloqueado: "cq-status-bloqueado"
};

const RARIDADE_CLASS = {
  comum: "cq-raridade-comum",
  raro: "cq-raridade-raro",
  epico: "cq-raridade-epico",
  lendario: "cq-raridade-lendario"
};

export default function ConquistaCard({ c }) {
  const [animar, setAnimar] = useState(false);
  const statusAnterior = useRef(c.status);

  useEffect(() => {
    if (statusAnterior.current !== "concluido" && c.status === "concluido") {
      setAnimar(true);

      const timer = setTimeout(() => {
        setAnimar(false);
      }, 800);

      statusAnterior.current = c.status;
      return () => clearTimeout(timer);
    }

    statusAnterior.current = c.status;
  }, [c.status]);

  const statusClass = STATUS_CLASS[c.status] || "cq-status-bloqueado";
  const raridadeClass = RARIDADE_CLASS[c.raridade] || "cq-raridade-comum";

  return (
    <div
      className={`cq-card ${raridadeClass} ${statusClass} ${
        animar ? "cq-card-animando" : ""
      }`}
    >
      <span className="cq-badge">{c.raridade}</span>

      <div className="cq-icon">{c.icone}</div>

      <h4 className="cq-card-title">{c.titulo}</h4>
      <p className="cq-card-description">{c.descricao}</p>

      <div className="cq-progress">
        <div
          className="cq-progress-fill"
          style={{ width: `${c.progresso}%` }}
        />
      </div>

      <div className="cq-progress-info">
        {Math.min(c.atual, c.meta)} / {c.meta}
      </div>

      <div className={`cq-status ${statusClass}`}>
        {STATUS_LABEL[c.status] || "Bloqueada"}
      </div>
    </div>
  );
}
