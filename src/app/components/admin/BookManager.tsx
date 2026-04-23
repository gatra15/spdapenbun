import { useState } from 'react';
import type { Book, BookCategory } from '../../../types/library';
import { BOOK_CATEGORIES } from '../../../types/library';
import { BookCover } from '../ui/BookCover';

interface BookManagerProps {
    books: Book[];
    onAdd: (book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onUpdate: (id: string, book: Partial<Omit<Book, 'id' | 'createdAt' | 'updatedAt'>>) => void;
    onDelete: (id: string) => void;
    onSelectBook: (book: Book) => void;
}

type FormData = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;

const emptyForm: FormData = {
    title: '',
    author: '',
    publisher: '',
    year: new Date().getFullYear(),
    category: 'Regulasi',
    description: '',
    fileType: 'pdf',
    fileUrl: '',
    tags: [],
};

const categoryColors: Record<string, { bg: string; text: string }> = {
    Regulasi: { bg: '#E6F1FB', text: '#185FA5' },
    Teknis: { bg: '#E1F5EE', text: '#0F6E56' },
    Panduan: { bg: '#FAEEDA', text: '#854F0B' },
    Laporan: { bg: '#FAECE7', text: '#993C1D' },
    Referensi: { bg: '#EEEDFE', text: '#3C3489' },
    Lainnya: { bg: '#F1EFE8', text: '#444441' },
};

export function BookManager({ books, onAdd, onUpdate, onDelete, onSelectBook }: BookManagerProps) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<FormData>(emptyForm);
    const [tagsInput, setTagsInput] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const filteredBooks = books.filter(
        (b) =>
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase())
    );

    const openAddForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setTagsInput('');
        setShowForm(true);
    };

    const openEditForm = (book: Book) => {
        setEditingId(book.id);
        setForm({
            title: book.title,
            author: book.author,
            publisher: book.publisher ?? '',
            year: book.year,
            category: book.category,
            description: book.description ?? '',
            fileType: book.fileType,
            fileUrl: book.fileUrl ?? '',
            tags: book.tags ?? [],
        });
        setTagsInput((book.tags ?? []).join(', '));
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsedTags = tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        const payload: FormData = { ...form, tags: parsedTags };

        if (editingId) {
            onUpdate(editingId, payload);
        } else {
            onAdd(payload);
        }
        setShowForm(false);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '8px 12px',
        borderRadius: 8,
        border: '0.5px solid var(--color-border-secondary)',
        fontSize: 14,
        background: 'var(--color-background-primary)',
        color: 'var(--color-text-primary)',
        boxSizing: 'border-box',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: 13,
        color: 'var(--color-text-secondary)',
        marginBottom: 6,
        fontWeight: 500,
    };

    return (
        <div>
            {/* Toolbar */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: 12,
                }}
            >
                <div>
                    <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                        Manajemen Perpustakaan
                    </h2>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                        {books.length} dokumen tersimpan
                    </p>
                </div>
                <button
                    onClick={openAddForm}
                    style={{
                        padding: '8px 18px',
                        borderRadius: 8,
                        border: 'none',
                        background: 'var(--color-text-primary)',
                        color: 'var(--color-background-primary)',
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}
                >
                    + Tambah buku
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Cari buku..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ ...inputStyle, marginBottom: '1.5rem' }}
            />

            {/* Book list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredBooks.length === 0 && (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '3rem',
                            color: 'var(--color-text-tertiary)',
                            fontSize: 14,
                        }}
                    >
                        Belum ada buku. Klik "Tambah buku" untuk mulai.
                    </div>
                )}
                {filteredBooks.map((book) => {
                    const catColor = categoryColors[book.category] ?? categoryColors['Lainnya'];
                    return (
                        <div
                            key={book.id}
                            style={{
                                background: 'var(--color-background-primary)',
                                border: '0.5px solid var(--color-border-tertiary)',
                                borderRadius: 10,
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}
                        >
                            <div style={{ flexShrink: 0 }}>
                                <BookCover book={book} size="sm" />
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                                    <span
                                        style={{
                                            fontSize: 11,
                                            padding: '2px 8px',
                                            borderRadius: 8,
                                            background: catColor.bg,
                                            color: catColor.text,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {book.category}
                                    </span>
                                    {book.fileType !== 'none' && (
                                        <span
                                            style={{
                                                fontSize: 11,
                                                padding: '2px 8px',
                                                borderRadius: 8,
                                                background: '#E6F1FB',
                                                color: '#185FA5',
                                            }}
                                        >
                                            {book.fileType.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: 'var(--color-text-primary)',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {book.title}
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                                    {book.author} · {book.year}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                <button
                                    onClick={() => onSelectBook(book)}
                                    style={{
                                        padding: '5px 12px',
                                        fontSize: 12,
                                        borderRadius: 6,
                                        border: '0.5px solid #B5D4F4',
                                        background: '#E6F1FB',
                                        color: '#185FA5',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => openEditForm(book)}
                                    style={{
                                        padding: '5px 12px',
                                        fontSize: 12,
                                        borderRadius: 6,
                                        border: '0.5px solid var(--color-border-secondary)',
                                        background: 'var(--color-background-primary)',
                                        color: 'var(--color-text-secondary)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setDeleteConfirmId(book.id)}
                                    style={{
                                        padding: '5px 12px',
                                        fontSize: 12,
                                        borderRadius: 6,
                                        border: '0.5px solid #F7C1C1',
                                        background: '#FCEBEB',
                                        color: '#A32D2D',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add/Edit form modal */}
            {showForm && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        zIndex: 50,
                        padding: '1rem',
                        overflowY: 'auto',
                    }}
                >
                    <div
                        style={{
                            background: 'var(--color-background-primary)',
                            borderRadius: 12,
                            padding: '1.5rem',
                            width: '100%',
                            maxWidth: 560,
                            marginTop: '2rem',
                            marginBottom: '2rem',
                        }}
                    >
                        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: '1.25rem', color: 'var(--color-text-primary)' }}>
                            {editingId ? 'Edit buku' : 'Tambah buku baru'}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {/* Judul */}
                                <div>
                                    <label style={labelStyle}>Judul *</label>
                                    <input
                                        required
                                        style={inputStyle}
                                        value={form.title}
                                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                        placeholder="Nama dokumen atau buku"
                                    />
                                </div>

                                {/* Penulis + Penerbit */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={labelStyle}>Penulis / Instansi *</label>
                                        <input
                                            required
                                            style={inputStyle}
                                            value={form.author}
                                            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                                            placeholder="Nama penulis"
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Penerbit</label>
                                        <input
                                            style={inputStyle}
                                            value={form.publisher}
                                            onChange={(e) => setForm((f) => ({ ...f, publisher: e.target.value }))}
                                            placeholder="Opsional"
                                        />
                                    </div>
                                </div>

                                {/* Tahun + Kategori */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={labelStyle}>Tahun *</label>
                                        <input
                                            required
                                            type="number"
                                            style={inputStyle}
                                            value={form.year}
                                            min={1900}
                                            max={new Date().getFullYear() + 1}
                                            onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value) }))}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Kategori *</label>
                                        <select
                                            required
                                            style={inputStyle}
                                            value={form.category}
                                            onChange={(e) =>
                                                setForm((f) => ({ ...f, category: e.target.value as BookCategory }))
                                            }
                                        >
                                            {BOOK_CATEGORIES.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div>
                                    <label style={labelStyle}>Deskripsi singkat</label>
                                    <textarea
                                        rows={3}
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                        value={form.description}
                                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                                        placeholder="Deskripsi singkat isi dokumen (opsional)"
                                    />
                                </div>

                                {/* Tipe file */}
                                <div>
                                    <label style={labelStyle}>Tipe file</label>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {(['pdf', 'url', 'none'] as const).map((t) => (
                                            <label
                                                key={t}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    padding: '6px 12px',
                                                    borderRadius: 8,
                                                    border: `0.5px solid ${form.fileType === t ? 'var(--color-text-primary)' : 'var(--color-border-secondary)'}`,
                                                    cursor: 'pointer',
                                                    fontSize: 13,
                                                    background: form.fileType === t ? 'var(--color-background-secondary)' : 'transparent',
                                                    color: 'var(--color-text-primary)',
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="fileType"
                                                    value={t}
                                                    checked={form.fileType === t}
                                                    onChange={() => setForm((f) => ({ ...f, fileType: t }))}
                                                    style={{ margin: 0 }}
                                                />
                                                {t === 'pdf' ? 'Upload PDF' : t === 'url' ? 'URL/Link' : 'Tidak ada'}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* URL / Path */}
                                {form.fileType !== 'none' && (
                                    <div>
                                        <label style={labelStyle}>
                                            {form.fileType === 'pdf' ? 'URL atau path file PDF' : 'URL dokumen'}
                                        </label>
                                        <input
                                            style={inputStyle}
                                            value={form.fileUrl}
                                            onChange={(e) => setForm((f) => ({ ...f, fileUrl: e.target.value }))}
                                            placeholder={
                                                form.fileType === 'pdf'
                                                    ? 'https://... atau /files/dokumen.pdf'
                                                    : 'https://...'
                                            }
                                        />
                                        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 4 }}>
                                            {form.fileType === 'pdf'
                                                ? 'Masukkan URL publik ke file PDF. Untuk file lokal, simpan di /public/files/'
                                                : 'Masukkan URL lengkap dokumen eksternal'}
                                        </p>
                                    </div>
                                )}

                                {/* Tags */}
                                <div>
                                    <label style={labelStyle}>Tag</label>
                                    <input
                                        style={inputStyle}
                                        value={tagsInput}
                                        onChange={(e) => setTagsInput(e.target.value)}
                                        placeholder="Pisahkan dengan koma, contoh: lingkungan, 2023, kebijakan"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    style={{
                                        padding: '8px 18px',
                                        fontSize: 14,
                                        borderRadius: 8,
                                        border: '0.5px solid var(--color-border-secondary)',
                                        background: 'var(--color-background-primary)',
                                        cursor: 'pointer',
                                        color: 'var(--color-text-secondary)',
                                    }}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '8px 18px',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        borderRadius: 8,
                                        border: 'none',
                                        background: 'var(--color-text-primary)',
                                        color: 'var(--color-background-primary)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {editingId ? 'Simpan perubahan' : 'Tambah buku'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete confirmation */}
            {deleteConfirmId && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 50,
                        padding: '1rem',
                    }}
                >
                    <div
                        style={{
                            background: 'var(--color-background-primary)',
                            borderRadius: 12,
                            padding: '1.5rem',
                            maxWidth: 380,
                            width: '100%',
                        }}
                    >
                        <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: 'var(--color-text-primary)' }}>
                            Hapus buku ini?
                        </h2>
                        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
                            Tindakan ini tidak bisa dibatalkan.
                        </p>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: 14,
                                    borderRadius: 8,
                                    border: '0.5px solid var(--color-border-secondary)',
                                    background: 'var(--color-background-primary)',
                                    cursor: 'pointer',
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(deleteConfirmId);
                                    setDeleteConfirmId(null);
                                }}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    borderRadius: 8,
                                    border: 'none',
                                    background: '#A32D2D',
                                    color: '#fff',
                                    cursor: 'pointer',
                                }}
                            >
                                Ya, hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}