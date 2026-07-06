import React, { useState, useEffect, useRef } from "react";
import { 
  Camera, 
  Upload, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Plus, 
  Printer, 
  AlertTriangle, 
  Info, 
  HelpCircle,
  Eye,
  FileText,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  CameraOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WorksheetItem, RipenessCategory, FruitAnalysis } from "./types";

// Dynamic SVG Fruit Generator component for clean visual feedback
const FruitVector: React.FC<{ name: string; condition: RipenessCategory; size?: number }> = ({ name, condition, size = 64 }) => {
  const normalized = name.toLowerCase().trim();
  
  if (normalized.includes("mangga") || normalized.includes("mango")) {
    let gradientStart = "#10b981"; // Mentah: Emerald
    let gradientEnd = "#059669";
    let showSpots = false;
    let spotColor = "#047857";
    let spotPositions = [];

    if (condition === "MATANG") {
      gradientStart = "#fbbf24"; // Matang: Gold/Amber
      gradientEnd = "#ea580c";   // Orange-Red
    } else if (condition === "TERLALU MATANG") {
      gradientStart = "#b45309"; // Terlalu Matang: Dull brown-yellow
      gradientEnd = "#451a03";   // Dark brown
      showSpots = true;
      spotColor = "#1e0b02";
      spotPositions = [
        { cx: 28, cy: 35, r: 2.5 },
        { cx: 35, cy: 45, r: 3 },
        { cx: 45, cy: 25, r: 2 },
        { cx: 22, cy: 25, r: 1.5 },
        { cx: 40, cy: 38, r: 4 },
      ];
    }

    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-sm">
        <defs>
          <linearGradient id={`mangga-grad-${condition}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
        {/* Stem */}
        <path d="M32 12C32 8 35 6 38 6" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
        {/* Leaf */}
        <path d="M32 10C26 8 22 11 20 14C23 15 28 14 32 10Z" fill="#047857" />
        {/* Body */}
        <path 
          d="M32 12C20 14 14 24 14 36C14 48 24 56 34 56C44 56 48 46 48 36C48 24 42 12 32 12Z" 
          fill={`url(#mangga-grad-${condition})`} 
        />
        {/* Highlighting sheen */}
        <path d="M20 22C18 26 18 32 20 36C21 33 21 27 23 23" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        {/* Overripe spots */}
        {showSpots && spotPositions.map((p, idx) => (
          <circle key={idx} cx={p.cx} cy={p.cy} r={p.r} fill={spotColor} opacity="0.85" />
        ))}
      </svg>
    );
  } else if (normalized.includes("pisang") || normalized.includes("banana")) {
    let gradientStart = "#4ade80"; // Mentah: Pale Green
    let gradientEnd = "#22c55e";
    let showSpots = false;
    let spotColor = "#451a03";
    let spotPositions = [];

    if (condition === "MATANG") {
      gradientStart = "#fef08a"; // Matang: Yellow
      gradientEnd = "#eab308";   // Golden Yellow
      showSpots = true; // a few tiny brown sweetness spots
      spotColor = "#78350f";
      spotPositions = [
        { cx: 32, cy: 30, r: 0.8 },
        { cx: 38, cy: 28, r: 1 },
        { cx: 28, cy: 34, r: 0.7 },
        { cx: 42, cy: 24, r: 0.9 },
      ];
    } else if (condition === "TERLALU MATANG") {
      gradientStart = "#ca8a04"; // Terlalu matang: Dark yellow-brownish
      gradientEnd = "#3f1e04";
      showSpots = true;
      spotColor = "#1a0c02";
      spotPositions = [
        { cx: 30, cy: 30, r: 2.5 },
        { cx: 35, cy: 26, r: 3.5 },
        { cx: 25, cy: 35, r: 2 },
        { cx: 40, cy: 22, r: 3 },
        { cx: 45, cy: 18, r: 1.5 },
        { cx: 20, cy: 41, r: 2 },
      ];
    }

    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-sm">
        <defs>
          <linearGradient id={`pisang-grad-${condition}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
        {/* Crown/Stalk */}
        <path d="M48 10C45 13 41 18 39 22" stroke="#451a03" strokeWidth="4.5" strokeLinecap="round" />
        {/* Curved Banana Body */}
        <path 
          d="M48 11C40 18 14 26 14 44C14 50 18 54 22 54C34 54 44 32 48 11Z" 
          fill={`url(#pisang-grad-${condition})`} 
        />
        {/* Inner shadow/curve lines */}
        <path d="M43 16C37 25 24 33 20 45" stroke="#000000" strokeWidth="1" opacity="0.1" strokeLinecap="round" />
        {/* Banana tip */}
        <path d="M14 44C14 46 15 48 16 49" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
        {/* Spots */}
        {showSpots && spotPositions.map((p, idx) => (
          <circle key={idx} cx={p.cx} cy={p.cy} r={p.r} fill={spotColor} opacity="0.75" />
        ))}
      </svg>
    );
  } else {
    // Default fallback fruit (Apple-like sphere)
    let gradientStart = "#22c55e"; // Green apple
    let gradientEnd = "#15803d";
    let showSpots = false;
    let spotColor = "#451a03";
    let spotPositions = [];

    if (condition === "MATANG") {
      gradientStart = "#ef4444"; // Red apple
      gradientEnd = "#b91c1c";
    } else if (condition === "TERLALU MATANG") {
      gradientStart = "#7c2d12"; // Bruised brown apple
      gradientEnd = "#2c0e08";
      showSpots = true;
      spotPositions = [
        { cx: 32, cy: 32, r: 4 },
        { cx: 40, cy: 38, r: 3 },
      ];
    }

    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-sm">
        <defs>
          <linearGradient id={`default-grad-${condition}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
        {/* Stem */}
        <path d="M32 14C32 9 34 8 36 7" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
        {/* Body */}
        <path 
          d="M32 15C22 15 16 21 16 32C16 44 23 51 32 51C41 51 48 44 48 32C48 21 42 15 32 15Z" 
          fill={`url(#default-grad-${condition})`} 
        />
        {/* Apple indents */}
        <path d="M32 15C31 16 33 16 32 15M32 51C31 50 33 50 32 51" stroke="#334155" strokeWidth="1" />
        {/* Spots */}
        {showSpots && spotPositions.map((p, idx) => (
          <circle key={idx} cx={p.cx} cy={p.cy} r={p.r} fill={spotColor} opacity="0.6" />
        ))}
      </svg>
    );
  }
};

// Default high-quality preloaded practicum items
const DEFAULT_WORKSHEET: WorksheetItem[] = [
  {
    id: "1",
    namaBuah: "Mangga",
    kondisiAktual: "MENTAH",
    hasilAI: "MENTAH",
    keyakinan: 95,
    warna: "Warna dominan hijau tua merata (kebiruan) tanpa bintik kuning. Distribusi warna 100% hijau pekat mengindikasikan klorofil yang sangat tinggi dan belum terdegradasi.",
    tekstur: "Permukaan sangat kencang, halus, lilin alami tebal (cuticle layer). Tingkat kepadatan sel tinggi menandakan protopektin keras belum larut.",
    bentuk: "Lonjong bersudut tajam di bagian ujung (paruh buah) dengan tangkai yang masih kaku lurus, tidak bengkak di bahu.",
    rekomendasi: "Simpan pada suhu ruang (25-30°C) selama 5-7 hari. Jangan disimpan di lemari es agar tidak terjadi chilling injury yang menghentikan proses pematangan alami.",
    image: "mangga_mentah_pre",
    status: "Benar",
    tanggal: "02 Jul 2026, 09:15"
  },
  {
    id: "2",
    namaBuah: "Mangga",
    kondisiAktual: "MATANG",
    hasilAI: "MATANG",
    keyakinan: 98,
    warna: "Warna kuning keemasan dominan (sekitar 80%) di bagian pangkal buah dengan semburat jingga kemerahan serta sisa hijau tipis di bagian paruh ujung buah.",
    tekstur: "Kenyal elastis optimal (turgor sedang), tidak keras dan tidak terlalu lunak. Kulit bersih mulus dengan sedikit lentisel kecoklatan tersebar.",
    bentuk: "Bahu mangga tampak membulat tebal dan sedikit membengkak melewati tinggi tangkai buah, menandakan kematangan sempurna.",
    rekomendasi: "Sangat direkomendasikan untuk konsumsi segar langsung, salad buah, atau diolah menjadi jus buah murni. Simpan di kulkas untuk masa simpan hingga 3-4 hari.",
    image: "mangga_matang_pre",
    status: "Benar",
    tanggal: "02 Jul 2026, 10:20"
  },
  {
    id: "3",
    namaBuah: "Mangga",
    kondisiAktual: "TERLALU MATANG",
    hasilAI: "TERLALU MATANG",
    keyakinan: 92,
    warna: "Warna kuning tua kecoklatan yang kusam dengan bintik antraknosa (bercak hitam/coklat tua) melebar di 35% permukaan kulit buah.",
    tekstur: "Sangat lunak dan benyek saat disentuh, kulit mengendur akibat dehidrasi turgor sel dan kerusakan dinding pektin.",
    bentuk: "Menyusut di beberapa bagian luar dengan deformasi bentuk yang agak memipih, tangkai layu layu kecoklatan.",
    rekomendasi: "Tidak dianjurkan untuk dikonsumsi langsung secara segar karena risiko aroma fermentasi asam. Sangat baik diolah menjadi selai, sirup buah, pudding, atau adonan kue panggang.",
    image: "mangga_terlalu_matang_pre",
    status: "Benar",
    tanggal: "02 Jul 2026, 11:05"
  },
  {
    id: "4",
    namaBuah: "Pisang",
    kondisiAktual: "MENTAH",
    hasilAI: "MENTAH",
    keyakinan: 94,
    warna: "Warna hijau terang merata (100% hijau) dari ujung mahkota hingga pangkal tangkai pisang, tidak ada rona kuning sama sekali.",
    tekstur: "Permukaan sangat keras, berserat kasar pada lingkar sudut buah, kulit tebal dan sulit dikupas dengan tangan biasa.",
    bentuk: "Bersegi tajam bersudut (angular), ramping dan lurus kaku, diameter buah belum membulat penuh.",
    rekomendasi: "Letakkan di suhu ruang dalam kantong kertas bersama buah apel/pisang matang untuk mempercepat akumulasi gas etilen alami selama 3-4 hari.",
    image: "pisang_mentah_pre",
    status: "Benar",
    tanggal: "02 Jul 2026, 11:30"
  },
  {
    id: "5",
    namaBuah: "Pisang",
    kondisiAktual: "MATANG",
    hasilAI: "MATANG",
    keyakinan: 97,
    warna: "Kuning keemasan cerah merata di seluruh kulit pisang dengan kemunculan bintik coklat manis (sugar spots) halus di sekitar 10% kulit.",
    tekstur: "Empuk, lembut saat ditekan ringan, kulit tipis dan sangat mudah dikupas secara mulus dari ujung pangkal tangkai.",
    bentuk: "Silindris membulat penuh, sudut-sudut tajam buah telah melunak dan menyusut digantikan kelengkungan halus berisi pati manis.",
    rekomendasi: "Nikmati langsung secara segar sebagai sumber kalium dan energi instan yang tinggi. Sangat baik untuk bahan makanan penutup (banana split, crepes) atau pisang goreng.",
    image: "pisang_matang_pre",
    status: "Benar",
    tanggal: "02 Jul 2026, 13:45"
  }
];

export default function App() {
  // State variables
  const [items, setItems] = useState<WorksheetItem[]>(() => {
    const saved = localStorage.getItem("fruit_ripeness_worksheet");
    return saved ? JSON.parse(saved) : DEFAULT_WORKSHEET;
  });

  const [activeTab, setActiveTab] = useState<"analisis" | "lembar-kerja">("analisis");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [namaBuahInput, setNamaBuahInput] = useState("Mangga");
  const [customNamaBuah, setCustomNamaBuah] = useState("");
  const [kondisiAktualInput, setKondisiAktualInput] = useState<RipenessCategory>("MENTAH");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Analysis result holder
  const [currentResult, setCurrentResult] = useState<FruitAnalysis | null>(null);

  // Filter worksheet state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRipeness, setFilterRipeness] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Selected row for detail drawer
  const [selectedDetailItem, setSelectedDetailItem] = useState<WorksheetItem | null>(null);

  // Student manual analysis notes
  const [studentNotes, setStudentNotes] = useState<string>(() => {
    const saved = localStorage.getItem("fruit_ripeness_student_notes");
    return saved || "Berdasarkan praktikum kami, akurasi sistem AI cukup tinggi. Faktor kesalahan klasifikasi utama yang kami amati disebabkan oleh intensitas pencahayaan ruangan yang terlalu kuning (mempengaruhi persepsi warna model) dan bayangan buah yang menutupi tekstur permukaan kulit.";
  });

  // Camera stream ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Save state on change
  useEffect(() => {
    localStorage.setItem("fruit_ripeness_worksheet", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("fruit_ripeness_student_notes", studentNotes);
  }, [studentNotes]);

  // Loading indicator messages sequence
  useEffect(() => {
    if (!loading) return;
    const steps = [
      "Mengunggah gambar ke server pakar...",
      "Menganalisis pigmen warna dominan...",
      "Mengukur kerapatan tekstur permukaan kulit...",
      "Mendeteksi lekukan bentuk kematangan...",
      "Membandingkan dengan basis data pakar buah...",
      "Menyusun rekomendasi konsumsi..."
    ];
    let stepIndex = 0;
    setLoadingStep(steps[0]);

    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingStep(steps[stepIndex]);
    }, 1800);

    return () => clearInterval(interval);
  }, [loading]);

  // Camera start/stop handlers
  const startCamera = async () => {
    setErrorMsg(null);
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: 640, height: 480 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access failed", err);
      setErrorMsg("Gagal mengakses kamera Anda. Harap beri izin kamera atau unggah file secara manual.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setSelectedImage(dataUrl);
        stopCamera();
      }
    }
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // AI Analysis Trigger
  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMsg("Harap pilih gambar atau ambil foto buah terlebih dahulu!");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setCurrentResult(null);

    const activeFruitName = namaBuahInput === "Lainnya" ? customNamaBuah : namaBuahInput;

    try {
      const response = await fetch("/api/analyze-fruit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: selectedImage,
          namaBuah: activeFruitName || undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.details || errData.error || "Gagal menghubungi server pakar.");
      }

      const result: FruitAnalysis = await response.json();
      setCurrentResult(result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Terjadi kesalahan koneksi atau internal sistem saat menganalisis.");
    } finally {
      setLoading(false);
    }
  };

  // Save current result to Worksheet
  const handleSaveToWorksheet = () => {
    if (!currentResult || !selectedImage) return;

    const activeFruitName = namaBuahInput === "Lainnya" ? customNamaBuah : namaBuahInput;
    const isCorrect = kondisiAktualInput === currentResult.kategori ? "Benar" : "Salah";

    const newItem: WorksheetItem = {
      id: Date.now().toString(),
      namaBuah: activeFruitName || currentResult.detectedFruit || "Buah Terdeteksi",
      kondisiAktual: kondisiAktualInput,
      hasilAI: currentResult.kategori,
      keyakinan: currentResult.keyakinan,
      warna: currentResult.warna,
      tekstur: currentResult.tekstur,
      bentuk: currentResult.bentuk,
      rekomendasi: currentResult.rekomendasi,
      image: selectedImage,
      status: isCorrect,
      tanggal: new Date().toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    };

    setItems(prev => [newItem, ...prev]);
    setCurrentResult(null);
    setSelectedImage(null);
    setActiveTab("lembar-kerja");
  };

  // Delete worksheet item
  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Apakah Anda yakin ingin menghapus data buah ini dari lembar kerja?")) {
      setItems(prev => prev.filter(item => item.id !== id));
      if (selectedDetailItem?.id === id) {
        setSelectedDetailItem(null);
      }
    }
  };

  // Reset whole worksheet to defaults
  const handleResetWorksheet = () => {
    if (confirm("Apakah Anda yakin ingin mereset seluruh lembar kerja kembali ke data bawaan praktikum?")) {
      setItems(DEFAULT_WORKSHEET);
      setSelectedDetailItem(null);
      localStorage.setItem("fruit_ripeness_worksheet", JSON.stringify(DEFAULT_WORKSHEET));
    }
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Worksheet filtering and searching logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.namaBuah.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.kondisiAktual.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRipeness = filterRipeness === "ALL" || 
                            item.kondisiAktual === filterRipeness || 
                            item.hasilAI === filterRipeness;
    const matchesStatus = filterStatus === "ALL" || item.status === filterStatus;
    
    return matchesSearch && matchesRipeness && matchesStatus;
  });

  // Calculate stats
  const totalAnalyzed = items.filter(item => item.hasilAI !== null).length;
  const totalCorrect = items.filter(item => item.status === "Benar").length;
  const accuracyTotal = totalAnalyzed > 0 ? Math.round((totalCorrect / totalAnalyzed) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* GEOMETRIC BALANCE HEADER */}
      <header className="no-print h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sm:px-10 flex-shrink-0 sticky top-0 z-40 shadow-sm">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 font-display">
              FRUITEYE <span className="font-light text-slate-500 font-sans">| Expert Analysis System</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase leading-none mt-0.5">
              Laboratorium Citra Kognitif
            </p>
          </div>
        </div>

        {/* Center: Sleek Geometric Navigation */}
        <nav className="flex space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 shadow-inner">
          <button
            onClick={() => { setActiveTab("analisis"); stopCamera(); }}
            className={`flex items-center space-x-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "analisis"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Camera size={14} className={activeTab === "analisis" ? "text-emerald-600" : "text-slate-400"} />
            <span>Analisis Instan</span>
          </button>
          <button
            onClick={() => { setActiveTab("lembar-kerja"); stopCamera(); }}
            className={`flex items-center space-x-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "lembar-kerja"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <FileText size={14} className={activeTab === "lembar-kerja" ? "text-emerald-600" : "text-slate-400"} />
            <span>Lembar Kerja Praktikum</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              {items.length}
            </span>
          </button>
        </nav>

        {/* Right Side: Sensor ID & Live Status */}
        <div className="hidden md:flex gap-4 text-xs font-semibold uppercase tracking-widest text-slate-400 items-center">
          <span>Sensor ID: 0822-X</span>
          <span className="h-4 w-px bg-slate-200"></span>
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Ready
          </span>
        </div>

      </header>

      {/* PRINT-ONLY HEADER */}
      <div className="hidden print-only print-full-width p-4 border-b border-slate-400 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">LAPORAN HASIL PRAKTIKUM MAHASISWA</h1>
            <h2 className="text-lg font-medium text-slate-700">FRUITEYE | Sistem Pakar Analisis Kematangan Buah Berbasis Citra</h2>
            <p className="text-sm text-slate-500 mt-1">Dicetak pada: {new Date().toLocaleString("id-ID")} WIB</p>
          </div>
          <div className="text-right border-l-2 border-emerald-500 pl-4">
            <div className="text-xs uppercase text-slate-400 font-bold">AKURASI TOTAL</div>
            <div className="text-2xl font-bold text-slate-900">{accuracyTotal}%</div>
            <div className="text-xs text-slate-600">({totalCorrect} dari {totalAnalyzed} Klasifikasi Benar)</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>
            <span className="font-semibold">Nama Mahasiswa:</span> ______________________
          </div>
          <div>
            <span className="font-semibold">NIM / Kelas:</span> ______________________
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print-full-width">
        
        {/* TAB 1: ANALISIS INSTAN & DETEKSI BUAH */}
        {activeTab === "analisis" && (
          <div className="grid grid-cols-12 gap-8 no-print">
            
            {/* INPUT PANEL: PHOTO & PARAMS (5 COLS) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
              
              {/* Image Input Container - Styled dynamically as a Geometric Frame */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Live Video / Citra Masukan
                  </h3>
                  {cameraActive ? (
                    <button 
                      onClick={stopCamera}
                      className="flex items-center space-x-1 text-xs text-rose-600 hover:text-rose-700 font-semibold"
                    >
                      <CameraOff size={14} />
                      <span>Matikan Kamera</span>
                    </button>
                  ) : (
                    <button 
                      onClick={startCamera}
                      className="flex items-center space-x-1 text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      <Camera size={14} />
                      <span>Gunakan Kamera</span>
                    </button>
                  )}
                </div>

                {/* Main Viewfinder / Dropzone with geometric layout, backdrop gradients and overlays */}
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="w-full min-h-[320px] bg-slate-900 rounded-2xl border border-slate-200 relative overflow-hidden group shadow-inner flex flex-col items-center justify-center text-center"
                >
                  {cameraActive ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="w-full h-auto aspect-[4/3] object-cover"
                      />
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                        <button
                          onClick={capturePhoto}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-lg flex items-center space-x-1.5 transition-all active:scale-95 border border-emerald-500/20"
                        >
                          <Camera size={15} />
                          <span>Ambil Foto</span>
                        </button>
                      </div>
                    </div>
                  ) : selectedImage ? (
                    <div className="relative w-full h-full aspect-[4/3] flex items-center justify-center">
                      <img 
                        src={selectedImage} 
                        alt="Fruit Preview" 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Ambient Gradient overlay from theme */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                      
                      {/* Interactive Replace/Delete Bar */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 flex items-center justify-center space-x-2">
                        <label 
                          htmlFor="replace-image-upload" 
                          className="cursor-pointer bg-white text-slate-800 text-xs font-bold py-2 px-4 rounded-lg shadow-md hover:bg-slate-100 transition-all flex items-center space-x-1.5"
                        >
                          <Upload size={14} />
                          <span>Ganti Foto</span>
                        </label>
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="bg-rose-600 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md hover:bg-rose-700 transition-all flex items-center space-x-1.5"
                        >
                          <Trash2 size={14} />
                          <span>Hapus</span>
                        </button>
                      </div>

                      {/* Floating Metadata details inspired by Geometric Balance design */}
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 text-left pointer-events-none">
                        <div>
                          <p className="text-[10px] opacity-70 text-white uppercase tracking-wider font-bold">Image Source</p>
                          <p className="text-sm font-medium text-white font-mono truncate max-w-[200px]">
                            {selectedImage.startsWith("data:") ? "Live-Camera-Input.jpg" : "Visual-Input-Image.jpg"}
                          </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded border border-white/30 flex gap-1">
                          <div className="w-1 h-4 bg-emerald-400"></div>
                          <div className="w-1 h-4 bg-emerald-400"></div>
                          <div className="w-1 h-4 bg-emerald-400"></div>
                          <div className="w-1 h-4 bg-slate-400/50"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center space-y-4">
                      {/* Centered geometric circle animation */}
                      <div className="w-52 h-52 mx-auto bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center overflow-hidden relative">
                        <div className="w-36 h-36 bg-emerald-500 rounded-full blur-2xl opacity-20 absolute"></div>
                        <div className="z-20 text-white flex flex-col items-center">
                          <Upload size={32} className="text-emerald-400 mb-2" />
                          <span className="font-semibold text-xs text-slate-300">Letakkan Citra Buah</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">
                          Drag & drop foto buah di sini atau klik tombol di bawah untuk memilih file dari komputer
                        </p>
                      </div>
                      <label 
                        htmlFor="image-upload"
                        className="inline-block cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all active:scale-95"
                      >
                        Pilih Berkas Citra
                      </label>
                    </div>
                  )}

                  {/* Hidden inputs */}
                  <input 
                    type="file" 
                    id="image-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                  <input 
                    type="file" 
                    id="replace-image-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                </div>
              </div>

              {/* Live Parameters / Inputs Container */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Metadata</h3>
                  <span className="px-2.5 py-0.5 bg-slate-100 text-[10px] font-mono rounded text-slate-500">
                    ID: FR-2026-{namaBuahInput.substring(0, 2).toUpperCase()}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Fruit Selection */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Spesimen Buah
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Mangga", "Pisang", "Apel", "Alpukat", "Pepaya", "Lainnya"].map((fruit) => (
                        <button
                          key={fruit}
                          type="button"
                          onClick={() => setNamaBuahInput(fruit)}
                          className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all text-center ${
                            namaBuahInput === fruit
                              ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm"
                              : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {fruit}
                        </button>
                      ))}
                    </div>
                    {namaBuahInput === "Lainnya" && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="mt-2"
                      >
                        <input
                          type="text"
                          placeholder="Masukkan nama buah lainnya..."
                          value={customNamaBuah}
                          onChange={(e) => setCustomNamaBuah(e.target.value)}
                          className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Actual Condition (For Accuracy Calculations) */}
                  <div>
                    <div className="flex items-center space-x-1.5 mb-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Kondisi Aktual (Pembanding)
                      </label>
                      <div className="group relative cursor-help">
                        <HelpCircle size={12} className="text-slate-400" />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 hidden group-hover:block bg-slate-900 text-white text-xxs p-2 rounded-lg shadow-xl z-50 leading-relaxed">
                          Keadaan sebenarnya dari sampel buah. Akan dicocokkan dengan hasil analisis kognitif model AI untuk mengukur nilai keakuratan (Benar/Salah).
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: "MENTAH", label: "Mentah", color: "hover:bg-emerald-50 hover:text-emerald-800", active: "bg-emerald-50 border-emerald-500 text-emerald-800" },
                        { val: "MATANG", label: "Matang", color: "hover:bg-amber-50 hover:text-amber-800", active: "bg-amber-50 border-amber-500 text-amber-800" },
                        { val: "TERLALU MATANG", label: "Terlalu Matang", color: "hover:bg-rose-50 hover:text-rose-800", active: "bg-rose-50 border-rose-500 text-rose-800" }
                      ].map((cond) => (
                        <button
                          key={cond.val}
                          type="button"
                          onClick={() => setKondisiAktualInput(cond.val as RipenessCategory)}
                          className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all text-center ${
                            kondisiAktualInput === cond.val ? cond.active + " shadow-sm" : "bg-slate-50 border-slate-100 text-slate-600 " + cond.color
                          }`}
                        >
                          {cond.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Action Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={loading || !selectedImage}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2 ${
                      !selectedImage 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" 
                        : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:shadow-lg active:scale-[0.99]"
                    }`}
                  >
                    {loading ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <Sparkles size={14} />
                    )}
                    <span>{loading ? "Mengevaluasi Kematangan..." : "Mulai Analisis Pakar AI"}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* RESULTS PANEL (7 COLS) */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
              
              {/* Error box */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start space-x-3 shadow-sm">
                  <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider">Kesalahan Koneksi</h4>
                    <p className="text-xs mt-0.5 leading-relaxed">{errorMsg}</p>
                  </div>
                </div>
              )}

              {/* Loading Placeholder with modern spinner */}
              {loading && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center min-h-[460px] text-center space-y-6">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-slate-100 border-t-emerald-600 rounded-full animate-spin"></div>
                    <div className="animate-pulse">
                      <FruitVector name={namaBuahInput} condition={kondisiAktualInput} size={56} />
                    </div>
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h4 className="font-display font-bold text-slate-800 text-lg tracking-tight">Menghubungi Server Kognitif...</h4>
                    <p className="text-xs text-slate-500 font-mono italic animate-pulse">{loadingStep}</p>
                  </div>
                  <div className="bg-slate-50 px-4 py-2.5 rounded-xl text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
                    Model: Gemini-3.5-Flash (Latency: ~1.2s)
                  </div>
                </div>
              )}

              {/* Empty state: Waiting for action */}
              {!loading && !currentResult && (
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm flex flex-1 flex-col items-center justify-center min-h-[460px] text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                    <Eye size={28} />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h4 className="font-display font-bold text-slate-800 text-base tracking-tight">Evaluasi Citra Tertunda</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Silakan pilih spesimen buah, tentukan kondisi aktualnya secara subjektif, dan unggah foto/capture camera untuk memicu proses klasifikasi otomatis menggunakan model visi pakar Gemini.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <span className="bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold py-1 px-3 rounded-full flex items-center space-x-1 uppercase tracking-wider">
                      <span>✓ ANALISIS WARNA</span>
                    </span>
                    <span className="bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold py-1 px-3 rounded-full flex items-center space-x-1 uppercase tracking-wider">
                      <span>✓ EVALUASI KULIT</span>
                    </span>
                    <span className="bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold py-1 px-3 rounded-full flex items-center space-x-1 uppercase tracking-wider">
                      <span>✓ DETEKSI BENTUK</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Active Result Card matching GEOMETRIC BALANCE high-fidelity theme */}
              {!loading && currentResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6"
                >
                  
                  {/* Card Row 1: Split Kategori & Confidence */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* LEFT CARD: Hasil Klasifikasi (Premium Emerald block) */}
                    <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-900/10 flex flex-col justify-between h-48 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-6 translate-x-6"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-1 font-bold">Hasil Klasifikasi</p>
                          <h2 className="text-4xl font-black font-display tracking-tight">{currentResult.kategori}</h2>
                        </div>
                        <div className="bg-white/20 p-2.5 rounded-full text-white backdrop-blur-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed">
                        {currentResult.kategori === "MENTAH" 
                          ? "Kandungan klorofil sangat tinggi dengan tingkat kekerasan sel padat. Belum siap konsumsi."
                          : currentResult.kategori === "MATANG"
                          ? "Tingkat turgor sel optimal dengan kandungan gula maksimal. Siap konsumsi segera."
                          : "Pektin telah melarut sepenuhnya, kulit mengalami dehidrasi berat. Konsumsi segera."}
                      </p>
                    </div>

                    {/* RIGHT CARD: Confidence Level */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col justify-between h-48 shadow-sm">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Confidence Level</p>
                        <span className="text-emerald-600 font-bold text-[10px] tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                          {currentResult.keyakinan >= 90 ? "High Precision" : "Standard Precision"}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-6xl font-light text-slate-800 font-display">{currentResult.keyakinan}</span>
                        <span className="text-2xl text-slate-400 font-display">%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full transition-all duration-1000"
                          style={{ width: `${currentResult.keyakinan}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>

                  {/* Accuracy check comparison banner */}
                  <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm ${
                    kondisiAktualInput === currentResult.kategori
                      ? "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                      : "bg-amber-50/50 border-amber-100 text-amber-800"
                  }`}>
                    <div className="flex items-center space-x-3">
                      {kondisiAktualInput === currentResult.kategori ? (
                        <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-amber-600 shrink-0" />
                      )}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider">
                          Uji Kesesuaian Lapangan
                        </p>
                        <p className="text-xs mt-0.5 text-slate-600 leading-relaxed">
                          {kondisiAktualInput === currentResult.kategori 
                            ? "Hasil prediksi AI terbukti BENAR sesuai pengamatan aktual Anda."
                            : `Model mendeteksi ${currentResult.kategori}, sedangkan aktual di lapangan terhitung ${kondisiAktualInput}.`
                          }
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold py-1 px-3 rounded-lg ${
                      kondisiAktualInput === currentResult.kategori
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {kondisiAktualInput === currentResult.kategori ? "CORRECT MATCH" : "MISMATCH"}
                    </span>
                  </div>

                  {/* Card Row 2: 3 Detailed Geometric Visual Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Warna */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col gap-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l3.9-3.9a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.9 3.9V4a.75.75 0 011.5 0v10.243z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">1. Warna Dominan</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{currentResult.warna}</p>
                    </div>

                    {/* Tekstur */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col gap-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">2. Tekstur Kulit</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{currentResult.tekstur}</p>
                    </div>

                    {/* Bentuk */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col gap-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">3. Geometri Bentuk</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{currentResult.bentuk}</p>
                    </div>

                  </div>

                  {/* Card Row 3: Slate Dark Recommendations Container */}
                  <div className="bg-slate-800 p-8 rounded-3xl text-white flex flex-col sm:flex-row items-center gap-6 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl"></div>
                    <div className="flex-shrink-0 w-16 h-16 border-2 border-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-emerald-500 font-black text-xl tracking-tighter">REC</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Rekomendasi Ahli</h4>
                      <p className="text-sm sm:text-base font-light opacity-90 leading-relaxed text-slate-200">
                        {currentResult.rekomendasi}
                      </p>
                    </div>
                  </div>

                  {/* Save/Append button container */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSaveToWorksheet}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md transition-all flex items-center space-x-2 hover:shadow-lg active:scale-95 border border-emerald-500/20"
                    >
                      <Plus size={14} />
                      <span>Simpan ke Lembar Kerja Praktikum</span>
                    </button>
                  </div>

                </motion.div>
              )}

            </div>
          </div>
        )}

        {/* TAB 2: LEMBAR KERJA PRAKTIKUM (INTERACTIVE TABLE + STATS) */}
        {(activeTab === "lembar-kerja" || window.matchMedia("print").matches) && (
          <div className="space-y-6">
            
            {/* STATS OVERVIEW CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Card: Total Analyzed */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs print-card flex flex-col justify-between h-28">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Sampel</span>
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-4xl font-light text-slate-800 font-display">{totalAnalyzed}</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Sampel</span>
                </div>
              </div>

              {/* Card: Total Correct */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs print-card flex flex-col justify-between h-28">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Klasifikasi Benar</span>
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-4xl font-bold text-emerald-600 font-display">{totalCorrect}</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Match</span>
                </div>
              </div>

              {/* Card: Total Incorrect */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs print-card flex flex-col justify-between h-28">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Klasifikasi Salah</span>
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-4xl font-bold text-amber-500 font-display">{totalAnalyzed - totalCorrect}</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Mismatch</span>
                </div>
              </div>

              {/* Card: Overall Accuracy */}
              <div className={`rounded-2xl border p-5 shadow-xs print-card flex flex-col justify-between h-28 ${
                accuracyTotal >= 80 ? "border-emerald-200 bg-emerald-50/10" : "border-amber-200 bg-amber-50/10"
              }`}>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Akurasi Sistem</span>
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className={`text-4xl font-black font-display ${accuracyTotal >= 80 ? "text-emerald-700" : "text-amber-700"}`}>
                    {accuracyTotal}
                  </span>
                  <span className={`text-xl font-bold font-display ${accuracyTotal >= 80 ? "text-emerald-500" : "text-amber-500"}`}>%</span>
                </div>
              </div>

            </div>

            {/* INTERACTIVE TABLE CARD */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden print-card">
              
              {/* Filter controls header (No-print) */}
              <div className="no-print bg-slate-50/50 p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                {/* Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama buah atau kondisi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 pl-9 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <span className="absolute left-3 top-3 text-slate-400">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 items-center">
                  
                  {/* Ripeness level filter */}
                  <select
                    value={filterRipeness}
                    onChange={(e) => setFilterRipeness(e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                  >
                    <option value="ALL">Semua Kematangan</option>
                    <option value="MENTAH">Mentah</option>
                    <option value="MATANG">Matang</option>
                    <option value="TERLALU MATANG">Terlalu Matang</option>
                  </select>

                  {/* Correctness status filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                  >
                    <option value="ALL">Semua Status</option>
                    <option value="Benar">Benar (Match)</option>
                    <option value="Salah">Salah (Mismatch)</option>
                  </select>

                  {/* Reset & Print Actions */}
                  <div className="flex items-center space-x-1.5 pl-2 border-l border-slate-200">
                    <button
                      onClick={handlePrint}
                      className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
                      title="Cetak Laporan"
                    >
                      <Printer size={14} />
                      <span className="hidden sm:inline">Cetak</span>
                    </button>
                    <button
                      onClick={handleResetWorksheet}
                      className="bg-white hover:bg-rose-50 border border-slate-200 text-slate-600 text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
                      title="Reset Data"
                    >
                      <RefreshCw size={14} />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* Table rendering */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-4 px-4 text-center w-12">No</th>
                      <th className="py-4 px-4 w-16">Foto</th>
                      <th className="py-4 px-4">Nama Buah</th>
                      <th className="py-4 px-4">Kondisi Aktual</th>
                      <th className="py-4 px-4">Hasil AI (Gemini)</th>
                      <th className="py-4 px-4 text-center">Keyakinan (%)</th>
                      <th className="py-4 px-4 text-center w-28">Benar/Salah</th>
                      <th className="py-4 px-4 text-center w-24 no-print">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, index) => {
                        const isPreloaded = item.image.endsWith("_pre");
                        return (
                          <tr 
                            key={item.id}
                            onClick={() => setSelectedDetailItem(item)}
                            className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                          >
                            {/* No */}
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-400">
                              {index + 1}
                            </td>

                            {/* Image Placeholder or captured thumbnail */}
                            <td className="py-3 px-4">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                {isPreloaded ? (
                                  <div className="scale-75">
                                    <FruitVector name={item.namaBuah} condition={item.kondisiAktual} size={36} />
                                  </div>
                                ) : (
                                  <img 
                                    src={item.image} 
                                    alt="fruit photo" 
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            </td>

                            {/* Name */}
                            <td className="py-3 px-4 font-bold text-slate-800">
                              {item.namaBuah}
                            </td>

                            {/* Actual ripeness condition */}
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                                item.kondisiAktual === "MENTAH"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                                  : item.kondisiAktual === "MATANG"
                                  ? "bg-amber-50 text-amber-800 border border-amber-100"
                                  : "bg-amber-900/10 text-amber-900 border border-amber-900/20"
                              }`}>
                                {item.kondisiAktual}
                              </span>
                            </td>

                            {/* AI prediction */}
                            <td className="py-3 px-4">
                              {item.hasilAI ? (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                                  item.hasilAI === "MENTAH"
                                    ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                                    : item.hasilAI === "MATANG"
                                    ? "bg-amber-50 text-amber-800 border border-amber-100"
                                    : "bg-amber-900/10 text-amber-900 border border-amber-900/20"
                                }`}>
                                  {item.hasilAI}
                                </span>
                              ) : (
                                <span className="text-slate-400 italic">Belum diuji</span>
                              )}
                            </td>

                            {/* Confidence % */}
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">
                              {item.keyakinan ? `${item.keyakinan}%` : "-"}
                            </td>

                            {/* Match Verification (BENAR / SALAH) */}
                            <td className="py-3 px-4 text-center">
                              {item.status ? (
                                <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.status === "Benar"
                                    ? "bg-emerald-100 text-emerald-900"
                                    : "bg-rose-100 text-rose-950"
                                }`}>
                                  {item.status === "Benar" ? (
                                    <>
                                      <CheckCircle size={10} className="stroke-[3]" />
                                      <span>BENAR</span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle size={10} className="stroke-[3]" />
                                      <span>SALAH</span>
                                    </>
                                  )}
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>

                            {/* Delete Action (No-print) */}
                            <td className="py-3 px-4 text-center no-print">
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => setSelectedDetailItem(item)}
                                  className="text-slate-500 hover:text-emerald-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                                  title="Detail Analisis"
                                >
                                  <Eye size={14} />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteItem(item.id, e)}
                                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                                  title="Hapus Baris"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400 italic">
                          Tidak ada data buah yang cocok dengan filter atau pencarian Anda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total accuracy bottom row */}
              <div className="bg-slate-50 px-4 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">AKURASI TOTAL LAPANGAN</span>
                <span className={`text-sm font-bold font-display ${accuracyTotal >= 80 ? "text-emerald-700" : "text-amber-700"}`}>
                  {accuracyTotal}%
                </span>
              </div>

            </div>

            {/* DETAILED EXPANDED DRAWER/PANEL (GEOMETRIC LAYOUT SPECIFICITY) */}
            <AnimatePresence>
              {selectedDetailItem && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-white rounded-2xl border-2 border-emerald-500/20 p-6 shadow-lg relative space-y-4 print-card text-left"
                >
                  <button 
                    onClick={() => setSelectedDetailItem(null)}
                    className="no-print absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
                  >
                    <XCircle size={18} />
                  </button>

                  <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                    <div className="scale-75">
                      <FruitVector name={selectedDetailItem.namaBuah} condition={selectedDetailItem.kondisiAktual} size={44} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm">
                        Ciri Visual Detail: {selectedDetailItem.namaBuah} ({selectedDetailItem.kondisiAktual})
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Diuji pada: {selectedDetailItem.tanggal}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-1">
                      <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">WARNA DOMINAN</span>
                      <p className="text-slate-600 leading-relaxed">{selectedDetailItem.warna || "Tidak ada detail warna."}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-1">
                      <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">TEKSTUR KULIT</span>
                      <p className="text-slate-600 leading-relaxed">{selectedDetailItem.tekstur || "Tidak ada detail tekstur."}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-1">
                      <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">GEOMETRI BENTUK</span>
                      <p className="text-slate-600 leading-relaxed">{selectedDetailItem.bentuk || "Tidak ada detail bentuk."}</p>
                    </div>

                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                    <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">REKOMENDASI KONSUMSI</span>
                    <p className="text-slate-700 font-bold leading-relaxed">{selectedDetailItem.rekomendasi || "Tidak ada rekomendasi."}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ERROR ANALYSIS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Educational guidelines (5 cols) */}
              <div className="md:col-span-5 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4 print-card text-left">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <BookOpen size={18} />
                  <h4 className="font-display font-bold text-sm tracking-tight text-slate-900">
                    Panduan Analisis Kesalahan AI
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dalam lembar kerja praktikum kognitif ini, mahasiswa diminta menganalisis apa yang menyebabkan sistem AI (Gemini) salah mendeteksi tingkat kematangan buah. Berikut adalah beberapa faktor utama yang sering memicu kesalahan:
                </p>
                <ul className="text-xs text-slate-500 space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong className="text-slate-700">Intensitas Pencahayaan:</strong> Cahaya kekuningan dari lampu pijar dapat membiaskan warna kulit hijau seakan-akan kuning (mengelabui deteksi buah "Mentah" sebagai "Matang").
                  </li>
                  <li>
                    <strong className="text-slate-700">Sudut Pengambilan Gambar:</strong> Jika bercak coklat (antraknosa) dehidrasi berada di sisi belakang buah yang membelakangi kamera, AI hanya mendeteksi sisi mulus depannya.
                  </li>
                  <li>
                    <strong className="text-slate-700">Bayangan Tebal (Shadows):</strong> Bayangan gelap di bawah buah dapat disalahpahami oleh model sebagai bercak hitam/degradasi busuk ("Terlalu Matang").
                  </li>
                  <li>
                    <strong className="text-slate-700">Varietas Buah Lokal:</strong> Beberapa buah lokal (seperti mangga harum manis) tetap berwarna hijau meskipun tekstur dalamnya sangat manis dan matang optimal.
                  </li>
                </ul>
              </div>

              {/* Editable Student Report text-area (7 cols) */}
              <div className="md:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4 print-card text-left">
                <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <FileText size={18} />
                    <h4 className="font-display font-bold text-sm tracking-tight text-slate-900">
                      Analisis & Kesimpulan Praktikum (Mahasiswa)
                    </h4>
                  </div>
                  <span className="no-print text-[10px] bg-emerald-50 text-emerald-700 font-bold py-1 px-2.5 rounded-full flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                    <span>Auto-Saved</span>
                  </span>
                </div>
                
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tulis kesimpulan, faktor-faktor kesalahan klasifikasi, serta hasil pengamatan praktikum Anda pada kotak di bawah ini untuk disertakan dalam dokumen cetak laporan:
                </p>

                <textarea
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  rows={8}
                  placeholder="Ketik analisis kesalahan klasifikasi sistem pakar di sini..."
                  className="w-full text-xs p-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50 text-slate-700 leading-relaxed"
                />

                <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium">
                  <Info size={12} className="shrink-0" />
                  <span>Isi catatan ini akan tercetak secara otomatis saat Anda menekan tombol "Cetak" di atas.</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="no-print border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Laboratorium Rekayasa Perangkat Lunak & Sistem Cerdas.</p>
          <p className="mt-1 text-[10px]">Pemberdayaan Kognitif Berbasis Google Gemini SDK @google/genai v2.4.0</p>
        </div>
      </footer>

    </div>
  );
}
