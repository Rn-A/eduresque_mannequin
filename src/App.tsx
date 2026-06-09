/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  IdCard, 
  Mail, 
  Phone, 
  Cpu, 
  Heart, 
  Code, 
  Award, 
  Radio, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  ShieldAlert,
  GraduationCap,
  Check,
  X,
  Star,
  Volume2,
  Lightbulb,
  HeartPulse,
  MessageCircle,
  HelpCircle,
  MapPin,
  ArrowRight,
  TrendingUp,
  Instagram,
  Menu
} from "lucide-react";
import { 
  TEAM_MEMBERS, 
  VISION_MISSION, 
  PRICING_PACKAGES, 
  TESTIMONIALS, 
  FAQS, 
  GALLERY_ITEMS 
} from "./data";
import LanyardGroupPhoto from "./components/LanyardGroupPhoto";
import MemberIDCard3D from "./components/MemberIDCard3D";
import MannequinSlider from "./components/MannequinSlider";
import CharacterCarousel from "./components/CharacterCarousel";

export default function App() {
  const [activeTab, setActiveTab] = useState<"lanyard" | "individual">("lanyard");
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number>(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const activeMember = TEAM_MEMBERS[selectedMemberIndex];

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#F4F0E8] antialiased">
      
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-50 w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-850/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 md:h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/images/logo.PNG" 
              alt="EduRescue Logo" 
              className="w-10 h-10 md:w-11 md:h-11 object-contain drop-shadow-md rounded-[10px]"
            />
            <div>
              <span className="font-serif italic text-lg text-white leading-none block">
                EduRescue
              </span>
              <span className="text-[8px] md:text-[9px] font-extrabold text-stone-400 tracking-[0.16em] block uppercase -mt-0.5 font-sans">
                MANNEQUIN
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center lg:gap-5 xl:gap-8 lg:text-[10px] xl:text-[11px] font-sans font-extrabold tracking-[0.2em] text-stone-400 uppercase">
            <button onClick={() => scrollToSection("beranda")} className="hover:text-white transition-colors cursor-pointer select-none">
              Beranda
            </button>
            <button onClick={() => scrollToSection("manfaat")} className="hover:text-white transition-colors cursor-pointer select-none">
              Manfaat
            </button>
            <button onClick={() => scrollToSection("tentangkami")} className="hover:text-white transition-colors cursor-pointer select-none">
              Tentang Kami
            </button>
            <button onClick={() => scrollToSection("fitur")} className="hover:text-white transition-colors cursor-pointer select-none">
              Teknologi
            </button>
            <button onClick={() => scrollToSection("harga")} className="hover:text-white transition-colors cursor-pointer select-none">
              Paket Harga
            </button>
            <button onClick={() => scrollToSection("galeri")} className="hover:text-white transition-colors cursor-pointer select-none">
              Galeri
            </button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-white transition-colors cursor-pointer select-none">
              FAQ & Ulasan
            </button>
            <button onClick={() => scrollToSection("tim")} className="hover:text-white transition-colors cursor-pointer select-none">
              Tim Kami
            </button>
          </nav>

          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-1.5 text-stone-400 hover:text-white focus:outline-none transition-colors cursor-pointer select-none rounded-lg hover:bg-stone-900 border border-transparent hover:border-stone-800"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden w-full bg-stone-950 border-b border-stone-850/60 overflow-hidden sticky top-12 z-40 shadow-xl"
          >
            <div className="px-6 py-5 space-y-3.5 flex flex-col text-[10px] font-sans font-extrabold tracking-[0.2em] text-stone-400 uppercase">
              <button 
                onClick={() => scrollToSection("beranda")} 
                className="text-left py-2 hover:text-white transition-colors cursor-pointer select-none border-b border-stone-900"
              >
                Beranda
              </button>
              <button 
                onClick={() => scrollToSection("manfaat")} 
                className="text-left py-2 hover:text-white transition-colors cursor-pointer select-none border-b border-stone-900"
              >
                Manfaat
              </button>
              <button 
                onClick={() => scrollToSection("tentangkami")} 
                className="text-left py-2 hover:text-white transition-colors cursor-pointer select-none border-b border-stone-900"
              >
                Tentang Kami
              </button>
              <button 
                onClick={() => scrollToSection("fitur")} 
                className="text-left py-2 hover:text-white transition-colors cursor-pointer select-none border-b border-stone-900"
              >
                Teknologi
              </button>
              <button 
                onClick={() => scrollToSection("harga")} 
                className="text-left py-2 hover:text-white transition-colors cursor-pointer select-none border-b border-stone-900"
              >
                Paket Harga
              </button>
              <button 
                onClick={() => scrollToSection("galeri")} 
                className="text-left py-2 hover:text-white transition-colors cursor-pointer select-none border-b border-stone-900"
              >
                Galeri
              </button>
              <button 
                onClick={() => scrollToSection("faq")} 
                className="text-left py-2 hover:text-white transition-colors cursor-pointer select-none border-b border-stone-900"
              >
                FAQ & Ulasan
              </button>
              <button 
                onClick={() => scrollToSection("tim")} 
                className="text-left py-2 hover:text-white transition-colors cursor-pointer select-none"
              >
                Tim Kami
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section - Introduction to EduRescue */}
      <section id="beranda" className="relative pt-12 md:pt-20 pb-16 md:pb-24 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-stone-900 text-white rounded-full text-[9px] font-mono tracking-[0.2em] uppercase">
                <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>INOVASI MEDIS INDONESIA</span>
              </div>

              {/* Title Description */}
              <h1 className="text-4xl md:text-6xl font-serif italic text-stone-900 tracking-tight leading-[1.08]">
                EduRescue Mannequin: <br />
                <span className="text-stone-700 bg-none not-italic font-sans font-black uppercase text-2xl md:text-3xl tracking-[0.05em] block mt-2">
                  Edukatif & Terpadu
                </span>
              </h1>

              <p className="text-zinc-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-sans font-normal">
                Latih keterampilan Resusitasi Jantung Paru (RJP) dengan alat edukasi phantom medis interaktif yang murah, akurat, dan mudah diakses. 
                Sistem simulasi didukung oleh panduan langsung Bahasa Indonesia, indikator umpan balik visual instan, 
                dan dirancang ergonomis dengan PVC Medical Grade untuk pelatihan taktis tim medis maupun masyarakat awam.
              </p>



              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection("tim")}
                  className="px-6 py-3 bg-stone-950 text-white rounded-xl font-extrabold text-[10px] tracking-[0.18em] uppercase hover:bg-stone-800 transition-all flex items-center gap-2 cursor-pointer shadow-md select-none"
                >
                  <span>Eksplor Anggota Tim & ID Card</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => scrollToSection("harga")}
                  className="px-6 py-3 bg-white text-stone-800 border border-stone-300 rounded-xl font-extrabold text-[10px] tracking-[0.18em] uppercase hover:bg-stone-550 hover:bg-stone-100 transition-colors cursor-pointer select-none"
                >
                  Lihat Pilihan Harga
                </button>
              </div>

            </div>

            {/* Hero Right Visual Column */}
            <div className="lg:col-span-5 relative flex justify-center w-full">
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-stone-200/50 -rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-500">
                <CharacterCarousel />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Manfaat & Keunggulan Section */}
      <section id="manfaat" className="py-16 md:py-24 bg-white border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="flex justify-center">
              <span className="bg-[#E0E7FF]/80 text-[#1E40AF] px-4 py-1.5 rounded-full text-[10px] font-sans font-black uppercase tracking-[0.22em] border border-[#C7D2FE]/70 shadow-2xs">
                Edurescue Mannequin
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif italic text-stone-950 tracking-tight">
              Manfaat & Keunggulan
            </h2>
            <p className="text-[#707070] text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Dirancang sebagai pionir alat peraga edukasi yang cerdas dan ekonomis, EDURESCUE MANNEQUIN hadir dengan layanan jasa pembuatan phantom kustom serta pelatihan intensif bagi masyarakat awam.
            </p>
          </div>

          {/* White Container Card with 2-Column Grid */}
          <div className="bg-[#FAF8F5]/30 border border-stone-200/60 rounded-[2rem] p-6 lg:p-10 shadow-xs max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column - Slide Show */}
              <div className="lg:col-span-6 w-full">
                <MannequinSlider />
              </div>

              {/* Right Column - Text & Checks */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3.5xl font-serif italic text-stone-900 leading-tight">
                    Mengapa Memilih EduRescue?
                  </h3>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mt-3 font-sans">
                    EDURESCUE MANNEQUIN hadir sebagai solusi cerdas yang mengatasi keterbatasan alat peraga komersial. Dengan biaya investasi yang sangat efisien, produk ini menggabungkan material kokoh, teknologi umpan balik presisi, dan kearifan lokal dalam satu paket jasa pembuatan serta pelatihan.
                  </p>
                </div>

                <ul className="space-y-4">
                  {[
                    "Simulasi kompresi dada yang realistis",
                    "Panduan suara dalam Bahasa Indonesia",
                    "Indikator lampu untuk umpan balik visual",
                    "Termasuk pelatihan penggunaan",
                    "Garansi produk 12 bulan"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-150 flex items-center justify-center shrink-0 border border-emerald-250/50 shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-stone-700 text-xs sm:text-sm font-semibold font-sans">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. About Section (Vercel Vision, Mission, & Sponsors) */}
      <section id="tentangkami" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Vision & Mission Info */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="text-[10px] font-sans font-black uppercase tracking-[0.22em] text-amber-600 block">
                  Tentang EduRescue
                </span>
                <h2 className="text-3xl md:text-5xl font-serif italic text-stone-950 tracking-tight mt-1">
                  Misi Kesehatan Untuk Bangsa
                </h2>
                <p className="text-[#707070] text-xs sm:text-sm md:text-base mt-2 max-w-2xl font-sans">
                  {VISION_MISSION.description}
                </p>
              </div>

              {/* Bento cards for Vision, Mission, and Core Goals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Vision Card */}
                <div className="p-6 bg-white rounded-2xl border border-stone-200/50 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.14em] text-stone-900">Visi Kami</h3>
                  <p className="text-stone-500 text-xs sm:text-[13px] leading-relaxed">
                    {VISION_MISSION.vision}
                  </p>
                </div>

                {/* Mission Card */}
                <div className="p-6 bg-white rounded-2xl border border-stone-200/50 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 shrink-0">
                    <Cpu className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.14em] text-stone-900">Misi Kami</h3>
                  <p className="text-stone-500 text-xs sm:text-[13px] leading-relaxed">
                    {VISION_MISSION.mission}
                  </p>
                </div>

                {/* Goals Card */}
                <div className="p-6 bg-white rounded-2xl border border-stone-200/50 shadow-xs space-y-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 shrink-0">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.14em] text-stone-900">Tujuan Utama</h3>
                  <p className="text-stone-500 text-xs sm:text-[13px] leading-relaxed">
                    {VISION_MISSION.goals}
                  </p>
                </div>

              </div>
            </div>

            {/* Sponsors & Affiliates Grid - Right 4 Columns */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-[0.18em] uppercase text-amber-600 block">
                  Detail Sistem Alat
                </span>
                <h3 className="text-lg font-serif italic text-stone-950 tracking-tight mt-0.5">
                  Fitur & Spesifikasi
                </h3>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 bg-stone-50/60 rounded-2xl border border-stone-200/60 space-y-1 hover:bg-stone-50 transition-colors">
                  <div className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-stone-900">
                    Indikator Lampu Presisi
                  </div>
                  <p className="text-[11.5px] text-stone-605 text-stone-600 leading-relaxed font-sans">
                    Memberikan umpan balik visual instan saat kedalaman kompresi mencapai standar 5-6 cm.
                  </p>
                </div>

                <div className="p-4 bg-stone-50/60 rounded-2xl border border-stone-200/60 space-y-1 hover:bg-stone-50 transition-colors">
                  <div className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-stone-900">
                    Layar LCD Digital & Touch Screen
                  </div>
                  <p className="text-[11.5px] text-stone-605 text-stone-600 leading-relaxed font-sans">
                    Menampilkan jumlah kompresi, visualisasi ritme jantung, dan evaluasi hasil secara real-time.
                  </p>
                </div>

                <div className="p-4 bg-stone-50/60 rounded-2xl border border-stone-200/60 space-y-1 hover:bg-stone-50 transition-colors">
                  <div className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-stone-900">
                    Panduan Suara Ritmis
                  </div>
                  <p className="text-[11.5px] text-stone-605 text-stone-600 leading-relaxed font-sans">
                    Speaker terintegrasi yang memandu pengguna menjaga kecepatan kompresi ideal (100-120 kali/menit).
                  </p>
                </div>

                <div className="p-4 bg-stone-50/60 rounded-2xl border border-stone-200/60 space-y-1 hover:bg-stone-50 transition-colors">
                  <div className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-stone-900">
                    Sistem Adaptor Listrik
                  </div>
                  <p className="text-[11.5px] text-stone-605 text-stone-600 leading-relaxed font-sans">
                    Operasional lebih stabil dan hemat biaya tanpa perlu penggantian baterai untuk penggunaan jangka panjang.
                  </p>
                </div>
              </div>

              <div className="text-center pt-1">
                <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                  &bull; SPESIFIKASI PROTIPE UTAMA &bull;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Tech Features Section ("Teknologi") */}
      <section id="fitur" className="py-16 md:py-24 bg-white border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.22em] text-amber-600 block">
              Inovasi Utama
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-stone-950 tracking-tight">
              Teknologi Pelatihan yang Presisi
            </h2>
            <p className="text-[#707070] text-xs sm:text-sm font-sans">
              Kami menyatukan taktil fisik yang ergonomis dengan sistem pemantau pintar untuk melahirkan kesiapan penanganan darurat terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Feature 1 */}
            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-stone-200/50 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-tight">Simulasi CPR Realistis</h3>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
                Mannequin dirancang menyerupai anatomi tubuh manusia dewasa dengan resistensi busa dada proporsional untuk menciptakan kedalaman kompresi klinis yang sesungguhnya.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-stone-200/50 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white">
                <Volume2 className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-tight">Panduan Suara Interaktif</h3>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
                Sistem audio built-in memberikan instruksi vokal langkah demi langkah dalam Bahasa Indonesia untuk membimbing ritme kompresi 100-120 kali per menit secara dinamis.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-stone-200/50 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-tight">Umpan Balik Instan</h3>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
                Lampu indikator visual real-time memberikan konfirmasi langsung mengenai ketepatan letak tangan, serta kedalaman tekanan, guna koreksi mandiri yang cepat.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Pricing Section ("Paket Harga") */}
      <section id="harga" className="py-16 md:py-24 bg-[#FAF8F5]/80 border-b border-stone-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.22em] text-amber-600 block">
              Pilihan Pemesanan
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-stone-950 tracking-tight">
              Investasi Edukasi Terjangkau
            </h2>
            <p className="text-[#707070] text-xs sm:text-sm font-sans">
              Pilih dari model standard atau model pintar berkoneksi IoT cerdas yang disesuaikan dengan kebutuhan simulasi klinis instansi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            
            {PRICING_PACKAGES.map((pkg) => (
              <div 
                key={pkg.name}
                className={`rounded-3xl p-6 bg-white border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  pkg.popular 
                    ? "border-stone-900 shadow-xl ring-2 ring-stone-950/5 scale-102" 
                    : "border-stone-200 shadow-sm hover:border-stone-300"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-3 right-3 z-30 bg-stone-900 text-white text-[8px] font-mono font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md">
                    Rekomendasi Utama
                  </div>
                )}
                
                <div className="space-y-5">
                  
                  {/* Package Image */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden border border-stone-150 relative">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-xs text-white text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded font-extrabold">
                      Rp {pkg.price}
                    </div>
                  </div>

                  {/* Header Title */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-stone-950 tracking-tight uppercase">
                      {pkg.name}
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      {pkg.desc}
                    </p>
                  </div>

                  <hr className="border-stone-100" />

                  {/* Features checklist */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono tracking-wider text-stone-400 font-extrabold uppercase block">
                      Spesifikasi Detail:
                    </span>
                    <ul className="space-y-2 text-xs">
                      {pkg.features.map((feat) => (
                        <li key={feat.name} className="flex items-start gap-2.5 text-stone-600">
                          {feat.included ? (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />
                          )}
                          <span className={feat.included ? "font-medium text-stone-850" : "text-stone-400 line-through"}>
                            {feat.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* CTA Action WhatsApp & TikTok Shop */}
                <div className="pt-6 mt-6 border-t border-stone-100 space-y-2.5">
                  <a 
                    href={pkg.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl text-[10px] sm:text-xs font-mono font-extrabold tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      pkg.popular
                        ? "bg-stone-950 text-white hover:bg-stone-800"
                        : "bg-stone-50 text-stone-800 border border-stone-300 hover:bg-stone-100"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Pesan via WhatsApp</span>
                  </a>

                  <a 
                    href={pkg.tiktokShopLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl text-[10px] sm:text-xs font-mono font-extrabold tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer h-10 sm:h-11 ${
                      pkg.popular
                        ? "bg-[#010101] text-white border border-stone-800 hover:bg-stone-900"
                        : "bg-white text-stone-900 border border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.77-.6-1.39-1.39-1.81-2.3v7.8c.08 2.94-1.56 5.76-4.3 6.9-2.73 1.15-6.06.41-8.01-1.78-2.22-2.43-2.12-6.5-.04-8.8 1.95-2.2 5.25-2.8 7.84-1.44l-.01 4.07c-1.26-.82-2.95-.67-4.02.43-.98 1.05-.98 2.76 0 3.81.98 1.05 2.67 1.13 3.75.18.52-.46.77-1.15.75-1.84V.02z" />
                    </svg>
                    <span>Beli di TikTok Shop</span>
                  </a>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* 6. Activities Gallery ("Galeri Kegiatan") */}
      <section id="galeri" className="py-16 md:py-24 bg-white border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.22em] text-amber-600 block">
              Galeri Kegiatan
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-stone-950 tracking-tight">
              Aktivitas Pelatihan EduRescue
            </h2>
            <p className="text-[#707070] text-xs sm:text-sm font-sans">
              Dokumentasi pengujian, kalibrasi sistem kontrol, serta simulasi tanggap darurat yang dilalui produk kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs aspect-[4/3] bg-stone-100"
              >
                <img 
                  src={item.image} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[8px] font-mono text-amber-400 font-extrabold uppercase tracking-widest block mb-0.5">
                      KEGIATAN TIM &bull; 2026
                    </span>
                    <h4 className={`font-sans font-bold text-white uppercase tracking-wider leading-snug ${
                      item.caption.length > 30 ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
                    }`}>
                      {item.caption}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FAQ & Testimonials Section */}
      <section id="faq" className="py-16 md:py-24 bg-[#FAF8F5]/50 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column - FAQ Accordion */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-sans font-black uppercase tracking-[0.22em] text-amber-600 block">
                  Tanya & Jawab
                </span>
                <h2 className="text-2xl md:text-3xl font-serif italic text-stone-950 tracking-tight mt-1">
                  Pertanyaan Sering Diajukan
                </h2>
              </div>

              <div className="space-y-3.5">
                {FAQS.map((faq, idx) => {
                  const isExpanded = expandedFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-stone-200 rounded-2xl bg-white overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-bold text-stone-900 pr-4">
                          {faq.q}
                        </span>
                        <ChevronRight className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${
                          isExpanded ? "rotate-90 text-stone-900" : ""
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="px-5 pb-5 pt-1 text-xs text-stone-500 leading-relaxed font-sans"
                          >
                            <hr className="border-stone-100 mb-3" />
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Testimonials Grid */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-sans font-black uppercase tracking-[0.22em] text-amber-600 block">
                  Ulasan Instansi
                </span>
                <h2 className="text-2xl md:text-3xl font-serif italic text-stone-950 tracking-tight mt-1">
                  Apa Kata Instruktur?
                </h2>
              </div>

              <div className="space-y-4">
                {TESTIMONIALS.map((testi, idx) => (
                  <div 
                    key={idx}
                    className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-3.5"
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testi.rating }).map((_, si) => (
                        <Star key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic font-sans">
                      &ldquo;{testi.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-2.5 border-t border-stone-100">
                      <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white text-xs font-serif italic font-bold select-none text-center">
                        {testi.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 leading-none block">
                          {testi.name}
                        </h4>
                        <span className="text-[9px] font-mono tracking-wider text-stone-400 block mt-1 uppercase font-semibold">
                          {testi.role}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. TEAM SECTION (Interactive ID Card & Lanyard Toggles) */}
      <section id="tim" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-stone-200/50">
            <div>
              <span className="text-[10px] font-sans font-black uppercase tracking-[0.22em] text-amber-600 block mb-2">
                Tim Pengembang
              </span>
              <h2 className="text-3xl md:text-4xl font-serif italic text-[#050505] tracking-tight">
                Profil Tim EduRescue
              </h2>
              <p className="text-[#707070] text-xs md:text-sm mt-1 max-w-xl font-sans">
                Kenalkan inovator di balik EduRescue Mannequin dari Universitas Muhammadiyah Purwokerto. Lihat kartu lanyard bersama atau ID Card 3D kru.
              </p>
            </div>

            {/* Elegant Tab Controls for Lanyard view and 3D individual pass */}
            <div className="flex items-center p-1.5 bg-stone-100 rounded-xl border border-stone-200 relative select-none">
              
              <button
                onClick={() => setActiveTab("lanyard")}
                className={`z-10 flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wider font-extrabold rounded-lg uppercase transition-all cursor-pointer ${
                  activeTab === "lanyard"
                    ? "bg-stone-950 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Foto Bersama</span>
              </button>

              <button
                onClick={() => setActiveTab("individual")}
                className={`z-10 flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wider font-extrabold rounded-lg uppercase transition-all cursor-pointer ${
                  activeTab === "individual"
                    ? "bg-stone-950 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <IdCard className="w-3.5 h-3.5" />
                <span>ID Card 3D</span>
              </button>
            </div>
          </div>

          {/* Interactive Team Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-11 items-start">
            
            {/* LEFT COLUMN: THE DOMINANT MOCKUP AREA (Tabs Render Canvas) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-start">
              
              <AnimatePresence mode="wait">
                {activeTab === "lanyard" ? (
                  <motion.div
                    key="lanyard-tab"
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -15 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <LanyardGroupPhoto />
                  </motion.div>
                ) : (
                  <motion.div
                    key="individual-tab"
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -15 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <MemberIDCard3D member={activeMember} />
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>

            {/* RIGHT COLUMN: TEAM MEMBER LISTS AND INDIVIDUAL BIOS */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 font-extrabold block">
                  Pilih Anggota Tim
                </span>
                
                {/* List container */}
                <div role="list" className="space-y-3">
                  {TEAM_MEMBERS.map((member, index) => {
                    const isSelected = selectedMemberIndex === index;
                    return (
                      <button
                        key={member.id}
                        role="listitem"
                        onClick={() => {
                          setSelectedMemberIndex(index);
                        }}
                        className={`w-full flex items-center gap-3.5 p-3 rounded-2xl text-left border cursor-pointer select-none transition-all group ${
                          isSelected 
                            ? "bg-stone-900 border-stone-900 text-white shadow-md shadow-stone-900/10" 
                            : "bg-stone-50/60 border-stone-200/80 text-stone-800 hover:bg-stone-100/50 hover:border-stone-300"
                        }`}
                      >
                        {/* Selector Indicator */}
                        <div className={`w-1 h-8 rounded-full transition-all ${
                          isSelected ? "bg-amber-400" : "bg-transparent group-hover:bg-stone-350"
                        }`} />

                        {/* Crew headshot in list */}
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-stone-200 shrink-0">
                          <img 
                            src={member.avatar} 
                            alt={member.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Name and role */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-bold truncate leading-tight">
                            {member.name}
                          </h4>
                          <p className={`text-[10px] md:text-[11px] font-medium truncate mt-0.5 ${
                            isSelected ? "text-stone-300" : "text-stone-500"
                          }`}>
                            {member.role}
                          </p>
                        </div>

                        {/* Selected Tick or Arrow */}
                        <ChevronRight className={`w-4.5 h-4.5 transition-transform ${
                          isSelected ? "text-amber-400 translate-x-1" : "text-stone-400 group-hover:translate-x-1"
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTIVE TEAM MEMBER BIOGRAPHY & DETAILED STATS PANEL */}
              <motion.div 
                key={activeMember.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="p-5 rounded-2xl border border-stone-200/80 bg-[#FAF8F5]/60 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-200/50">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-stone-400">
                    Biodata Lengkap
                  </span>
                  
                  {/* Mini highlight if not on individual ID card */}
                  {activeTab === "lanyard" && (
                    <button 
                      onClick={() => setActiveTab("individual")} 
                      className="text-[9px] font-mono text-amber-600 font-extrabold uppercase tracking-wider hover:underline"
                    >
                      Buka ID Card 3D →
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold text-stone-900 tracking-tight uppercase">
                    Tentang {activeMember.name.split(',')[0]}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed font-sans">
                    {activeMember.bio}
                  </p>
                </div>

                {/* Team member skills design */}
                <div className="space-y-2 pt-1">
                  <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-stone-400 block mb-1">
                    Kompetensi Teknis
                  </span>
                  <div className="space-y-2 text-[10px] font-mono">
                    {activeMember.skills.map((skill, si) => (
                      <div key={skill} className="space-y-1">
                        <div className="flex justify-between items-center text-stone-600">
                          <span className="font-semibold">{skill}</span>
                          <span className="font-extrabold text-stone-800">{85 + (si * 4) > 100 ? 100 : 85 + (si * 4)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${85 + (si * 4) > 100 ? 100 : 85 + (si * 4)}%` }}
                            transition={{ duration: 0.8, delay: si * 0.1 }}
                            className="h-full bg-stone-900 rounded-full" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. Premium Safe Footer */}
      <footer className="bg-stone-950 text-white py-16 border-t border-stone-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-900">
            
            {/* Footer Left Column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center shadow-lg shrink-0">
                  <svg viewBox="0 0 40 40" className="w-7 h-7">
                    {/* Head or body motif representing mannequin */}
                    <path d="M20,6 C23,6 25,8 25,11 C25,14 23,16 20,16 C17,16 15,14 15,11 C15,8 17,6 20,6 Z" fill="#f59e0b" />
                    <path d="M11,32 C11,24 15,20 20,20 C25,20 29,24 29,32 Z" fill="#292524" />
                    <path d="M20,22 C18,22 17,23 17,24 C17,25 20,28 20,28 C20,28 23,25 23,24 C23,23 22,22 20,22 Z" fill="#ef4444" />
                    {/* Heartbeat pattern inside */}
                    <path d="M18.5,25 L19.2,25 L19.6,23.5 L20,26.5 L20.4,24.5 L20.8,25 L21.5,25" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-sans font-extrabold tracking-tight text-white">
                  EduRescue
                </h3>
              </div>
              <p className="text-stone-450 text-xs sm:text-xs leading-relaxed max-w-sm font-sans pt-1">
                Edurescue Mannequin Merupakan Jasa Model Pembuatan Phantom dan Pelatihan Pertolongan Pertama Henti Jantung untuk Masyarakat Awam Solusi Pembuatan Mannequin RJP dan Pelatihan Pertolongan Pertama yang Terjangkau
              </p>
            </div>

            {/* Footer Middle Links */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-base font-bold text-white tracking-snug">
                Supported By
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400 font-sans">
                <li className="hover:text-stone-200 transition-colors">UMP</li>
                <li className="hover:text-stone-200 transition-colors">Kemahasiswaan Dikti</li>
                <li className="hover:text-stone-200 transition-colors">Belmawa Dikti</li>
                <li className="hover:text-stone-200 transition-colors">ISBI UMP</li>
              </ul>
            </div>

            {/* Platform & Sosial Contact */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-base font-bold text-white tracking-snug">
                Platform & Sosial
              </h4>
              <div className="space-y-3">
                <a 
                  href="https://instagram.com/edurescue.mannequin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3.5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 group-hover:bg-stone-800 group-hover:border-stone-700 group-hover:text-amber-400 transition-all shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-stone-400 text-xs sm:text-sm font-sans group-hover:text-stone-200 transition-colors">
                    @edurescue.mannequin
                  </span>
                </a>

                <a 
                  href="https://tiktok.com/@edurescue.mannequin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3.5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 group-hover:bg-stone-800 group-hover:border-stone-700 group-hover:text-amber-400 transition-all shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.77-.6-1.39-1.39-1.81-2.3v7.8c.08 2.94-1.56 5.76-4.3 6.9-2.73 1.15-6.06.41-8.01-1.78-2.22-2.43-2.12-6.5-.04-8.8 1.95-2.2 5.25-2.8 7.84-1.44l-.01 4.07c-1.26-.82-2.95-.67-4.02.43-.98 1.05-.98 2.76 0 3.81.98 1.05 2.67 1.13 3.75.18.52-.46.77-1.15.75-1.84V.02z" />
                    </svg>
                  </div>
                  <span className="text-stone-400 text-xs sm:text-sm font-sans group-hover:text-stone-200 transition-colors">
                    @edurescue.mannequin
                  </span>
                </a>
              </div>
            </div>

            {/* Footer Right Hubungi Kami */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-base font-bold text-white tracking-snug">
                Hubungi Kami
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-550 text-amber-500 shrink-0 animate-pulse">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-stone-400 text-xs sm:text-sm font-sans">
                    Purwokerto, Indonesia
                  </span>
                </div>

                <a 
                  href="tel:085196087234" 
                  className="flex items-center gap-3.5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-500 group-hover:bg-stone-800 group-hover:border-stone-700 transition-all shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-stone-400 text-xs sm:text-sm font-sans group-hover:text-stone-200 transition-colors">
                    085196087234
                  </span>
                </a>

                <a 
                  href="mailto:edurescuemannequin@gmail.com" 
                  className="flex items-center gap-3.5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-500 group-hover:bg-stone-800 group-hover:border-stone-700 transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-stone-400 text-xs sm:text-sm font-sans group-hover:text-stone-200 transition-colors break-all">
                    edurescuemannequin@gmail.com
                  </span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-stone-500 font-mono">
            <p>
              &copy; 2026 EduRescue Mannequin (Inovasi Medis UMP). All rights reserved.
            </p>
            <p className="tracking-widest uppercase">
              UNIVERSITAS MUHAMMADIYAH PURWOKERTO
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
