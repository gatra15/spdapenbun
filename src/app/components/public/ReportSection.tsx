import { MessageSquare, Send } from "lucide-react";
import type { SiteContent } from "../../../App";
import { useState } from "react";

interface ReportSectionProps {
    helpdesk: SiteContent['helpdesk']
    handleSubmitReport: (e: React.FormEvent) => void;
}

export function ReportSection({ helpdesk, handleSubmitReport }: ReportSectionProps) {
    const [reportForm, setReportForm] = useState({
        name: '',
        email: '',
        category: 'Umum',
        subject: '',
        message: '',
    });
    return (
        <>
            < section id="helpdesk" className="py-20 bg-white" >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="w-8 h-8 text-accent-foreground" />
                            </div>
                            <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
                                {helpdesk.title}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                {helpdesk.description}
                            </p>
                        </div>

                        <div className="bg-muted/30 rounded-xl p-8 border border-border">
                            <form onSubmit={handleSubmitReport} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-foreground">Nama Lengkap *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={reportForm.name}
                                            onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Masukkan nama lengkap Anda"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-foreground">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={reportForm.email}
                                            onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-foreground">Kategori Laporan</label>
                                    <select
                                        id="category"
                                        value={reportForm.category}
                                        onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="Umum">Umum</option>
                                        <option value="Keluhan">Keluhan</option>
                                        <option value="Saran">Saran</option>
                                        <option value="Pertanyaan">Pertanyaan</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block mb-2 text-foreground">Subjek *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={reportForm.subject}
                                        onChange={(e) => setReportForm({ ...reportForm, subject: e.target.value })}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Ringkasan singkat laporan Anda"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block mb-2 text-foreground">Pesan / Aspirasi *</label>
                                    <textarea
                                        id="message"
                                        value={reportForm.message}
                                        onChange={(e) => setReportForm({ ...reportForm, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows={6}
                                        placeholder="Jelaskan laporan, aspirasi, atau keluhan Anda secara detail..."
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <p className="text-sm text-muted-foreground">* Wajib diisi</p>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <Send className="w-4 h-4" />
                                        Kirim Laporan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}