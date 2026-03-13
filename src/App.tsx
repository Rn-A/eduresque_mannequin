import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HeartPulse,
  Volume2,
  Lightbulb,
  GraduationCap,
  ShieldCheck,
  Package,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Target,
  Rocket,
  Sun,
  Settings,
} from "lucide-react";
import { useFirestore, useFirestoreDoc } from "./hooks/useFirestore";
import AdminCMS from "./components/AdminCMS";

// Fallback data if Firestore is empty
const DEFAULT_SITE = {
  logoUrl: "https://picsum.photos/seed/edurescue/100/100",
  footerLogoUrl: "https://picsum.photos/seed/edurescue/100/100",
  whatsapp: "83184531465",
  email: "edurescue@gmail.com",
  address: "Purwokerto, Indonesia",
  instagram: "edurescue.mannequin",
  tiktok: "edurescue.mannequin",
  footerDescription: "EduRescue Merupakan Model Pembuatan Phantom dan Pertolongan Pertama Henti Jantung untuk Masyarakat Awam Solusi Pembuatan Mannequin RJP dan Pelatihan Pertolongan Pertama yang Terjangkau",
  supportedBy: "UMP\nKemahasiswaan Dikti\nBelmawa Dikti\nISBI UMP",
  bottomSupportText: "Inovasi Medis Indonesia",
};

const DEFAULT_HERO = {
  title: "EduRescue: Inovasi Alat Edukasi RJP untuk Indonesia Tanggap Darurat",
  description: "Latih keterampilan Resusitasi Jantung Paru (RJP) dengan alat edukatif yang murah, akurat, dan mudah diakses. Mempersiapkan masyarakat agar sigap menyelamatkan nyawa sejak dini.",
  bgImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000",
  sliderImages: [
    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  ]
};

const DEFAULT_PRODUCT = {
  sectionTitle: "Produk Unggulan",
  sectionDesc: "Solusi pelatihan pertolongan pertama yang inovatif, dirancang untuk mempersiapkan masyarakat menghadapi situasi darurat medis dengan percaya diri.",
  mainImage: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800&h=1000",
  mainTitle: "Phantom — Mannequin Pelatihan CPR Terdepan",
  mainDesc: "Phantom adalah mannequin pelatihan CPR dan P3K yang dirancang khusus untuk kebutuhan edukasi keselamatan. Dengan teknologi panduan suara dan indikator visual, peserta pelatihan dapat belajar teknik pertolongan pertama dengan benar dan efektif.",
  benefitsTitle: "Manfaat & Keunggulan",
  benefitsDesc: "Keunggulan EduRescue Mannequin",
  benefits: [
    { title: "Simulasi CPR Realistis", desc: "Mannequin dirancang menyerupai anatomi manusia dewasa.", icon: "HeartPulse" },
    { title: "Panduan Suara Interaktif", desc: "Sistem audio built-in memberikan instruksi langkah demi langkah.", icon: "Volume2" },
    { title: "Indikator Visual Real-time", desc: "Lampu indikator memberikan umpan balik instan.", icon: "Lightbulb" },
  ],
  specs: [
    { label: "Dimensi", value: "170 cm x 45 cm x 20 cm" },
    { label: "Berat", value: "±3.5 kg" },
    { label: "Material", value: "PVC Medical Grade" },
    { label: "Garansi", value: "12 Bulan" },
  ]
};

const DEFAULT_TEAM_CONFIG = {
  description: "Kami adalah tim yang berdedikasi untuk meningkatkan kesiapsiagaan masyarakat.",
  vision: "Menjadi pelopor inovasi pelatihan keselamatan kesehatan.",
  mission: "Mengembangkan produk mannequin pelatihan CPR berkualitas tinggi.",
  goals: "Meningkatkan angka keselamatan jiwa melalui pelatihan CPR.",
  groupPhoto: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600"
};

const DEFAULT_PACKAGES = [
  {
    name: "Basic",
    price: "900.000",
    popular: false,
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=600&h=400",
    desc: "Paket ideal untuk pelatihan dasar CPR.",
    features: [{ name: "Phantom CPR Mannequin", included: true }, { name: "Busa Kompresi", included: true }],
    waLink: "https://wa.me/6281234567890"
  }
];

