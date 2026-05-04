import { IMAGES } from "../assets/images";
import "../styles/components/contato.css";

export default function Contato() {

  const itens = [
    {
      icon: IMAGES.icons.site.active,
      label: "Site Oficial",
      action: () => window.open("https://triarte.com.br", "_blank")
    },
    {
      icon: IMAGES.icons.youtube.active,
      label: "YouTube",
      action: () => window.open("https://www.youtube.com/@RealTriarte", "_blank")
    },
    {
      icon: IMAGES.icons.instagram.active,
      label: "Instagram",
      action: () => window.open("https://instagram.com/realtriarte", "_blank")
    },
    {
      icon: IMAGES.icons.facebook.active,
      label: "Facebook",
      action: () => window.open("https://www.facebook.com/realtriarteartesanato", "_blank")
    },
    {
      icon: IMAGES.icons.tiktok.active,
      label: "TikTok",
      action: () => window.open("https://www.tiktok.com/@triarteamigurumi", "_blank")
    }
  ];

  return (
    <div className="page">

      <h2 className="page-title">Contato</h2>

      <p className="text-muted mb-md">
        Fale conosco ou acompanhe nossos conteúdos:
      </p>

      {/* EMAIL DESTAQUE */}
      <div
        className="contato-destaque"
        onClick={() => window.location.href = "mailto:contato@triarte.com.br"}
      >
        <img
          src={IMAGES.icons.email.active}
          alt="Email"
          className="contato-icon"
        />

        <div>
          <strong>Enviar email</strong>
          <p>contato@triarte.com.br</p>
        </div>
      </div>

      {/* REDES */}
      <div className="contato-list">

        {itens.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="contato-item"
          >
            <img
              src={item.icon}
              alt={item.label}
              className="contato-icon"
            />

            <span>{item.label}</span>

            <span className="contato-arrow">›</span>
          </button>
        ))}

      </div>

    </div>
  );
}