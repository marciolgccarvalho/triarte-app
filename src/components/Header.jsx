export default function Header({ irPara, abrirMenu }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        background: "#fff",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
      }}
    >
      <img
        src="/images/logo/logo.png"
        onClick={() => irPara("home")}
        style={{ width: "44px", cursor: "pointer" }}
      />

      <h2
        onClick={() => irPara("home")}
        style={{ flex: 1, textAlign: "center", margin: 0, cursor: "pointer" }}
      >
        Real Triarte
      </h2>

      <button
        onClick={abrirMenu}
        style={{ background: "none", border: "none" }}
      >
        <img src="/images/icons/menu.png" style={{ width: "44px" }} />
      </button>
    </div>
  );
}