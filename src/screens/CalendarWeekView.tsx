import { useState, useMemo, useRef, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { Colors, FontSize, Spacing, Radius } from '../tokens';
import { toDateKey } from '../utils/dateUtils';
import PostDetailSheet from '../components/PostDetailSheet';
import type { Platform, Post } from '../types';

// ─── Constants ────────────────────────────────────────────────────────────────

const HOUR_H    = 56;  // px per hour row
const TIME_W    = 40;  // px for the time-label column
const MIN_CHIP  = 22;  // minimum chip height in px

const PLATFORM_CFG: Record<Platform, { color: string; Icon: React.ComponentType<{ size?: number; color?: string }> }> = {
  twitter:   { color: Colors.platformX,        Icon: FaXTwitter   },
  facebook:  { color: Colors.platformFacebook,  Icon: FaFacebook   },
  instagram: { color: Colors.platformInstagram, Icon: FaInstagram  },
  linkedin:  { color: Colors.platformLinkedIn,  Icon: FaLinkedinIn },
  youtube:   { color: Colors.platformYouTube,   Icon: FaYoutube    },
};

function hourLabel(h: number): string {
  if (h === 0)  return '12 AM';
  if (h < 12)   return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function minuteOffset(iso: string): number {
  const d = dayjs(iso);
  return (d.hour() + d.minute() / 60) * HOUR_H;
}

// ─── Event chip (shown inside the hour grid) ──────────────────────────────────

function EventChip({ post, onPress }: { post: Post; onPress: (p: Post) => void }) {
  const { color, Icon } = PLATFORM_CFG[post.platform];
  const time = dayjs(post.scheduledAt).format('h:mm');

  return (
    <button
      onClick={e => { e.stopPropagation(); onPress(post); }}
      style={{
        width: '100%', minHeight: MIN_CHIP,
        border: 0,
        borderLeft: `3px solid ${color}`,
        borderRadius: `0 ${Radius.sm}px ${Radius.sm}px 0`,
        background: `${color}20`,
        cursor: 'pointer', padding: '3px 4px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', overflow: 'hidden', textAlign: 'left',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <Icon size={9} color={color} style={{ flexShrink: 0 }} />
        <span style={{
          fontSize: 9, fontWeight: 600, color,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {time}
        </span>
      </div>
      <span style={{
        fontSize: 9, color: Colors.textPrimary, lineHeight: 1.3,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        width: '100%', display: 'block',
      }}>
        {post.content}
      </span>
    </button>
  );
}

// ─── Single day column (absolute-positioned chips) ────────────────────────────

function DayColumn({ posts, onPostPress }: { posts: Post[]; onPostPress: (p: Post) => void }) {
  const sorted = useMemo(
    () => [...posts].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt)),
    [posts],
  );

  return (
    <div style={{ position: 'relative', height: 24 * HOUR_H, flex: 1, minWidth: 0 }}>
      {sorted.map((post, idx) => {
        const top = minuteOffset(post.scheduledAt);
        // Stack chips that overlap vertically
        const stackOffset = sorted
          .slice(0, idx)
          .filter(p => Math.abs(minuteOffset(p.scheduledAt) - top) < MIN_CHIP)
          .length;
        return (
          <div
            key={post.id}
            style={{
              position: 'absolute',
              top: top + stackOffset * (MIN_CHIP + 1),
              left: 1, right: 1,
              zIndex: 1,
            }}
          >
            <EventChip post={post} onPress={onPostPress} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Current-time red line ────────────────────────────────────────────────────

function NowLine({ todayColumnIndex, totalColumns }: { todayColumnIndex: number; totalColumns: number }) {
  if (todayColumnIndex < 0) return null;
  const now = dayjs();
  const top = minuteOffset(now.toISOString());
  const leftPct = (todayColumnIndex / totalColumns) * 100;
  const widthPct = (1 / totalColumns) * 100;

  return (
    <div style={{
      position: 'absolute',
      top, left: `calc(${leftPct}% + 1px)`,
      width: `calc(${widthPct}% - 2px)`,
      height: 2, background: '#EA4335', zIndex: 3, pointerEvents: 'none',
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: 4, background: '#EA4335',
        position: 'absolute', left: -4, top: -3,
      }} />
    </div>
  );
}

// ─── Full time grid ───────────────────────────────────────────────────────────

interface TimeGridProps {
  weekDays: dayjs.Dayjs[];
  postsByDay: Map<string, Post[]>;
  onPostPress: (p: Post) => void;
}

function TimeGrid({ weekDays, postsByDay, onPostPress }: TimeGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to 7 AM on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 7 * HOUR_H - 16;
    }
  }, []);

  const today = dayjs();
  const todayIndex = weekDays.findIndex(d => d.isSame(today, 'day'));

  return (
    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
      <div style={{ display: 'flex', minHeight: 24 * HOUR_H, position: 'relative' }}>

        {/* Time-label column */}
        <div style={{ width: TIME_W, flexShrink: 0, position: 'relative' }}>
          {Array.from({ length: 24 }, (_, h) => (
            <div
              key={h}
              style={{
                position: 'absolute',
                top: h * HOUR_H - 7,
                right: 6,
                fontSize: 9,
                color: Colors.textSecondary,
                textAlign: 'right',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {hourLabel(h)}
            </div>
          ))}
        </div>

        {/* Grid: hour lines + 7 day columns */}
        <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
          {/* Hour lines (full-width background lines) */}
          {Array.from({ length: 24 }, (_, h) => (
            <div
              key={h}
              style={{
                position: 'absolute',
                top: h * HOUR_H,
                left: 0, right: 0, height: 1,
                background: Colors.divider,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Half-hour dashed lines */}
          {Array.from({ length: 24 }, (_, h) => (
            <div
              key={`half-${h}`}
              style={{
                position: 'absolute',
                top: h * HOUR_H + HOUR_H / 2,
                left: 0, right: 0, height: 1,
                borderTop: `1px dashed ${Colors.divider}`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Current time indicator */}
          <NowLine todayColumnIndex={todayIndex} totalColumns={7} />

          {/* Day columns */}
          {weekDays.map((day, colIdx) => {
            const dateKey = toDateKey(day.toISOString());
            const dayPosts = postsByDay.get(dateKey) ?? [];
            const isToday = day.isSame(today, 'day');
            return (
              <div
                key={dateKey}
                style={{
                  flex: 1, position: 'relative', minWidth: 0,
                  borderLeft: `1px solid ${Colors.divider}`,
                  background: isToday ? '#FAFCFF' : 'transparent',
                }}
              >
                <DayColumn posts={dayPosts} onPostPress={onPostPress} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Week-strip day header ────────────────────────────────────────────────────

function DayHeader({ day, isSelected, isToday, postCount, onClick }: {
  day: dayjs.Dayjs;
  isSelected: boolean;
  isToday: boolean;
  postCount: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, border: 0, background: 'transparent', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: `${Spacing.xs}px 2px ${Spacing.sm}px`,
        gap: 2,
      }}
    >
      {/* Day name abbreviation */}
      <span style={{
        fontSize: FontSize.xs - 1,
        fontWeight: 600,
        color: isSelected ? Colors.primary : Colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
      }}>
        {day.format('dd')[0]}
      </span>

      {/* Date circle */}
      <div style={{
        width: 30, height: 30, borderRadius: 15,
        background: isSelected ? Colors.primary : isToday ? Colors.primaryLight : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontSize: FontSize.sm,
          fontWeight: isSelected || isToday ? 700 : 400,
          color: isSelected ? Colors.white : isToday ? Colors.primary : Colors.textPrimary,
        }}>
          {day.date()}
        </span>
      </div>

      {/* Post count dot indicator */}
      {postCount > 0 && (
        <div style={{
          width: 4, height: 4, borderRadius: 2,
          background: isSelected ? Colors.primary : Colors.textSecondary,
        }} />
      )}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props { posts: Post[] }

export default function CalendarWeekView({ posts }: Props) {
  const today     = dayjs();
  const [weekStart, setWeekStart] = useState(today.startOf('week'));
  const [selectedKey, setSelectedKey] = useState(toDateKey(today.toISOString()));
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const postsByDay = useMemo(() => {
    const map = new Map<string, Post[]>();
    posts.forEach(p => {
      const k = toDateKey(p.scheduledAt);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(p);
    });
    return map;
  }, [posts]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day')),
    [weekStart],
  );

  const weekEnd   = weekStart.add(6, 'day');
  const weekLabel = weekStart.month() === weekEnd.month()
    ? `${weekStart.format('MMM D')} – ${weekEnd.format('D, YYYY')}`
    : `${weekStart.format('MMM D')} – ${weekEnd.format('MMM D, YYYY')}`;

  const moveWeek = (dir: 1 | -1) => {
    const next = weekStart.add(dir, 'week');
    setWeekStart(next);
    // Keep the same day-of-week selected in the new week
    const dayOfWeek = dayjs(selectedKey).day();
    setSelectedKey(next.add(dayOfWeek, 'day').format('YYYY-MM-DD'));
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: Colors.white }}>

      {/* ── Week navigation header ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: `${Spacing.xs}px ${Spacing.sm}px`,
        background: Colors.white, borderBottom: `1px solid ${Colors.divider}`,
        flexShrink: 0,
      }}>
        <button
          onClick={() => moveWeek(-1)} aria-label="Previous week"
          style={{ width: 36, height: 36, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <MdChevronLeft size={22} color={Colors.textPrimary} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', fontSize: FontSize.sm, fontWeight: 600, color: Colors.textPrimary }}>
          {weekLabel}
        </span>
        <button
          onClick={() => moveWeek(1)} aria-label="Next week"
          style={{ width: 36, height: 36, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <MdChevronRight size={22} color={Colors.textPrimary} />
        </button>
      </div>

      {/* ── Day-of-week strip ── */}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        background: Colors.white, borderBottom: `1px solid ${Colors.divider}`,
        flexShrink: 0,
        paddingLeft: TIME_W,
      }}>
        {weekDays.map(day => {
          const key = toDateKey(day.toISOString());
          return (
            <DayHeader
              key={key}
              day={day}
              isSelected={key === selectedKey}
              isToday={day.isSame(today, 'day')}
              postCount={(postsByDay.get(key) ?? []).length}
              onClick={() => setSelectedKey(key)}
            />
          );
        })}
      </div>

      {/* ── Scrollable time grid ── */}
      <TimeGrid
        weekDays={weekDays}
        postsByDay={postsByDay}
        onPostPress={setSelectedPost}
      />

      <PostDetailSheet post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
