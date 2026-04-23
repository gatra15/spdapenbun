type SectionId = 'logo' | 'hero' | 'about' | 'services' | 'board' | 'contact' | 'helpdesk' | 'news' | 'reports' | 'reference';

interface SectionTabsProps {
    activeSection: SectionId;
    onSectionChange: (section: SectionId) => void;
}

export function SectionTabs({ activeSection, onSectionChange }: SectionTabsProps) {
    const sections = [
        { id: 'logo', label: 'Logo' },
        { id: 'hero', label: 'Beranda' },
        { id: 'about', label: 'Tentang' },
        { id: 'services', label: 'Program' },
        { id: 'board', label: 'Pengurus' },
        { id: 'contact', label: 'Kontak' },
        { id: 'helpdesk', label: 'Helpdesk' },
        { id: 'news', label: 'Berita' },
        { id: 'reports', label: 'Laporan' },
        { id: 'reference', label: 'Referensi' },
    ] as const;

    return (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white text-foreground hover:bg-muted'
                        }`}
                >
                    {section.label}
                </button>
            ))}
        </div>
    );
}