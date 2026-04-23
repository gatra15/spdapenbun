import { useState, useEffect } from 'react';
import { PublicWebsite } from './app/components/PublicWebsite';
import { AdminPanel } from './app/components/AdminPanel';
import { AdminLogin } from './app/components/AdminLogin';
import type { Book } from './types/library';

export interface BoardSection {
  id: string;
  title: string;
  members: BoardMember[];
  order: number;
}
export interface BoardMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  description?: string;
}

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
  board: {
    title: string;
    description: string;
    sections: BoardSection[]
  };
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
    backgroundImage: string;
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

  reference: {
    title: string,
    description: string,
    books: Book[];
  };
}

const defaultContent: SiteContent = {
  board: {
    title: 'Struktur Pengurus',
    description: 'Struktur kepengurusan SP Dapenbun periode 2024-2029',
    sections: [
      {
        id: '1',
        title: 'Majelis Pertimbangan Organisasi (MPO)',
        order: 1,
        members: [
          {
            id: '1',
            name: 'Evin Lasmana',
            position: 'Ketua MPO',
            photo: '/images/WEB/PENGURUS/MPO/1.jpg',
            description: ''
          },
          {
            id: '2',
            name: 'Faizal Abidin',
            position: 'Wakil Ketua MPO',
            photo: '/images/WEB/PENGURUS/MPO/2.jpg',
            description: ''
          },
          {
            id: '3',
            name: 'Purna Yudha Komara',
            position: 'Sekretaris MPO',
            photo: '/images/WEB/PENGURUS/MPO/3.jpg',
            description: ''
          }
        ]
      },
      {
        id: '2',
        title: 'Pengurus Harian',
        order: 2,
        members: [
          {
            id: '4',
            name: 'Harry Nugroho',
            position: 'Ketua Umum',
            photo: '/images/WEB/PENGURUS/1.jpg',
            description: ''
          },
          {
            id: '5',
            name: 'Ryan Abraham Silalahi',
            position: 'Sekretaris Jenderal',
            photo: '/images/WEB/PENGURUS/2.jpg',
            description: ''
          },
          {
            id: '6',
            name: 'Sanwani',
            position: 'Bendahara Umum',
            photo: '/images/WEB/PENGURUS/3.jpg',
            description: ''
          },
        ]
      },
      {
        id: '3',
        title: 'Department Kesejahteraan',
        order: 3,
        members: [
          {
            id: '7',
            name: 'Tri Aji Sukarno',
            position: 'Department Kesejahteraan',
            photo: '/images/WEB/PENGURUS/4.jpg',
            description: ''
          },
          {
            id: '8',
            name: 'Regita Syahkirana Putri',
            position: 'Department Kesejahteraan',
            photo: '/images/WEB/PENGURUS/5.jpg',
            description: ''
          },
          {
            id: '9',
            name: 'Fasyara Rahma Abdilla',
            position: 'Department Kesejahteraan',
            photo: '/images/WEB/PENGURUS/6.jpg',
            description: ''
          },
        ]
      },
      {
        id: '4',
        title: 'Departement Pemberdayaan Perempuan',
        order: 4,
        members: [
          {
            id: '10',
            name: 'Nisaa Titaley',
            position: 'Department Pemberdayaan Perempuan',
            photo: '/images/WEB/PENGURUS/7.jpg',
            description: ''
          },
          {
            id: '11',
            name: 'Disya Intan Fajriati',
            position: 'Department Pemberdayaan Perempuan',
            photo: '/images/WEB/PENGURUS/8.jpg',
            description: ''
          },
        ]
      },
      {
        id: '5',
        title: 'Departement Hukum & Perlindungan Anggota',
        order: 5,
        members: [
          {
            id: '12',
            name: 'Arief Wahyudi',
            position: 'Department Hukum & Perlindungan Anggota',
            photo: '/images/WEB/PENGURUS/9.jpg',
            description: ''
          },
          {
            id: '13',
            name: 'Grace Sisca Silaban',
            position: 'Department Hukum & Perlindungan Anggota',
            photo: '/images/WEB/PENGURUS/10.jpg',
            description: ''
          },
        ]
      },
      {
        id: '6',
        title: 'Departement Hubungan Kerja, Organisasi & Masyarakat',
        order: 6,
        members: [
          {
            id: '14',
            name: 'Junaedi',
            position: 'Department Hubungan Kerja, Organisasi & Masyarakat',
            photo: '/images/WEB/PENGURUS/11.jpg',
            description: ''
          },
          {
            id: '15',
            name: 'Hermawan',
            position: 'Department Hubungan Kerja, Organisasi & Masyarakat',
            photo: '/images/WEB/PENGURUS/12.jpg',
            description: ''
          },
        ]
      },
      {
        id: '7',
        title: 'Departement Pendidikan & Pelatihan',
        order: 7,
        members: [
          {
            id: '16',
            name: 'Galih Saputra',
            position: 'Departement Pendidikan & Pelatihan',
            photo: '/images/WEB/PENGURUS/13.jpg',
            description: ''
          },
          {
            id: '17',
            name: 'Bernando Haybet Mahulae',
            position: 'Departement Pendidikan & Pelatihan',
            photo: '/images/WEB/PENGURUS/14.jpg',
            description: ''
          },
        ]
      },
      {
        id: '8',
        title: 'Departement Sekretariat & Keanggotaan',
        order: 8,
        members: [
          {
            id: '18',
            name: 'Akbar Ariananda',
            position: 'Departement Sekretariat & Keanggotaan',
            photo: '/images/WEB/PENGURUS/15.jpg',
            description: ''
          },
          {
            id: '19',
            name: 'Muhammad Rezza Dermawan',
            position: 'Departement Sekretariat & Keanggotaan',
            photo: '/images/WEB/PENGURUS/16.jpg',
            description: ''
          },
        ]
      },
      {
        id: '8',
        title: 'Departement Umum & Perlengkapan',
        order: 8,
        members: [
          {
            id: '18',
            name: 'Muhammad Fahir',
            position: 'Departement Umum & Perlengkapan',
            photo: '/images/WEB/PENGURUS/17.jpg',
            description: ''
          },
          {
            id: '19',
            name: 'Anggi Febrianto',
            position: 'Departement Umum & Perlengkapan',
            photo: '/images/WEB/PENGURUS/18.jpg',
            description: ''
          },
        ]
      },
      {
        id: '9',
        title: 'Wilayah I',
        order: 9,
        members: [
          {
            id: '20',
            name: 'Hadmaji',
            position: 'Koordinator Wilayah I',
            photo: '',
            description: 'https://ui-avatars.com/api/?name=Hadmaji&size=400&background=0D8ABC&color=fff'
          },
          {
            id: '21',
            name: 'Muhammad Endrano',
            position: 'Sekretaris Wilayah I',
            photo: '',
            description: 'https://ui-avatars.com/api/?name=Muhammad+Endrano&size=400&background=0D8ABC&color=fff'
          },
          {
            id: '22',
            name: 'Berlian Tri Austin Sinaga',
            position: 'Bendahara Wilayah I',
            photo: 'https://ui-avatars.com/api/?name=Berlian+Tri+Austin+Sinaga&size=400&background=0D8ABC&color=fff',
            description: ''
          },
        ]
      },
      {
        id: '10',
        title: 'Wilayah II',
        order: 10,
        members: [
          {
            id: '23',
            name: 'M. Hadi Saputra',
            position: 'Koordinator Wilayah II',
            photo: 'https://ui-avatars.com/api/?name=M+Hadi+Saputra&size=400&background=0D8ABC&color=fff',
            description: ''
          },
          {
            id: '24',
            name: 'Ade Meilani',
            position: 'Sekretaris Wilayah II',
            photo: 'https://ui-avatars.com/api/?name=Ade+Meilani&size=400&background=0D8ABC&color=fff',
            description: ''
          },
          {
            id: '25',
            name: 'Rd. Hasti Setiawati',
            position: 'Bendahara Wilayah II',
            photo: 'https://ui-avatars.com/api/?name=Rd+Hasti+Setiawati&size=400&background=0D8ABC&color=fff',
            description: ''
          },
        ]
      },
      {
        id: '11',
        title: 'Wilayah III',
        order: 11,
        members: [
          {
            id: '26',
            name: 'Harvianto Adi Wibowo',
            position: 'Koordinator Wilayah III',
            photo: 'https://ui-avatars.com/api/?name=Harvianto+Adi+Wibowo&size=400&background=0D8ABC&color=fff',
            description: ''
          },
          {
            id: '27',
            name: 'Risna Aditya Prahasta',
            position: 'Sekretaris Wilayah III',
            photo: 'https://ui-avatars.com/api/?name=Risna+Aditya+Prahasta&size=400&background=0D8ABC&color=fff',
            description: ''
          },
          {
            id: '28',
            name: 'Rohman Darussalam',
            position: 'Bendahara Wilayah III',
            photo: 'https://ui-avatars.com/api/?name=Rohman+Darussalam&size=400&background=0D8ABC&color=fff',
            description: ''
          },
        ]
      },
    ]
  },
  logo: {
    url: '/images/logo.png',
    alt: 'SP Dapenbun Logo',
  },
  hero: {
    title: 'SP Dapenbun',
    subtitle: 'Serikat Pekerja Dana Pensiun Perkebunan',
    description: 'Bersama membangun kesejahteraan dan melindungi hak-hak pekerja untuk masa depan yang lebih baik.',
    slides: [
      {
        id: '1',
        desktop: { image: '/images/WEB/01 BERANDA/1.jpg', alt: 'Slide 1 Desktop' },
        tablet: { image: '/images/WEB/01 BERANDA/1.jpg', alt: 'Slide 1 Tablet' },
        mobile: { image: '/images/WEB/01 BERANDA/1.jpg', alt: 'Slide 1 Mobile' }
      },
      {
        id: '2',
        desktop: { image: '/images/WEB/01 BERANDA/2.jpg', alt: 'Slide 2 Desktop' },
        tablet: { image: '/images/WEB/01 BERANDA/2.jpg', alt: 'Slide 2 Tablet' },
        mobile: { image: '/images/WEB/01 BERANDA/2.jpg', alt: 'Slide 2 Mobile' }
      },
      {
        id: '3',
        desktop: { image: '/images/WEB/01 BERANDA/3.jpg', alt: 'Slide 3 Desktop' },
        tablet: { image: '/images/WEB/01 BERANDA/3.jpg', alt: 'Slide 3 Tablet' },
        mobile: { image: '/images/WEB/01 BERANDA/3.jpg', alt: 'Slide 3 Mobile' }
      }
    ]
  },
  about: {
    title: 'Tentang Kami',
    description: 'SP Dapenbun adalah organisasi serikat pekerja yang berkomitmen untuk memperjuangkan hak dan kesejahteraan anggota.',
    mission: 'Melanjutkan dan Meningkatkan Perjanjian kerja bersama (PKB) lebih baik; Menjaga keberlangsungan kesejahteraan karyawan; Memastikan karyawan tetap bekerja hingga masa pensiun; Menjaga hubungan industrial yang harmonis antara manajemen dengan serikat pekerja;	Aktif dan berkontribusi di tingkat federasi serikat pekerja perkebunan (FSPBUN)',
    vision: 'Mendukung program perusahaan menuju industri berkelanjutan',
    backgroundImage: '/images/WEB/02 TENTANG KAMI/a.jpg',
  },
  services: {
    title: 'Program Kami',
    items: [
      {
        id: '1',
        title: 'Helpdesk',
        description: 'Menampung aspirasi melalui platform digital.',
        icon: 'Users',
      },
      {
        id: '2',
        title: 'Kesejahteraan Karyawan',
        description: 'Implementasi PKB, Perencanaan karier dan Evaluasi Jaminan Kesehatan bersama SDM & Umum.',
        icon: 'Shield',
      },
      {
        id: '3',
        title: 'Sharing and Discuss',
        description: 'Rapat berkala pengurus SP Pusat dan koordinator wilayah.',
        icon: 'Target',
      },
    ],
  },
  contact: {
    title: 'Hubungi Kami',
    address: 'Gedung Agro Plaza Lt. 10\nJalan HR.Rasuna Said Kav X2 No. 1\nJakarta Selatan 12950',
    phone: '(021) 5793 8899',
    email: 'spdpbun@gmail.com',
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
        title: 'PELANTIKAN PENGURUS SERIKAT PEKERJA DANA PENSIUN PERKEBUNAN',
        excerpt: 'Telah dilaksanakan pelatikan pengurus baru Serikat Pekerja Dana Pensiun Perkebunan (SP DAPENBUN) pada Jumat, 9 Januari 2026.',
        content: 'Telah dilaksanakan pelatikan pengurus baru Serikat Pekerja Dana Pensiun Perkebunan (SP DAPENBUN) pada Jumat, 9 Januari 2026. Acara ini dihadiri oleh pengurus Serikat Pekerja Perkebunan beserta Jajaran, Direksi Dana Pensiun Perkebunan serta seluruh anggota Serikat Pekerja Dana Pensiun Perkebunan.\n\nProsesi Penyerahan Pataka dilakukan oleh Ketua Umum Federasi Serikat Pekerja Perkebunan, Bapak Asmanuddin Sinaga, Kepada Ketua Umum terpilih Serikat Pekerja Dana Pensiun Perkebunan Periode 2026-2030 sebagai simbol amanah, legitimasi, dan keberlanjutan kepemimpinan organisasi.Momen sakral tersebut berlangsung khidmat dan penuh makna, disaksikan oleh Direksi Dana Pensiun Perkebunan serta Seluruh Anggota Serikat Pekerja Dana Pensiun Perkebunan yang menegaskan komitmen bersama untuk menjaga persatuan, memperkuat solidaritas, dan menggerakkan organisasi menuju masa depan yang lebih maju dan berdaya.\n\nDengan terlaksananya rangkaian pelantikan Pengurus Serikat Pekerja Dana Pensiun Perkebunan, kegiatan ini menjadi penanda awal kepengurusan baru dalam mengemban amanah organisasi.Diharapkan pengurus yang telah dilantik dapat menjalankan tugas dengan penuh tanggung jawab, menjaga solidaritas, serta memperkuat sinergi dengan Direksi demi terciptanya hubungan industrial yang harmonis dan berkelanjutan.Pelantikan ini sekaligus menegaskan komitmen bersama untuk menjadikan Serikat Pekerja sebagai Rumah Bersama dalam memperjuangkan aspirasi, kesejahteraan, dan kemajuan seluruh Anggota.',
        image: '/images/WEB/03 NEWS/Pelantikan 09 Jan 2026.jpg',
        author: 'Admin SP Dapenbun',
        date: new Date().toISOString(),
        category: 'Event'
      },
    ]
  },
  reference: {
    title: 'Referensi & Bacaan',
    description: 'Berisi Kumpulan Buku dan Bacaan terkait Ketenagakerjaan',
    books: [
      {
        id: '1',
        title: "Buku PKB 2026–2027",
        author: "Instansi PKB",
        publisher: "Pemerintah",
        year: 2026,
        category: "Panduan",
        description: "Panduan Pelaksanaan PKB Tahun 2026–2027.",
        fileType: "pdf",
        fileUrl: "/books/Buku_PKB_2026-2027.pdf",
        tags: ["pkb", "panduan", "2026"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]
  }
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [reports, setReports] = useState<Report[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'news' | 'board' | 'reference'>('home');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        let needsUpdate = false;

        // Migration: convert old slide format to new format
        if (parsed.hero?.slides && parsed.hero.slides.length > 0) {
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
            needsUpdate = true;
          }
        }

        // Migration: Add backgroundImage to about if not exists
        if (parsed.about && !parsed.about.backgroundImage) {
          parsed.about.backgroundImage = defaultContent.about.backgroundImage;
          needsUpdate = true;
        }

        // Check if any field was missing
        if (parsed.board && !parsed.board.sections) {
          const sections = [];

          // Convert old MPO
          if (parsed.board.mpo) {
            sections.push({
              id: '1',
              title: parsed.board.mpo.title || 'Majelis Pertimbangan Organisasi (MPO)',
              order: 1,
              members: parsed.board.mpo.members || []
            });
          }

          // Convert old dailyExecutive
          if (parsed.board.dailyExecutive) {
            sections.push({
              id: '2',
              title: parsed.board.dailyExecutive.title || 'Pengurus Harian',
              order: 2,
              members: parsed.board.dailyExecutive.members || []
            });
          }

          parsed.board = {
            title: parsed.board.title || defaultContent.board.title,
            description: parsed.board.description || defaultContent.board.description,
            sections: sections.length > 0 ? sections : defaultContent.board.sections
          };

          needsUpdate = true;
        }

        // Merge with default content for missing fields
        const mergedContent: SiteContent = {
          board: parsed.board?.sections ? parsed.board : defaultContent.board,
          logo: parsed.logo || defaultContent.logo,
          hero: {
            ...defaultContent.hero,
            ...parsed.hero,
            slides: parsed.hero?.slides && parsed.hero.slides.length > 0
              ? parsed.hero.slides
              : defaultContent.hero.slides
          },
          about: {
            ...defaultContent.about,
            ...parsed.about,
            backgroundImage: parsed.about?.backgroundImage || defaultContent.about.backgroundImage
          },
          services: parsed.services || defaultContent.services,
          contact: parsed.contact || defaultContent.contact,
          helpdesk: parsed.helpdesk || defaultContent.helpdesk,
          news: parsed.news || defaultContent.news,
          reference: parsed.reference || defaultContent.reference
        };

        // Update localStorage if needed
        if (needsUpdate) {
          localStorage.setItem('siteContent', JSON.stringify(mergedContent));
        }

        setContent(mergedContent);
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

  // Auto scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedArticle]);

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
            currentView={currentView}
            onViewChange={setCurrentView}
            selectedArticle={selectedArticle}
            onSelectArticle={setSelectedArticle}
            books={books}
            selectedBook={selectedBook}
            onSelectBook={setSelectedBook}
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