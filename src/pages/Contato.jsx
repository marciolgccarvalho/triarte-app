import { IMAGES } from "../assets/images";

export default function Contato() {

  const itens = [
    {
      icon: IMAGES.icons.email.active,
      label: "contato@triarte.com.br",
      action: () => window.location.href = "mailto:contato@triarte.com.br"
    },
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
    <div className="page-container">

      <h2 className="mb-sm">Contato</h2>

      <p className="small text-muted mb-md">
        Entre em contato ou acesse nossas redes:
      </p>

      <div className="grid gap-sm">

        {itens.map((item, index) => (
          <div
            key={index}
            onClick={item.action}
            className="card flex contato-item"
          >
            <img
              src={item.icon}
              alt={item.label}
              className="contato-icon"
            />
            <span>{item.label}</span>
          </div>
        ))}

      </div>

    </div>
  );
}