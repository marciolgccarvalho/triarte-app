import { useEffect, useRef, useState } from "react";

export default function ConquistaCard({ c }) {

  const [animar, setAnimar] = useState(false);
  const statusAnterior = useRef(c.status);

  useEffect(() => {
    // só anima quando muda para concluído
    if (statusAnterior.current !== "concluido" && c.status === "concluido") {
      setAnimar(true);

      const t = setTimeout(() => {
        setAnimar(false);
      }, 800);

      return () => clearTimeout(t);
    }

    statusAnterior.current = c.status;
  }, [c.status]);

  return (
    <div className={`cq-card ${c.raridade} ${c.status} ${animar ? "animar" : ""}`}>

      <span className="cq-badge">{c.raridade}</span>

      <div className="cq-icon">
        {c.icone}
      </div>

      <h4>{c.titulo}</h4>
      <p>{c.descricao}</p>

      <div className="cq-progress">
        <div
          className="cq-progress-fill"
          style={{ width: `${c.progresso}%` }}
        />
      </div>

      <div className="cq-progress-info">
        {Math.min(c.atual, c.meta)} / {c.meta}
      </div>

      <div className={`cq-status ${c.status}`}>
        {c.status === "concluido" && "Concluída"}
        {c.status === "progresso" && "Em progresso"}
        {c.status === "bloqueado" && "Bloqueada"}
      </div>

    </div>
  );
}