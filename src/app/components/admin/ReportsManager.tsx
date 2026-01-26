import { useState } from 'react';
import { Eye, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import type { Report } from '../../../App';

interface ReportsManagerProps {
    reports: Report[];
    onUpdateStatus: (id: string, status: Report['status']) => void;
    onDelete: (id: string) => void;
}

export function ReportsManager({ reports, onUpdateStatus, onDelete }: ReportsManagerProps) {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: Report['status']) => {
        switch (status) {
            case 'new':
                return 'bg-accent/20 text-accent-foreground border-accent/30';
            case 'reviewed':
                return 'bg-secondary/20 text-secondary border-secondary/30';
            case 'resolved':
                return 'bg-primary/20 text-primary border-primary/30';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    const getStatusLabel = (status: Report['status']) => {
        switch (status) {
            case 'new':
                return 'Baru';
            case 'reviewed':
                return 'Ditinjau';
            case 'resolved':
                return 'Selesai';
            default:
                return status;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Manajemen Laporan</h2>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                        Total: {reports.length} laporan
                    </span>
                </div>
            </div>

            {reports.length === 0 ? (
                <div className="text-center py-12">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Belum ada laporan masuk</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report.id} className="p-6 border border-border rounded-lg bg-white hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg text-foreground">{report.subject}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(report.status)}`}>
                                            {getStatusLabel(report.status)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span>📧 {report.email}</span>
                                        <span>👤 {report.name}</span>
                                        <span>🏷️ {report.category}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        📅 {formatDate(report.date)}
                                    </p>
                                </div>
                            </div>

                            {selectedReport?.id === report.id && (
                                <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-border">
                                    <h4 className="mb-2 text-foreground">Pesan Lengkap:</h4>
                                    <p className="text-foreground whitespace-pre-wrap">{report.message}</p>
                                </div>
                            )}

                            <div className="flex items-center gap-2 flex-wrap">
                                <button
                                    onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                                    className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/70 transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    {selectedReport?.id === report.id ? 'Tutup' : 'Lihat Detail'}
                                </button>
                                <button
                                    onClick={() => {
                                        onUpdateStatus(report.id, 'reviewed');
                                        toast.success('Status diubah menjadi Ditinjau');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors"
                                    disabled={report.status === 'reviewed'}
                                >
                                    Tandai Ditinjau
                                </button>
                                <button
                                    onClick={() => {
                                        onUpdateStatus(report.id, 'resolved');
                                        toast.success('Status diubah menjadi Selesai');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                    disabled={report.status === 'resolved'}
                                >
                                    Tandai Selesai
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm('Yakin ingin menghapus laporan ini?')) {
                                            onDelete(report.id);
                                            toast.success('Laporan berhasil dihapus');
                                            setSelectedReport(null);
                                        }
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors ml-auto"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}