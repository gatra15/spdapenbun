import { Menu } from "lucide-react";
import type { SiteContent } from "../../../App"
import { useState } from "react";

interface NavbarPageProps {
    content: SiteContent
    onViewChange: (view: 'home' | 'news') => void;
}

export function NavBarPage({ content, onViewChange }: NavbarPageProps) {
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
                            <button
                                onClick={() => onViewChange('home')}
                                className="text-foreground hover:text-primary transition-colors font-normal"
                            >
                                Beranda
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

                            <button
                                onClick={() => onViewChange('home')}
                                className="text-left text-foreground hover:text-primary transition-colors"
                            >
                                Beranda
                            </button>
                        </nav>
                    )}
                </div>
            </header>
        </>
    )
}