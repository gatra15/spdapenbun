import type { Book } from '../../../types/library';
import { COVER_COLORS } from '../../../types/library';

interface BookCoverProps {
    book: Book;
    size?: 'sm' | 'md' | 'lg';
}

export function BookCover({ book, size = 'md' }: BookCoverProps) {
    const colorIndex = parseInt(book.id, 36) % COVER_COLORS.length || 0;
    const color = COVER_COLORS[colorIndex % COVER_COLORS.length];

    const dims = {
        sm: { w: 60, h: 80, book: { w: 36, h: 48 }, icon: { w: 20, h: 28 } },
        md: { w: 100, h: 130, book: { w: 60, h: 80 }, icon: { w: 32, h: 44 } },
        lg: { w: 140, h: 180, book: { w: 90, h: 120 }, icon: { w: 48, h: 64 } },
    }[size];

    const bw = dims.book.w;
    const bh = dims.book.h;

    return (
        <div
            style={{
                width: dims.w,
                height: dims.h,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                background: color.bg + '33',
            }}
        >
            <svg width={bw} height={bh} viewBox={`0 0 ${bw} ${bh}`}>
                {/* Book body */}
                <rect x="2" y="2" width={bw - 4} height={bh - 4} rx="3" fill={color.bg} />
                {/* Spine */}
                <rect x="2" y="2" width="5" height={bh - 4} rx="2" fill={color.accent} opacity="0.4" />
                {/* Title lines */}
                <rect x="10" y={Math.round(bh * 0.2)} width={Math.round(bw * 0.5)} height="2.5" rx="1" fill={color.accent} />
                <rect x="10" y={Math.round(bh * 0.32)} width={Math.round(bw * 0.7)} height="1.5" rx="1" fill={color.accent} opacity="0.5" />
                <rect x="10" y={Math.round(bh * 0.40)} width={Math.round(bw * 0.6)} height="1.5" rx="1" fill={color.accent} opacity="0.5" />
                <rect x="10" y={Math.round(bh * 0.48)} width={Math.round(bw * 0.65)} height="1.5" rx="1" fill={color.accent} opacity="0.4" />
            </svg>
        </div>
    );
}