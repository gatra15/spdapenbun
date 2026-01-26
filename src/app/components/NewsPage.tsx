import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import type { NewsArticle } from '../../App';

interface NewsPageProps {
    news: {
        title: string;
        description: string;
        articles: NewsArticle[];
    };
    onSelectArticle: (article: NewsArticle) => void;
    onBack: () => void;
}

export function NewsPage({ news, onSelectArticle, onBack }: NewsPageProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <section className="bg-primary text-primary-foreground py-16">
                <div className="container mx-auto px-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 mb-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Kembali ke Beranda</span>
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{news.title}</h1>
                    <p className="text-xl text-primary-foreground/80">{news.description}</p>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {news.articles.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Belum ada berita tersedia</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.articles.map((article) => (
                                <article
                                    key={article.id}
                                    className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
                                >
                                    {/* Image */}
                                    <div className="aspect-video bg-muted overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Category & Date */}
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1">
                                                <Tag className="w-4 h-4" />
                                                {article.category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(article.date)}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                                            {article.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                            {article.excerpt}
                                        </p>

                                        {/* Author & Read More */}
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <User className="w-4 h-4" />
                                                {article.author}
                                            </span>
                                            <button
                                                onClick={() => onSelectArticle(article)}
                                                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                                            >
                                                Selengkapnya →
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}