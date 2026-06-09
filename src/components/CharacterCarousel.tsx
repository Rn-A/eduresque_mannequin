import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EXACT_IMAGES = [
  { src: "/images/gambar 1.webp", bg: "#F4845F" },
  { src: "/images/gambar 2.webp", bg: "#6BBF7A" },
  { src: "/images/gambar 3.webp", bg: "#E882B4" },
  { src: "/images/gambar 4.webp", bg: "#6EB5FF" }
];

export default function CharacterCarousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // States for touch swiping on mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Responsive device checks
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToIndex = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const handleNext = () => {
    goToIndex((activeIndex + 1) % 4);
  };

  const handlePrev = () => {
    goToIndex((activeIndex + 3) % 4);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null); // Reset end touch point
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const difference = touchStartX - touchEndX;
    const swipeThreshold = 40; // minimum distance to trigger a swipe

    if (difference > swipeThreshold) {
      handleNext();
    } else if (difference < -swipeThreshold) {
      handlePrev();
    }

    // Reset values
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isAnimating]);

  // Roles derivation
  const roles = {
    center: activeIndex,
    left: (activeIndex + 3) % 4,
    right: (activeIndex + 1) % 4,
    back: (activeIndex + 2) % 4
  };

  const getRoleFromIndex = (idx: number) => {
    if (idx === roles.center) return "center";
    if (idx === roles.left) return "left";
    if (idx === roles.right) return "right";
    return "back";
  };

  const getRoleStyles = (role: "center" | "left" | "right" | "back") => {
    const transitionStyle = {
      transition: "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1)"
    };

    switch (role) {
      case "center":
        return {
          style: {
            ...transitionStyle,
            transform: `translateX(-50%) scale(${isMobile ? 1.0 : 1.25})`,
            filter: "blur(0px)",
            opacity: 1,
            zIndex: 20,
            height: isMobile ? "55%" : "72%",
            left: "50%",
            bottom: "4%"
          }
        };
      case "left":
        return {
          style: {
            ...transitionStyle,
            transform: "translateX(-50%) scale(0.8)",
            filter: "blur(2.2px)",
            opacity: 0.82,
            zIndex: 10,
            height: isMobile ? "45%" : "55%",
            left: isMobile ? "20%" : "30%",
            bottom: "16%"
          }
        };
      case "right":
        return {
          style: {
            ...transitionStyle,
            transform: "translateX(-50%) scale(0.8)",
            filter: "blur(2.2px)",
            opacity: 0.82,
            zIndex: 10,
            height: isMobile ? "45%" : "55%",
            left: isMobile ? "80%" : "70%",
            bottom: "16%"
          }
        };
      case "back":
        return {
          style: {
            ...transitionStyle,
            transform: "translateX(-50%) scale(0.75)",
            filter: "blur(4px)",
            opacity: 0.95,
            zIndex: 5,
            height: isMobile ? "40%" : "50%",
            left: "50%",
            bottom: "16%"
          }
        };
    }
  };

  const handleBgClick = (e: React.MouseEvent) => {
    // If clicking on container but not on figurines, dots, or overlays
    if (e.target === e.currentTarget) {
      handleNext();
    }
  };

  return (
    <div
      onClick={handleBgClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-[650ms] ease-in-out select-none cursor-pointer"
      style={{ backgroundColor: EXACT_IMAGES[activeIndex].bg }}
    >
      {/* Background Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ mixBlendMode: "overlay", opacity: 0.40 }}>
        <filter id="fractalNoiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.08 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#fractalNoiseFilter)" />
      </svg>

      {/* Giant Ghost Text "EDURESCUE" & "MANNEQUIN" */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-none z-1 text-center select-none font-display text-white opacity-95 w-full"
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: "clamp(20px, 7.8vw, 72px)",
          lineHeight: "0.85",
          maxWidth: "100%"
        }}
      >
        <div className="tracking-wider w-full overflow-hidden text-ellipsis whitespace-nowrap">EDURESCUE</div>
        <div className="tracking-wider w-full overflow-hidden text-ellipsis whitespace-nowrap">MANNEQUIN</div>
      </div>

      {/* Responsive Bottom Shadow Overlay under figurines */}
      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[65%] h-[12%] bg-black/30 rounded-full blur-2xl pointer-events-none z-[4]" />

      {/* Figurine Renderings */}
      <div className="absolute inset-0 w-full h-full">
        {EXACT_IMAGES.map((img, idx) => {
          const role = getRoleFromIndex(idx);
          const { style } = getRoleStyles(role);

          return (
            <div
              key={idx}
              className="absolute pointer-events-auto cursor-pointer"
              style={style}
              onClick={(e) => {
                e.stopPropagation();
                if (role !== "center") {
                  goToIndex(idx);
                } else {
                  handleNext();
                }
              }}
            >
              <img loading="lazy" src={img.src}
                alt={`EduRescue Figurines ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-auto h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              />
            </div>
          );
        })}
      </div>

      {/* Desktop Next/Prev Arrow Controls */}
      <div className="hidden sm:block">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 hover:border-white/25 text-white backdrop-blur-md transition-all z-30 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-12 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 hover:border-white/25 text-white backdrop-blur-md transition-all z-30 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Custom dot-navigation on the right side */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-30">
        {EXACT_IMAGES.map((_, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                goToIndex(idx);
              }}
              className="group relative flex items-center justify-center h-4 w-4 cursor-pointer focus:outline-none"
              aria-label={`Progress to slide ${idx + 1}`}
            >
              {/* Central dot */}
              <span
                className={`rounded-full transition-all duration-300 ${isActive
                    ? "w-2.5 h-2.5 bg-white shadow-lg shadow-black/20"
                    : "w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70"
                  }`}
              />
              {/* Side tooltip indicator */}
              {isActive && (
                <span className="absolute right-6 font-mono text-[9px] font-black text-white bg-black/45 px-1.5 py-0.5 rounded tracking-wider shadow-sm select-none border border-white/10">
                  0{idx + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
