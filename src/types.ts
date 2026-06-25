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

// ─── Engagements ──────────────────────────────────────────────────────────────

export type EngagementCategory = 'complaint' | 'question' | 'praise' | 'other';
export type EngagementSentiment = 'positive' | 'neutral' | 'negative';
export type EngagementPriority = 'high' | 'medium' | 'low';

export interface Engagement {
  id: string;
  authorName: string;
  authorInitials: string;
  platform: Platform;
  /** Display string e.g. "10:40 PM • Georgia" */
  timeLabel: string;
  category: EngagementCategory;
  sentiment: EngagementSentiment;
  priority: EngagementPriority;
  contextBusiness: string;
  content: string;
  thumbnailUrl?: string;
  likeCount: number;
  commentCount: number;
  suggestedReply?: string;
}
