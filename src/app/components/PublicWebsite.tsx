import type { NewsArticle, SiteContent } from '../../App';
import type { Report } from '../../App';
import { useState } from 'react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';
import HeroSlider from './ui/heroslider';
import { NavBar } from './public/NavBar';
import { AboutSection } from './public/AboutSection';
import { NavBarPage } from './public/NavBarPage';
import { ServiceSection } from './public/ServiceSection';
import { ContactSection } from './public/ContactSection';
import { ReportSection } from './public/ReportSection';
import { Footer } from './public/Footer';
import { NewsPage } from './NewsPage';
import { NewsDetail } from './NewsDetail';
import { BoardSection } from './BoardSection';
import { LibraryPage } from './public/LibraryPage';
import type { Book } from '../../types/library';
import { BookDetail } from './public/BookDetail';

interface PublicWebsiteProps {
    content: SiteContent;
    onAdminAccess: () => void;
    onSubmitReport: (report: Omit<Report, 'id' | 'date' | 'status'>) => void;
    currentView: 'home' | 'news' | 'board' | 'reference';
    onViewChange: (view: 'home' | 'news' | 'board' | 'reference') => void;
    selectedArticle: NewsArticle | null;
    onSelectArticle: (article: NewsArticle | null) => void;
    books: Book[],
    selectedBook: Book | null,
    onSelectBook: (book: Book | null) => void;
}

export function PublicWebsite({ content, onAdminAccess, onSubmitReport, currentView, onViewChange, selectedArticle, onSelectArticle, books, selectedBook, onSelectBook }: PublicWebsiteProps) {
    const [lastSection, setLastSection] = useState('home');
    const [reportForm, setReportForm] = useState({
        name: '',
        email: '',
        category: 'Umum',
        subject: '',
        message: '',
    });

    const handleSubmitReport = (e: React.FormEvent) => {
        e.preventDefault();

        if (!reportForm.name || !reportForm.email || !reportForm.subject || !reportForm.message) {
            toast.error('Mohon lengkapi semua field yang diperlukan');
            return;
        }

        onSubmitReport(reportForm);
        setReportForm({
            name: '',
            email: '',
            category: 'Umum',
            subject: '',
            message: '',
        });
        toast.success('Laporan Anda telah berhasil dikirim!');
    };

    const handleViewChange = (view: 'home' | 'news' | 'board' | 'reference') => {
        // simpan section terakhir ke URL
        window.location.hash = lastSection;

        // reset detail
        onSelectBook(null);
        onSelectArticle(null);

        onViewChange(view);
    };

    const handleSectionChange = (section: string) => {
        setLastSection(section);
        window.location.hash = section;
    };

    if (selectedArticle) {
        return (
            <NewsDetail
                article={selectedArticle}
                onBack={() => onSelectArticle(null)}
            />
        );
    }

    if (currentView === 'news') {
        return (
            <div className="min-h-screen">
                <Toaster />

                {/* Navbar for News Page */}
                <NavBarPage content={content} onViewChange={handleViewChange} />

                <NewsPage
                    news={content.news}
                    onSelectArticle={onSelectArticle}
                    onBack={() => onViewChange('home')}
                />

                <Footer onAdminAccess={onAdminAccess} />
            </div>
        );
    }

    if (selectedBook) {
        return (
            <BookDetail
                book={selectedBook}
                onBack={() => onSelectBook(null)}
            />
        );
    }

    if (currentView === 'reference') {
        return (
            <LibraryPage
                books={content.reference.books}
                onSelectBook={onSelectBook}
                onBack={() => onViewChange('home')}
            />
        );
    }

    if (currentView === 'board') {
        return (
            <div className='min-h-screen'>
                <Toaster />

                <NavBarPage content={content} onViewChange={handleViewChange} />

                <BoardSection content={content.board} />

                <Footer onAdminAccess={onAdminAccess} />
            </div>
        )
    }


    return (
        <div className="min-h-screen">
            <Toaster />
            {/* Header */}
            <NavBar
                content={content}
                onAdminAccess={onAdminAccess}
                onViewChange={handleViewChange}
                onSectionChange={handleSectionChange}
            />

            {/* Hero Section */}
            <HeroSlider content={content.hero} />

            {/* About Section */}
            <AboutSection about={content.about} onViewChange={handleViewChange} />

            {/* Services Section */}
            <ServiceSection services={content.services} />

            {/* Contact Section */}
            <ContactSection contact={content.contact} />

            {/* Report/Helpdesk Section */}
            <ReportSection helpdesk={content.helpdesk} handleSubmitReport={handleSubmitReport} />

            {/* <BoardSection content={content.board} /> */}

            {/* Footer */}
            <Footer onAdminAccess={onAdminAccess} />
        </div >
    );
}