import type { SiteContent } from '../../../App';

interface AboutEditorProps {
    content: SiteContent['about'];
    onUpdate: (field: keyof SiteContent['about'], value: string) => void;
}

export function AboutEditor({ content, onUpdate }: AboutEditorProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl mb-6">Edit Tentang</h2>
            <div>
                <label className="block mb-2 text-foreground">Judul</label>
                <input
                    type="text"
                    value={content.title}
                    onChange={(e) => onUpdate('title', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div>
                <label className="block mb-2 text-foreground">Deskripsi</label>
                <textarea
                    value={content.description}
                    onChange={(e) => onUpdate('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div>
                <label className="block mb-2 text-foreground">Visi</label>
                <textarea
                    value={content.vision}
                    onChange={(e) => onUpdate('vision', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div>
                <label className="block mb-2 text-foreground">Misi</label>
                <textarea
                    value={content.mission}
                    onChange={(e) => onUpdate('mission', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
        </div>
    );
}