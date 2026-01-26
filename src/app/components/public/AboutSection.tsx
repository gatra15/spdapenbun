import type { SiteContent } from "../../../App"

interface AboutSectionProps {
    about: SiteContent['about']
}

export function AboutSection({ about }: AboutSectionProps) {
    return (
        <>
            < section id="about" className="py-20 bg-white" >
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">
                            {about.title}
                        </h2>
                        <p className="text-lg text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
                            {about.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 bg-primary/5 rounded-xl border border-primary/10">
                                <h3 className="text-2xl mb-4 text-primary">Visi</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {about.vision}
                                </p>
                            </div>
                            <div className="p-8 bg-secondary/5 rounded-xl border border-secondary/10">
                                <h3 className="text-2xl mb-4 text-secondary">Misi</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {about.mission}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}