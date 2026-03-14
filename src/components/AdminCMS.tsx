import React, { useState, useEffect } from "react";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc,
  getDoc,
  onSnapshot
} from "firebase/firestore";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from "firebase/auth";
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage, handleFirestoreError, OperationType } from "../firebase";
import { 
  Plus, 
  Trash2, 
  Save, 
  LogOut, 
  LogIn, 
  ChevronUp, 
  ChevronDown,
  Settings,
  Package,
  Users,
  MessageSquare,
  HelpCircle,
  Image as ImageIcon,
  Upload,
  Layout,
  Info,
  ShieldCheck,
  Check,
  X,
  PlusCircle,
  Loader2,
  Link as LinkIcon
} from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";

// Helper for image upload (URL only)
const ImageUpload = ({ value, onChange, label }: { value: string, onChange: (url: string) => void, label: string }) => {
  const [tempUrl, setTempUrl] = useState(value);

  useEffect(() => {
    setTempUrl(value);
  }, [value]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-400">{label}</label>
      <div className="flex flex-col gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0">
            {value ? (
              <img src={value} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
          </div>
          
          <div className="flex-1 flex gap-2">
            <input 
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="Tempel link gambar (https://...)"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button 
              type="button"
              onClick={() => onChange(tempUrl)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Terapkan
            </button>
          </div>
        </div>
        <p className="text-[10px] text-slate-500">
          Gunakan link langsung (Direct Link) dari situs seperti PostImages atau Imgur.
        </p>
      </div>
    </div>
  );
};

export default function AdminCMS() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("site");
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [heroConfig, setHeroConfig] = useState<any>(null);
  const [productConfig, setProductConfig] = useState<any>(null);
  const [teamConfig, setTeamConfig] = useState<any>(null);
  const [legalConfig, setLegalConfig] = useState<any>(null);

  const { data: packages } = useFirestore<any>("packages");
  const { data: team } = useFirestore<any>("team");
  const { data: certifications } = useFirestore<any>("certifications");
  const { data: faqs } = useFirestore<any>("faqs");
  const { data: testimonials } = useFirestore<any>("testimonials");
  const { data: docs } = useFirestore<any>("docs");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Fetch single configs
  useEffect(() => {
    if (!user) return;
    const unsubSite = onSnapshot(doc(db, "config", "site"), (s) => setSiteConfig(s.data() || {}));
    const unsubHero = onSnapshot(doc(db, "config", "hero"), (s) => setHeroConfig(s.data() || {}));
    const unsubProduct = onSnapshot(doc(db, "config", "product"), (s) => setProductConfig(s.data() || {}));
    const unsubTeam = onSnapshot(doc(db, "config", "team"), (s) => setTeamConfig(s.data() || {}));
    const unsubLegal = onSnapshot(doc(db, "config", "legal"), (s) => setLegalConfig(s.data() || {}));
    return () => { unsubSite(); unsubHero(); unsubProduct(); unsubTeam(); unsubLegal(); };
  }, [user]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => signOut(auth);

  const saveConfig = async (id: string, data: any) => {
    try {
      await setDoc(doc(db, "config", id), data, { merge: true });
      alert("Konfigurasi disimpan!");
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `config/${id}`);
    }
  };

  if (!isAuthReady) return <div className="p-8 text-center">Loading Auth...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-md w-full text-center">
          <Settings className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">EduRescue CMS</h1>
          <p className="text-slate-400 mb-8">Silakan login dengan akun admin untuk mengelola konten.</p>
          <button 
            onClick={login}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Login dengan Google
          </button>
        </div>
      </div>
    );
  }

  const addItem = async (collectionName: string, defaultData: any) => {
    try {
      const list = collectionName === 'packages' ? packages : 
                   collectionName === 'team' ? team : 
                   collectionName === 'certifications' ? certifications :
                   collectionName === 'faqs' ? faqs : 
                   collectionName === 'testimonials' ? testimonials : docs;
      const order = list.length;
      await addDoc(collection(db, collectionName), { ...defaultData, order });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, collectionName);
    }
  };

  const updateItem = async (collectionName: string, id: string, data: any) => {
    try {
      await updateDoc(doc(db, collectionName, id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${collectionName}/${id}`);
    }
  };

  const deleteItem = async (collectionName: string, id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <Settings className="text-blue-500" />
          <span className="font-bold text-white">EduRescue CMS</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Konfigurasi</p>
          {[
            { id: "site", label: "Site & Logo", icon: Layout },
            { id: "hero", label: "Beranda", icon: ImageIcon },
            { id: "product", label: "Produk", icon: Package },
            { id: "teamConfig", label: "Konten Tim", icon: Info },
            { id: "legalConfig", label: "Sertifikasi", icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "hover:bg-slate-800 text-slate-400"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}

          <p className="px-4 py-2 mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Koleksi</p>
          {[
            { id: "packages", label: "Paket", icon: Package },
            { id: "team", label: "Anggota Tim", icon: Users },
            { id: "certifications", label: "Dokumen Legal", icon: ShieldCheck },
            { id: "testimonials", label: "Testimoni", icon: MessageSquare },
            { id: "docs", label: "Dokumentasi", icon: ImageIcon },
            { id: "faqs", label: "FAQ", icon: HelpCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "hover:bg-slate-800 text-slate-400"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Site Config */}
          {activeTab === "site" && siteConfig && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Site & Logo</h2>
                <button onClick={() => saveConfig("site", siteConfig)} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold transition-all">
                  <Save className="w-5 h-5" /> Simpan
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <ImageUpload label="Logo Navbar" value={siteConfig.logoUrl} onChange={(url) => setSiteConfig({...siteConfig, logoUrl: url})} />
                <ImageUpload label="Logo Footer" value={siteConfig.footerLogoUrl} onChange={(url) => setSiteConfig({...siteConfig, footerLogoUrl: url})} />
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">WhatsApp</label>
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={siteConfig.whatsapp || ""} onChange={(e) => setSiteConfig({...siteConfig, whatsapp: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Email</label>
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={siteConfig.email || ""} onChange={(e) => setSiteConfig({...siteConfig, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Instagram Handle</label>
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" placeholder="edurescue.mannequin" value={siteConfig.instagram || ""} onChange={(e) => setSiteConfig({...siteConfig, instagram: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">TikTok Handle</label>
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" placeholder="edurescue.mannequin" value={siteConfig.tiktok || ""} onChange={(e) => setSiteConfig({...siteConfig, tiktok: e.target.value})} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm text-slate-400">Deskripsi Footer (Dibawah Logo)</label>
                    <textarea rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={siteConfig.footerDescription || ""} onChange={(e) => setSiteConfig({...siteConfig, footerDescription: e.target.value})} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm text-slate-400">Supported By (Pisahkan dengan baris baru)</label>
                    <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" placeholder="UMP&#10;Kemahasiswaan Dikti" value={siteConfig.supportedBy || ""} onChange={(e) => setSiteConfig({...siteConfig, supportedBy: e.target.value})} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm text-slate-400">Teks Support (Kanan Bawah)</label>
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={siteConfig.bottomSupportText || ""} onChange={(e) => setSiteConfig({...siteConfig, bottomSupportText: e.target.value})} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm text-slate-400">Alamat</label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={siteConfig.address || ""} onChange={(e) => setSiteConfig({...siteConfig, address: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hero Config */}
          {activeTab === "hero" && heroConfig && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Beranda</h2>
                <button onClick={() => saveConfig("hero", heroConfig)} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold transition-all">
                  <Save className="w-5 h-5" /> Simpan
                </button>
              </div>
              <div className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Judul Utama</label>
                  <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-xl font-bold" value={heroConfig.title || ""} onChange={(e) => setHeroConfig({...heroConfig, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Deskripsi</label>
                  <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={heroConfig.description || ""} onChange={(e) => setHeroConfig({...heroConfig, description: e.target.value})} />
                </div>
                <ImageUpload label="Background Image" value={heroConfig.bgImage} onChange={(url) => setHeroConfig({...heroConfig, bgImage: url})} />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-slate-400 font-bold">Slider Images (Gambar Berjalan)</label>
                    <button 
                      onClick={() => setHeroConfig({...heroConfig, sliderImages: [...(heroConfig.sliderImages || []), ""]})}
                      className="flex items-center gap-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    >
                      <Plus className="w-4 h-4" /> Tambah Slide
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(heroConfig.sliderImages || []).map((img: string, i: number) => (
                      <div key={i} className="relative group bg-slate-800/20 p-4 rounded-2xl border border-slate-800/50">
                        <div className="flex gap-4 items-start">
                          <div className="flex-1">
                            <ImageUpload 
                              label={`Slide ${i + 1}`} 
                              value={img} 
                              onChange={(url) => {
                                const newImgs = [...heroConfig.sliderImages];
                                newImgs[i] = url;
                                setHeroConfig({...heroConfig, sliderImages: newImgs});
                              }} 
                            />
                          </div>
                          <button 
                            onClick={() => {
                              const newImgs = [...heroConfig.sliderImages];
                              newImgs.splice(i, 1);
                              setHeroConfig({...heroConfig, sliderImages: newImgs});
                            }} 
                            className="mt-9 p-2 text-red-500 hover:bg-red-500/20 rounded-xl transition-all"
                            title="Hapus Slide"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {(!heroConfig.sliderImages || heroConfig.sliderImages.length === 0) && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
                        Belum ada gambar slider. Klik "Tambah Slide" untuk memulai.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Config */}
          {activeTab === "product" && productConfig && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Produk</h2>
                <button onClick={() => saveConfig("product", productConfig)} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold transition-all">
                  <Save className="w-5 h-5" /> Simpan
                </button>
              </div>
              <div className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Judul Seksi</label>
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={productConfig.sectionTitle || ""} onChange={(e) => setProductConfig({...productConfig, sectionTitle: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Deskripsi Seksi</label>
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={productConfig.sectionDesc || ""} onChange={(e) => setProductConfig({...productConfig, sectionDesc: e.target.value})} />
                  </div>
                </div>
                <hr className="border-slate-800" />
                <ImageUpload label="Gambar Produk Utama" value={productConfig.mainImage} onChange={(url) => setProductConfig({...productConfig, mainImage: url})} />
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Judul Produk Utama</label>
                  <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={productConfig.mainTitle || ""} onChange={(e) => setProductConfig({...productConfig, mainTitle: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Deskripsi Produk Utama</label>
                  <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={productConfig.mainDesc || ""} onChange={(e) => setProductConfig({...productConfig, mainDesc: e.target.value})} />
                </div>
                <hr className="border-slate-800" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-slate-400">Manfaat & Keunggulan</label>
                    <button onClick={() => setProductConfig({...productConfig, benefits: [...(productConfig.benefits || []), {title: "", desc: ""}]})} className="text-blue-500 text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Tambah</button>
                  </div>
                  {(productConfig.benefits || []).map((b: any, i: number) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-sm" placeholder="Judul Manfaat" value={b.title} onChange={(e) => {
                          const newB = [...productConfig.benefits];
                          newB[i].title = e.target.value;
                          setProductConfig({...productConfig, benefits: newB});
                        }} />
                        <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-sm" placeholder="Deskripsi Singkat" value={b.desc} onChange={(e) => {
                          const newB = [...productConfig.benefits];
                          newB[i].desc = e.target.value;
                          setProductConfig({...productConfig, benefits: newB});
                        }} />
                      </div>
                      <button onClick={() => {
                        const newB = [...productConfig.benefits];
                        newB.splice(i, 1);
                        setProductConfig({...productConfig, benefits: newB});
                      }} className="text-red-500 p-1"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
                <hr className="border-slate-800" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-slate-400">Fitur & Spesifikasi</label>
                    <button onClick={() => setProductConfig({...productConfig, specs: [...(productConfig.specs || []), {label: "", value: ""}]})} className="text-blue-500 text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Tambah</button>
                  </div>
                  {(productConfig.specs || []).map((s: any, i: number) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-sm" placeholder="Label (misal: Berat)" value={s.label} onChange={(e) => {
                        const newS = [...productConfig.specs];
                        newS[i].label = e.target.value;
                        setProductConfig({...productConfig, specs: newS});
                      }} />
                      <input className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-sm" placeholder="Nilai (misal: 3.5kg)" value={s.value} onChange={(e) => {
                        const newS = [...productConfig.specs];
                        newS[i].value = e.target.value;
                        setProductConfig({...productConfig, specs: newS});
                      }} />
                      <button onClick={() => {
                        const newS = [...productConfig.specs];
                        newS.splice(i, 1);
                        setProductConfig({...productConfig, specs: newS});
                      }} className="text-red-500 p-1"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Config */}
          {activeTab === "teamConfig" && teamConfig && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Konten Tim</h2>
                <button onClick={() => saveConfig("team", teamConfig)} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold transition-all">
                  <Save className="w-5 h-5" /> Simpan
                </button>
              </div>
              <div className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Deskripsi Tim</label>
                  <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={teamConfig.description || ""} onChange={(e) => setTeamConfig({...teamConfig, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Visi</label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 h-32" value={teamConfig.vision || ""} onChange={(e) => setTeamConfig({...teamConfig, vision: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Misi</label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 h-32" value={teamConfig.mission || ""} onChange={(e) => setTeamConfig({...teamConfig, mission: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Tujuan</label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 h-32" value={teamConfig.goals || ""} onChange={(e) => setTeamConfig({...teamConfig, goals: e.target.value})} />
                  </div>
                </div>
                <ImageUpload label="Foto Bersama Tim" value={teamConfig.groupPhoto} onChange={(url) => setTeamConfig({...teamConfig, groupPhoto: url})} />
              </div>
            </div>
          )}

          {/* Legal Config */}
          {activeTab === "legalConfig" && legalConfig && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Sertifikasi & Legalitas</h2>
                <button onClick={() => saveConfig("legal", legalConfig)} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold transition-all">
                  <Save className="w-5 h-5" /> Simpan
                </button>
              </div>
              <div className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Judul Seksi</label>
                  <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={legalConfig.title || ""} onChange={(e) => setLegalConfig({...legalConfig, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Deskripsi Seksi</label>
                  <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={legalConfig.description || ""} onChange={(e) => setLegalConfig({...legalConfig, description: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          {/* List Collections */}
          {["packages", "team", "certifications", "testimonials", "docs", "faqs"].includes(activeTab) && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white capitalize">{activeTab}</h2>
                <button 
                  onClick={() => {
                    if (activeTab === 'packages') addItem('packages', { name: "Paket Baru", price: "0", desc: "", features: [], popular: false, image: "", waLink: "" });
                    if (activeTab === 'team') addItem('team', { name: "Nama", role: "Posisi", image: "", instagram: "" });
                    if (activeTab === 'certifications') addItem('certifications', { title: "Nama Dokumen", description: "Keterangan singkat", image: "" });
                    if (activeTab === 'faqs') addItem('faqs', { q: "Pertanyaan?", a: "Jawaban." });
                    if (activeTab === 'testimonials') addItem('testimonials', { name: "Nama", role: "Posisi", text: "", rating: 5 });
                    if (activeTab === 'docs') addItem('docs', { caption: "Keterangan", image: "" });
                  }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-all"
                >
                  <Plus className="w-5 h-5" /> Tambah Baru
                </button>
              </div>

              <div className="space-y-4">
                {activeTab === 'packages' && packages.map((item: any) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.name} onChange={(e) => updateItem('packages', item.id, { name: e.target.value })} placeholder="Nama Paket" />
                      <input className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.price} onChange={(e) => updateItem('packages', item.id, { price: e.target.value })} placeholder="Harga" />
                    </div>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.desc} onChange={(e) => updateItem('packages', item.id, { desc: e.target.value })} placeholder="Deskripsi" />
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.waLink} onChange={(e) => updateItem('packages', item.id, { waLink: e.target.value })} placeholder="Link WhatsApp (https://wa.me/...)" />
                    <ImageUpload label="Gambar Paket" value={item.image} onChange={(url) => updateItem('packages', item.id, { image: url })} />
                    <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="checkbox" checked={item.popular} onChange={(e) => updateItem('packages', item.id, { popular: e.target.checked })} /> Populer?
                      </label>
                      <button onClick={() => deleteItem('packages', item.id)} className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'team' && team.map((item: any) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.name} onChange={(e) => updateItem('team', item.id, { name: e.target.value })} placeholder="Nama" />
                        <input className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.role} onChange={(e) => updateItem('team', item.id, { role: e.target.value })} placeholder="Posisi" />
                      </div>
                      <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.instagram || ""} onChange={(e) => updateItem('team', item.id, { instagram: e.target.value })} placeholder="Link Instagram" />
                      <ImageUpload label="Foto Profil" value={item.image} onChange={(url) => updateItem('team', item.id, { image: url })} />
                    </div>
                    <button onClick={() => deleteItem('team', item.id)} className="text-red-500 self-start p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                {activeTab === 'certifications' && certifications.map((item: any) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex gap-6">
                    <div className="flex-1 space-y-4">
                      <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.title} onChange={(e) => updateItem('certifications', item.id, { title: e.target.value })} placeholder="Judul Dokumen" />
                      <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.description} onChange={(e) => updateItem('certifications', item.id, { description: e.target.value })} placeholder="Keterangan Singkat" />
                      <ImageUpload label="Gambar Dokumen" value={item.image} onChange={(url) => updateItem('certifications', item.id, { image: url })} />
                    </div>
                    <button onClick={() => deleteItem('certifications', item.id)} className="text-red-500 self-start p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                {activeTab === 'testimonials' && testimonials.map((item: any) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.name} onChange={(e) => updateItem('testimonials', item.id, { name: e.target.value })} placeholder="Nama" />
                      <input className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.role} onChange={(e) => updateItem('testimonials', item.id, { role: e.target.value })} placeholder="Posisi" />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-slate-400">Rating (1-5)</label>
                      <input type="number" min="1" max="5" className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 w-20" value={item.rating} onChange={(e) => updateItem('testimonials', item.id, { rating: parseInt(e.target.value) })} />
                    </div>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.text} onChange={(e) => updateItem('testimonials', item.id, { text: e.target.value })} placeholder="Ulasan" />
                    <button onClick={() => deleteItem('testimonials', item.id)} className="text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                {activeTab === 'docs' && docs.map((item: any) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <ImageUpload label="Gambar Dokumentasi" value={item.image} onChange={(url) => updateItem('docs', item.id, { image: url })} />
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.caption} onChange={(e) => updateItem('docs', item.id, { caption: e.target.value })} placeholder="Keterangan" />
                    <button onClick={() => deleteItem('docs', item.id)} className="text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                {activeTab === 'faqs' && faqs.map((item: any) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.q} onChange={(e) => updateItem('faqs', item.id, { q: e.target.value })} placeholder="Pertanyaan" />
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2" value={item.a} onChange={(e) => updateItem('faqs', item.id, { a: e.target.value })} placeholder="Jawaban" />
                    <button onClick={() => deleteItem('faqs', item.id)} className="text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
