export function OverlayPattern() {
    return (
      <div
        className="absolute inset-0 z-0 opacity-[0.28] mix-blend-screen pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              -18deg,
              rgba(255,255,255,0.10) 0px,
              rgba(255,255,255,0.10) 2px,
              transparent 2px,
              transparent 10px
            )
          `
        }}
      />
    );
  }
  