import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Save, X, FolderPlus, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import type { BoardMember, SiteContent, BoardSection } from '../../../App';

interface BoardEditorProps {
    board: SiteContent['board'];
    onUpdate: (board: SiteContent['board']) => void;
}

type EditMode = 'none' | 'section' | 'member';

export function BoardEditor({ board, onUpdate }: BoardEditorProps) {
    const [editMode, setEditMode] = useState<EditMode>('none');
    const [editingSection, setEditingSection] = useState<BoardSection | null>(null);
    const [editingMember, setEditingMember] = useState<{ member: BoardMember; sectionId: string } | null>(null);
    const [isCreatingSection, setIsCreatingSection] = useState(false);
    const [isCreatingMember, setIsCreatingMember] = useState<string | null>(null);

    const emptySection: Omit<BoardSection, 'id'> = {
        title: '',
        order: board.sections.length + 1,
        members: []
    };

    const emptyMember: Omit<BoardMember, 'id'> = {
        name: '',
        position: '',
        photo: 'https://ui-avatars.com/api/?name=New+Member&size=400&background=random',
        description: ''
    };

    // Section Operations
    const handleCreateSection = () => {
        setEditingSection({ ...emptySection, id: 'new' } as BoardSection);
        setIsCreatingSection(true);
        setEditMode('section');
    };

    const handleEditSection = (section: BoardSection) => {
        setEditingSection(section);
        setIsCreatingSection(false);
        setEditMode('section');
    };

    const handleSaveSection = () => {
        if (!editingSection) return;

        if (!editingSection.title.trim()) {
            toast.error('Nama section wajib diisi!');
            return;
        }

        const updatedBoard = { ...board };

        if (isCreatingSection) {
            const newSection: BoardSection = {
                ...editingSection,
                id: Date.now().toString(),
            };
            updatedBoard.sections = [...updatedBoard.sections, newSection];
            toast.success('Section berhasil ditambahkan!');
        } else {
            const index = updatedBoard.sections.findIndex(s => s.id === editingSection.id);
            if (index !== -1) {
                updatedBoard.sections[index] = editingSection;
                toast.success('Section berhasil diupdate!');
            }
        }

        onUpdate(updatedBoard);
        setEditingSection(null);
        setIsCreatingSection(false);
        setEditMode('none');
    };

    const handleDeleteSection = (sectionId: string) => {
        const section = board.sections.find(s => s.id === sectionId);
        if (!section) return;

        if (section.members.length > 0) {
            if (!confirm(`Section "${section.title}" memiliki ${section.members.length} anggota. Yakin ingin menghapus?`)) {
                return;
            }
        } else {
            if (!confirm(`Yakin ingin menghapus section "${section.title}"?`)) {
                return;
            }
        }

        const updatedBoard = { ...board };
        updatedBoard.sections = updatedBoard.sections.filter(s => s.id !== sectionId);
        onUpdate(updatedBoard);
        toast.success('Section berhasil dihapus!');
    };

    const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
        const currentIndex = board.sections.findIndex(s => s.id === sectionId);
        if (currentIndex === -1) return;

        if (direction === 'up' && currentIndex === 0) return;
        if (direction === 'down' && currentIndex === board.sections.length - 1) return;

        const updatedSections = [...board.sections];
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        [updatedSections[currentIndex], updatedSections[targetIndex]] =
            [updatedSections[targetIndex], updatedSections[currentIndex]];

        // Update order
        updatedSections.forEach((section, index) => {
            section.order = index + 1;
        });

        onUpdate({ ...board, sections: updatedSections });
        toast.success('Urutan section berhasil diubah!');
    };

    // Member Operations
    const handleCreateMember = (sectionId: string) => {
        setEditingMember({
            member: { ...emptyMember, id: 'new' } as BoardMember,
            sectionId
        });
        setIsCreatingMember(sectionId);
        setEditMode('member');
    };

    const handleEditMember = (member: BoardMember, sectionId: string) => {
        setEditingMember({ member, sectionId });
        setIsCreatingMember(null);
        setEditMode('member');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('File harus berupa gambar!');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Ukuran file maksimal 2MB!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result as string;
            if (editingMember) {
                setEditingMember({
                    ...editingMember,
                    member: { ...editingMember.member, photo: imageUrl }
                });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSaveMember = () => {
        if (!editingMember) return;

        const { member, sectionId } = editingMember;

        if (!member.name || !member.position) {
            toast.error('Nama dan jabatan wajib diisi!');
            return;
        }

        const updatedBoard = { ...board };
        const sectionIndex = updatedBoard.sections.findIndex(s => s.id === sectionId);

        if (sectionIndex === -1) return;

        if (isCreatingMember) {
            const newMember = { ...member, id: Date.now().toString() };
            updatedBoard.sections[sectionIndex].members = [
                ...updatedBoard.sections[sectionIndex].members,
                newMember
            ];
            toast.success('Pengurus berhasil ditambahkan!');
        } else {
            const memberIndex = updatedBoard.sections[sectionIndex].members.findIndex(m => m.id === member.id);
            if (memberIndex !== -1) {
                updatedBoard.sections[sectionIndex].members[memberIndex] = member;
                toast.success('Pengurus berhasil diupdate!');
            }
        }

        onUpdate(updatedBoard);
        setEditingMember(null);
        setIsCreatingMember(null);
        setEditMode('none');
    };

    const handleDeleteMember = (sectionId: string, memberId: string) => {
        if (!confirm('Yakin ingin menghapus pengurus ini?')) return;

        const updatedBoard = { ...board };
        const sectionIndex = updatedBoard.sections.findIndex(s => s.id === sectionId);

        if (sectionIndex !== -1) {
            updatedBoard.sections[sectionIndex].members =
                updatedBoard.sections[sectionIndex].members.filter(m => m.id !== memberId);
            onUpdate(updatedBoard);
            toast.success('Pengurus berhasil dihapus!');
        }
    };

    const handleCancel = () => {
        setEditingSection(null);
        setEditingMember(null);
        setIsCreatingSection(false);
        setIsCreatingMember(null);
        setEditMode('none');
    };

    // Edit Section Form
    if (editMode === 'section' && editingSection) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl">
                        {isCreatingSection ? 'Tambah Section Baru' : 'Edit Section'}
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveSection}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                        >
                            <Save className="w-4 h-4" />
                            Simpan
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/70"
                        >
                            <X className="w-4 h-4" />
                            Batal
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 text-foreground">Nama Section *</label>
                        <input
                            type="text"
                            value={editingSection.title}
                            onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Contoh: Majelis Pertimbangan Organisasi (MPO)"
                        />
                    </div>

                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                        <p className="text-sm text-foreground">
                            💡 <strong>Tips:</strong> Setelah section dibuat, Anda bisa menambahkan anggota pengurus ke section ini.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Edit Member Form
    if (editMode === 'member' && editingMember) {
        const section = board.sections.find(s => s.id === editingMember.sectionId);
        const { member } = editingMember;

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl">
                        {isCreatingMember ? `Tambah Pengurus - ${section?.title}` : `Edit Pengurus - ${section?.title}`}
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveMember}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                        >
                            <Save className="w-4 h-4" />
                            Simpan
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/70"
                        >
                            <X className="w-4 h-4" />
                            Batal
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Photo Upload */}
                    <div>
                        <label className="block mb-2 text-foreground">Foto Pengurus</label>
                        <div className="flex items-center gap-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border bg-muted">
                                <img
                                    src={member.photo}
                                    alt={member.name || 'Preview'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <label className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg cursor-pointer hover:opacity-90 inline-flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Upload Foto
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Rekomendasi: Foto persegi (1:1), maksimal 2MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-foreground">Nama Lengkap *</label>
                        <input
                            type="text"
                            value={member.name}
                            onChange={(e) => setEditingMember({
                                ...editingMember,
                                member: { ...member, name: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Contoh: Dr. Ahmad Suryanto, S.H., M.H."
                        />
                    </div>

                    {/* Position */}
                    <div>
                        <label className="block mb-2 text-foreground">Jabatan *</label>
                        <input
                            type="text"
                            value={member.position}
                            onChange={(e) => setEditingMember({
                                ...editingMember,
                                member: { ...member, position: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Contoh: Ketua MPO"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 text-foreground">Deskripsi (Opsional)</label>
                        <textarea
                            value={member.description || ''}
                            onChange={(e) => setEditingMember({
                                ...editingMember,
                                member: { ...member, description: e.target.value }
                            })}
                            rows={3}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Pengalaman atau keahlian..."
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Main View - List Sections
    return (
        <div className="space-y-8">
            <h2 className="text-2xl mb-6">Edit Struktur Pengurus</h2>

            {/* Global Settings */}
            <div className="space-y-4 pb-6 border-b border-border">
                <div>
                    <label className="block mb-2 text-foreground">Judul Halaman</label>
                    <input
                        type="text"
                        value={board.title}
                        onChange={(e) => onUpdate({ ...board, title: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-foreground">Deskripsi</label>
                    <input
                        type="text"
                        value={board.description}
                        onChange={(e) => onUpdate({ ...board, description: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Add Section Button */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Sections ({board.sections.length})</h3>
                <button
                    onClick={handleCreateSection}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                >
                    <FolderPlus className="w-4 h-4" />
                    Tambah Section
                </button>
            </div>

            {/* Sections List */}
            {board.sections.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <FolderPlus className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mb-4">Belum ada section</p>
                    <button
                        onClick={handleCreateSection}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                    >
                        Tambah Section Pertama
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {board.sections.map((section, index) => (
                        <div key={section.id} className="border border-border rounded-xl p-6 bg-white">
                            {/* Section Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="flex flex-col gap-1 mt-1">
                                        <button
                                            onClick={() => handleMoveSection(section.id, 'up')}
                                            disabled={index === 0}
                                            className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Pindah ke atas"
                                        >
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleMoveSection(section.id, 'down')}
                                            disabled={index === board.sections.length - 1}
                                            className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Pindah ke bawah"
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-1">
                                            {section.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {section.members.length} anggota
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditSection(section)}
                                        className="px-3 py-2 text-sm bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20"
                                    >
                                        <Edit className="w-4 h-4 inline mr-1" />
                                        Edit Section
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSection(section.id)}
                                        className="px-3 py-2 text-sm bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20"
                                    >
                                        <Trash2 className="w-4 h-4 inline mr-1" />
                                        Hapus
                                    </button>
                                </div>
                            </div>

                            {/* Add Member Button */}
                            <div className="mb-4">
                                <button
                                    onClick={() => handleCreateMember(section.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambah Anggota
                                </button>
                            </div>

                            {/* Members Grid */}
                            {section.members.length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-border rounded-lg bg-muted/20">
                                    <p className="text-sm text-muted-foreground">Belum ada anggota di section ini</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {section.members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="p-4 border border-border rounded-lg bg-muted/20 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 bg-white mb-3">
                                                    <img
                                                        src={member.photo}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <h4 className="font-semibold text-foreground text-sm mb-1">
                                                    {member.name}
                                                </h4>
                                                <p className="text-xs text-primary mb-2">{member.position}</p>
                                                {member.description && (
                                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                                        {member.description}
                                                    </p>
                                                )}
                                                <div className="flex gap-2 w-full">
                                                    <button
                                                        onClick={() => handleEditMember(member, section.id)}
                                                        className="flex-1 px-3 py-1.5 text-xs bg-secondary/10 text-secondary rounded hover:bg-secondary/20"
                                                    >
                                                        <Edit className="w-3 h-3 inline mr-1" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteMember(section.id, member.id)}
                                                        className="flex-1 px-3 py-1.5 text-xs bg-destructive/10 text-destructive rounded hover:bg-destructive/20"
                                                    >
                                                        <Trash2 className="w-3 h-3 inline" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}