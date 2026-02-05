import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteContent } from "../../../App";

interface ContactSectionProps {
    contact: SiteContent['contact']
}

export function ContactSection({ contact }: ContactSectionProps) {
    return (
        <>
            < section id="contact" className="py-30 bg-white" >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">
                            {contact.title}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="mb-2 text-foreground">Alamat</h4>
                                <p className="text-muted-foreground">{contact.address}</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
                                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Phone className="w-6 h-6 text-secondary" />
                                </div>
                                <h4 className="mb-2 text-foreground">Telepon</h4>
                                <p className="text-muted-foreground">{contact.phone}</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
                                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                                    <Mail className="w-6 h-6 text-accent-foreground" />
                                </div>
                                <h4 className="mb-2 text-foreground">Email</h4>
                                <p className="text-muted-foreground">{contact.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}