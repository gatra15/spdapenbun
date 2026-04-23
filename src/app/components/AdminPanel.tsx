import { useState, type Dispatch, type SetStateAction } from 'react';
import type { SiteContent, Report } from '../../App';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { AdminHeader } from './admin/AdminHeader';
import { SectionTabs } from './admin/SectionTabs';
import { HeroEditor } from './admin/HeroEditor';
import { AboutEditor } from './admin/AboutEditor';
import { ServicesEditor } from './admin/ServicesEditor';
import { ContactEditor } from './admin/ContactEditor';
import { HelpdeskEditor } from './admin/HelpdeskEditor';
import { ReportsManager } from './admin/ReportsManager';
import { NewsEditor } from './admin/NewsEditor';
import { BoardEditor } from './admin/BoardEditor';
import { BookManager } from './admin/BookManager';
import type { Book } from '../../types/library';

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
    const [activeSection, setActiveSection] = useState<'logo' | 'hero' | 'about' | 'services' | 'board' | 'contact' | 'helpdesk' | 'news' | 'reports' | 'reference'>('hero');

    const handleSave = () => {
        onUpdate(editedContent);
        toast.success('Konten berhasil disimpan!');
    };

    const updateHero = (field: keyof SiteContent['hero'], value: any) => {
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

    const updateHelpdesk = (field: keyof SiteContent['helpdesk'], value: string) => {
        setEditedContent({
            ...editedContent,
            helpdesk: { ...editedContent.helpdesk, [field]: value },
        });
    };

    const updateReference = (field: 'title' | 'description', value: string) => {
        setEditedContent({
            ...editedContent,
            reference: {
                ...editedContent.reference,
                [field]: value,
            },
        });
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <Toaster />

            <AdminHeader onSave={handleSave} onExit={onExit} />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <SectionTabs activeSection={activeSection} onSectionChange={setActiveSection} />

                    <div className="bg-white rounded-xl p-8 border border-border">
                        {activeSection === "logo" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl mb-6">Edit Logo</h2>
                                <div>
                                    <label className="block mb-2 text-foreground">
                                        URL Logo
                                    </label>
                                    <input
                                        type="text"
                                        value={editedContent.logo.url}
                                        onChange={(e) =>
                                            setEditedContent({
                                                ...editedContent,
                                                logo: {
                                                    ...editedContent.logo,
                                                    url: e.target.value,
                                                },
                                            })
                                        }
                                        placeholder="/images/logo.png"
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Masukkan URL logo organisasi Anda. Kosongkan
                                        untuk menggunakan logo default.
                                    </p>
                                </div>
                                {editedContent.logo.url && (
                                    <div className="mt-4">
                                        <label className="block mb-2 text-foreground">
                                            Preview Logo
                                        </label>
                                        <div className="p-4 border border-border rounded-lg bg-muted/20 inline-block">
                                            <img
                                                src={editedContent.logo.url}
                                                alt="Logo Preview"
                                                className="w-24 h-24 object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeSection === 'hero' && (
                            <HeroEditor content={editedContent.hero} onUpdate={updateHero} />
                        )}

                        {activeSection === 'about' && (
                            <AboutEditor content={editedContent.about} onUpdate={updateAbout} />
                        )}

                        {activeSection === 'services' && (
                            <ServicesEditor
                                content={editedContent.services}
                                onUpdateTitle={(value) =>
                                    setEditedContent({
                                        ...editedContent,
                                        services: { ...editedContent.services, title: value },
                                    })
                                }
                                onUpdateService={updateService}
                            />
                        )}

                        {activeSection === 'board' && (
                            <BoardEditor
                                board={editedContent.board}
                                onUpdate={(board) => setEditedContent({ ...editedContent, board })}
                            />
                        )}

                        {activeSection === 'reference' && (
                            <div className="space-y-6">

                                {/* Title */}
                                <div>
                                    <label className="block mb-2 text-foreground">Judul Section</label>
                                    <input
                                        value={editedContent.reference.title}
                                        onChange={(e) => updateReference('title', e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block mb-2 text-foreground">Deskripsi</label>
                                    <textarea
                                        value={editedContent.reference.description}
                                        onChange={(e) => updateReference('description', e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg"
                                    />
                                </div>

                                {/* Book Manager */}
                                <BookManager
                                    books={editedContent.reference.books}

                                    onAdd={(book) => {
                                        const newBook = {
                                            ...book,
                                            id: crypto.randomUUID(),
                                            createdAt: new Date().toISOString(),
                                            updatedAt: new Date().toISOString(),
                                        };

                                        setEditedContent({
                                            ...editedContent,
                                            reference: {
                                                ...editedContent.reference,
                                                books: [...editedContent.reference.books, newBook],
                                            },
                                        });
                                    }}

                                    onUpdate={(id, updated) => {
                                        setEditedContent({
                                            ...editedContent,
                                            reference: {
                                                ...editedContent.reference,
                                                books: editedContent.reference.books.map(b =>
                                                    b.id === id
                                                        ? { ...b, ...updated, updatedAt: new Date().toISOString() }
                                                        : b
                                                ),
                                            },
                                        });
                                    }}

                                    onDelete={(id) => {
                                        setEditedContent({
                                            ...editedContent,
                                            reference: {
                                                ...editedContent.reference,
                                                books: editedContent.reference.books.filter(b => b.id !== id),
                                            },
                                        });
                                    }}

                                    onSelectBook={(book) => {
                                        console.log(book);
                                    }}
                                />
                            </div>
                        )}

                        {activeSection === 'contact' && (
                            <ContactEditor content={editedContent.contact} onUpdate={updateContact} />
                        )}

                        {activeSection === 'helpdesk' && (
                            <HelpdeskEditor content={editedContent.helpdesk} onUpdate={updateHelpdesk} />
                        )}

                        {activeSection === 'news' && (
                            <NewsEditor
                                news={editedContent.news}
                                onUpdateTitle={(value) =>
                                    setEditedContent({
                                        ...editedContent,
                                        news: { ...editedContent.news, title: value },
                                    })
                                }
                                onUpdateDescription={(value) =>
                                    setEditedContent({
                                        ...editedContent,
                                        news: { ...editedContent.news, description: value },
                                    })
                                }
                                onUpdateArticles={(articles) =>
                                    setEditedContent({
                                        ...editedContent,
                                        news: { ...editedContent.news, articles },
                                    })
                                }
                            />
                        )}

                        {activeSection === 'reports' && (
                            <ReportsManager
                                reports={reports}
                                onUpdateStatus={onUpdateReportStatus}
                                onDelete={onDeleteReport}
                            />
                        )}
                    </div>

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