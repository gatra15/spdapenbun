import { useState } from 'react';
import { Upload, Trash2, Image as ImageIcon, Plus, Monitor, Tablet, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

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

interface SliderEditorProps {
    slides?: Slide[];
    onUpdateSlides: (slides: Slide[]) => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export function SliderEditor({ slides = [], onUpdateSlides }: SliderEditorProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');

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

    const currentSlides = slides && slides.length > 0 ? slides : defaultSlides;

    const getDeviceInfo = (device: DeviceType) => {
        switch (device) {
            case 'desktop':
                return { icon: Monitor, label: 'Desktop', size: '1920 x 1080px', aspect: 'aspect-video' };
            case 'tablet':
                return { icon: Tablet, label: 'Tablet', size: '1024 x 768px', aspect: 'aspect-[4/3]' };
            case 'mobile':
                return { icon: Smartphone, label: 'Mobile', size: '768 x 1024px', aspect: 'aspect-[3/4]' };
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, slideId?: string, device?: DeviceType) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('File harus berupa gambar!');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Ukuran file maksimal 5MB!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result as string;

            if (slideId && device) {
                // Update existing slide for specific device
                const updatedSlides = currentSlides.map(slide =>
                    slide.id === slideId
                        ? { ...slide, [device]: { ...slide[device], image: imageUrl } }
                        : slide
                );
                onUpdateSlides(updatedSlides);
                toast.success(`Gambar ${getDeviceInfo(device).label} berhasil diupdate!`);
            } else {
                // Add new slide with same image for all devices
                const newSlide: Slide = {
                    id: `slide-${Date.now()}`,
                    desktop: { image: imageUrl, alt: `Slide ${currentSlides.length + 1} Desktop` },
                    tablet: { image: imageUrl, alt: `Slide ${currentSlides.length + 1} Tablet` },
                    mobile: { image: imageUrl, alt: `Slide ${currentSlides.length + 1} Mobile` }
                };
                onUpdateSlides([...currentSlides, newSlide]);
                toast.success('Slide baru berhasil ditambahkan!');
            }
        };

        reader.readAsDataURL(file);
    };

    const handleDeleteSlide = (slideId: string) => {
        if (currentSlides.length <= 1) {
            toast.error('Minimal harus ada 1 slide!');
            return;
        }

        if (confirm('Yakin ingin menghapus slide ini?')) {
            const updatedSlides = currentSlides.filter(slide => slide.id !== slideId);
            onUpdateSlides(updatedSlides);
            toast.success('Slide berhasil dihapus!');
        }
    };

    const handleUpdateAlt = (slideId: string, device: DeviceType, alt: string) => {
        const updatedSlides = currentSlides.map(slide =>
            slide.id === slideId
                ? { ...slide, [device]: { ...slide[device], alt } }
                : slide
        );
        onUpdateSlides(updatedSlides);
    };

    const copyImageToAllDevices = (slideId: string, sourceDevice: DeviceType) => {
        const slide = currentSlides.find(s => s.id === slideId);
        if (!slide) return;

        const sourceImage = slide[sourceDevice].image;

        const updatedSlides = currentSlides.map(s =>
            s.id === slideId
                ? {
                    ...s,
                    desktop: { ...s.desktop, image: sourceImage },
                    tablet: { ...s.tablet, image: sourceImage },
                    mobile: { ...s.mobile, image: sourceImage }
                }
                : s
        );

        onUpdateSlides(updatedSlides);
        toast.success('Gambar berhasil disalin ke semua ukuran!');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-lg font-semibold text-foreground">Kelola Gambar Slider</h3>
                <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                    <Plus className="w-4 h-4" />
                    <span>Tambah Slide</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Device Selector */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
                {(['desktop', 'tablet', 'mobile'] as DeviceType[]).map((device) => {
                    const info = getDeviceInfo(device);
                    const Icon = info.icon;
                    return (
                        <button
                            key={device}
                            onClick={() => setActiveDevice(device)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md transition-all ${activeDevice === device
                                ? 'bg-white text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm font-medium">{info.label}</span>
                            <span className="sm:hidden text-sm font-medium">{device === 'desktop' ? 'PC' : device === 'tablet' ? 'Tab' : 'HP'}</span>
                        </button>
                    );
                })}
            </div>

            {/* Info Banner */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    📱 <strong>Ukuran Rekomendasi ({getDeviceInfo(activeDevice).label}):</strong> {getDeviceInfo(activeDevice).size}
                </p>
            </div>

            {!currentSlides || currentSlides.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mb-4">Belum ada slide</p>
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <span>Tambah Slide Pertama</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="hidden"
                        />
                    </label>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {currentSlides.map((slide, index) => {
                        const deviceInfo = getDeviceInfo(activeDevice);
                        const currentImage = slide[activeDevice];

                        return (
                            <div key={slide.id} className="border border-border rounded-lg p-4 bg-muted/20">
                                {/* Preview Image */}
                                <div className={`relative ${deviceInfo.aspect} mb-3 bg-muted rounded-lg overflow-hidden group`}>
                                    {currentImage.image ? (
                                        <img
                                            src={currentImage.image}
                                            alt={currentImage.alt}
                                            className="w-full h-full object-cover"
                                            onMouseEnter={() => setPreviewUrl(currentImage.image)}
                                            onMouseLeave={() => setPreviewUrl(null)}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                                        </div>
                                    )}

                                    {/* Overlay buttons */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <label className="px-3 py-2 bg-white text-foreground rounded-lg hover:bg-white/90 transition-colors cursor-pointer text-sm">
                                            <Upload className="w-4 h-4 inline mr-1" />
                                            Ganti
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, slide.id, activeDevice)}
                                                className="hidden"
                                            />
                                        </label>
                                        {index === 0 && (
                                            <button
                                                onClick={() => handleDeleteSlide(slide.id)}
                                                className="px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm"
                                                disabled={currentSlides.length === 1}
                                            >
                                                <Trash2 className="w-4 h-4 inline mr-1" />
                                                Hapus
                                            </button>
                                        )}
                                    </div>

                                    {/* Device Badge */}
                                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded backdrop-blur-sm">
                                        {deviceInfo.label}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">Slide {index + 1}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {currentImage.image.startsWith('data:') ? 'Custom' : 'Default'}
                                        </span>
                                    </div>

                                    {/* Alt Text Input */}
                                    <div>
                                        <label className="block text-xs mb-1 text-muted-foreground">
                                            Teks Alt - {deviceInfo.label} (SEO)
                                        </label>
                                        <input
                                            type="text"
                                            value={currentImage.alt}
                                            onChange={(e) => handleUpdateAlt(slide.id, activeDevice, e.target.value)}
                                            placeholder="Deskripsi gambar..."
                                            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    {/* Copy to All Devices Button */}
                                    <button
                                        onClick={() => copyImageToAllDevices(slide.id, activeDevice)}
                                        className="w-full px-3 py-2 text-xs bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg transition-colors"
                                    >
                                        📋 Salin gambar ini ke semua ukuran
                                    </button>

                                    {/* Delete Button (mobile friendly) */}
                                    {currentSlides.length > 1 && (
                                        <button
                                            onClick={() => handleDeleteSlide(slide.id)}
                                            className="w-full px-3 py-2 text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            Hapus Slide
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Info box */}
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-sm text-foreground mb-2">
                    💡 <strong>Tips:</strong>
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• <strong>Desktop:</strong> 1920 x 1080px (16:9 landscape)</li>
                    <li>• <strong>Tablet:</strong> 1024 x 768px (4:3 landscape)</li>
                    <li>• <strong>Mobile:</strong> 768 x 1024px (3:4 portrait)</li>
                    <li>• Format: JPG, PNG, atau WebP</li>
                    <li>• Ukuran file maksimal: <strong>5MB</strong></li>
                    <li>• Gunakan tombol "Salin" untuk menggunakan gambar yang sama di semua ukuran</li>
                </ul>
            </div>

            {/* Preview Modal */}
            {previewUrl && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setPreviewUrl(null)}
                >
                    <div className="relative max-w-6xl w-full">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-full max-h-[90vh] object-contain mx-auto"
                        />
                        <button
                            onClick={() => setPreviewUrl(null)}
                            className="absolute top-4 right-4 px-4 py-2 bg-white text-foreground rounded-lg"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}