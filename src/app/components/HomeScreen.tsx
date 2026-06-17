import { useState, useEffect } from "react";
import imgBackground from "figma:asset/e9379d4a6423295672101420ecc0a46fcddbaef3.png";

type Screen = "home" | "artistas" | "colectivos" | "tracks" | "lugares" | "linea";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const CATEGORIES: { id: Screen; label: string; pos: { left: string; top: string } }[] = [
  { id: "artistas",  label: "ARTISTAS",        pos: { left: "62%",  top: "9%"  } },
  { id: "colectivos",label: "COLECTIVOS",       pos: { left: "30%",  top: "22%" } },
  { id: "tracks",    label: "TRACKS",           pos: { left: "74%",  top: "40%" } },
  { id: "lugares",   label: "LUGARES",          pos: { left: "28%",  top: "73%" } },
  { id: "linea",     label: "LINEA DE TIEMPO",  pos: { left: "58%",  top: "83%" } },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [sysTyped, setSysTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [signalVisible, setSignalVisible] = useState(true);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  /* Typewriter: SYS . ONLINE */
  useEffect(() => {
    const target = "SYS . ONLINE";
    let i = 0;
    const timer = setInterval(() => {
      if (i < target.length) {
        setSysTyped(target.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 90);
    return () => clearInterval(timer);
  }, []);

  /* Cursor blink */
  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  /* SIGNAL_DETECTED blink: 1s on / 1s off */
  useEffect(() => {
    const t = setInterval(() => setSignalVisible((v) => !v), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "200vh", background: "#0A0A0A", position: "relative" }}>

      {/* ── MAIN SECTION (100vh) ── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        {/* Background image */}
        <img
          src={imgBackground}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            transform: "scale(1.08)",
            transformOrigin: "center top",
          }}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.5)" }} />

        {/* ── Header ── */}
        <div style={{ position: "absolute", top: 38, left: 36, zIndex: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="5" fill="#D9D9D9" />
          </svg>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 700,
              color: "#a5fe02",
              letterSpacing: 1,
            }}
          >
            {sysTyped}
            <span style={{ opacity: cursorVisible ? 1 : 0, marginLeft: 1 }}>█</span>
          </span>
        </div>

        <div style={{ position: "absolute", top: 60, left: 36, zIndex: 20 }}>
          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(22px, 3vw, 42.1px)",
              fontWeight: 700,
              color: "white",
              lineHeight: "normal",
              margin: 0,
            }}
          >
            BOGOTÁ TECHNO.ARCHIVE
          </h1>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              margin: 0,
              marginTop: 6,
            }}
          >
            ARCHIVO DIGITAL  // EPOCA 1998 - 2002
          </p>
        </div>

        {/* ── Spatial category nodes ── */}
        {CATEGORIES.map((cat) => {
          const hov = hoveredCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              onMouseEnter={() => setHoveredCat(cat.id)}
              onMouseLeave={() => setHoveredCat(null)}
              style={{
                position: "absolute",
                zIndex: 20,
                left: cat.pos.left,
                top: cat.pos.top,
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  padding: "6px 12px",
                  background: hov ? "#FF0033" : "rgba(0,0,0,0.45)",
                  border: `1px solid ${hov ? "#FF0033" : "rgba(255,255,255,0.35)"}`,
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: hov ? "#0A0A0A" : "white",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                    letterSpacing: 1,
                  }}
                >
                  {cat.label}
                </span>
              </div>
            </button>
          );
        })}

        {/* ── "SELECCIONE UNA OPCION" hint ── */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: "6%",
            zIndex: 20,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 700,
            color: "#a5fe02",
            letterSpacing: 1,
          }}
        >
          SELECCIONE UNA OPCION PARA EXPLORAR
        </div>

        {/* ── Bottom nav bar ── */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 0,
            right: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            gap: 28,
            padding: "0 36px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              onMouseEnter={() => setHoveredNav(cat.id)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg width="7" height="7" viewBox="0 0 7 7">
                <circle cx="3.5" cy="3.5" r="3.5" fill={hoveredNav === cat.id ? "#FF0033" : "#D9D9D9"} />
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: hoveredNav === cat.id ? "#FF0033" : "#bfbcbc",
                  letterSpacing: 1,
                  transition: "color 0.2s ease",
                }}
              >
                {cat.label}
              </span>
            </button>
          ))}

          <span
            style={{
              marginLeft: "auto",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#655d5d",
              whiteSpace: "pre",
            }}
          >
            {"4° 35' 56\"      N,  4° 35' 56\"O"}
          </span>
        </div>
      </div>

      {/* ── QUESTION SECTION ── */}
      <div
        style={{
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 32px",
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* Scan line decorative */}
        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 48 }} />

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
            fontWeight: 700,
            color: "#a5fe02",
            letterSpacing: 2,
            marginBottom: 40,
            opacity: signalVisible ? 1 : 0,
            transition: "none",
          }}
        >
          002 // SIGNAL_DETECTED
        </p>

        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(20px, 3.5vw, 42.1px)",
            fontWeight: 700,
            color: "#feffff",
            textAlign: "center",
            lineHeight: 1.35,
            maxWidth: 900,
            margin: 0,
          }}
        >
          ¿QUÉ ESTABA PASANDO EN BOGOTÁ MIENTRAS TÚ AÚN NO ESCUCHABAS TECHNO?
        </h2>

        {/* Category explore buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 64, justifyContent: "center" }}>
          {CATEGORIES.map((cat) => (
            <NavButton key={cat.id} label={cat.label} onClick={() => onNavigate(cat.id)} />
          ))}
        </div>

        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", marginTop: 64 }} />
      </div>
    </div>
  );
}

function NavButton({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        fontWeight: 700,
        color: hov ? "#0A0A0A" : "#F0F0F0",
        background: hov ? "#FF0033" : "transparent",
        border: `1px solid ${hov ? "#FF0033" : "#F0F0F0"}`,
        padding: "10px 22px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        borderRadius: 0,
        letterSpacing: 1,
      }}
    >
      {label}
    </button>
  );
}
