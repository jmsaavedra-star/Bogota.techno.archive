import { useState } from "react";
import { NoiseCanvas } from "./components/NoiseCanvas";
import { HomeScreen } from "./components/HomeScreen";
import { CategoryScreen } from "./components/CategoryScreen";

type Screen = "home" | "artistas" | "colectivos" | "tracks" | "lugares" | "linea";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [opacity, setOpacity] = useState(1);

  function navigateTo(screen: Screen) {
    /* Fade out → switch → fade in */
    setOpacity(0);
    setTimeout(() => {
      setCurrentScreen(screen);
      /* Scroll to top on every navigation */
      window.scrollTo({ top: 0 });
      setOpacity(1);
    }, 500);
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        background: "#0A0A0A",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Animated noise overlay — always visible */}
      <NoiseCanvas />

      {/* Screen wrapper with fade transition */}
      <div
        style={{
          opacity,
          transition: "opacity 0.5s ease",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {currentScreen === "home" ? (
          <HomeScreen onNavigate={navigateTo} />
        ) : (
          <CategoryScreen
            category={currentScreen as Exclude<Screen, "home">}
            onBack={() => navigateTo("home")}
          />
        )}
      </div>
    </div>
  );
}
