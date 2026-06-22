/**
 * Shared TypeScript types for Birdeye Mobile.
 */

// ─── Social ───────────────────────────────────────────────────────────────────

export type Platform =
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'
  | 'pinterest';

export type PostStatus =
  | 'published'
  | 'scheduled'
  | 'post_expired'
  | 'pending_approval'
  | 'rejected'
  | 'draft';

export interface Post {
  id: string;
  platform: Platform;
  status: PostStatus;
  /** ISO string */
  scheduledAt: string;
  /** ISO string — only set if status === 'published' */
  publishedAt?: string;
  content: string;
  /** First media item URL */
  mediaUrl?: string;
  /** Total media count for multi-post */
  mediaCount?: number;
  locationName?: string;
  authorInitials?: string;
}

/** Posts grouped by calendar day, used by SectionList */
export interface DayGroup {
  /** YYYY-MM-DD */
  dateKey: string;
  /** e.g. "Oct 13" */
  dateLabel: string;
  /** e.g. "Friday" */
  dayName: string;
  posts: Post[];
}

export type ViewMode = 'list' | 'month';

// ─── Navigation ───────────────────────────────────────────────────────────────

export type TabName = 'inbox' | 'reviews' | 'social' | 'more';