const DEFAULT_TEAM = [
  { name: "Ahmad Fauzi", role: "Ketua Tim", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150", instagram: "edurescue.official" }
];

const DEFAULT_FAQS = [
  { q: "Apakah mannequin ini mudah digunakan?", a: "Ya, sangat mudah." }
];

const DEFAULT_TESTIMONIALS = [
  { name: "Dr. Andi", role: "Instruktur", text: "Sangat membantu!", rating: 5 }
];

const DEFAULT_DOCS = [
  { image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800", caption: "Pelatihan CPR" }
];

function Navbar({ config }: { config: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Beranda", "Produk", "Tim", "Paket", "Testimoni", "Dokumentasi", "FAQ"];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg shadow-blue-600/20">
              <img src={config.logoUrl || null} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="font-bold text-xl text-white block leading-none">EduRescue</span>
              <span className="font-medium text-sm text-blue-400 block mt-0.5">Mannequin</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{link}</a>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">{link}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero({ config, site }: { config: any, site: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = config.sliderImages || [];

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <section id="beranda" className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        {config.bgImage && (
          <img 
            src={config.bgImage} 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="" 
            referrerPolicy="no-referrer" 
          />
        )}
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-slate-50/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-left">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight whitespace-pre-line">
              {config.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              {config.description}
            </motion.p>
            <div className="flex flex-wrap items-center gap-6 text-slate-600">
              <a href={`https://instagram.com/${site.instagram}`} target="_blank" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" /> <span className="text-sm">{site.instagram}</span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" /> <span className="text-sm">{site.email}</span>
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="relative w-full max-w-2xl mx-auto lg:ml-auto lg:mr-0">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200 shadow-2xl group">
              <AnimatePresence mode="wait">
                {images.length > 0 && images[currentSlide] && (
                  <motion.img key={currentSlide} src={images[currentSlide]} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                )}
              </AnimatePresence>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {images.map((_: any, idx: number) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentSlide ? "bg-white" : "bg-white/50"}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductInfo({ config }: { config: any }) {
  return (
    <section id="produk" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide border border-blue-200">{config.sectionTitle}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{config.mainTitle}</h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">{config.sectionDesc}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-slate-50 rounded-2xl border border-slate-300/50 overflow-hidden relative min-h-[450px]">
              {config.mainImage && <img src={config.mainImage} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />}
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 leading-tight">{config.mainTitle}</h3>
              <p className="text-slate-500 mb-10 leading-relaxed whitespace-pre-line">{config.mainDesc}</p>
              
              <ul className="space-y-4">
                {(config.features || [
                  "Simulasi kompresi dada yang realistis",
                  "Panduan suara dalam Bahasa Indonesia",
                  "Indikator lampu untuk umpan balik visual",
                  "Termasuk pelatihan penggunaan",
                  "Garansi produk 12 bulan",
                ]).map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded bg-green-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits({ config }: { config: any }) {
  const defaultBenefits = [
    { icon: <HeartPulse className="w-6 h-6 text-blue-600" />, title: "Simulasi CPR Realistis", desc: "Mannequin dirancang menyerupai anatomi manusia dewasa." },
    { icon: <Volume2 className="w-6 h-6 text-blue-500" />, title: "Panduan Suara Interaktif", desc: "Sistem audio built-in memberikan instruksi langkah demi langkah." },
    { icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, title: "Indikator Visual Real-time", desc: "Lampu indikator memberikan umpan balik instan." },
  ];

  const benefits = config.benefits || defaultBenefits;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">{config.benefitsTitle}</h2>
        <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">{config.benefitsDesc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b: any, i: number) => (
            <div key={i} className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6">
                {b.icon || <CheckCircle2 className="w-6 h-6 text-blue-600" />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
              <p className="text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specs({ config }: { config: any }) {
  const defaultSpecs = [
    { label: "Dimensi", value: "170 cm x 45 cm x 20 cm" },
    { label: "Berat", value: "±3.5 kg" },
    { label: "Material", value: "PVC Medical Grade" },
    { label: "Garansi", value: "12 Bulan" },
  ];

  const specs = config.specs || defaultSpecs;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Fitur & Spesifikasi</h2>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="divide-y divide-slate-100">
              {specs.slice(0, Math.ceil(specs.length / 2)).map((s: any, i: number) => (
                <div key={i} className="flex justify-between p-6">
                  <span className="text-slate-500">{s.label}</span>
                  <span className="text-slate-900 font-medium text-right">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="divide-y divide-slate-100">
              {specs.slice(Math.ceil(specs.length / 2)).map((s: any, i: number) => (
                <div key={i} className="flex justify-between p-6">
                  <span className="text-slate-500">{s.label}</span>
                  <span className="text-slate-900 font-medium text-right">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team({ config, members }: { config: any, members: any[] }) {
  return (
    <section id="tim" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">Tim Kami</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">Profil <span className="text-blue-600">Tim EduRescue</span></h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">{config.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl">
            <Target className="w-10 h-10 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">Visi</h3>
            <p className="text-slate-500 whitespace-pre-line">{config.vision}</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-2xl">
            <Rocket className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">Misi</h3>
            <p className="text-slate-500 whitespace-pre-line">{config.mission}</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-2xl">
            <Sun className="w-10 h-10 text-yellow-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">Tujuan</h3>
            <p className="text-slate-500 whitespace-pre-line">{config.goals}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-1/2 rounded-[2rem] overflow-hidden border border-slate-200 relative min-h-[400px]">
            {config.groupPhoto && <img src={config.groupPhoto} alt="Tim" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-center">
            {members.map((member: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    {member.image && <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                    <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                  </div>
                </div>
                {member.instagram && (
                  <a href={`https://instagram.com/${member.instagram}`} target="_blank" className="p-2 rounded-xl bg-[#E1306C] text-white hover:opacity-90 transition-opacity">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ packages }: { packages: any[] }) {
  return (
    <section id="paket" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Pilihan <span className="text-blue-600">Paket EduRescue</span></h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Pilih paket yang sesuai dengan kebutuhan pelatihan Anda.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg: any, idx: number) => (
            <div key={idx} className={`relative bg-white border-2 rounded-[2rem] p-8 flex flex-col ${pkg.popular ? "border-blue-600 shadow-2xl shadow-blue-600/10" : "border-slate-100 shadow-xl shadow-slate-200/50"}`}>
              {pkg.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Terpopuler</span>}
              <div className="mb-8 rounded-2xl overflow-hidden aspect-video">
                {pkg.image && <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-slate-500 text-lg">Rp</span>
                <span className="text-4xl font-extrabold text-slate-900">{pkg.price}</span>
              </div>
              <p className="text-slate-500 mb-8 leading-relaxed">{pkg.desc}</p>
              <a href={pkg.waLink} target="_blank" className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${pkg.popular ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                <MessageCircle className="w-5 h-5" /> Pesan Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ data }: { data: any[] }) {
  return (
    <section id="testimoni" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Apa Kata <span className="text-blue-600">Mereka?</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((t: any, i: number) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} />
                ))}
              </div>
              <p className="text-slate-600 italic mb-6">"{t.text}"</p>
              <div>
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-sm text-blue-600">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Documentation({ data }: { data: any[] }) {
  return (
    <section id="dokumentasi" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Dokumentasi <span className="text-blue-600">Kegiatan</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((doc: any, i: number) => (
            <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
              {doc.image && <img src={doc.image} alt={doc.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-sm font-medium">{doc.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ data }: { data: any[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Pertanyaan yang <span className="text-blue-600">Sering Ditanyakan</span></h2>
        <div className="space-y-4">
          {data.map((faq: any, i: number) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-6 pb-5 text-slate-500 border-t border-slate-100 pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ config }: { config: any }) {
  const supportedByList = (config.supportedBy || "").split("\n").filter((i: string) => i.trim() !== "");

  return (
    <footer className="bg-[#0a0f1e] text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Column 1: EduRescue */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 p-1">
              {config.footerLogoUrl && <img src={config.footerLogoUrl} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />}
            </div>
            <span className="font-bold text-2xl text-white">EduRescue</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
            {config.footerDescription || "EduRescue Merupakan Model Pembuatan Phantom dan Pertolongan Pertama Henti Jantung untuk Masyarakat Awam Solusi Pembuatan Mannequin RJP dan Pelatihan Pertolongan Pertama yang Terjangkau"}
          </p>
        </div>

        {/* Column 2: Supported By */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Supported By</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            {supportedByList.length > 0 ? supportedByList.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            )) : (
              <>
                <li>UMP</li>
                <li>Kemahasiswaan Dikti</li>
                <li>Belmawa Dikti</li>
                <li>ISBI UMP</li>
              </>
            )}
          </ul>
        </div>

        {/* Column 3: Platform & Sosial */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Platform & Sosial</h4>
          <div className="space-y-4">
            <a href={`https://instagram.com/${config.instagram || 'edurescue.mannequin'}`} target="_blank" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-[#E1306C] transition-colors border border-slate-700">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-400 group-hover:text-white transition-colors">@{config.instagram || 'edurescue.mannequin'}</span>
            </a>
            <a href={`https://tiktok.com/@${config.tiktok || 'edurescue.mannequin'}`} target="_blank" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-black transition-colors border border-slate-700">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.44-.3 6.88-.45 10.32-.13 2.13-1.13 4.23-2.94 5.37-2.02 1.28-4.77 1.35-6.86.18-2.1-1.17-3.38-3.48-3.22-5.86.06-2.38 1.51-4.67 3.7-5.6 1.06-.47 2.23-.67 3.39-.6 0 1.48-.01 2.96-.01 4.44-1.01-.14-2.09.15-2.84.88-.76.73-1.06 1.9-.69 2.87.39.96 1.44 1.56 2.45 1.48 1.1-.04 2.05-.9 2.14-2 .13-3.77.26-7.54.39-11.31.01-2.32.01-4.64.01-6.96z"/></svg>
              </div>
              <span className="text-sm text-slate-400 group-hover:text-white transition-colors">@{config.tiktok || 'edurescue.mannequin'}</span>
            </a>
          </div>
        </div>

        {/* Column 4: Hubungi Kami */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-slate-400 mt-2">{config.address || 'Purwokerto, Indonesia'}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                <Phone className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-slate-400">{config.whatsapp ? `0${config.whatsapp}` : '083184531465'}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-slate-400">{config.email || 'edurescue@gmail.com'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} EduRescue Mannequin. Hak Cipta Dilindungi.</p>
        <p>Supported by <span className="text-white font-bold">{config.bottomSupportText || "Inovasi Medis Indonesia"}</span></p>
      </div>
    </footer>
  );
}

function MainSite() {
  const { data: site } = useFirestoreDoc<any>("config", "site");
  const { data: hero } = useFirestoreDoc<any>("config", "hero");
  const { data: product } = useFirestoreDoc<any>("config", "product");
  const { data: teamConfig } = useFirestoreDoc<any>("config", "team");
  
  const { data: packages } = useFirestore<any>("packages");
  const { data: team } = useFirestore<any>("team");
  const { data: faqs } = useFirestore<any>("faqs");
  const { data: testimonials } = useFirestore<any>("testimonials");
  const { data: docs } = useFirestore<any>("docs");

  const siteData = site || DEFAULT_SITE;
  const heroData = hero || DEFAULT_HERO;
  const productData = product || DEFAULT_PRODUCT;
  const teamConfigData = teamConfig || DEFAULT_TEAM_CONFIG;
  
  const packagesData = packages.length > 0 ? packages : DEFAULT_PACKAGES;
  const teamData = team.length > 0 ? team : DEFAULT_TEAM;
  const faqsData = faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const testimonialsData = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  const docsData = docs.length > 0 ? docs : DEFAULT_DOCS;

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar config={siteData} />
      <Hero config={heroData} site={siteData} />
      <ProductInfo config={productData} />
      <Benefits config={productData} />
      <Specs config={productData} />
      <Team config={teamConfigData} members={teamData} />
      <Pricing packages={packagesData} />
      <Testimonials data={testimonialsData} />
      <Documentation data={docsData} />
      <FAQ data={faqsData} />
      <Footer config={siteData} />
      
      <Link to="/admin" className="fixed bottom-6 right-6 z-[60] bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group">
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/admin" element={<AdminCMS />} />
    </Routes>
  );
}
