interface FooterSectionProps {
    onAdminAccess: () => void;
}
export function Footer({ onAdminAccess }: FooterSectionProps) {
    return (
        <>
            <footer className="bg-muted/50 border-t border-border py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            © 2026 SP Dapenbun. All rights reserved.
                        </p>
                        {/* Admin Access Button */}
                        <button
                            onClick={onAdminAccess}
                            className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            title="Tekan Ctrl+Shift+A untuk akses cepat"
                        >
                            Admin Access
                        </button>
                    </div>
                </div>
            </footer>
        </>
    )
}