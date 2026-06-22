import { useState, useMemo } from 'react';
import { MdChevronLeft, MdChevronRight, MdCalendarToday } from 'react-icons/md';
import dayjs from 'dayjs';
import { Colors, FontSize, Spacing, Radius } from '../tokens';
import { getCalendarDays, toDateKey } from '../utils/dateUtils';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import type { Post } from '../types';

const PLATFORM_COLORS: Record<string, string> = {
  twitter: Colors.platformX, facebook: Colors.platformFacebook,
  instagram: Colors.platformInstagram, linkedin: Colors.platformLinkedIn,
  youtube: Colors.platformYouTube,
};

const DOW = ['Su','Mo','Tu','We','Th','Fr','Sa'];

interface Props { posts: Post[] }

export default function CalendarMonthView({ posts }: Props) {
  const now = dayjs();
  const [year, setYear] = useState(now.year());
  const [month, setMonth] = useState(now.month());
  const [selectedKey, setSelectedKey] = useState(toDateKey(now.toISOString()));

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
  const selectedPosts = postsByDay.get(selectedKey) ?? [];
  const monthLabel = dayjs().year(year).month(month).format('MMMM YYYY');
  const selectedDateLabel = dayjs(selectedKey).format('dddd, MMMM D');

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflowY:'auto', background:Colors.background }}>
      {/* Month nav */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:`${Spacing.sm}px ${Spacing.base}px`, background:Colors.white, borderBottom:`1px solid ${Colors.divider}` }}>
        <button onClick={prev} style={{ border:'none', background:'none', cursor:'pointer', padding:4, display:'flex', borderRadius:Radius.md }}>
          <MdChevronLeft size={22} color={Colors.textPrimary} />
        </button>
        <span style={{ fontSize:FontSize.base, fontWeight:600, color:Colors.textPrimary }}>{monthLabel}</span>
        <button onClick={next} style={{ border:'none', background:'none', cursor:'pointer', padding:4, display:'flex', borderRadius:Radius.md }}>
          <MdChevronRight size={22} color={Colors.textPrimary} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', background:Colors.white, paddingBottom:Spacing.xs }}>
        {DOW.map(d => (
          <div key={d} style={{ textAlign:'center', fontSize:FontSize.xs, color:Colors.textSecondary, fontWeight:600, padding:`${Spacing.xs}px 0` }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', background:Colors.white, borderBottom:`1px solid ${Colors.divider}` }}>
        {calDays.map(cell => {
          const dayPosts = postsByDay.get(cell.dateKey) ?? [];
          const isSelected = cell.dateKey === selectedKey;
          return (
            <button
              key={cell.dateKey}
              onClick={() => { if (cell.isCurrentMonth) setSelectedKey(cell.dateKey); }}
              style={{
                border:'none', background:'none', cursor: cell.isCurrentMonth ? 'pointer' : 'default',
                padding:'6px 2px', display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              }}
            >
              <div style={{
                width:28, height:28, borderRadius:14,
                background: isSelected ? Colors.primary : cell.isToday ? Colors.primaryLight : 'transparent',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <span style={{
                  fontSize:FontSize.xs, fontWeight: cell.isToday || isSelected ? 700 : 400,
                  color: isSelected ? Colors.white : cell.isCurrentMonth ? Colors.textPrimary : Colors.textSecondary,
                }}>{cell.day}</span>
              </div>
              {/* Platform dots */}
              <div style={{ display:'flex', gap:2, flexWrap:'nowrap', justifyContent:'center', minHeight:6 }}>
                {dayPosts.slice(0,3).map((p,i) => (
                  <div key={i} style={{ width:5, height:5, borderRadius:3, background:PLATFORM_COLORS[p.platform] ?? Colors.primary, flexShrink:0 }} />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day posts */}
      <div style={{ flex:1, overflowY:'auto', padding:`${Spacing.md}px ${Spacing.base}px ${Spacing.xxl}px` }}>
        <div style={{ display:'flex', alignItems:'center', gap:Spacing.sm, marginBottom:Spacing.sm }}>
          <div style={{ width:28, height:28, borderRadius:Radius.md, background:Colors.primaryLight, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <MdCalendarToday size={15} color={Colors.primary} />
          </div>
          <div style={{ display:'flex', flexDirection:'column', flex:1 }}>
            <span style={{ fontSize:FontSize.base, fontWeight:600, color:Colors.textPrimary }}>{selectedDateLabel}</span>
            <span style={{ fontSize:FontSize.xs, color:Colors.textSecondary }}>
              {selectedPosts.length} scheduled post{selectedPosts.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
        {selectedPosts.length === 0
          ? <EmptyState message="No posts on this day" />
          : selectedPosts.map(p => <PostCard key={p.id} post={p} />)
        }
      </div>
    </div>
  );
}
