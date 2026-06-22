import { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';
import { Colors, Spacing } from '../tokens';
import { groupPostsByDay } from '../utils/dateUtils';
import SectionHeader from '../components/SectionHeader';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import type { Post } from '../types';

export interface ListViewHandle {
  scrollToDate: (dateKey: string) => void;
}

interface Props {
  posts: Post[];
  onVisibleDateChange?: (dateKey: string) => void;
  onPostPress?: (post: Post) => void;
}

const ListView = forwardRef<ListViewHandle, Props>(function ListView({ posts, onVisibleDateChange, onPostPress }, ref) {
  const groups = groupPostsByDay(posts);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useImperativeHandle(ref, () => ({
    scrollToDate(dateKey: string) {
      const container = scrollRef.current;
      const target = sectionRefs.current[dateKey];
      if (!container || !target) return;
      const offset = target.getBoundingClientRect().top - container.getBoundingClientRect().top;
      container.scrollBy({ top: offset - 8, behavior: 'smooth' });
    },
  }));

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !onVisibleDateChange || groups.length === 0) return;
    const containerTop = container.getBoundingClientRect().top;
    let current = groups[0].dateKey;
    for (const g of groups) {
      const el = sectionRefs.current[g.dateKey];
      if (el && el.getBoundingClientRect().top <= containerTop + 4) {
        current = g.dateKey;
      }
    }
    onVisibleDateChange(current);
  }, [groups, onVisibleDateChange]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    // Report initial visible date
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (groups.length === 0) return <EmptyState />;

  return (
    <div
      ref={scrollRef}
      style={{ flex:1, overflowY:'auto', padding:`0 ${Spacing.base}px ${Spacing.xxl}px`, background:Colors.background }}
    >
      {groups.map(g => (
        <div key={g.dateKey} ref={el => { sectionRefs.current[g.dateKey] = el; }}>
          <SectionHeader dateLabel={g.dateLabel} dayName={g.dayName} count={g.posts.length} />
          {g.posts.map(p => <PostCard key={p.id} post={p} onPress={onPostPress} />)}
        </div>
      ))}
    </div>
  );
});

export default ListView;
