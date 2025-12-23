import type { SiteContent } from '../../App';
import type { Report } from '../../App';
import { Menu, Phone, Mail, MapPin, Shield, Users, Target, Settings, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

interface PublicWebsiteProps {
    content: SiteContent;
    onAdminAccess: () => void;
    onSubmitReport: (report: Omit<Report, 'id' | 'date' | 'status'>) => void;
}

export function PublicWebsite({ content, onAdminAccess, onSubmitReport }: PublicWebsiteProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [reportForm, setReportForm] = useState({
        name: '',
        email: '',
        category: 'Umum',
        subject: '',
        message: '',
    });

    const iconMap: Record<string, any> = {
        Shield,
        Users,
        Target,
    };

    const handleSubmitReport = (e: React.FormEvent) => {
        e.preventDefault();

        if (!reportForm.name || !reportForm.email || !reportForm.subject || !reportForm.message) {
            toast.error('Mohon lengkapi semua field yang diperlukan');
            return;
        }

        onSubmitReport(reportForm);
        setReportForm({
            name: '',
            email: '',
            category: 'Umum',
            subject: '',
            message: '',
        });
        toast.success('Laporan Anda telah berhasil dikirim!');
    };

    return (
        <div className="min-h-screen">
            <Toaster />
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white text-xl">SP</span>
                            </div>
                            <div>
                                <h1 className="text-xl text-foreground">{content.hero.title}</h1>
                                <p className="text-sm text-muted-foreground">{content.hero.subtitle}</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#home" className="text-foreground hover:text-primary transition-colors">Beranda</a>
                            <a href="#about" className="text-foreground hover:text-primary transition-colors">Tentang</a>
                            <a href="#services" className="text-foreground hover:text-primary transition-colors">Program</a>
                            <a href="#helpdesk" className="text-foreground hover:text-primary transition-colors">Laporan</a>
                            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Kontak</a>
                            <button
                                onClick={onAdminAccess}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                title="Admin Panel"
                            >
                                <Settings className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-muted rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <nav className="md:hidden mt-4 pt-4 border-t border-border flex flex-col gap-4">
                            <a href="#home" className="text-foreground hover:text-primary transition-colors">Beranda</a>
                            <a href="#about" className="text-foreground hover:text-primary transition-colors">Tentang</a>
                            <a href="#services" className="text-foreground hover:text-primary transition-colors">Program</a>
                            <a href="#helpdesk" className="text-foreground hover:text-primary transition-colors">Laporan</a>
                            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Kontak</a>
                            <button
                                onClick={onAdminAccess}
                                className="text-left text-foreground hover:text-primary transition-colors"
                            >
                                Admin Panel
                            </button>
                        </nav>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
                            {content.hero.title}
                        </h1>
                        <h2 className="text-2xl md:text-3xl mb-6 text-muted-foreground">
                            {content.hero.subtitle}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {content.hero.description}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#about"
                                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Tentang Kami
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Hubungi Kami
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">
                            {content.about.title}
                        </h2>
                        <p className="text-lg text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
                            {content.about.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 bg-primary/5 rounded-xl border border-primary/10">
                                <h3 className="text-2xl mb-4 text-primary">Visi</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.about.vision}
                                </p>
                            </div>
                            <div className="p-8 bg-secondary/5 rounded-xl border border-secondary/10">
                                <h3 className="text-2xl mb-4 text-secondary">Misi</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.about.mission}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">
                            {content.services.title}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {content.services.items.map((service) => {
                                const IconComponent = iconMap[service.icon] || Shield;
                                return (
                                    <div
                                        key={service.id}
                                        className="p-8 bg-white rounded-xl border border-border hover:shadow-lg transition-shadow"
                                    >
                                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                            <IconComponent className="w-7 h-7 text-primary" />
                                        </div>
                                        <h3 className="text-xl mb-4 text-foreground">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">
                            {content.contact.title}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="mb-2 text-foreground">Alamat</h4>
                                <p className="text-muted-foreground">{content.contact.address}</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
                                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Phone className="w-6 h-6 text-secondary" />
                                </div>
                                <h4 className="mb-2 text-foreground">Telepon</h4>
                                <p className="text-muted-foreground">{content.contact.phone}</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
                                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                                    <Mail className="w-6 h-6 text-accent-foreground" />
                                </div>
                                <h4 className="mb-2 text-foreground">Email</h4>
                                <p className="text-muted-foreground">{content.contact.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Report/Helpdesk Section */}
            <section id="helpdesk" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="w-8 h-8 text-accent-foreground" />
                            </div>
                            <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
                                {content.helpdesk.title}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                {content.helpdesk.description}
                            </p>
                        </div>

                        <div className="bg-muted/30 rounded-xl p-8 border border-border">
                            <form onSubmit={handleSubmitReport} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-foreground">Nama Lengkap *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={reportForm.name}
                                            onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Masukkan nama lengkap Anda"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-foreground">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={reportForm.email}
                                            onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-foreground">Kategori Laporan</label>
                                    <select
                                        id="category"
                                        value={reportForm.category}
                                        onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="Umum">Umum</option>
                                        <option value="Keluhan">Keluhan</option>
                                        <option value="Saran">Saran</option>
                                        <option value="Pertanyaan">Pertanyaan</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block mb-2 text-foreground">Subjek *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={reportForm.subject}
                                        onChange={(e) => setReportForm({ ...reportForm, subject: e.target.value })}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Ringkasan singkat laporan Anda"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block mb-2 text-foreground">Pesan / Aspirasi *</label>
                                    <textarea
                                        id="message"
                                        value={reportForm.message}
                                        onChange={(e) => setReportForm({ ...reportForm, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows={6}
                                        placeholder="Jelaskan laporan, aspirasi, atau keluhan Anda secara detail..."
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <p className="text-sm text-muted-foreground">* Wajib diisi</p>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <Send className="w-4 h-4" />
                                        Kirim Laporan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-foreground text-background">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-sm opacity-80">
                            © {new Date().getFullYear()} {content.hero.title}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}