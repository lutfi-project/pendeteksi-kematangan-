export type RipenessCategory = "MENTAH" | "MATANG" | "TERLALU MATANG";

export interface FruitAnalysis {
  detectedFruit: string;
  kategori: RipenessCategory;
  keyakinan: number;
  warna: string;
  tekstur: string;
  bentuk: string;
  rekomendasi: string;
}

export interface WorksheetItem {
  id: string;
  namaBuah: string;
  kondisiAktual: RipenessCategory;
  hasilAI: RipenessCategory | null;
  keyakinan: number | null;
  warna: string | null;
  tekstur: string | null;
  bentuk: string | null;
  rekomendasi: string | null;
  image: string; // Base64 or elegant SVG string representing the item
  status: "Benar" | "Salah" | null;
  tanggal: string;
}
