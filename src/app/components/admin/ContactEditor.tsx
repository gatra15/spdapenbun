import type { SiteContent } from '../../../App';

interface ContactEditorProps {
    content: SiteContent['contact'];
    onUpdate: (field: keyof SiteContent['contact'], value: string) => void;
}

export function ContactEditor({ content, onUpdate }: ContactEditorProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl mb-6">Edit Kontak</h2>
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
                <label className="block mb-2 text-foreground">Alamat</label>
                <textarea
                    value={content.address}
                    onChange={(e) => onUpdate('address', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div>
                <label className="block mb-2 text-foreground">Telepon</label>
                <input
                    type="text"
                    value={content.phone}
                    onChange={(e) => onUpdate('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div>
                <label className="block mb-2 text-foreground">Email</label>
                <input
                    type="email"
                    value={content.email}
                    onChange={(e) => onUpdate('email', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
        </div>
    );
}