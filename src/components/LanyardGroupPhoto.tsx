import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { GROUP_PHOTO_URL } from "../data";
import { Shield, Sparkles } from "lucide-react";

export default function LanyardGroupPhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values to track card rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for realistic movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  // Shine overlay position mapping for the radial reflection
  const shineX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to [-0.5, 0.5]
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  return (
    <div className="relative w-full min-h-[620px] md:min-h-[740px] flex flex-col items-center justify-start overflow-hidden py-10 px-4 rounded-3xl bg-gradient-to-b from-[#F4F0E8] to-[#EBE7DF] border border-stone-300/60 shadow-inner">
      
      {/* 3D Soft Ambient Wall Shadow for the lanyard strap & card */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[520px] bg-stone-900/10 blur-[50px] pointer-events-none rounded-full"
        style={{ transform: "translateX(-45%) translateY(40px)" }}
      />

      {/* Floating Branding Elements (Satisfies theme details) */}
      <div className="absolute bottom-12 left-12 text-stone-400/30 pointer-events-none select-none hidden md:block text-left">
        <div className="text-7xl font-serif italic leading-none opacity-25">Collective</div>
        <div className="text-[11px] font-bold font-sans tracking-[0.5em] mt-2 text-stone-500/80 uppercase">VISIONARIES</div>
      </div>
      
      {/* 1. Lanyard Strap Loop (Coming from above) */}
      <div className="absolute top-0 z-10 w-12 h-52 flex flex-col items-center">
        {/* The ribbon strap */}
        <div className="w-full h-full bg-[#0a0a0a] relative shadow-2xl rounded-b-md border-x-2 border-[#161616] overflow-hidden flex flex-col justify-around py-4">
          
          {/* Subtle Satin Sheen Reflection effect */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

          {/* Stitching Line left & right */}
          <div className="absolute inset-y-0 left-1.5 w-[1px] border-l border-dashed border-stone-800 pointer-events-none" />
          <div className="absolute inset-y-0 right-1.5 w-[1px] border-r border-dashed border-stone-800 pointer-events-none" />

          {/* Repeating elegant logo/text on lanyard */}
          <div className="flex flex-col items-center justify-between h-full text-[8px] font-mono select-none tracking-[0.2em] font-extrabold text-white/20">
            <span className="rotate-90 origin-center my-2">RESCUE</span>
            <span className="scale-75 text-[6px] text-white/10">◆</span>
            <span className="rotate-90 origin-center my-2">RESCUE</span>
            <span className="scale-75 text-[6px] text-white/10">◆</span>
            <span className="rotate-90 origin-center my-2">RESCUE</span>
          </div>
        </div>

        {/* Breakdown Buckle Plastic snap at the bottom of the loop */}
        <div className="w-12 h-4.5 bg-[#0f0f0f] border border-stone-800 rounded-sm shadow-md flex items-center justify-between px-1.5 -mt-0.5 relative z-10">
          <div className="w-1.5 h-2.5 bg-stone-700 rounded-sm" />
          <div className="w-6 h-1.5 bg-[#1a1a1a] rounded-sm" />
          <div className="w-1.5 h-2.5 bg-stone-700 rounded-sm" />
        </div>
      </div>

      {/* 2. Metal O-Ring and Hook Connector */}
      <div className="absolute top-[200px] z-10 flex flex-col items-center">
        {/* Metal ring */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-400 via-stone-200 to-stone-600 shadow-md p-[3px] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#dfdfdf] border border-stone-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]" />
        </div>

        {/* Hook */}
        <div className="w-2.5 h-7 bg-stone-400 shadow-md rounded-b -mt-1 relative" />
        
        {/* Clip Bridge */}
        <div className="w-10 h-3 bg-stone-800 rounded-sm shadow-md -mt-0.5 z-10" />
      </div>

      {/* 3. The card hanging and oscillating slightly */}
      <div 
        className="mt-56 z-20 flex items-center justify-center w-full"
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={isHovered ? {} : { 
            rotate: [1.5, -3, 1.5],
            y: [0, -4, 0],
          }}
          transition={isHovered ? {} : { 
            rotate: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 6,
              ease: "easeInOut"
            },
            y: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut"
            }
          }}
          className="w-full flex justify-center"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[92vw] max-w-[345px] sm:max-w-none sm:w-[450px] md:w-[520px] lg:w-[580px] aspect-[1.58] bg-white border-[6px] xs:border-[8px] sm:border-[10px] md:border-[12px] border-white rounded-[24px] xs:rounded-[32px] overflow-hidden flex flex-col shadow-[0_45px_75px_-24px_rgba(0,0,0,0.42)] group select-none"
            style={{
              rotateX: isHovered ? rotateX : 0,
              rotateY: isHovered ? rotateY : 0,
              rotate: isHovered ? -1 : -3, // subtle miring/slanted starting offset
              transformStyle: "preserve-3d"
            }}
          >
            {/* Card Slot Overlay representing the plastic casing holder */}
            <div className="absolute inset-0 border border-stone-200/80 rounded-[16px] xs:rounded-[20px] pointer-events-none z-30" />
            
            {/* Inner Glossy Glare effect when hovering (interactive radial shine) */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                background: `radial-gradient(circle 280px at ${shineX} ${shineY}, rgba(255,255,255,0.22) 0%, transparent 80%)`
              }}
            />

            {/* Full bleed group photo inside photo wrapper container */}
            <div className="flex-1 rounded-[16px] xs:rounded-[20px] overflow-hidden bg-[#fafaf9] relative mt-[3px] mx-[3px]">
              <img 
                src={GROUP_PHOTO_URL}
                alt="Foto Bersama Crew EduRescue Mannequin"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover z-0 filter contrast-[1.03] grayscale-[8%] group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Aesthetic Overlay: Top Header Ribbon of the Badge */}
              <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/35 to-transparent pt-2 pb-5 px-3 xs:pt-3 xs:pb-7 xs:px-4.5 z-10 flex items-start justify-between">
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <div className="p-0.5 sm:p-1 rounded bg-[#0a0a0a] border border-stone-850 shadow flex items-center justify-center">
                    <Shield id="badge_shield_icon" className="w-2 h-2 sm:w-3 sm:h-3 text-amber-400/90 fill-amber-400/90" />
                  </div>
                  <div>
                    <h3 className="text-[7px] xs:text-[9px] sm:text-[10.5px] md:text-[11.5px] font-sans font-black tracking-[0.14em] text-[#e0e0e0] drop-shadow-sm uppercase leading-none">
                      EduRescue Mannequin
                    </h3>
                    <p className="text-[5px] xs:text-[6.5px] sm:text-[7.5px] md:text-[8px] font-mono uppercase tracking-[0.2em] text-[#a8a8a8] mt-0.5 leading-none">
                      Inovasi Alat RJP
                    </p>
                  </div>
                </div>

                {/* Badge type label */}
                <span className="text-[5px] xs:text-[6.5px] sm:text-[7.5px] md:text-[8px] font-mono tracking-wider font-extrabold px-1.5 py-0.5 bg-amber-400/90 text-stone-950 rounded uppercase shadow-sm leading-none">
                  ALL-ACCESS CREW
                </span>
              </div>

              {/* Aesthetic Overlay: Bottom Footer Ribbon of the Badge */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pt-7 pb-2 px-3 xs:pt-9 xs:pb-3 xs:px-4.5 z-10 flex items-end justify-between">
                <div />

                {/* Fake stylish QR/Barcode */}
                <div className="flex flex-col items-end gap-0.5 opacity-80">
                  <div className="flex items-center bg-white/90 p-0.5 rounded-sm gap-[0.8px] xs:gap-[1.2px]">
                    <div className="w-[0.8px] xs:w-[1.2px] h-2 xs:h-3 bg-stone-950" />
                    <div className="w-[1.5px] xs:w-[2px] h-2 xs:h-3 bg-stone-950" />
                    <div className="w-[1px] h-2 xs:h-3 bg-stone-950" />
                    <div className="w-[0.8px] xs:w-[1.2px] h-2 xs:h-3 bg-stone-950" />
                    <div className="w-[2px] h-2 xs:h-3 bg-stone-950" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer Details - matching standard ID 3D Card height class */}
            <div className="h-7 xs:h-9 md:h-10 flex items-center justify-between px-3 xs:px-5 pt-0.5 select-none">
              <div className="flex items-center space-x-1 xs:space-x-1.5">
                <div className="w-1 h-1 rounded-full bg-zinc-900/80 animate-pulse"></div>
                <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-extrabold tracking-[0.25em] uppercase text-zinc-900/90 font-sans">
                  EDURESCUE TEAM
                </span>
              </div>
              <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-zinc-400 tracking-wider font-mono">
                2026 PASS
              </span>
            </div>

          </motion.div>
        </motion.div>
      </div>


    </div>
  );
}

