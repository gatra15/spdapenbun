import { useState, useEffect } from 'react';
import { PublicWebsite } from './app/components/PublicWebsite';
import { AdminPanel } from './app/components/AdminPanel';

export interface Report {
  id: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  services: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
  };
  helpdesk: {
    title: string;
    description: string;
  };
}

const defaultContent: SiteContent = {
  hero: {
    title: 'SP Dapenbun',
    subtitle: 'Serikat Pekerja Dana Pensiun Perkebunan',
    description: 'Bersama membangun kesejahteraan dan melindungi hak-hak pekerja untuk masa depan yang lebih baik.',
  },
  about: {
    title: 'Tentang Kami',
    description: 'SP Dapenbun adalah organisasi serikat pekerja yang berkomitmen untuk memperjuangkan hak dan kesejahteraan anggota.',
    mission: 'Menjadi wadah perjuangan pekerja dalam mewujudkan kesejahteraan dan perlindungan hak-hak pekerja.',
    vision: 'Terwujudnya pekerja yang sejahtera, bermartabat, dan terlindungi hak-haknya.',
  },
  services: {
    title: 'Program Kami',
    items: [
      {
        id: '1',
        title: 'Advokasi Hukum',
        description: 'Memberikan bantuan dan pendampingan hukum kepada anggota dalam berbagai permasalahan ketenagakerjaan.',
        icon: 'Shield',
      },
      {
        id: '2',
        title: 'Pelatihan & Pengembangan',
        description: 'Menyelenggarakan program pelatihan untuk meningkatkan kompetensi dan keterampilan anggota.',
        icon: 'Users',
      },
      {
        id: '3',
        title: 'Dana Pensiun',
        description: 'Mengelola dan mengawasi program dana pensiun untuk kesejahteraan anggota di masa depan.',
        icon: 'Target',
      },
    ],
  },
  contact: {
    title: 'Hubungi Kami',
    address: 'Jl. Contoh No. 123, Jakarta Pusat, DKI Jakarta 10110',
    phone: '+62 21 1234 5678',
    email: 'info@spdapenbun.org',
  },
  helpdesk: {
    title: 'Layanan Aspirasi & Laporan',
    description: 'Sampaikan aspirasi, keluhan, atau laporan Anda kepada kami. Setiap masukan Anda sangat berarti untuk evaluasi dan perbaikan layanan kami.',
  },
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [reports, setReports] = useState<Report[]>([]);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading content:', error);
      }
    }

    const savedReports = localStorage.getItem('reports');
    if (savedReports) {
      try {
        setReports(JSON.parse(savedReports));
      } catch (error) {
        console.error('Error loading reports:', error);
      }
    }
  }, []);

  // Save content to localStorage whenever it changes
  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('siteContent', JSON.stringify(newContent));
  };

  // Add new report
  const addReport = (report: Omit<Report, 'id' | 'date' | 'status'>) => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new',
    };
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  // Update report status
  const updateReportStatus = (id: string, status: Report['status']) => {
    const updatedReports = reports.map((report) =>
      report.id === id ? { ...report, status } : report
    );
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  // Delete report
  const deleteReport = (id: string) => {
    const updatedReports = reports.filter((report) => report.id !== id);
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  return (
    <div className="min-h-screen">
      {isAdmin ? (
        <AdminPanel
          content={content}
          onUpdate={updateContent}
          onExit={() => setIsAdmin(false)}
          reports={reports}
          onUpdateReportStatus={updateReportStatus}
          onDeleteReport={deleteReport}
        />
      ) : (
        <PublicWebsite
          content={content}
          onAdminAccess={() => setIsAdmin(true)}
          onSubmitReport={addReport}
        />
      )}
    </div>
  );
}