import { Member } from "./types";

export const TEAM_MEMBERS: Member[] = [
  {
    id: "hanif",
    name: "Ns. M. Hanif Prasetya Adhi, S.Kep., M.Kep",
    role: "Pembimbing",
    division: "Clinical & Academic Advisor",
    idNumber: "RESCUE-ADV-2026-00",
    avatar: "/images/pembimbing.webp",
    bio: "Dosen Pembimbing dan Penasihat Akademik EduRescue. Berperan aktif dalam membimbing serta mengarahkan penelitian, metodologi klinis, validasi akademis, dan pengembangan riset simulator CPR agar sesuai standar pendidikan kedokteran & keperawatan.",
    skills: ["Clinical Education", "Medical Research", "Academic Mentorship", "Nursing & Emergency Care"],
    email: "hanif.adhi@edurescue.my.id",
    phone: "6283184531465",
    linkedin: "linkedin.com/in/hanif-prasetya-adhi"
  },
  {
    id: "fauzi",
    name: "Fata Nur Almaidah",
    role: "Ketua Tim & Ahli Medis",
    division: "Medical & Emergency Lead",
    idNumber: "RESCUE-LEAD-2026-01",
    avatar: "/images/Alma.webp",
    bio: "Ketua Tim sekaligus Spesialis Medis EduRescue. Berfokus pada perumusan standar klinis instrumen resusitasi jantung paru (RJP) berbasis pedoman bantuan hidup dasar medis yang presisi, interaktif, dan mudah dimengerti.",
    skills: ["Emergency Medicine", "Clinical Guidelines", "CPR Standardization", "Medical Simulation"],
    email: "fata.nur@edurescue.my.id",
    phone: "6283184531465",
    linkedin: "linkedin.com/in/fata-nur-almaidah"
  },
  {
    id: "rendra",
    name: "Rendra Aji Syaputra",
    role: "Publication & Software Engineer",
    division: "Software & Publication",
    idNumber: "RESCUE-SW-2026-02",
    avatar: "/images/saya.webp",
    bio: "Spesialis rekayasa perangkat lunak dan publikasi riset. Rendra bertanggung jawab dalam mengintegrasikan sistem sensor cerdas ke platform web/mobile, serta menyusun dokumentasi teknis dan publikasi ilmiah berkala terkait produk EduRescue.",
    skills: ["Software Engineering", "Research Publications", "IoT Integration", "Technical Writing"],
    email: "rendra.aji@edurescue.my.id",
    phone: "6283184531465",
    linkedin: "linkedin.com/in/rendra-aji-syaputra"
  },
  {
    id: "cindy",
    name: "Cindy Febriani",
    role: "Finance & Ahli Medis",
    division: "Finance & Healthcare Advisory",
    idNumber: "RESCUE-FIN-2026-03",
    avatar: "/images/cindy.webp",
    bio: "Spesialis Manajemen Keuangan Kesehatan sekaligus Ahli Medis EduRescue. Cindy bertanggung jawab atas alokasi anggaran, analisis efisiensi biaya produksi simulator CPR, serta pengawasan kepatuhan klinis pengadaan alat kesehatan.",
    skills: ["Healthcare Finance", "Clinical Compliance", "Cost Administration", "Resource Allocation"],
    email: "cindy.febriani@edurescue.my.id",
    phone: "6283184531465",
    linkedin: "linkedin.com/in/cindy-febriani"
  },
  {
    id: "april",
    name: "Dwi Apriliana",
    role: "Procurement & Ahli Medis",
    division: "Procurement & Lifecycle Advisory",
    idNumber: "RESCUE-PRC-2026-04",
    avatar: "/images/april.webp",
    bio: "Spesialis Pengadaan dan Logistik Alat Kesehatan sekaligus Ahli Medis EduRescue. Dwi bertanggung jawab atas manajemen rantai pasok material simulator CPR, pengujian standar higienitas bahan baku, serta koordinasi distribusi ke seluruh wilayah Indonesia.",
    skills: ["Healthcare Logistics", "Procurement Strategy", "Supply Chain Management", "Clinical Safety Standards"],
    email: "dwi.apriliana@edurescue.my.id",
    phone: "6283184531465",
    linkedin: "linkedin.com/in/dwi-apriliana"
  }
];

export const GROUP_PHOTO_URL = "/images/Team.webp";

