import { useState } from 'react';
import type { Book } from '../../../types/library';
import { BookCover } from '../ui/BookCover';

interface BookDetailProps {
    book: Book;
    onBack: () => void;
    isAdmin?: boolean;
    onEdit?: (book: Book) => void;
    onDelete?: (id: string) => void;
}

export function BookDetail({ book, onBack, isAdmin, onEdit, onDelete }: BookDetailProps) {
    const [pdfError, setPdfError] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = () => {
        onDelete?.(book.id);
        onBack();
    };

    const categoryColors: Record<string, { bg: string; text: string }> = {
        Regulasi: { bg: '#E6F1FB', text: '#185FA5' },
        Teknis: { bg: '#E1F5EE', text: '#0F6E56' },
        Panduan: { bg: '#FAEEDA', text: '#854F0B' },
        Laporan: { bg: '#FAECE7', text: '#993C1D' },
        Referensi: { bg: '#EEEDFE', text: '#3C3489' },
        Lainnya: { bg: '#F1EFE8', text: '#444441' },
    };
    const catColor = categoryColors[book.category] ?? categoryColors['Lainnya'];

    return (
        <div className="min-h-screen bg-gray-50" style={{ background: 'var(--color-background-tertiary)' }}>
            {/* Top bar */}
            <div
                style={{
                    background: 'var(--color-background-primary)',
                    borderBottom: '0.5px solid var(--color-border-tertiary)',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}
            >
                <button
                    onClick={onBack}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'none',
                        border: '0.5px solid var(--color-border-secondary)',
                        borderRadius: 8,
                        padding: '6px 12px',
                        fontSize: 14,
                        cursor: 'pointer',
                        color: 'var(--color-text-secondary)',
                    }}
                >
                    ← Kembali
                </button>
                <span
                    style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {book.title}
                </span>

                {isAdmin && (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button
                            onClick={() => onEdit?.(book)}
                            style={{
                                padding: '6px 14px',
                                fontSize: 13,
                                borderRadius: 8,
                                border: '0.5px solid var(--color-border-secondary)',
                                background: 'var(--color-background-primary)',
                                cursor: 'pointer',
                                color: 'var(--color-text-secondary)',
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            style={{
                                padding: '6px 14px',
                                fontSize: 13,
                                borderRadius: 8,
                                border: '0.5px solid #F7C1C1',
                                background: '#FCEBEB',
                                cursor: 'pointer',
                                color: '#A32D2D',
                            }}
                        >
                            Hapus
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.5rem' }}>
                {/* Book info card */}
                <div
                    style={{
                        background: 'var(--color-background-primary)',
                        border: '0.5px solid var(--color-border-tertiary)',
                        borderRadius: 12,
                        padding: '1.5rem',
                        display: 'flex',
                        gap: '1.5rem',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <BookCover book={book} size="lg" />
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
                            <span
                                style={{
                                    fontSize: 12,
                                    padding: '3px 10px',
                                    borderRadius: 10,
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
                                        fontSize: 12,
                                        padding: '3px 10px',
                                        borderRadius: 10,
                                        background: '#E6F1FB',
                                        color: '#185FA5',
                                        fontWeight: 500,
                                    }}
                                >
                                    {book.fileType === 'pdf' ? 'PDF' : 'Tautan Eksternal'}
                                </span>
                            )}
                        </div>

                        <h1
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                color: 'var(--color-text-primary)',
                                marginBottom: 6,
                                lineHeight: 1.4,
                            }}
                        >
                            {book.title}
                        </h1>

                        <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                            {book.author}
                            {book.publisher && <span style={{ color: 'var(--color-text-tertiary)' }}> · {book.publisher}</span>}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>
                            {book.year}
                        </div>

                        {book.description && (
                            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                {book.description}
                            </p>
                        )}

                        {book.tags && book.tags.length > 0 && (
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                                {book.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontSize: 12,
                                            padding: '2px 10px',
                                            borderRadius: 10,
                                            background: 'var(--color-background-secondary)',
                                            color: 'var(--color-text-secondary)',
                                            border: '0.5px solid var(--color-border-tertiary)',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {book.fileType === 'url' && book.fileUrl && (
                            <a
                                href={book.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    marginTop: 16,
                                    padding: '8px 20px',
                                    background: 'var(--color-text-primary)',
                                    color: 'var(--color-background-primary)',
                                    borderRadius: 8,
                                    fontSize: 14,
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                }}
                            >
                                Buka Dokumen →
                            </a>
                        )}
                    </div>
                </div>

                {/* PDF Viewer */}
                {book.fileType === 'pdf' && book.fileUrl && !pdfError && (
                    <div
                        style={{
                            background: 'var(--color-background-primary)',
                            border: '0.5px solid var(--color-border-tertiary)',
                            borderRadius: 12,
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                padding: '12px 16px',
                                borderBottom: '0.5px solid var(--color-border-tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                                Preview PDF
                            </span>
                            <a
                                href={book.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontSize: 13,
                                    color: '#185FA5',
                                    textDecoration: 'none',
                                    padding: '4px 12px',
                                    border: '0.5px solid #B5D4F4',
                                    borderRadius: 6,
                                    background: '#E6F1FB',
                                }}
                            >
                                Buka di tab baru ↗
                            </a>
                        </div>
                        <iframe
                            src={book.fileUrl}
                            title={book.title}
                            style={{ width: '100%', height: '75vh', border: 'none', display: 'block' }}
                            onError={() => setPdfError(true)}
                        />
                    </div>
                )}

                {book.fileType === 'pdf' && pdfError && (
                    <div
                        style={{
                            background: '#FCEBEB',
                            border: '0.5px solid #F7C1C1',
                            borderRadius: 12,
                            padding: '2rem',
                            textAlign: 'center',
                        }}
                    >
                        <p style={{ color: '#A32D2D', fontSize: 14, marginBottom: 12 }}>
                            Tidak dapat memuat PDF di sini.
                        </p>
                        {book.fileUrl && (
                            <a
                                href={book.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontSize: 14,
                                    color: '#185FA5',
                                    padding: '8px 20px',
                                    border: '0.5px solid #B5D4F4',
                                    borderRadius: 8,
                                    textDecoration: 'none',
                                    background: '#E6F1FB',
                                }}
                            >
                                Buka PDF langsung →
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Delete confirmation modal */}
            {showDeleteConfirm && (
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
                            <strong>"{book.title}"</strong> akan dihapus secara permanen dan tidak bisa dikembalikan.
                        </p>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
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
                                onClick={handleDelete}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: 14,
                                    borderRadius: 8,
                                    border: 'none',
                                    background: '#A32D2D',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontWeight: 500,
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