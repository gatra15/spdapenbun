import { useState, useEffect } from 'react';
import { PublicWebsite } from './app/components/PublicWebsite';
import { AdminPanel } from './app/components/AdminPanel';
import { AdminLogin } from './app/components/AdminLogin';

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

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export interface SiteContent {
  logo: {
    url: string;
    alt: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    slides: Array<{
      id: string;
      desktop: {
        image: string;
        alt: string;
      };
      tablet: {
        image: string;
        alt: string;
      };
      mobile: {
        image: string;
        alt: string;
      };
    }>;
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
  news: {
    title: string;
    description: string;
    articles: NewsArticle[];
  };
}

const defaultContent: SiteContent = {
  logo: {
    url: '',
    alt: 'SP Dapenbun Logo',
  },
  hero: {
    title: 'SP Dapenbun',
    subtitle: 'Serikat Pekerja Dana Pensiun Perkebunan',
    description: 'Bersama membangun kesejahteraan dan melindungi hak-hak pekerja untuk masa depan yang lebih baik.',
    slides: [
      {
        id: '1',
        desktop: { image: 'https://picsum.photos/1920/1080?random=1', alt: 'Slide 1 Desktop' },
        tablet: { image: 'https://picsum.photos/1024/768?random=1', alt: 'Slide 1 Tablet' },
        mobile: { image: 'https://picsum.photos/768/1024?random=1', alt: 'Slide 1 Mobile' }
      },
      {
        id: '2',
        desktop: { image: 'https://picsum.photos/1920/1080?random=2', alt: 'Slide 2 Desktop' },
        tablet: { image: 'https://picsum.photos/1024/768?random=2', alt: 'Slide 2 Tablet' },
        mobile: { image: 'https://picsum.photos/768/1024?random=2', alt: 'Slide 2 Mobile' }
      },
      {
        id: '3',
        desktop: { image: 'https://picsum.photos/1920/1080?random=3', alt: 'Slide 3 Desktop' },
        tablet: { image: 'https://picsum.photos/1024/768?random=3', alt: 'Slide 3 Tablet' },
        mobile: { image: 'https://picsum.photos/768/1024?random=3', alt: 'Slide 3 Mobile' }
      }
    ]
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
  news: {
    title: 'Berita Terbaru',
    description: 'Informasi terkini seputar SP Dapenbun dan dunia ketenagakerjaan',
    articles: [
      {
        id: '1',
        title: 'Peningkatan Kesejahteraan Anggota Tahun 2024',
        excerpt: 'SP Dapenbun berhasil menegosiasikan peningkatan tunjangan kesejahteraan untuk seluruh anggota sebesar 15% di tahun 2024.',
        content: 'SP Dapenbun dengan bangga mengumumkan kesepakatan peningkatan kesejahteraan anggota sebesar 15% untuk tahun 2024. Kesepakatan ini merupakan hasil dari negosiasi intensif yang melibatkan manajemen dan perwakilan pekerja selama 3 bulan terakhir.\n\nPeningkatan ini mencakup berbagai aspek termasuk tunjangan kesehatan, pendidikan anak, dan dana pensiun. "Ini adalah pencapaian besar bagi seluruh anggota kami," ujar Ketua SP Dapenbun.\n\nProgram peningkatan kesejahteraan ini akan mulai efektif per 1 Januari 2024 dan akan berdampak langsung kepada lebih dari 5.000 anggota di seluruh Indonesia.',
        image: 'https://picsum.photos/800/600?random=10',
        author: 'Admin SP Dapenbun',
        date: new Date().toISOString(),
        category: 'Kesejahteraan'
      },
      {
        id: '2',
        title: 'Workshop Pengembangan Kompetensi SDM',
        excerpt: 'Ratusan anggota mengikuti workshop pengembangan kompetensi yang diselenggarakan SP Dapenbun bekerjasama dengan lembaga pelatihan nasional.',
        content: 'SP Dapenbun menyelenggarakan workshop pengembangan kompetensi yang diikuti oleh 250 anggota dari berbagai wilayah. Workshop ini berlangsung selama 3 hari dengan materi yang mencakup kepemimpinan, manajemen keuangan, dan keterampilan digital.\n\nKegiatan ini merupakan bagian dari program tahunan SP Dapenbun untuk meningkatkan kapasitas anggota agar lebih siap menghadapi tantangan dunia kerja modern.\n\nPeserta mendapatkan sertifikat resmi yang dapat digunakan untuk pengembangan karir. "Workshop ini sangat bermanfaat untuk meningkatkan skill kami," kata salah satu peserta.',
        image: 'https://picsum.photos/800/600?random=11',
        author: 'Tim Humas',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        category: 'Pelatihan'
      },
      {
        id: '3',
        title: 'Program Bantuan Pendidikan Anak Anggota',
        excerpt: 'SP Dapenbun meluncurkan program beasiswa pendidikan untuk anak-anak anggota yang berprestasi.',
        content: 'Dalam rangka mendukung pendidikan generasi penerus, SP Dapenbun meluncurkan program beasiswa pendidikan untuk anak-anak anggota yang berprestasi. Program ini akan memberikan bantuan biaya pendidikan dari tingkat SD hingga perguruan tinggi.\n\nTotal dana yang dialokasikan mencapai 2 miliar rupiah untuk tahun pertama, dengan target membantu minimal 100 siswa berprestasi.\n\nPendaftaran dibuka mulai bulan depan dengan persyaratan nilai rata-rata minimal 8.0 dan aktif dalam kegiatan ekstrakurikuler. "Pendidikan adalah investasi terbaik untuk masa depan," tutup Ketua SP Dapenbun.',
        image: 'https://picsum.photos/800/600?random=12',
        author: 'Admin SP Dapenbun',
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        category: 'Pendidikan'
      }
    ]
  },
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [reports, setReports] = useState<Report[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'news'>('home');

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);

        // Migration: convert old slide format to new format
        if (parsed.hero.slides && parsed.hero.slides.length > 0) {
          const firstSlide = parsed.hero.slides[0];

          // Check if old format (single image string)
          if (typeof firstSlide.image === 'string') {
            parsed.hero.slides = parsed.hero.slides.map((slide: any, index: number) => ({
              id: slide.id || `${index + 1}`,
              desktop: {
                image: slide.image,
                alt: slide.alt || `Slide ${index + 1} Desktop`
              },
              tablet: {
                image: slide.image,
                alt: slide.alt || `Slide ${index + 1} Tablet`
              },
              mobile: {
                image: slide.image,
                alt: slide.alt || `Slide ${index + 1} Mobile`
              }
            }));
            localStorage.setItem('siteContent', JSON.stringify(parsed));
          }
        }

        // If no slides, use default
        if (!parsed.hero.slides || parsed.hero.slides.length === 0) {
          parsed.hero.slides = defaultContent.hero.slides;
          localStorage.setItem('siteContent', JSON.stringify(parsed));
        }

        setContent(parsed);
      } catch (error) {
        console.error('Error loading content:', error);
        setContent(defaultContent);
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

    // Check if already logged in (session)
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Keyboard shortcut to open admin login (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowLogin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
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

  // Handle admin login
  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowLogin(false);
    sessionStorage.setItem('adminLoggedIn', 'true');
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('adminLoggedIn');
  };

  return (
    <div className="min-h-screen">
      {isAdmin ? (
        <AdminPanel
          content={content}
          onUpdate={updateContent}
          onExit={handleAdminLogout}
          reports={reports}
          onUpdateReportStatus={updateReportStatus}
          onDeleteReport={deleteReport}
        />
      ) : (
        <>
          <PublicWebsite
            content={content}
            onAdminAccess={() => setShowLogin(true)}
            onSubmitReport={addReport}
            onViewChange={setCurrentView}
          />

          {showLogin && (
            <AdminLogin
              onLogin={handleAdminLogin}
              onClose={() => setShowLogin(false)}
            />
          )}
        </>
      )}
    </div>
  );
}