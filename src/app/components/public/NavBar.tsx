import { Menu, Settings } from "lucide-react";
import type { SiteContent } from "../../../App"
import { useState } from "react";

interface NavbarProps {
    content: SiteContent
    onAdminAccess: () => void;
    onViewChange: (view: 'home' | 'news') => void;
}

export function NavBar({ content, onAdminAccess, onViewChange }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <>
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {content.logo.url ? (
                                <img
                                    src={content.logo.url}
                                    alt={content.logo.alt}
                                    className="w-12 h-12 object-contain rounded-lg"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xl">SP</span>
                                </div>
                            )}
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
                            <button
                                onClick={() => onViewChange('news')}
                                className="text-foreground hover:text-primary transition-colors font-normal"
                            >
                                News
                            </button>
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
        </>
    )
}