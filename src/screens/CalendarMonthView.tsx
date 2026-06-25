import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdCalendarToday, MdExpandLess, MdExpandMore } from 'react-icons/md';
import dayjs from 'dayjs';
import { Colors, FontSize, Spacing, Radius } from '../tokens';
import { getCalendarDays, toDateKey } from '../utils/dateUtils';
import PostCard from '../components/PostCard';
import PostDetailSheet from '../components/PostDetailSheet';
import EmptyState from '../components/EmptyState';
import type { Post } from '../types';

const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const ROW_H = 46; // px — height of each week row in the grid

// ─── Single blue dot — indicates day has posts ────────────────────────────────

function DayDot({ hasPosts }: { hasPosts: boolean }) {
  if (!hasPosts) return <div style={{ height: 8 }} />;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 8 }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: Colors.primary }} />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props { posts: Post[] }

export default function CalendarMonthView({ posts }: Props) {
  const now = dayjs();
  const [year, setYear]           = useState(now.year());
  const [month, setMonth]         = useState(now.month());
  const [selectedKey, setSelectedKey] = useState(toDateKey(now.toISOString()));
  const [collapsed, setCollapsed] = useState(false);
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

  const calDays = useMemo(() => getCalendarDays(year, month), [year, month]);

  // Split flat calDays array into week rows
  const weeks = useMemo(() => {
    const w: (typeof calDays)[] = [];
    for (let i = 0; i < calDays.length; i += 7) w.push(calDays.slice(i, i + 7));
    return w;
  }, [calDays]);

  // Which week row contains the selected date (for collapsed translate)
  const selectedWeekIndex = useMemo(
    () => Math.max(0, weeks.findIndex(wk => wk.some(d => d.dateKey === selectedKey))),
    [weeks, selectedKey],
  );

  const weekScrollRef = useRef<HTMLDivElement>(null);

  // When collapsing, scroll the horizontal strip to the selected week
  useEffect(() => {
    if (collapsed && weekScrollRef.current) {
      const el = weekScrollRef.current;
      el.scrollTo({ left: selectedWeekIndex * el.offsetWidth, behavior: 'smooth' });
    }
  }, [collapsed, selectedWeekIndex]);

  const selectedPosts    = postsByDay.get(selectedKey) ?? [];
  const monthLabel       = dayjs().year(year).month(month).format('MMMM YYYY');
  const selectedDateLabel = dayjs(selectedKey).format('dddd, MMMM D');

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  // Auto-collapse when user scrolls the post list; re-expand on scroll-to-top
  const handlePostScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    if (top > 12 && !collapsed) setCollapsed(true);
    if (top < 4  && collapsed)  setCollapsed(false);
  }, [collapsed]);

  const gridHeight = weeks.length * ROW_H;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: Colors.background }}>

      {/* ── Month navigation header ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: `${Spacing.sm}px ${Spacing.sm}px`,
        background: Colors.white,
        borderBottom: `1px solid ${Colors.divider}`,
        flexShrink: 0,
      }}>
        <button onClick={prev} style={{ width: 36, height: 36, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: Radius.md }}>
          <MdChevronLeft size={22} color={Colors.textPrimary} />
        </button>

        {/* Month label — clicking also toggles */}
        <button
          onClick={() => setCollapsed(v => !v)}
          style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
        >
          <span style={{ fontSize: FontSize.base, fontWeight: 600, color: Colors.textPrimary }}>{monthLabel}</span>
          {collapsed
            ? <MdExpandMore size={18} color={Colors.textSecondary} />
            : <MdExpandLess size={18} color={Colors.textSecondary} />
          }
        </button>

        <button onClick={next} style={{ width: 36, height: 36, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: Radius.md }}>
          <MdChevronRight size={22} color={Colors.textPrimary} />
        </button>
      </div>

      {/* ── Day-of-week labels (always visible) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', background: Colors.white, flexShrink: 0 }}>
        {DOW.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: FontSize.xs, color: Colors.textSecondary, fontWeight: 600, padding: `${Spacing.xs}px 0` }}>
            {d}
          </div>
        ))}
      </div>

      {/* ── Calendar grid ── */}
      {collapsed ? (
        /* Collapsed: horizontal scroll strip — swipe between weeks */
        <div
          ref={weekScrollRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            flexShrink: 0,
            height: ROW_H,
            background: Colors.white,
            borderBottom: `1px solid ${Colors.divider}`,
          } as React.CSSProperties}
        >
          {weeks.map((week, wi) => (
            <div
              key={wi}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7,1fr)',
                minWidth: '100%',
                height: ROW_H,
                scrollSnapAlign: 'start',
                flexShrink: 0,
              }}
            >
              {week.map(cell => {
                const dayPosts = postsByDay.get(cell.dateKey) ?? [];
                const isSelected = cell.dateKey === selectedKey;
                const isActive = cell.isCurrentMonth;
                return (
                  <button
                    key={cell.dateKey}
                    onClick={() => { if (isActive) { setSelectedKey(cell.dateKey); setCollapsed(false); } }}
                    style={{
                      border: 'none', background: 'none',
                      cursor: isActive ? 'pointer' : 'default',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', gap: 2, padding: '4px 1px',
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 14,
                      background: isSelected ? Colors.primary : cell.isToday ? Colors.primaryLight : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{
                        fontSize: FontSize.xs,
                        fontWeight: cell.isToday || isSelected ? 700 : 400,
                        color: isSelected ? Colors.white : isActive ? Colors.textPrimary : Colors.textSecondary,
                      }}>
                        {cell.day}
                      </span>
                    </div>
                    <DayDot hasPosts={dayPosts.length > 0} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        /* Expanded: full grid with animated height */
        <div style={{
          background: Colors.white,
          flexShrink: 0,
          height: gridHeight,
          transition: 'height 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: `1px solid ${Colors.divider}`,
          overflow: 'hidden',
        }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', height: ROW_H }}>
              {week.map(cell => {
                const dayPosts = postsByDay.get(cell.dateKey) ?? [];
                const isSelected = cell.dateKey === selectedKey;
                const isActive = cell.isCurrentMonth;
                return (
                  <button
                    key={cell.dateKey}
                    onClick={() => { if (isActive) { setSelectedKey(cell.dateKey); } }}
                    style={{
                      border: 'none', background: 'none',
                      cursor: isActive ? 'pointer' : 'default',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', gap: 2, padding: '4px 1px',
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 14,
                      background: isSelected ? Colors.primary : cell.isToday ? Colors.primaryLight : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{
                        fontSize: FontSize.xs,
                        fontWeight: cell.isToday || isSelected ? 700 : 400,
                        color: isSelected ? Colors.white : isActive ? Colors.textPrimary : Colors.textSecondary,
                      }}>
                        {cell.day}
                      </span>
                    </div>
                    <DayDot hasPosts={dayPosts.length > 0} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── Selected day post list ── */}
      <div
        onScroll={handlePostScroll}
        style={{ flex: 1, overflowY: 'auto', padding: `${Spacing.md}px ${Spacing.base}px ${Spacing.xxl}px` }}
      >
        {/* Day header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm }}>
          <div style={{ width: 28, height: 28, borderRadius: Radius.md, background: Colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MdCalendarToday size={15} color={Colors.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: FontSize.base, fontWeight: 600, color: Colors.textPrimary, display: 'block' }}>{selectedDateLabel}</span>
            <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>
              {selectedPosts.length} scheduled post{selectedPosts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {selectedPosts.length === 0
          ? <EmptyState message="No posts on this day" />
          : selectedPosts.map(p => <PostCard key={p.id} post={p} onPress={setSelectedPost} />)
        }
      </div>

      <PostDetailSheet post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
