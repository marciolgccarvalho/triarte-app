import { IMAGES } from "../assets/images";
export default function Contato() {
  return (
    <>
      <h2 style={{ marginBottom: "5px" }}>Contato</h2>

      <p
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "15px"
        }}
      >
        Entre em contato ou acesse nossas redes:
      </p>

      <div style={{ display: "grid", gap: "10px" }}>
        
        {/* EMAIL */}
        <div
          onClick={() => window.location.href = "mailto:contato@triarte.com.br"}
          style={{
            background: "#fff",
            padding: "14px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer"
          }}
        >
          <img src={IMAGES.icons.email.active} style={{ width: "32px" }} />
          <span>contato@triarte.com.br</span>
        </div>

        {/* SITE */}
        <div
          onClick={() => window.open("https://triarte.com.br", "_blank")}
          style={{
            background: "#fff",
            padding: "14px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer"
          }}
        >
          <img src={IMAGES.icons.site.active} style={{ width: "32px" }} />
          <span>Site Oficial</span>
        </div>

        {/* YOUTUBE */}
        <div
          onClick={() => window.open("https://www.youtube.com/@RealTriarte", "_blank")}
          style={{
            background: "#fff",
            padding: "14px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer"
          }}
        >
          <img src={IMAGES.icons.youtube.active} style={{ width: "32px" }} />
          <span>YouTube</span>
        </div>

        {/* INSTAGRAM */}
        <div
          onClick={() => window.open("https://instagram.com/realtriarte", "_blank")}
          style={{
            background: "#fff",
            padding: "14px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer"
          }}
        >
          <img src={IMAGES.icons.instagram.active} style={{ width: "32px" }} />
          <span>Instagram</span>
        </div>

        {/* FACEBOOK */}
        <div
          onClick={() => window.open("https://www.facebook.com/realtriarteartesanato", "_blank")}
          style={{
            background: "#fff",
            padding: "14px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer"
          }}
        >
          <img src={IMAGES.icons.facebook.active} style={{ width: "32px" }} />
          <span>Facebook</span>
        </div>

        {/* TIKTOK */}
        <div
          onClick={() => window.open("https://www.tiktok.com/@triarteamigurumi", "_blank")}
          style={{
            background: "#fff",
            padding: "14px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer"
          }}
        >
          <img src={IMAGES.icons.tiktok.active} style={{ width: "32px" }} />
          <span>TikTok</span>
        </div>

      </div>
    </>
  );
}