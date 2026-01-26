import type { SiteContent } from '../../../App';
import { SliderEditor } from './SliderEditor';

interface HeroEditorProps {
    content: SiteContent['hero'];
    onUpdate: (field: keyof SiteContent['hero'], value: any) => void;
}

export function HeroEditor({ content, onUpdate }: HeroEditorProps) {
    // Pastikan slides selalu ada
    const slides = content.slides || [];

    return (
        <div className="space-y-8">
            <h2 className="text-2xl mb-6">Edit Beranda</h2>

            {/* Slider Images Section */}
            <div className="border-b border-border pb-8">
                <SliderEditor
                    slides={slides}
                    onUpdateSlides={(slides) => onUpdate('slides', slides)}
                />
            </div>

            {/* Text Content Section */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Konten Teks</h3>
                <div>
                    <label className="block mb-2 text-foreground">Judul Utama</label>
                    <input
                        type="text"
                        value={content.title || ''}
                        onChange={(e) => onUpdate('title', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-foreground">Sub Judul</label>
                    <input
                        type="text"
                        value={content.subtitle || ''}
                        onChange={(e) => onUpdate('subtitle', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-foreground">Deskripsi</label>
                    <textarea
                        value={content.description || ''}
                        onChange={(e) => onUpdate('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
        </div>
    );
}