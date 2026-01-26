import type { SiteContent } from '../../../App';

interface ServicesEditorProps {
    content: SiteContent['services'];
    onUpdateTitle: (value: string) => void;
    onUpdateService: (id: string, field: string, value: string) => void;
}

export function ServicesEditor({ content, onUpdateTitle, onUpdateService }: ServicesEditorProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl mb-6">Edit Program</h2>
            <div>
                <label className="block mb-2 text-foreground">Judul Seksi</label>
                <input
                    type="text"
                    value={content.title}
                    onChange={(e) => onUpdateTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div className="space-y-8 mt-8">
                {content.items.map((service, index) => (
                    <div key={service.id} className="p-6 border border-border rounded-lg bg-muted/20">
                        <h3 className="mb-4 text-foreground">Program {index + 1}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-foreground">Judul</label>
                                <input
                                    type="text"
                                    value={service.title}
                                    onChange={(e) => onUpdateService(service.id, 'title', e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-foreground">Deskripsi</label>
                                <textarea
                                    value={service.description}
                                    onChange={(e) => onUpdateService(service.id, 'description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-foreground">Icon (Shield, Users, Target)</label>
                                <input
                                    type="text"
                                    value={service.icon}
                                    onChange={(e) => onUpdateService(service.id, 'icon', e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}