import { Users } from 'lucide-react';
import type { SiteContent } from '../../App';

interface BoardSectionProps {
    content: SiteContent['board'];
}

export function BoardSection({ content }: BoardSectionProps) {
    const getGridClasses = (memberCount: number) => {
        if (memberCount === 1) {
            return 'grid-cols-1 max-w-md';
        }
        if (memberCount === 2) {
            return 'grid-cols-1 sm:grid-cols-2 max-w-2xl';
        }
        if (memberCount === 3) {
            return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl';
        }
        // 4 or more
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    };
    return (
        <section id="board" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {content.title}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {content.description}
                    </p>
                </div>

                {/* Dynamic Sections */}
                {content.sections.map((section, sectionIndex) => (
                    <div key={section.id} className={sectionIndex > 0 ? 'mt-16' : ''}>
                        <div className="text-center mb-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                {section.title}
                            </h3>
                            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                        </div>

                        {section.members.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>Belum ada anggota</p>
                            </div>
                        ) : (
                            <div className={`grid gap-6 mx-auto ${getGridClasses(section.members.length)}`}>
                                {section.members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="bg-white rounded-xl p-6 text-center border border-border hover:shadow-lg transition-all hover:-translate-y-1"
                                    >
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30 bg-muted">
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-base font-bold text-foreground mb-1">
                                            {member.name}
                                        </h4>
                                        <p className="text-primary font-semibold text-sm mb-2">
                                            {member.position}
                                        </p>
                                        {member.description && (
                                            <p className="text-xs text-muted-foreground">
                                                {member.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}