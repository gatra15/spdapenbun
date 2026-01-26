import { Shield, Target, Users } from "lucide-react";
import type { SiteContent } from "../../../App";

interface ServiceSectionProps {
    services: SiteContent['services']
}

export function ServiceSection({ services }: ServiceSectionProps) {
    const iconMap: Record<string, any> = {
        Shield,
        Users,
        Target,
    };

    return (
        <>
            < section id="services" className="py-20 bg-muted/30" >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">
                            {services.title}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {services.items.map((service) => {
                                const IconComponent = iconMap[service.icon] || Shield;
                                return (
                                    <div
                                        key={service.id}
                                        className="p-8 bg-white rounded-xl border border-border hover:shadow-lg transition-shadow"
                                    >
                                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                            <IconComponent className="w-7 h-7 text-primary" />
                                        </div>
                                        <h3 className="text-xl mb-4 text-foreground">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}