// baseado no seu arquivo original

// =========================
// BLOQUEIO ROTAÇÃO
// =========================
if (rotacionado && !liberarNoPC) {
  return (
    <div className="flex-center full-height text-center p-md">
      <div>
        <h2>📱 Gire o celular</h2>
        <p className="text-muted">Use o app na vertical</p>
      </div>
    </div>
  );
}

// =========================
// LAYOUT
// =========================
return (
  <div
    style={{
      width: "100%",
      minHeight: "100vh",
      background: liberarNoPC
        ? "var(--color-bg)"
        : "var(--color-bg-light)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {/* APP CELULAR */}
    <div
      style={{
        width: "100%",
        maxWidth: "430px",
        height: "100vh",
        background: "var(--color-bg-light)",
        position: "relative",
        overflow: "hidden",
        borderRadius: liberarNoPC ? "20px" : "0",
        boxShadow: liberarNoPC
          ? "var(--shadow-lg)"
          : "none"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          background: "var(--color-bg-light)",
          padding: "10px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <img
          src={IMAGES.ui.logo}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            cursor: "pointer"
          }}
          onClick={() => irPara("home")}
        />

        <strong
          style={{
            fontSize: "22px",
            color: "var(--color-text)"
          }}
        >
          Real Triarte
        </strong>

        <img
          src={IMAGES.icons.menu.active}
          style={{
            width: "38px",
            height: "38px",
            cursor: "pointer"
          }}
          onClick={() => setMenuAberto(true)}
        />
      </div>

      {/* MENU LATERAL */}
      <MenuLateral
        aberto={menuAberto}
        fechar={() => setMenuAberto(false)}
        irPara={irPara}
      />

      {/* CONTEÚDO */}
      <div
        style={{
          position: "absolute",
          top: "64px",
          bottom: "66px",
          left: 0,
          right: 0,
          overflowY: "auto",
          padding: "12px 14px"
        }}
      >
        {/* (TODO conteúdo mantido exatamente igual) */}
      </div>

      {/* MENU INFERIOR */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "66px",
          background: "var(--color-bg-light)",
          borderTop: "1px solid var(--color-surface)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 10
        }}
      >
        {[
          ["receitas", IMAGES.icons.receitas.active, "Receitas"],
          ["favoritos", IMAGES.icons.favoritos.active, "Favoritos"],
          ["conquistas", IMAGES.icons.conquistas.active, "Conquistas"],
          ["simulador", IMAGES.icons.calculo.active, "Simulador"]
        ].map(([page, icon, label]) => (
          <div
            key={page}
            onClick={() => irPara(page)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <img src={icon} style={{ width: "27px" }} />
            <span style={{ fontSize: "10px", color: "var(--color-text)" }}>
              {label}
            </span>
          </div>
        ))}

        <div
          onClick={() => setMenuAberto(true)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <img src={IMAGES.icons.menu.active} style={{ width: "27px" }} />
          <span style={{ fontSize: "10px", color: "var(--color-text)" }}>
            Menu
          </span>
        </div>
      </div>
    </div>
  </div>
);