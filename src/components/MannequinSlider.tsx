import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_IMAGES = [
  "/images/edu0.webp",
  "/images/edu1.webp",
  "/images/edu2.webp",
  "/images/edu3.webp",
  "/images/edu4.webp",
  "/images/edu5.webp",
  "/images/edu6.webp"
];

export default function MannequinSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide interval
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 4000); // Ganti gambar setiap 4 detik
    
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  };

  const goToSlide = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide(idx);
  };

  return (
    <div 
      className="w-full flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-slate-50 rounded-2xl border border-slate-300/50 overflow-hidden relative aspect-[1.15/1] sm:aspect-[1.25/1] w-full shadow-inner group">
        
        {/* Gambar Utama */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={SLIDE_IMAGES[currentSlide]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={`EduRescue Mannequin ${currentSlide + 1}`}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Tombol Navigasi Kiri & Kanan (Muncul saat Hover) */}
        <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all border border-white/20 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all border border-white/20 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Titik Navigasi (Dots) di bagian bawah */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 select-none">
          {SLIDE_IMAGES.map((_, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                onClick={(e) => goToSlide(idx, e)}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  isActive 
                    ? "w-5 h-2 bg-white shadow-sm" 
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
