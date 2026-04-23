import { useState, useMemo } from 'react';
import type { Book, BookCategory } from '../../../types/library';
import { BOOK_CATEGORIES } from '../../../types/library';
import { BookCover } from '../ui/BookCover';

interface LibraryPageProps {
    books: Book[];
    onSelectBook: (book: Book) => void;
    onBack: () => void;
}

// const categoryColors: Record<string, { bg: string; text: string }> = {
//     Regulasi: { bg: '#E6F1FB', text: '#185FA5' },
//     Teknis: { bg: '#E1F5EE', text: '#0F6E56' },
//     Panduan: { bg: '#FAEEDA', text: '#854F0B' },
//     Laporan: { bg: '#FAECE7', text: '#993C1D' },
//     Referensi: { bg: '#EEEDFE', text: '#3C3489' },
//     Lainnya: { bg: '#F1EFE8', text: '#444441' },
// };

export function LibraryPage({ books, onSelectBook, onBack }: LibraryPageProps) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<BookCategory | 'Semua'>('Semua');

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return books.filter((b) => {
            const matchCat = activeCategory === 'Semua' || b.category === activeCategory;
            const matchSearch =
                !q ||
                b.title.toLowerCase().includes(q) ||
                b.author.toLowerCase().includes(q) ||
                b.category.toLowerCase().includes(q) ||
                (b.description?.toLowerCase().includes(q) ?? false) ||
                (b.tags?.some((t) => t.toLowerCase().includes(q)) ?? false);
            return matchCat && matchSearch;
        });
    }, [books, search, activeCategory]);

    const totalPdf = books.filter((b) => b.fileType === 'pdf').length;
    const categories = BOOK_CATEGORIES.filter((c) => books.some((b) => b.category === c));

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Hero */}
            <div
                className="bg-white border-b border-border"
            >
                <div className="max-w-5xl mx-auto px-4 py-10">
                    <button
                        onClick={onBack}
                        className="text-sm text-muted-foreground hover:text-foreground mb-4"
                    >
                        ← Kembali
                    </button>
                    <h1 className="text-3xl font-semibold mb-2">
                        Perpustakaan & Referensi
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        Koleksi buku, regulasi, panduan, dan dokumen referensi
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4">
                        {[
                            { num: books.length, label: 'Total dokumen' },
                            { num: categories.length, label: 'Kategori' },
                            { num: totalPdf, label: 'PDF tersedia' },
                        ].map((s) => (
                            <div className="bg-muted px-4 py-3 rounded-lg text-center">
                                <div className="text-lg font-semibold">{s.num}</div>
                                <div className="text-xs text-muted-foreground">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div
                className="sticky top-0 bg-white border-b border-border z-10"
            >
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <input
                        type="text"
                        placeholder="Cari judul, penulis, atau kategori..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg mb-3"
                    />
                    <div className="flex flex-wrap gap-2">
                        {(['Semua', ...BOOK_CATEGORIES] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1 rounded-full text-sm border ${activeCategory === cat
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-muted-foreground'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filtered.map((book) => {
                        return (
                            <div
                                key={book.id}
                                className="bg-white border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition"
                                onClick={() => onSelectBook(book)}
                            >
                                {/* Cover */}
                                <div className="h-40 flex items-center justify-center bg-muted relative">
                                    <BookCover book={book} size="md" />
                                    <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                        PDF
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="p-3">
                                    <div className="text-xs text-muted-foreground mb-1">
                                        {book.category}
                                    </div>
                                    <div className="text-sm font-medium line-clamp-2">
                                        {book.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {book.author}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}