import { useState } from 'react';
import type { SiteContent } from '../../App';
import type { Report } from '../../App';
import { Save, LogOut, Menu, Eye, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

interface AdminPanelProps {
    content: SiteContent;
    onUpdate: (content: SiteContent) => void;
    onExit: () => void;
    reports: Report[];
    onUpdateReportStatus: (id: string, status: Report['status']) => void;
    onDeleteReport: (id: string) => void;
}

export function AdminPanel({ content, onUpdate, onExit, reports, onUpdateReportStatus, onDeleteReport }: AdminPanelProps) {
    const [editedContent, setEditedContent] = useState<SiteContent>(content);
    const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'services' | 'contact' | 'helpdesk' | 'reports'>('hero');
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const handleSave = () => {
        onUpdate(editedContent);
        toast.success('Konten berhasil disimpan!');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: Report['status']) => {
        switch (status) {
            case 'new':
                return 'bg-accent/20 text-accent-foreground border-accent/30';
            case 'reviewed':
                return 'bg-secondary/20 text-secondary border-secondary/30';
            case 'resolved':
                return 'bg-primary/20 text-primary border-primary/30';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    const getStatusLabel = (status: Report['status']) => {
        switch (status) {
            case 'new':
                return 'Baru';
            case 'reviewed':
                return 'Ditinjau';
            case 'resolved':
                return 'Selesai';
            default:
                return status;
        }
    };

    const updateHero = (field: keyof SiteContent['hero'], value: string) => {
        setEditedContent({
            ...editedContent,
            hero: { ...editedContent.hero, [field]: value },
        });
    };

    const updateAbout = (field: keyof SiteContent['about'], value: string) => {
        setEditedContent({
            ...editedContent,
            about: { ...editedContent.about, [field]: value },
        });
    };

    const updateService = (id: string, field: string, value: string) => {
        setEditedContent({
            ...editedContent,
            services: {
                ...editedContent.services,
                items: editedContent.services.items.map((item) =>
                    item.id === id ? { ...item, [field]: value } : item
                ),
            },
        });
    };

    const updateContact = (field: keyof SiteContent['contact'], value: string) => {
        setEditedContent({
            ...editedContent,
            contact: { ...editedContent.contact, [field]: value },
        });
    };

    const sections = [
        { id: 'hero', label: 'Beranda' },
        { id: 'about', label: 'Tentang' },
        { id: 'services', label: 'Program' },
        { id: 'contact', label: 'Kontak' },
        { id: 'helpdesk', label: 'Helpdesk' },
        { id: 'reports', label: 'Laporan' },
    ] as const;

    return (
        <div className="min-h-screen bg-muted/30">
            <Toaster />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <Menu className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl text-foreground">Admin Panel</h1>
                                <p className="text-sm text-muted-foreground">SP Dapenbun CMS</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <Save className="w-4 h-4" />
                                <span className="hidden sm:inline">Simpan</span>
                            </button>
                            <button
                                onClick={onExit}
                                className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/70 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Keluar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Tabs */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${activeSection === section.id
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-white text-foreground hover:bg-muted'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white rounded-xl p-8 border border-border">
                        {activeSection === 'hero' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl mb-6">Edit Beranda</h2>
                                <div>
                                    <label className="block mb-2 text-foreground">Judul Utama</label>
                                    <input
                                        type="text"
                                        value={editedContent.hero.title}
                                        onChange={(e) => updateHero('title', e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Sub Judul</label>
                                    <input
                                        type="text"
                                        value={editedContent.hero.subtitle}
                                        onChange={(e) => updateHero('subtitle', e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Deskripsi</label>
                                    <textarea
                                        value={editedContent.hero.description}
                                        onChange={(e) => updateHero('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'about' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl mb-6">Edit Tentang</h2>
                                <div>
                                    <label className="block mb-2 text-foreground">Judul</label>
                                    <input
                                        type="text"
                                        value={editedContent.about.title}
                                        onChange={(e) => updateAbout('title', e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Deskripsi</label>
                                    <textarea
                                        value={editedContent.about.description}
                                        onChange={(e) => updateAbout('description', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Visi</label>
                                    <textarea
                                        value={editedContent.about.vision}
                                        onChange={(e) => updateAbout('vision', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Misi</label>
                                    <textarea
                                        value={editedContent.about.mission}
                                        onChange={(e) => updateAbout('mission', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'services' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl mb-6">Edit Program</h2>
                                <div>
                                    <label className="block mb-2 text-foreground">Judul Seksi</label>
                                    <input
                                        type="text"
                                        value={editedContent.services.title}
                                        onChange={(e) =>
                                            setEditedContent({
                                                ...editedContent,
                                                services: { ...editedContent.services, title: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-8 mt-8">
                                    {editedContent.services.items.map((service, index) => (
                                        <div key={service.id} className="p-6 border border-border rounded-lg bg-muted/20">
                                            <h3 className="mb-4 text-foreground">Program {index + 1}</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block mb-2 text-foreground">Judul</label>
                                                    <input
                                                        type="text"
                                                        value={service.title}
                                                        onChange={(e) => updateService(service.id, 'title', e.target.value)}
                                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-foreground">Deskripsi</label>
                                                    <textarea
                                                        value={service.description}
                                                        onChange={(e) => updateService(service.id, 'description', e.target.value)}
                                                        rows={3}
                                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-foreground">Icon (Shield, Users, Target)</label>
                                                    <input
                                                        type="text"
                                                        value={service.icon}
                                                        onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSection === 'contact' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl mb-6">Edit Kontak</h2>
                                <div>
                                    <label className="block mb-2 text-foreground">Judul</label>
                                    <input
                                        type="text"
                                        value={editedContent.contact.title}
                                        onChange={(e) => updateContact('title', e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Alamat</label>
                                    <textarea
                                        value={editedContent.contact.address}
                                        onChange={(e) => updateContact('address', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Telepon</label>
                                    <input
                                        type="text"
                                        value={editedContent.contact.phone}
                                        onChange={(e) => updateContact('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Email</label>
                                    <input
                                        type="email"
                                        value={editedContent.contact.email}
                                        onChange={(e) => updateContact('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'helpdesk' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl mb-6">Edit Helpdesk</h2>
                                <div>
                                    <label className="block mb-2 text-foreground">Judul</label>
                                    <input
                                        type="text"
                                        value={editedContent.helpdesk.title}
                                        onChange={(e) =>
                                            setEditedContent({
                                                ...editedContent,
                                                helpdesk: { ...editedContent.helpdesk, title: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-foreground">Deskripsi</label>
                                    <textarea
                                        value={editedContent.helpdesk.description}
                                        onChange={(e) =>
                                            setEditedContent({
                                                ...editedContent,
                                                helpdesk: { ...editedContent.helpdesk, description: e.target.value },
                                            })
                                        }
                                        rows={4}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'reports' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl">Manajemen Laporan</h2>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-muted-foreground">
                                            Total: {reports.length} laporan
                                        </span>
                                    </div>
                                </div>

                                {reports.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                                        <p className="text-muted-foreground">Belum ada laporan masuk</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {reports.map((report) => (
                                            <div key={report.id} className="p-6 border border-border rounded-lg bg-white hover:shadow-md transition-shadow">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-lg text-foreground">{report.subject}</h3>
                                                            <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(report.status)}`}>
                                                                {getStatusLabel(report.status)}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                            <span>📧 {report.email}</span>
                                                            <span>👤 {report.name}</span>
                                                            <span>🏷️ {report.category}</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            📅 {formatDate(report.date)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {selectedReport?.id === report.id && (
                                                    <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-border">
                                                        <h4 className="mb-2 text-foreground">Pesan Lengkap:</h4>
                                                        <p className="text-foreground whitespace-pre-wrap">{report.message}</p>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <button
                                                        onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/70 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        {selectedReport?.id === report.id ? 'Tutup' : 'Lihat Detail'}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onUpdateReportStatus(report.id, 'reviewed');
                                                            toast.success('Status diubah menjadi Ditinjau');
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors"
                                                        disabled={report.status === 'reviewed'}
                                                    >
                                                        Tandai Ditinjau
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onUpdateReportStatus(report.id, 'resolved');
                                                            toast.success('Status diubah menjadi Selesai');
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                                        disabled={report.status === 'resolved'}
                                                    >
                                                        Tandai Selesai
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Yakin ingin menghapus laporan ini?')) {
                                                                onDeleteReport(report.id);
                                                                toast.success('Laporan berhasil dihapus');
                                                                setSelectedReport(null);
                                                            }
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors ml-auto"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                        <p className="text-sm text-foreground">
                            💡 <strong>Tips:</strong> Perubahan akan disimpan di browser Anda. Klik tombol "Simpan" untuk menyimpan perubahan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}