import { useState, useMemo } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { Colors, FontSize, Spacing, Radius } from '../tokens';
import { getCalendarDays, toDateKey } from '../utils/dateUtils';
import PostDetailSheet from '../components/PostDetailSheet';
import type { Platform, Post } from '../types';

// ─── Platform config ──────────────────────────────────────────────────────────

const PLATFORM_CFG: Record<Platform, { color: string; Icon: React.ComponentType<{ size?: number; color?: string }> }> = {
  twitter:   { color: Colors.platformX,        Icon: FaXTwitter   },
  facebook:  { color: Colors.platformFacebook,  Icon: FaFacebook   },
  instagram: { color: Colors.platformInstagram, Icon: FaInstagram  },
  linkedin:  { color: Colors.platformLinkedIn,  Icon: FaLinkedinIn },
  youtube:   { color: Colors.platformYouTube,   Icon: FaYoutube    },
};

const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MAX_CHIPS_PER_CELL = 2;

// ─── Event chip (inside month day cell) ──────────────────────────────────────

function MonthChip({ post, onPress }: { post: Post; onPress: (p: Post) => void }) {
  const { color, Icon } = PLATFORM_CFG[post.platform];
  const time = dayjs(post.scheduledAt).format('h:mm');

  return (
    <button
      onClick={e => { e.stopPropagation(); onPress(post); }}
      style={{
        width: '100%', height: 16,
        border: 0, borderRadius: 3,
        background: `${color}18`,
        cursor: 'pointer', padding: '0 3px',
        display: 'flex', alignItems: 'center', gap: 2,
        overflow: 'hidden', textAlign: 'left',
        flexShrink: 0,
      }}
    >
      {/* Platform dot */}
      <div style={{ width: 5, height: 5, borderRadius: 3, background: color, flexShrink: 0 }} />
      <span style={{
        fontSize: 8, fontWeight: 500, color: Colors.textPrimary,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1,
      }}>
        {time}
      </span>
    </button>
  );
}

// ─── Month day cell ────────────────────────────────────────────────────────────

interface DayCellProps {
  dateKey: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  posts: Post[];
  isSelected: boolean;
  onSelectDate: (key: string) => void;
  onChipPress: (post: Post) => void;
}

function DayCell({ dateKey, day, isCurrentMonth, isToday, posts, isSelected, onSelectDate, onChipPress }: DayCellProps) {
  const visible  = posts.slice(0, MAX_CHIPS_PER_CELL);
  const overflow = posts.length - MAX_CHIPS_PER_CELL;

  return (
    <div
      onClick={() => { if (isCurrentMonth) onSelectDate(dateKey); }}
      style={{
        cursor: isCurrentMonth ? 'pointer' : 'default',
        borderTop: `1px solid ${Colors.divider}`,
        padding: '4px 2px 4px',
        display: 'flex', flexDirection: 'column', gap: 2,
        minHeight: 68,
        background: isSelected ? '#F0F7FF' : 'transparent',
      }}
    >
      {/* Date number */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 11,
          background: isSelected ? Colors.primary : isToday ? Colors.primary : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: FontSize.xs,
            fontWeight: isToday || isSelected ? 700 : 400,
            color: isSelected || isToday ? Colors.white : isCurrentMonth ? Colors.textPrimary : Colors.textSecondary,
          }}>
            {day}
          </span>
        </div>
      </div>

      {/* Event chips */}
      {visible.map(p => (
        <MonthChip key={p.id} post={p} onPress={onChipPress} />
      ))}

      {/* Overflow count */}
      {overflow > 0 && (
        <span style={{ fontSize: 8, color: Colors.textSecondary, paddingLeft: 3, fontWeight: 500 }}>
          +{overflow} more
        </span>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props { posts: Post[] }

export default function CalendarMonthView({ posts }: Props) {
  const now   = dayjs();
  const [year, setYear]     = useState(now.year());
  const [month, setMonth]   = useState(now.month());
  const [selectedKey, setSelectedKey] = useState(toDateKey(now.toISOString()));
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const postsByDay = useMemo(() => {
    const map = new Map<string, Post[]>();
    posts.forEach(p => {
      const k = toDateKey(p.scheduledAt);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(p);
    });
    // Sort each day's posts by scheduled time
    map.forEach((v, k) => map.set(k, v.sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))));
    return map;
  }, [posts]);

  const calDays    = useMemo(() => getCalendarDays(year, month), [year, month]);
  const monthLabel = dayjs().year(year).month(month).format('MMMM YYYY');

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: Colors.white }}>

      {/* ── Month navigation header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${Spacing.xs}px ${Spacing.sm}px`,
        background: Colors.white, borderBottom: `1px solid ${Colors.divider}`,
        flexShrink: 0,
      }}>
        <button
          onClick={prev} aria-label="Previous month"
          style={{ width: 36, height: 36, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <MdChevronLeft size={22} color={Colors.textPrimary} />
        </button>
        <span style={{ fontSize: FontSize.base, fontWeight: 600, color: Colors.textPrimary }}>{monthLabel}</span>
        <button
          onClick={next} aria-label="Next month"
          style={{ width: 36, height: 36, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <MdChevronRight size={22} color={Colors.textPrimary} />
        </button>
      </div>

      {/* ── Day-of-week headers ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: Colors.white }}>
        {DOW.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: FontSize.xs - 1, color: Colors.textSecondary, fontWeight: 600, padding: `${Spacing.xs}px 0`, letterSpacing: 0.3 }}>
            {d}
          </div>
        ))}
      </div>

      {/* ── Calendar day cells ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1 }}>
        {calDays.map(cell => (
          <DayCell
            key={cell.dateKey}
            dateKey={cell.dateKey}
            day={cell.day}
            isCurrentMonth={cell.isCurrentMonth}
            isToday={cell.isToday}
            posts={postsByDay.get(cell.dateKey) ?? []}
            isSelected={cell.dateKey === selectedKey}
            onSelectDate={setSelectedKey}
            onChipPress={setSelectedPost}
          />
        ))}
      </div>

      {/* ── Selected day summary strip (pinned at bottom) ── */}
      {selectedKey && (
        <div style={{
          borderTop: `1px solid ${Colors.divider}`,
          padding: `${Spacing.sm}px ${Spacing.base}px`,
          background: Colors.white, flexShrink: 0,
        }}>
          <span style={{ fontSize: FontSize.sm, fontWeight: 600, color: Colors.textPrimary }}>
            {dayjs(selectedKey).format('ddd, MMMM D')}
          </span>
          <span style={{ fontSize: FontSize.sm, color: Colors.textSecondary, marginLeft: Spacing.sm }}>
            {(postsByDay.get(selectedKey) ?? []).length} post{(postsByDay.get(selectedKey) ?? []).length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <PostDetailSheet post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
