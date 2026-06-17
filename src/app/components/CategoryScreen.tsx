import { useState, useEffect } from "react";

type Screen = "artistas" | "colectivos" | "tracks" | "lugares" | "linea";

interface CategoryScreenProps {
  category: Screen;
  onBack: () => void;
}

/* ── MOCK DATA ── */
const DATA = {
  artistas: {
    title: "ARTISTAS",
    subtitle: "ARCHIVO // FIGURAS DE LA ESCENA 1998–2002",
    items: [
      {
        name: "DJ CARDÚMENO",
        meta: "1975 — BOGOTÁ",
        desc: "Pionero del techno industrial en la capital. Residente del Club Terracina desde 1998. Sus sets de 6 horas redefinieron el concepto de after-hours en Bogotá.",
        tags: ["INDUSTRIAL", "TECHNO", "BOGOTÁ"],
      },
      {
        name: "SYNTETIKA",
        meta: "ANA LUCÍA MORALES — 1977",
        desc: "Productora y DJ. Fundadora del colectivo Señal Perdida. Primera mujer en tocar en La Bodega de Chapinero (1999). Vinculó la escena local con Detroit.",
        tags: ["DEEP TECHNO", "PRODUCTORA", "COLECTIVOS"],
      },
      {
        name: "BOGOTEC",
        meta: "CARLOS MENDOZA — 1973",
        desc: "DJ y productor. Conocido por sus sets de techno minimalista. Lanzó el primer EP de techno bogotano en vinilo en el año 2000 bajo el sello Zona Negra.",
        tags: ["MINIMAL", "VINILO", "ZONA NEGRA"],
      },
      {
        name: "LA MÁQUINA",
        meta: "DIEGO TORRES — 1976",
        desc: "DJ que importaba selecciones directamente desde Berlín y Detroit. Sus grabaciones en casete circulaban entre los asiduos a las fiestas clandestinas.",
        tags: ["BERLÍN", "DETROIT", "CASETES"],
      },
      {
        name: "VJ PULSO",
        meta: "MARCO REYES — 1979",
        desc: "Artista visual que acompañó todas las fiestas con proyecciones analógicas desde 1999. Usaba proyectores de diapositivas modificados y cine en 8mm.",
        tags: ["VISUALES", "ANALÓGICO", "8MM"],
      },
    ],
  },
  colectivos: {
    title: "COLECTIVOS",
    subtitle: "ARCHIVO // ORGANIZACIONES DE LA ESCENA UNDERGROUND",
    items: [
      {
        name: "CLUB UNDERGROUND BOGOTÁ",
        meta: "1997 — 2003",
        desc: "Primera organización formal de la escena. Gestionaban espacios, convocaban DJs internacionales y publicaban fanzines impresos distribuidos en las fiestas.",
        tags: ["PIONEROS", "FANZINES", "DJs INTERNACIONALES"],
      },
      {
        name: "CIRCUITO NEGATIVO",
        meta: "1998 — 2002",
        desc: "Organizadores de fiestas en bodegas industriales de la Zona Industrial. Convirtieron espacios en desuso en templos temporales del techno bogotano.",
        tags: ["BODEGAS", "ZONA INDUSTRIAL", "UNDERGROUND"],
      },
      {
        name: "COLECTIVO ZONA TECHNO",
        meta: "1999 — 2004",
        desc: "Red de DJs y productores que operaba de forma descentralizada. Sin sede fija, coordinaban por teléfono y flyers físicos. El boca a boca era su medio.",
        tags: ["RED", "FLYERS", "DESCENTRALIZADO"],
      },
      {
        name: "BODEGA 27",
        meta: "2000 — 2002",
        desc: "Espacio autogestionado en Chapinero. Funcionaba los sábados de medianoche a las 8am. Fue clausurado en 2002 tras múltiples operativos policiales.",
        tags: ["AUTOGESTIONADO", "CHAPINERO", "CLAUSURADO"],
      },
      {
        name: "SEÑAL PERDIDA",
        meta: "2001 — 2005",
        desc: "Colectivo fundado por Syntetika. Enfocado en producción y distribución de música. Organizaba talleres de producción clandestinos en apartamentos.",
        tags: ["PRODUCCIÓN", "TALLERES", "DISTRIBUCIÓN"],
      },
    ],
  },
  tracks: {
    title: "TRACKS",
    subtitle: "ARCHIVO // SONIDOS QUE DEFINIERON LA ÉPOCA",
    items: [
      {
        name: '"CHAPINERO 2AM"',
        meta: "DJ CARDÚMENO — 1999 // 132 BPM",
        desc: "Techno industrial de 8 minutos. Grabado en vivo en La Bodega. Circuló en casete durante años antes de ser digitalizado. El BPM exacto es motivo de debate.",
        tags: ["INDUSTRIAL", "CASETE", "8 MIN"],
      },
      {
        name: '"SEÑAL PERDIDA"',
        meta: "SYNTETIKA — 2000 // 128 BPM",
        desc: "Deep techno con samples de radio de onda corta. Producido en un estudio casero con un TR-909 prestado. Referencia fundamental de la escena.",
        tags: ["DEEP", "TR-909", "RADIO"],
      },
      {
        name: '"FRECUENCIA 740"',
        meta: "LA MÁQUINA — 2001 // 135 BPM",
        desc: "Techno acelerado con texturas de modulación analógica. El título hace referencia a la frecuencia de una emisora que transmitía música electrónica de madrugada.",
        tags: ["ANALÓGICO", "MODULACIÓN", "EMISORA"],
      },
      {
        name: '"EL BUNKER"',
        meta: "BOGOTEC — 1998 // 140 BPM",
        desc: "Primer track documentado de la escena bogotana. El más pesado del catálogo. Inspirado en las primeras fiestas en bodegas sin tratamiento acústico.",
        tags: ["PRIMERO", "PESADO", "BODEGAS"],
      },
      {
        name: '"ZONA INDUSTRIAL"',
        meta: "CIRCUITO NEGATIVO — 2002 // 138 BPM",
        desc: "Techno de cierre de era. Producción colectiva que sintetizaba todo lo aprendido. Fue el último lanzamiento del colectivo antes de su disolución.",
        tags: ["COLECTIVO", "CIERRE", "SÍNTESIS"],
      },
      {
        name: '"INTERFERENCIA"',
        meta: "COLECTIVO ZONA TECHNO — 2001 // 125 BPM",
        desc: "Ambient techno de 14 minutos. El track más experimental del archivo. Construido completamente a partir de grabaciones de campo en la ciudad.",
        tags: ["AMBIENT", "CAMPO", "14 MIN"],
      },
    ],
  },
  lugares: {
    title: "LUGARES",
    subtitle: "ARCHIVO // VENUES HISTÓRICOS DE LA ESCENA",
    items: [
      {
        name: "LA BODEGA",
        meta: "CHAPINERO NORTE — CLL 63 #7-28 // 1998–2003",
        desc: "El espacio más importante de la escena. Una bodega de materiales de construcción que los fines de semana se transformaba. Capacidad: ~300 personas.",
        tags: ["CHAPINERO", "300 PERSONAS", "FUNDACIONAL"],
      },
      {
        name: "EL BÚNKER INDUSTRIAL",
        meta: "ZONA INDUSTRIAL — AV. NQS CLL 13 // 1999–2002",
        desc: "Bodega industrial con aislamiento acústico natural por sus muros de concreto de 40cm. El sonido era legendario. Nunca tuvo nombre oficial.",
        tags: ["INDUSTRIAL", "ACÚSTICA", "SIN NOMBRE"],
      },
      {
        name: "TERRACINA",
        meta: "CHAPINERO — CLL 58 #5-18 // 1997–2004",
        desc: "El primer espacio 'oficial'. Bar en el primer piso, pista en el segundo, terraza en el tercero. Puente entre lo comercial y lo underground.",
        tags: ["OFICIAL", "TERRACINA", "PUENTE"],
      },
      {
        name: "AFTER HOURS FACTORY",
        meta: "LA CANDELARIA — CLL 9 #12-45 // 2000–2002",
        desc: "Solo abría cuando cerraba todo lo demás: 6am–12pm. La luz del sol entrando por las grietas mientras sonaba techno era su sello distintivo.",
        tags: ["6AM", "LUZ SOLAR", "AFTER HOURS"],
      },
      {
        name: "APARTAMENTO 304",
        meta: "TEUSAQUILLO — DIRECCIÓN CLASIFICADA // 1997–1999",
        desc: "Antes de los venues, existían los apartamentos. El 304 fue el primero. 40 personas máximo, sistema de sonido casero, listas controladas por SMS.",
        tags: ["CLANDESTINO", "40 PERSONAS", "SMS"],
      },
    ],
  },
  linea: {
    title: "LINEA DE TIEMPO",
    subtitle: "ARCHIVO // CRONOLOGÍA DE LA ESCENA 1997–2002",
    items: [
      {
        name: "1997",
        meta: "EL ORIGEN",
        desc: "Primeras fiestas techno en apartamentos de Teusaquillo y La Soledad. Influenciadas por cassettes traídos de Chicago y Detroit. Asistencia máxima: 40 personas.",
        tags: ["APARTAMENTOS", "CASSETTES", "INICIO"],
      },
      {
        name: "1998",
        meta: "EL PRIMER ESPACIO",
        desc: "Apertura de Terracina como primer espacio semipermanente. La Bodega hace su primera fiesta en noviembre. DJ Cardúmeno y Bogotec establecen sus residencias.",
        tags: ["TERRACINA", "LA BODEGA", "RESIDENCIAS"],
      },
      {
        name: "1999",
        meta: "LA CONSOLIDACIÓN",
        desc: '"La Noche Más Larga" — primer festival del Club Underground Bogotá. 18 horas continuas, 12 DJs, ~500 personas. La escena existe oficialmente.',
        tags: ["FESTIVAL", "18 HORAS", "500 PERSONAS"],
      },
      {
        name: "2000",
        meta: "EL VINILO",
        desc: "Bogotec lanza el primer EP de techno bogotano en vinilo bajo el sello Zona Negra. 500 copias. Syntetika comienza a producir en su estudio casero. Conexión con Berlín.",
        tags: ["VINILO", "500 COPIAS", "BERLÍN"],
      },
      {
        name: "2001",
        meta: "EL APOGEO",
        desc: "Más de 20 eventos mensuales en la ciudad. VJ Pulso introduce las proyecciones visuales. El Búnker Industrial llega a su máxima capacidad. La escena es irrefrenable.",
        tags: ["20 EVENTOS", "VISUALES", "APOGEO"],
      },
      {
        name: "2002",
        meta: "EL CIERRE",
        desc: "Operativos policiales clausuran La Bodega y Bodega 27. El Búnker Industrial cierra. Muchos DJs emigran a Madrid y Berlín. La escena se atomiza. El archivo queda.",
        tags: ["CLAUSURAS", "MIGRACIÓN", "FIN DE ERA"],
      },
    ],
  },
};

