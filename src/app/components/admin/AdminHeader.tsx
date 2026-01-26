import { Save, LogOut, Menu } from 'lucide-react';

interface AdminHeaderProps {
    onSave: () => void;
    onExit: () => void;
}

export function AdminHeader({ onSave, onExit }: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-border">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Menu className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl text-foreground">Admin Panel</h1>
                            <p className="text-sm text-muted-foreground">SP Dapenbun CMS</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onSave}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <Save className="w-4 h-4" />
                            <span className="hidden sm:inline">Simpan</span>
                        </button>
                        <button
                            onClick={onExit}
                            className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/70 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Keluar</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}