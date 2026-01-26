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

interface PublicWebsiteProps {
    content: SiteContent;
    onAdminAccess: () => void;
    onSubmitReport: (report: Omit<Report, 'id' | 'date' | 'status'>) => void;
    currentView: 'home' | 'news';
    onViewChange: (view: 'home' | 'news') => void;
    selectedArticle: NewsArticle | null;
    onSelectArticle: (article: NewsArticle | null) => void;
}

export function PublicWebsite({ content, onAdminAccess, onSubmitReport, currentView, onViewChange, selectedArticle, onSelectArticle }: PublicWebsiteProps) {
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
                <NavBarPage content={content} onViewChange={onViewChange} />

                <NewsPage
                    news={content.news}
                    onSelectArticle={onSelectArticle}
                    onBack={() => onViewChange('home')}
                />

                <Footer onAdminAccess={onAdminAccess} />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Toaster />
            {/* Header */}
            <NavBar
                content={content}
                onAdminAccess={onAdminAccess}
                onViewChange={onViewChange}
            />

            {/* Hero Section */}
            <HeroSlider content={content.hero} />

            {/* About Section */}
            <AboutSection about={content.about} />

            {/* Services Section */}
            <ServiceSection services={content.services} />

            {/* Contact Section */}
            <ContactSection contact={content.contact} />

            {/* Report/Helpdesk Section */}
            <ReportSection helpdesk={content.helpdesk} handleSubmitReport={handleSubmitReport} />

            {/* Footer */}
            <Footer onAdminAccess={onAdminAccess} />
        </div >
    );
}