import type { Post } from '../types';

/**
 * Mock data for Social module development.
 * Replace with real API calls when the backend is integrated.
 */
export const mockPosts: Post[] = [
  {
    id: '1',
    platform: 'twitter',
    status: 'published',
    scheduledAt: '2024-10-13T10:28:00Z',
    publishedAt: '2024-10-13T10:28:00Z',
    content:
      'Had a really good stay. The place is close to the Loom market and the staff was incredible.',
    mediaUrl: 'https://picsum.photos/seed/post1/140/140',
    mediaCount: 5,
  },
  {
    id: '2',
    platform: 'twitter',
    status: 'published',
    scheduledAt: '2024-10-13T10:28:00Z',
    publishedAt: '2024-10-13T10:28:00Z',
    content:
      "Exciting News! 🌟 We're thrilled to announce the launch of our new seasonal menu.",
    mediaUrl: 'https://picsum.photos/seed/post2/140/140',
    mediaCount: 3,
  },
  {
    id: '3',
    platform: 'facebook',
    status: 'post_expired',
    scheduledAt: '2024-10-13T12:30:00Z',
    content:
      'Had a really good stay. The place is close to the Loom market and all the things to do.',
    mediaUrl: 'https://picsum.photos/seed/post3/140/140',
    mediaCount: 5,
  },
  {
    id: '4',
    platform: 'facebook',
    status: 'pending_approval',
    scheduledAt: '2024-10-14T12:30:00Z',
    content:
      "We're celebrating our amazing community with a special note — thank you for your continued support.",
    mediaUrl: 'https://picsum.photos/seed/post4/140/140',
  },
  {
    id: '5',
    platform: 'facebook',
    status: 'rejected',
    scheduledAt: '2024-10-15T12:30:00Z',
    content:
      '🍂 Fall into Fun! 🎃 The season of cozy sweaters and pumpkin spice is here.',
    mediaUrl: 'https://picsum.photos/seed/post5/140/140',
  },
  {
    id: '6',
    platform: 'facebook',
    status: 'published',
    scheduledAt: '2024-10-15T12:30:00Z',
    publishedAt: '2024-10-15T12:30:00Z',
    content:
      'Had a really good stay. The place is close to the Loom market and all the great dining.',
    mediaUrl: 'https://picsum.photos/seed/post6/140/140',
  },
  {
    id: '7',
    platform: 'instagram',
    status: 'scheduled',
    scheduledAt: '2024-10-16T09:00:00Z',
    content:
      '✨ New arrivals just dropped! Come check out our latest collection in store and online.',
    mediaUrl: 'https://picsum.photos/seed/post7/140/140',
    mediaCount: 4,
  },
  {
    id: '8',
    platform: 'linkedin',
    status: 'scheduled',
    scheduledAt: '2024-10-16T14:00:00Z',
    content:
      "We're hiring! Join our growing team and help shape the future of customer experience.",
    mediaUrl: 'https://picsum.photos/seed/post8/140/140',
  },
  {
    id: '9',
    platform: 'twitter',
    status: 'pending_approval',
    scheduledAt: '2024-10-17T11:00:00Z',
    content:
      'Big news coming this week. Stay tuned — you will not want to miss it. 👀',
  },
  {
    id: '10',
    platform: 'facebook',
    status: 'published',
    scheduledAt: '2024-10-18T08:00:00Z',
    publishedAt: '2024-10-18T08:00:00Z',
    content:
      'Thank you for 10,000 followers! We are so grateful for this incredible community.',
    mediaUrl: 'https://picsum.photos/seed/post10/140/140',
    mediaCount: 2,
  },
  {
    id: '11',
    platform: 'instagram',
    status: 'published',
    scheduledAt: '2024-10-18T10:00:00Z',
    publishedAt: '2024-10-18T10:00:00Z',
    content: 'Sunday vibes ☀️ Swipe to see behind the scenes of our photo shoot.',
    mediaUrl: 'https://picsum.photos/seed/post11/140/140',
    mediaCount: 6,
  },
  {
    id: '12',
    platform: 'facebook',
    status: 'scheduled',
    scheduledAt: '2024-10-20T13:00:00Z',
    content:
      'This weekend only — 20% off everything in store. Bring a friend and save even more!',
    mediaUrl: 'https://picsum.photos/seed/post12/140/140',
  },
];
