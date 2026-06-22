export type Platform = 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube';
export type PostStatus = 'published' | 'scheduled' | 'post_expired' | 'pending_approval' | 'rejected' | 'draft';
export type ViewMode = 'list' | 'week' | 'month';

export interface Post {
  id: string;
  platform: Platform;
  status: PostStatus;
  scheduledAt: string;
  publishedAt?: string;
  content: string;
  mediaUrl?: string;
  mediaCount?: number;
}

export interface DayGroup {
  dateKey: string;
  dateLabel: string;
  dayName: string;
  posts: Post[];
}
