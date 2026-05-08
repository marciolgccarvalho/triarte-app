import React from "react";
import "@/styles/components/splash-screen.css";

export default function SplashScreen() {
  return (
    <div className="splash-screen">

      <div className="splash-bg-pattern"></div>

      {/* cantos crochet */}
      <div className="crochet-corner crochet-corner-top"></div>
      <div className="crochet-corner crochet-corner-bottom"></div>

      {/* doodles suaves */}
      <div className="doodle doodle-heart-one">♡</div>
      <div className="doodle doodle-heart-two">♡</div>

      <div className="doodle doodle-spark-one">✦</div>
      <div className="doodle doodle-spark-two">✧</div>

      <div className="splash-content">

        {/* logo */}
        <div className="brand-badge">

          <img
            src="/logo.webp"
            alt="Real Triarte"
            className="splash-logo"
          />

        </div>

        {/* selo */}
        <div className="amigurumi-label">
          AMIGURUMIS
        </div>

        {/* título */}
        <h1 className="splash-title">
          Feitos à mão
        </h1>

        {/* subtítulo */}
        <p className="splash-subtitle">
          com carinho em cada ponto
        </p>

        {/* loader artesanal */}
        <div className="yarn-loader">

          <svg
            viewBox="0 0 320 70"
            className="loader-svg"
          >
            <path
              className="loader-path"
              d="
                M15 38
                C55 8, 95 65, 135 38
                S215 8, 255 38
                S295 65, 315 38
              "
            />
          </svg>

          <div className="loader-ball">
            🧶
          </div>

        </div>

      </div>

    </div>
  );
}