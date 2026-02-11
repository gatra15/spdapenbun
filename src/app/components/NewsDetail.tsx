import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import type { NewsArticle } from '../../App';

interface NewsDetailProps {
    article: NewsArticle;
    onBack: () => void;
}

export function NewsDetail({ article, onBack }: NewsDetailProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Back Button - Fixed */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-foreground rounded-lg shadow-lg hover:shadow-xl transition-all border border-border"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Kembali</span>
                </button>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 py-20">
                <div className="bg-white rounded-xl overflow-hidden border border-border shadow-lg">
                    {/* Featured Image */}
                    <div className="aspect-video bg-muted overflow-hidden">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 text-justify">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <span className="flex items-center gap-1.5">
                                <Tag className="w-4 h-4" />
                                {article.category}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {formatDate(article.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                {article.author}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-xl text-muted-foreground mb-8 pb-8 border-b border-border italic">
                            {article.excerpt}
                        </p>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            {article.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-foreground mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}