export const VISION_MISSION = {
  description: "Kami adalah tim yang berdedikasi untuk meningkatkan kesiapsiagaan masyarakat menghadapi henti jantung melalui penyediaan instrumen simulasi medis berkualitas tinggi dengan biaya terjangkau.",
  vision: "Menjadi pelopor inovasi pelatihan keselamatan kesehatan berbasis teknologi di Indonesia.",
  mission: "Mengembangkan produk mannequin pelatihan CPR berkualitas tinggi dengan sistem sensor taktil, feedback instan bahasa Indonesia, dan bahan medical grade.",
  goals: "Meningkatkan rasio keselamatan jiwa melalui pemerataan akses dan visualisasi pelatihan simulasi henti jantung bagi masyarakat luas maupun kalangan akademisi medis."
};

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingPackage {
  name: string;
  price: string;
  popular: boolean;
  image: string;
  desc: string;
  features: PricingFeature[];
  waLink: string;
  tiktokShopLink: string;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    name: "Paket Basic",
    price: "900.000",
    popular: false,
    image: "/images/basic.webp",
    desc: "Paket ideal untuk pelatihan dasar CPR di sekolah, komunitas, dan instansi dengan anggaran terbatas.",
    features: [
      { name: "Phantom CPR Mannequin", included: true },
      { name: "Busa Kompresi", included: true },
      { name: "Adaptor Listrik 12V", included: true },
      { name: "Indikator Lampu LED", included: true },
      { name: "Panduan Suara", included: true },
      { name: "Pelatihan Penggunaan", included: true },
      { name: "Busa Kompresi Berkualitas Premium", included: false },
      { name: "Layar LCD Touchscreen", included: false },
      { name: "Tombol Fungsi Tambahan", included: false },
      { name: "Dukungan Teknis Prioritas", included: false }
    ],
    waLink: "https://wa.me/6283184531465?text=Halo%20EduRescue%2C%20saya%20tertarik%20dengan%20Paket%20Basic%20seharga%20Rp900.000",
    tiktokShopLink: "https://www.tiktok.com/@edurescuemannequin"
  },
  {
    name: "Paket Plus",
    price: "1.200.000",
    popular: true,
    image: "/images/Plus.webp",
    desc: "Paket lengkap dengan fitur premium untuk pelatihan profesional di rumah sakit, kampus, dan institusi kesehatan.",
    features: [
      { name: "Phantom CPR Mannequin", included: true },
      { name: "Busa Kompresi Berkualitas Premium", included: true },
      { name: "Adaptor Listrik 12V", included: true },
      { name: "Layar LCD Touchscreen", included: true },
      { name: "Tombol Fungsi Tambahan", included: true },
      { name: "Indikator Lampu LED", included: true },
      { name: "Panduan Suara", included: true },
      { name: "Pelatihan Penggunaan", included: true },
      { name: "Dukungan Teknis Prioritas", included: true }
    ],
    waLink: "https://wa.me/6283184531465?text=Halo%20EduRescue%2C%20saya%20tertarik%20dengan%20Paket%20Plus%20seharga%20Rp1.200.000",
    tiktokShopLink: "https://www.tiktok.com/@edurescuemannequin"
  }
];

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Andi",
    role: "Instruktur Pelatihan CPR",
    text: "Sangat membantu! Umpan balik audio membuat peserta belajar ritme RJP yang benar dengan sangat cepat tanpa pendampingan konstan.",
    rating: 5
  },
  {
    name: "Kurnia Lestari, S.Tr.Keb",
    role: "Bidan & Mentor Puskesmas",
    text: "Material ergonomis berbahan PVC sangat kokoh untuk latihan berulang-ulang, dan panduan suaranya mendikte ritme dengan amat presisi.",
    rating: 5
  }
];

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: "Apakah mannequin ini mudah digunakan?",
    a: "Ya, sangat mudah. Dilengkapi dengan speaker built-in yang langsung mengeluarkan panduan audio instruksional Bahasa Indonesia ketika dinyalakan."
  },
  {
    q: "Apa perbedaan antara Paket Basic dan Paket Plus?",
    a: "Paket Basic: Dilengkapi fitur standar seperti indikator lampu kedalaman (5 cm), panduan suara ritme (100-120 BPM), busa realistis, dan adaptor listrik. Paket Plus: Memiliki semua fitur Basic ditambah teknologi LCD Touch Screen dan menu fungsional untuk melihat jumlah kompresi serta visualisasi EKG secara real-time."
  },
  {
    q: "Apakah harga yang tertera sudah termasuk pelatihan?",
    a: "Ya, harga paket kami sudah mencakup jasa pembuatan manekin sekaligus sesi pelatihan penggunaan alat dan teknik RJP yang benar"
  },
  {
    q: "Bagaimana cara memesan EDURESCUE MANNEQUIN?",
    a: "Anda dapat menghubungi admin kami melalui kontak yang tersedia di website untuk berkonsultasi mengenai kebutuhan paket, kustomisasi desain, dan jadwal pelatihan."
  },
  {
    q: "Apakah manekin ini tahan lama?",
    a: "Iya tahan lama. Kerangka luar manekin terbuat dari material Fiberglass yang kokoh namun ringan, serta bagian dalam menggunakan pegas dan busa khusus yang dirancang untuk ribuan kali tekanan kompresi."
  },
  {
    q: "Butuh informasi lebih lanjut?",
    a: "Silakan hubungi tim kami untuk konsultasi gratis!"
  },
  {
    q: "Bagaimana pengiriman dan jaminan garansinya?",
    a: "Kami melakukan pengiriman aman dari Purwokerto ke seluruh Indonesia dengan garansi servis sensor dan pembaruan firmware selama 12 bulan."
  }
];

export interface GalleryItem {
  image: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    image: "/images/dok2.webp",
    caption: "Promosi Dan Sosialisasi Di MTs Miftakhul Ulum Bulakan"
  },
  {
    image: "/images/dok3.webp",
    caption: "(Promosi Dan Sosialisasi Di Dusun Sodong Basari Pemalang)"
  },
  {
    image: "/images/dok1.webp",
    caption: "Promosi Dan Sosialisasi Di SMA N 1 Banyumas"
  }
];
