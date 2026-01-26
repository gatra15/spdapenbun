import type { SiteContent } from '../../../App';

interface HelpdeskEditorProps {
    content: SiteContent['helpdesk'];
    onUpdate: (field: keyof SiteContent['helpdesk'], value: string) => void;
}

export function HelpdeskEditor({ content, onUpdate }: HelpdeskEditorProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl mb-6">Edit Helpdesk</h2>
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
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
        </div>
    );
}