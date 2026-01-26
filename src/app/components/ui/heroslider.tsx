import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideImage {
    image: string;
    alt: string;
}

interface Slide {
    id: string;
    desktop: SlideImage;
    tablet: SlideImage;
    mobile: SlideImage;
}

interface HeroContent {
    title: string;
    subtitle: string;
    description: string;
    slides?: Slide[];
}

interface HeroSliderProps {
    content?: HeroContent;
}

export default function HeroSlider({ content }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

    // Default slides jika tidak ada
    const defaultSlides: Slide[] = [
        {
            id: '1',
            desktop: { image: 'https://picsum.photos/1920/1080?random=1', alt: 'Slide 1 Desktop' },
            tablet: { image: 'https://picsum.photos/1024/768?random=1', alt: 'Slide 1 Tablet' },
            mobile: { image: 'https://picsum.photos/768/1024?random=1', alt: 'Slide 1 Mobile' }
        },
        {
            id: '2',
            desktop: { image: 'https://picsum.photos/1920/1080?random=2', alt: 'Slide 2 Desktop' },
            tablet: { image: 'https://picsum.photos/1024/768?random=2', alt: 'Slide 2 Tablet' },
            mobile: { image: 'https://picsum.photos/768/1024?random=2', alt: 'Slide 2 Mobile' }
        },
        {
            id: '3',
            desktop: { image: 'https://picsum.photos/1920/1080?random=3', alt: 'Slide 3 Desktop' },
            tablet: { image: 'https://picsum.photos/1024/768?random=3', alt: 'Slide 3 Tablet' },
            mobile: { image: 'https://picsum.photos/768/1024?random=3', alt: 'Slide 3 Mobile' }
        }
    ];

    const defaultContent: HeroContent = {
        title: "Selamat Datang",
        subtitle: "Solusi Terbaik untuk Kebutuhan Anda",
        description: "Kami menyediakan layanan berkualitas tinggi dengan tim profesional yang siap membantu mewujudkan visi Anda menjadi kenyataan.",
        slides: defaultSlides
    };

    // Safe access to content and slides
    const heroContent = content || defaultContent;
    const slides = heroContent.slides && heroContent.slides.length > 0 ? heroContent.slides : defaultSlides;

    // Detect window resize for responsive images
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto slide setiap 5 detik
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Get appropriate image based on screen size
    const getResponsiveImage = (slide: Slide) => {
        if (!slide) return { image: '', alt: '' };

        if (windowWidth < 768) {
            return slide.mobile || slide.desktop;
        } else if (windowWidth < 1024) {
            return slide.tablet || slide.desktop;
        } else {
            return slide.desktop;
        }
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative py-16 md:py-0 overflow-hidden"
        >
            {/* Background Slider */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => {
                    const responsiveImage = getResponsiveImage(slide);

                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            {/* Use picture element for better responsive images */}
                            <picture className="w-full h-full">
                                <source
                                    media="(max-width: 767px)"
                                    srcSet={slide.mobile?.image || slide.desktop?.image}
                                />
                                <source
                                    media="(min-width: 768px) and (max-width: 1023px)"
                                    srcSet={slide.tablet?.image || slide.desktop?.image}
                                />
                                <source
                                    media="(min-width: 1024px)"
                                    srcSet={slide.desktop?.image}
                                />
                                <img
                                    src={responsiveImage.image}
                                    alt={responsiveImage.alt}
                                    className="w-full h-full object-cover"
                                />
                            </picture>
                        </div>
                    );
                })}
            </div>

            {/* Overlay gelap untuk readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-sm"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-sm"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === currentSlide
                            ? 'bg-white w-6 md:w-8'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 text-white font-bold leading-tight animate-fade-in">
                        {heroContent.title}
                    </h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 text-white/90 animate-fade-in-delay-1">
                        {heroContent.subtitle}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed px-4 md:px-0 animate-fade-in-delay-2">
                        {heroContent.description}
                    </p>
                    <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 md:px-0 animate-fade-in-delay-3">
                        <a
                            href="#about"
                            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Tentang Kami
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-delay-1 {
          animation: fadeIn 1s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.4s both;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 1s ease-out 0.6s both;
        }
      `}</style>
        </section>
    );
}