export function CategoryScreen({ category, onBack }: CategoryScreenProps) {
  const data = DATA[category];
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [hoveredBack, setHoveredBack] = useState(false);
  const [signalVisible, setSignalVisible] = useState(true);

  /* SIGNAL blink */
  useEffect(() => {
    const t = setInterval(() => setSignalVisible((v) => !v), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        color: "#F0F0F0",
        padding: "0 0 80px 0",
        position: "relative",
        zIndex: 20,
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "24px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            onClick={onBack}
            onMouseEnter={() => setHoveredBack(true)}
            onMouseLeave={() => setHoveredBack(false)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              color: hoveredBack ? "#0A0A0A" : "#F0F0F0",
              background: hoveredBack ? "#FF0033" : "transparent",
              border: `1px solid ${hoveredBack ? "#FF0033" : "rgba(255,255,255,0.3)"}`,
              padding: "6px 14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              borderRadius: 0,
              letterSpacing: 1,
            }}
          >
            ← HOGAR
          </button>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#555",
              letterSpacing: 1,
            }}
          >
            HOGAR → {data.title}
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#a5fe02",
            letterSpacing: 2,
            opacity: signalVisible ? 1 : 0,
          }}
        >
          SIGNAL_DETECTED
        </div>
      </div>

      {/* ── Category header ── */}
      <div
        style={{
          padding: "48px 36px 32px 36px",
          borderBottom: "1px solid rgba(255,0,51,0.3)",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 700,
            color: "#FF0033",
            letterSpacing: 3,
            margin: 0,
            marginBottom: 12,
          }}
        >
          BOGOTÁ TECHNO.ARCHIVE // CATEGORIA
        </p>
        <h1
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(28px, 5vw, 56px)",
            fontWeight: 700,
            color: "white",
            margin: 0,
            lineHeight: "normal",
          }}
        >
          {data.title}
        </h1>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            color: "#555",
            margin: 0,
            marginTop: 8,
            letterSpacing: 1,
          }}
        >
          {data.subtitle}
        </p>
      </div>

      {/* ── Items grid ── */}
      <div
        style={{
          padding: "40px 36px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 2,
        }}
      >
        {data.items.map((item, i) => {
          const hov = hoveredItem === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredItem(i)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                border: `1px solid ${hov ? "#FF0033" : "rgba(255,255,255,0.07)"}`,
                padding: "28px 24px",
                background: hov ? "rgba(255,0,51,0.04)" : "transparent",
                transition: "all 0.2s ease",
                cursor: "default",
                margin: 1,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#FF0033",
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                {String(i + 1).padStart(3, "0")} //
              </div>
              <h3
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(14px, 1.4vw, 18px)",
                  fontWeight: 700,
                  color: hov ? "#FF0033" : "white",
                  margin: 0,
                  marginBottom: 6,
                  transition: "color 0.2s ease",
                  lineHeight: 1.3,
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#555",
                  margin: 0,
                  marginBottom: 14,
                  letterSpacing: 1,
                }}
              >
                {item.meta}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#9a9a9a",
                  margin: 0,
                  marginBottom: 18,
                  lineHeight: 1.7,
                }}
              >
                {item.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#444",
                      border: "1px solid #222",
                      padding: "2px 8px",
                      letterSpacing: 1,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          padding: "24px 36px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#333",
            letterSpacing: 1,
          }}
        >
          BOGOTÁ TECHNO.ARCHIVE // ARCHIVO DIGITAL 1998–2002
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "#444",
          }}
        >
          {"4° 35' 56\" N,  4° 35' 56\" O"}
        </span>
      </div>
    </div>
  );
}
