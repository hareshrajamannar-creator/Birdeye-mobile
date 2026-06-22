import { useMemo, useState } from 'react';
import { MdCalendarToday, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import dayjs from 'dayjs';
import { Colors, FontSize, Radius, Spacing } from '../tokens';
import { toDateKey } from '../utils/dateUtils';
import EmptyState from '../components/EmptyState';
import PostCard from '../components/PostCard';
import type { Platform, Post } from '../types';

const PLATFORM_COLORS: Record<Platform, string> = {
  twitter: Colors.platformX,
  facebook: Colors.platformFacebook,
  instagram: Colors.platformInstagram,
  linkedin: Colors.platformLinkedIn,
  youtube: Colors.platformYouTube,
};

interface CalendarWeekViewProps {
  posts: Post[];
}

export default function CalendarWeekView({ posts }: CalendarWeekViewProps) {
  const today = dayjs();
  const [weekStart, setWeekStart] = useState(today.startOf('week'));
  const [selectedKey, setSelectedKey] = useState(toDateKey(today.toISOString()));

  const postsByDay = useMemo(() => {
    const map = new Map<string, Post[]>();
    posts.forEach(post => {
      const key = toDateKey(post.scheduledAt);
      map.set(key, [...(map.get(key) ?? []), post]);
    });
    return map;
  }, [posts]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => weekStart.add(index, 'day')),
    [weekStart]
  );
  const selectedPosts = postsByDay.get(selectedKey) ?? [];
  const selectedDateLabel = dayjs(selectedKey).format('dddd, MMMM D');
  const endOfWeek = weekStart.add(6, 'day');
  const weekLabel = weekStart.month() === endOfWeek.month()
    ? `${weekStart.format('MMM D')} - ${endOfWeek.format('D, YYYY')}`
    : `${weekStart.format('MMM D')} - ${endOfWeek.format('MMM D, YYYY')}`;

  const moveWeek = (offset: number) => {
    const nextStart = weekStart.add(offset, 'week');
    const selectedDayIndex = dayjs(selectedKey).day();
    setWeekStart(nextStart);
    setSelectedKey(nextStart.add(selectedDayIndex, 'day').format('YYYY-MM-DD'));
  };

  return (
    <div style={{ flex:1, minHeight:0, display:'flex', flexDirection:'column', background:Colors.background }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:`${Spacing.sm}px ${Spacing.base}px`, background:Colors.white, borderBottom:`1px solid ${Colors.divider}` }}>
        <button type="button" aria-label="Previous week" onClick={() => moveWeek(-1)} style={{ border:0, background:'transparent', cursor:'pointer', padding:4, display:'flex', borderRadius:Radius.md }}>
          <MdChevronLeft size={22} color={Colors.textPrimary} />
        </button>
        <span style={{ fontSize:FontSize.base, fontWeight:600, color:Colors.textPrimary }}>{weekLabel}</span>
        <button type="button" aria-label="Next week" onClick={() => moveWeek(1)} style={{ border:0, background:'transparent', cursor:'pointer', padding:4, display:'flex', borderRadius:Radius.md }}>
          <MdChevronRight size={22} color={Colors.textPrimary} />
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:2, padding:`${Spacing.sm}px ${Spacing.sm}px ${Spacing.md}px`, background:Colors.white, borderBottom:`1px solid ${Colors.divider}` }}>
        {weekDays.map(day => {
          const dateKey = day.format('YYYY-MM-DD');
          const dayPosts = postsByDay.get(dateKey) ?? [];
          const isSelected = dateKey === selectedKey;
          const isToday = day.isSame(today, 'day');

          return (
            <button
              key={dateKey}
              type="button"
              aria-label={`${day.format('dddd, MMMM D')}, ${dayPosts.length} posts`}
              aria-pressed={isSelected}
              onClick={() => setSelectedKey(dateKey)}
              style={{ border:0, background:'transparent', padding:`${Spacing.xs}px 0`, display:'flex', flexDirection:'column', alignItems:'center', gap:Spacing.xs, cursor:'pointer' }}
            >
              <span style={{ fontSize:FontSize.xs, fontWeight:600, color:isSelected ? Colors.primary : Colors.textSecondary }}>{day.format('dd').slice(0, 1)}</span>
              <span style={{ width:32, height:32, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', fontSize:FontSize.sm, fontWeight:isSelected || isToday ? 700 : 400, color:isSelected ? Colors.white : isToday ? Colors.primary : Colors.textPrimary, background:isSelected ? Colors.primary : isToday ? Colors.primaryLight : 'transparent' }}>
                {day.date()}
              </span>
              <span style={{ minHeight:5, display:'flex', gap:2 }}>
                {dayPosts.slice(0, 3).map((post, index) => (
                  <span key={`${post.id}-${index}`} style={{ width:5, height:5, borderRadius:3, background:PLATFORM_COLORS[post.platform] }} />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ flex:1, minHeight:0, overflowY:'auto', padding:`${Spacing.md}px ${Spacing.base}px ${Spacing.xxl}px` }}>
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
          : selectedPosts.map(post => <PostCard key={post.id} post={post} />)
        }
      </div>
    </div>
  );
}
