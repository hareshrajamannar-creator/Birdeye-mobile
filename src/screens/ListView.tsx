import { Colors, Spacing } from '../tokens';
import { groupPostsByDay } from '../utils/dateUtils';
import SectionHeader from '../components/SectionHeader';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import type { Post } from '../types';

interface Props { posts: Post[] }

export default function ListView({ posts }: Props) {
  const groups = groupPostsByDay(posts);

  if (groups.length === 0) return <EmptyState />;

  return (
    <div style={{ flex:1, overflowY:'auto', padding:`0 ${Spacing.base}px ${Spacing.xxl}px`, background:Colors.background }}>
      {groups.map(g => (
        <div key={g.dateKey}>
          <SectionHeader dateLabel={g.dateLabel} dayName={g.dayName} count={g.posts.length} />
          {g.posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      ))}
    </div>
  );
}
