import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Member } from "../types";
import { Cpu, HeartPulse, Code, LayoutDashboard } from "lucide-react";

interface MemberIDCard3DProps {
  member: Member;
}

export default function MemberIDCard3D({ member }: MemberIDCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values to track card rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for realistic movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 120, damping: 20 });

  // Shine overlay positions
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
    x.set(0);
    y.set(0);
  }

  // Get color and icon based on division
  const getDivisionStyle = (div: string) => {
    switch (div.toLowerCase()) {
      case "hardware development":
        return { bg: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: <Cpu className="w-3.5 h-3.5" /> };
      case "medical curriculum":
        return { bg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: <HeartPulse className="w-3.5 h-3.5" /> };
      case "software engineering":
        return { bg: "bg-[#0D5C3A]/10 text-[#0D5C3A] border-[#0D5C3A]/20", icon: <Code className="w-3.5 h-3.5" /> };
      default:
        return { bg: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: <LayoutDashboard className="w-3.5 h-3.5" /> };
    }
  };

  const style = getDivisionStyle(member.division);

  return (
    <div className="relative w-full min-h-[580px] md:min-h-[660px] flex flex-col items-center justify-start overflow-hidden py-10 px-4 rounded-3xl bg-gradient-to-b from-[#F4F0E8] to-[#EBE7DF] border border-stone-300/60 shadow-inner">
      
      {/* 3D Soft Ambient Wall Shadow for lanyard strap & card */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-[500px] bg-stone-900/10 blur-[45px] pointer-events-none rounded-full"
        style={{ transform: "translateX(-45%) translateY(40px)" }}
      />

      {/* Floating Branding Elements (Satisfies theme details) */}
      <div className="absolute bottom-10 left-10 text-stone-400/30 pointer-events-none select-none hidden md:block text-left">
        <div className="text-6xl font-serif italic leading-none opacity-25">Collective</div>
        <div className="text-[10px] font-bold font-sans tracking-[0.5em] mt-2 text-stone-500/80 uppercase">VISIONARIES</div>
      </div>
      
      {/* 1. Lanyard Strap Loop */}
      <div className="absolute top-0 z-10 w-12 h-44 flex flex-col items-center">
        <div className="w-full h-full bg-[#0a0a0a] relative shadow-2xl rounded-b-md border-x-2 border-[#161616] overflow-hidden flex flex-col justify-around py-4">
          {/* Subtle Satin Sheen */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          
          {/* Dashed stitches */}
          <div className="absolute inset-y-0 left-1.5 w-[1px] border-l border-dashed border-stone-800 pointer-events-none" />
          <div className="absolute inset-y-0 right-1.5 w-[1px] border-r border-dashed border-stone-800 pointer-events-none" />

          {/* Repeating branding text */}
          <div className="flex flex-col items-center justify-between h-full text-[8px] font-mono select-none tracking-[0.2em] font-extrabold text-white/20">
            <span className="rotate-90 origin-center my-2">RESCUE</span>
            <span className="scale-75 text-[6px] text-white/10">◆</span>
            <span className="rotate-90 origin-center my-2">RESCUE</span>
          </div>
        </div>

        {/* Breakdown Buckle */}
        <div className="w-12 h-4.5 bg-[#0f0f0f] border border-stone-800 rounded-sm shadow-md flex items-center justify-between px-1.5 -mt-0.5 relative z-10">
          <div className="w-1.5 h-2.5 bg-stone-700 rounded-sm" />
          <div className="w-6 h-1.5 bg-[#1a1a1a] rounded-sm" />
          <div className="w-1.5 h-2.5 bg-stone-700 rounded-sm" />
        </div>
      </div>

      {/* 2. Metal O-Ring and Hook Connector */}
      <div className="absolute top-[170px] z-10 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-400 via-stone-200 to-stone-600 shadow-md p-[3px] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#dfdfdf] border border-stone-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]" />
        </div>
        <div className="w-2.5 h-7 bg-stone-400 shadow-md rounded-b -mt-1 relative" />
        <div className="w-10 h-3 bg-stone-800 rounded-sm shadow-md -mt-0.5 z-10" />
      </div>

      {/* 3. Portrait 3D ID Card Container */}
      <div 
        className="mt-48 z-20 flex-1 flex items-center justify-center w-full"
        style={{ perspective: 1000 }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-[280px] md:w-[320px] h-[390px] md:h-[440px] bg-white border-[7px] md:border-[9px] border-white rounded-[28px] overflow-hidden flex flex-col shadow-[0_45px_70px_-20px_rgba(0,0,0,0.4)] selection:bg-stone-200 group"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Card Border Overlay */}
          <div className="absolute inset-0 border border-stone-200/80 rounded-[18px] pointer-events-none z-30" />
          
          {/* Glossy shine element */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none z-30"
            style={{
              background: `radial-gradient(circle 200px at ${shineX} ${shineY}, rgba(255,255,255,0.25) 0%, transparent 80%)`
            }}
          />

          {/* Slot/Punch Hole */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 z-30">
            <div className="w-full h-full bg-[#EBE7DF] border-4 border-white rounded-full shadow-inner" />
          </div>

          {/* Badge Content Wrapper */}
          <div className="relative flex-1 flex flex-col items-center pt-8 px-4 pb-4">
            
            {/* Header: EVOW Logo / Branding */}
            <div className="w-full flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-[#0a0a0a] rounded flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-amber-400 rotate-45 transform" />
                </div>
                <span className="text-[10px] font-sans font-extrabold tracking-widest text-[#050505] uppercase">
                  EDURESCUE
                </span>
              </div>
              <span className="text-[7px] font-mono tracking-widest font-bold px-1.5 py-0.5 bg-stone-950 text-white rounded">
                CREW PASS
              </span>
            </div>

            {/* Avatar block with division outer ring */}
            <div className="relative group-hover:scale-105 transition-transform duration-500 ease-out z-10 w-24 md:w-28 h-24 md:h-28 rounded-2xl mb-3 overflow-hidden border border-stone-200 shadow-md">
              <img 
                src={member.avatar} 
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent" />
            </div>

            {/* Member Identity */}
            <div className="text-center w-full px-2 mb-2">
              <h4 className="text-[14px] md:text-[16px] font-bold text-stone-900 leading-tight font-sans tracking-tight">
                {member.name}
              </h4>
              <p className="text-[11px] font-semibold text-stone-550 mt-0.5 italic">
                {member.role}
              </p>
            </div>

            {/* Division Pill */}
            <div className={`mt-1 flex items-center justify-center gap-1.5 px-3 py-1 rounded text-[9px] font-mono tracking-wider font-extrabold border uppercase ${style.bg}`}>
              {style.icon}
              <span>{member.division}</span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom Barcode section */}
            <div className="w-full flex items-center justify-between border-t border-dashed border-stone-200 pt-3 mt-3 px-1">
              <div className="text-left">
                <span className="text-[7px] font-mono text-stone-400 block uppercase tracking-wider">
                  REGISTRATION NO.
                </span>
                <span className="text-[10px] font-mono font-bold text-stone-800">
                  {member.idNumber}
                </span>
              </div>
              
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex gap-[0.5px] items-center p-0.5 bg-stone-150 rounded">
                  <div className="w-[1px] h-4 bg-stone-950" />
                  <div className="w-[2px] h-4 bg-stone-950" />
                  <div className="w-[1px] h-4 bg-stone-950" />
                  <div className="w-[3px] h-4 bg-stone-950" />
                  <div className="w-[1.5px] h-4 bg-stone-950" />
                  <div className="w-[2px] h-4 bg-stone-950" />
                </div>
                <span className="text-[6px] font-mono text-stone-400 tracking-wider">
                  SECURE PASS
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

    </div>
  );
}
