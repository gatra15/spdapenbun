import { Upload } from 'lucide-react';
import type { SiteContent } from '../../../App';
import { toast } from 'sonner';

interface AboutEditorProps {
    content: SiteContent['about'];
    onUpdate: (field: keyof SiteContent['about'], value: string) => void;
}

export function AboutEditor({ content, onUpdate }: AboutEditorProps) {
    const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      onUpdate('backgroundImage', imageUrl);
      toast.success('Background berhasil diupdate!');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl mb-6">Edit Tentang</h2>

      {/* Background Image Upload */}
      <div>
        <label className="block mb-2 text-foreground">Background Image</label>
        <div className="space-y-3">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
            <img
              src={content.backgroundImage}
              alt="Background Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="px-4 py-2 bg-white text-foreground rounded-lg cursor-pointer hover:bg-white/90">
                <Upload className="w-4 h-4 inline mr-2" />
                Ganti Background
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            💡 Rekomendasi: 1920 x 1080px, format JPG/PNG, maksimal 5MB
          </p>
        </div>
      </div>

      {/* Existing fields */}
      <div>
        <label className="block mb-2 text-foreground">Judul</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-2 text-foreground">Deskripsi</label>
        <textarea
          value={content.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-2 text-foreground">Visi</label>
        <textarea
          value={content.vision}
          onChange={(e) => onUpdate('vision', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-2 text-foreground">Misi</label>
        <textarea
          value={content.mission}
          onChange={(e) => onUpdate('mission', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}