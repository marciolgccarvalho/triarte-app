import React from "react";
import "@/styles/components/splash-screen.css";

export default function SplashScreen() {
  return (
    <div className="splash-screen">

      {/* textura suave */}
      <div className="fabric-texture"></div>

      {/* pontos decorativos */}
      <div className="crochet-stitches">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="stitch"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="splash-content">

        {/* logo */}
        <div className="logo-area">

          <div className="soft-bg"></div>

          <img
            src="/logo.webp"
            alt="Real Triarte"
            className="splash-logo"
          />

        </div>

        {/* textos */}
        <div className="splash-texts">

          <h1>Real Triarte</h1>

          <p>
            Feito à mão com carinho
          </p>

        </div>

        {/* animação de lã */}
        <div className="yarn-animation">

          <svg
            className="yarn-svg"
            viewBox="0 0 320 80"
            preserveAspectRatio="none"
          >

            {/* fio */}
            <path
              className="yarn-path"
              d="
                M10 40
                C40 10, 80 70, 120 40
                S200 10, 240 40
                S280 70, 310 40
              "
            />

          </svg>

          {/* bolinha de lã */}
          <div className="yarn-ball"></div>

        </div>

      </div>

    </div>
  );
}