export interface Book {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  year: number;
  category: BookCategory;
  description?: string;
  coverColor?: string;
  fileType: "pdf" | "url" | "none";
  fileUrl?: string; // URL eksternal atau path file PDF
  fileBase64?: string; // Opsional: PDF di-embed sebagai base64
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export type BookCategory =
  | "Regulasi"
  | "Teknis"
  | "Panduan"
  | "Laporan"
  | "Referensi"
  | "Lainnya";

export const BOOK_CATEGORIES: BookCategory[] = [
  "Regulasi",
  "Teknis",
  "Panduan",
  "Laporan",
  "Referensi",
  "Lainnya",
];

export const COVER_COLORS: { label: string; bg: string; accent: string }[] = [
  { label: "Biru", bg: "#B5D4F4", accent: "#185FA5" },
  { label: "Hijau", bg: "#9FE1CB", accent: "#0F6E56" },
  { label: "Oranye", bg: "#F5C4B3", accent: "#993C1D" },
  { label: "Kuning", bg: "#FAC775", accent: "#854F0B" },
  { label: "Ungu", bg: "#CECBF6", accent: "#3C3489" },
  { label: "Pink", bg: "#F4C0D1", accent: "#72243E" },
];
