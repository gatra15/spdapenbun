import { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import type { NewsArticle } from '../../../App';

interface NewsEditorProps {
    news: {
        title: string;
        description: string;
        articles: NewsArticle[];
    };
    onUpdateTitle: (value: string) => void;
    onUpdateDescription: (value: string) => void;
    onUpdateArticles: (articles: NewsArticle[]) => void;
}

export function NewsEditor({ news, onUpdateTitle, onUpdateDescription, onUpdateArticles }: NewsEditorProps) {
    const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const emptyArticle: Omit<NewsArticle, 'id'> = {
        title: '',
        excerpt: '',
        content: '',
        image: 'https://picsum.photos/800/600?random=' + Date.now(),
        author: 'Admin SP Dapenbun',
        date: new Date().toISOString(),
        category: 'Umum'
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, article: NewsArticle | Omit<NewsArticle, 'id'>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('File harus berupa gambar!');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Ukuran file maksimal 5MB!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result as string;
            if ('id' in article) {
                setEditingArticle({ ...article, image: imageUrl });
            } else {
                setEditingArticle({ ...article, id: 'new', image: imageUrl } as NewsArticle);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSaveArticle = () => {
        if (!editingArticle) return;

        if (!editingArticle.title || !editingArticle.excerpt || !editingArticle.content) {
            toast.error('Semua field wajib diisi!');
            return;
        }

        const updatedArticles = [...news.articles];

        if (isCreating) {
            const newArticle = { ...editingArticle, id: Date.now().toString() };
            updatedArticles.unshift(newArticle);
            toast.success('Berita berhasil ditambahkan!');
        } else {
            const index = updatedArticles.findIndex(a => a.id === editingArticle.id);
            if (index !== -1) {
                updatedArticles[index] = editingArticle;
                toast.success('Berita berhasil diupdate!');
            }
        }

        onUpdateArticles(updatedArticles);
        setEditingArticle(null);
        setIsCreating(false);
    };

    const handleDeleteArticle = (id: string) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            const updatedArticles = news.articles.filter(a => a.id !== id);
            onUpdateArticles(updatedArticles);
            toast.success('Berita berhasil dihapus!');
        }
    };

    const handleCreateNew = () => {
        setEditingArticle({ ...emptyArticle, id: 'new' } as NewsArticle);
        setIsCreating(true);
    };

    const handleCancel = () => {
        setEditingArticle(null);
        setIsCreating(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (editingArticle) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl">{isCreating ? 'Tambah Berita Baru' : 'Edit Berita'}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveArticle}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                        >
                            <Save className="w-4 h-4" />
                            Simpan
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/70"
                        >
                            <X className="w-4 h-4" />
                            Batal
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block mb-2 text-foreground">Gambar Utama</label>
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3 relative group">
                            <img
                                src={editingArticle.image}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="px-4 py-2 bg-white text-foreground rounded-lg cursor-pointer">
                                    <ImageIcon className="w-4 h-4 inline mr-2" />
                                    Ganti Gambar
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, editingArticle)}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Category & Author */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-foreground">Kategori</label>
                            <input
                                type="text"
                                value={editingArticle.category}
                                onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Umum, Kesejahteraan, Pelatihan, dll"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-foreground">Penulis</label>
                            <input
                                type="text"
                                value={editingArticle.author}
                                onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-2 text-foreground">Judul Berita *</label>
                        <input
                            type="text"
                            value={editingArticle.title}
                            onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Masukkan judul berita..."
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block mb-2 text-foreground">Ringkasan *</label>
                        <textarea
                            value={editingArticle.excerpt}
                            onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ringkasan singkat berita (ditampilkan di halaman daftar berita)"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block mb-2 text-foreground">Konten Lengkap *</label>
                        <textarea
                            value={editingArticle.content}
                            onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                            rows={12}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                            placeholder="Isi berita lengkap. Pisahkan paragraf dengan double enter (2x enter)."
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            💡 Tips: Pisahkan paragraf dengan menekan Enter 2 kali
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl mb-6">Edit Berita</h2>

            {/* Section Settings */}
            <div className="space-y-4 pb-6 border-b border-border">
                <div>
                    <label className="block mb-2 text-foreground">Judul Seksi</label>
                    <input
                        type="text"
                        value={news.title}
                        onChange={(e) => onUpdateTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-foreground">Deskripsi</label>
                    <textarea
                        value={news.description}
                        onChange={(e) => onUpdateDescription(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Articles List */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Daftar Berita ({news.articles.length})</h3>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Berita
                </button>
            </div>

            {news.articles.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground mb-4">Belum ada berita</p>
                    <button
                        onClick={handleCreateNew}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                    >
                        Tambah Berita Pertama
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {news.articles.map((article) => (
                        <div key={article.id} className="p-6 border border-border rounded-lg bg-white hover:shadow-md transition-shadow">
                            <div className="flex gap-4">
                                {/* Thumbnail */}
                                <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-lg font-semibold text-foreground mb-2 truncate">
                                                {article.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                                <span>📂 {article.category}</span>
                                                <span>👤 {article.author}</span>
                                                <span>📅 {formatDate(article.date)}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingArticle(article)}
                                                className="p-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteArticle(article.id)}
                                                className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}