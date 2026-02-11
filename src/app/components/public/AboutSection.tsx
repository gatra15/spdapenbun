import { ArrowRight, Users } from "lucide-react";
import type { SiteContent } from "../../../App"

interface AboutSectionProps {
  about: SiteContent['about']
  onViewChange: (view: 'home' | 'news' | 'board') => void
}

export function AboutSection({ about, onViewChange }: AboutSectionProps) {
  return (
    <>
      <section
        id="about"
        className="py-30 relative overflow-hidden"
      >
        {/* Background Image dengan Overlay */}
        <div className="absolute inset-0">
          <img
            src={about.backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 from-primary/95 via-primary/90 to-secondary/85"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {about.title}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                {about.description}
              </p>
            </div>

            {/* Visi Misi Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Visi */}
              <div className="bg-white/10 rounded-xl p-8 border border-white/20">
                {/* <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div> */}
                <h3 className="text-2xl font-bold text-white mb-4 text-justify">Visi</h3>
                <p className="text-white/90 leading-relaxed">
                  {about.vision}
                </p>
              </div>

              {/* Misi */}
              <div className="bg-white/10 rounded-xl p-8 border border-white/20">
                {/* <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div> */}
                <h3 className="text-2xl font-bold text-white mb-4">Misi</h3>
                <p className="text-white/90 leading-relaxed text-justify">
                  {about.mission}
                </p>
              </div>
            </div>

            {/* Call to Action - Lihat Pengurus */}
            <div className="text-center">
              <div className="inline-block bg-white/10 rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Kenali Tim Kami
                </h3>
                <p className="text-white/80 mb-6">
                  Dipimpin oleh pengurus yang berpengalaman dan berdedikasi untuk kesejahteraan anggota
                </p>
                <a
                  href="#board"
                  onClick={(() => onViewChange('board'))}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
                >
                  <Users className="w-5 h-5" />
                  Lihat Struktur Pengurus
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}