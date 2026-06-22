import type { Post } from '../types';
import dayjs from 'dayjs';

const schedule = (dayOffset: number, time: string) =>
  dayjs().add(dayOffset, 'day').format(`YYYY-MM-DDT${time}:00`);
const asset = (fileName: string) => `${import.meta.env.BASE_URL}posts/${fileName}`;

/**
 * Mock data for Social module development.
 * Replace with real API calls when the backend is integrated.
 */
export const mockPosts: Post[] = [
  {
    id: '1',
    platform: 'twitter',
    status: 'published',
    scheduledAt: schedule(0, '09:30'),
    publishedAt: schedule(0, '09:30'),
    content:
      'Had a really good stay. The place is close to the Loom market and the staff was incredible.',
    mediaUrl: asset('hotel.jpg'),
    mediaCount: 5,
  },
  {
    id: '2',
    platform: 'twitter',
    status: 'published',
    scheduledAt: schedule(0, '11:45'),
    publishedAt: schedule(0, '11:45'),
    content:
      "Exciting News! 🌟 We're thrilled to announce the launch of our new seasonal menu.",
    mediaUrl: asset('seasonal-food.jpg'),
    mediaCount: 3,
  },
  {
    id: '3',
    platform: 'facebook',
    status: 'post_expired',
    scheduledAt: schedule(0, '16:00'),
    content:
      'Had a really good stay. The place is close to the Loom market and all the things to do.',
    mediaUrl: asset('hotel.jpg'),
    mediaCount: 5,
  },
  {
    id: '4',
    platform: 'facebook',
    status: 'pending_approval',
    scheduledAt: schedule(1, '10:15'),
    content:
      "We're celebrating our amazing community with a special note — thank you for your continued support.",
    mediaUrl: asset('seasonal-food.jpg'),
  },
  {
    id: '5',
    platform: 'facebook',
    status: 'rejected',
    scheduledAt: schedule(2, '12:30'),
    content:
      '🍂 Fall into Fun! 🎃 The season of cozy sweaters and pumpkin spice is here.',
    mediaUrl: asset('fashion.jpg'),
  },
  {
    id: '6',
    platform: 'facebook',
    status: 'published',
    scheduledAt: schedule(2, '15:30'),
    publishedAt: schedule(2, '15:30'),
    content:
      'Had a really good stay. The place is close to the Loom market and all the great dining.',
    mediaUrl: asset('hotel.jpg'),
  },
  {
    id: '7',
    platform: 'instagram',
    status: 'scheduled',
    scheduledAt: schedule(4, '09:00'),
    content:
      '✨ New arrivals just dropped! Come check out our latest collection in store and online.',
    mediaUrl: asset('fashion.jpg'),
    mediaCount: 4,
  },
  {
    id: '8',
    platform: 'linkedin',
    status: 'scheduled',
    scheduledAt: schedule(4, '14:00'),
    content:
      "We're hiring! Join our growing team and help shape the future of customer experience.",
    mediaUrl: asset('fashion.jpg'),
  },
  {
    id: '9',
    platform: 'twitter',
    status: 'pending_approval',
    scheduledAt: schedule(7, '11:00'),
    content:
      'Big news coming this week. Stay tuned — you will not want to miss it. 👀',
  },
  {
    id: '10',
    platform: 'facebook',
    status: 'published',
    scheduledAt: schedule(-2, '08:00'),
    publishedAt: schedule(-2, '08:00'),
    content:
      'Thank you for 10,000 followers! We are so grateful for this incredible community.',
    mediaUrl: asset('seasonal-food.jpg'),
    mediaCount: 2,
  },
  {
    id: '11',
    platform: 'instagram',
    status: 'published',
    scheduledAt: schedule(-2, '10:00'),
    publishedAt: schedule(-2, '10:00'),
    content: 'Sunday vibes ☀️ Swipe to see behind the scenes of our photo shoot.',
    mediaUrl: asset('fashion.jpg'),
    mediaCount: 6,
  },
  {
    id: '12',
    platform: 'facebook',
    status: 'scheduled',
    scheduledAt: schedule(10, '13:00'),
    content:
      'This weekend only — 20% off everything in store. Bring a friend and save even more!',
    mediaUrl: asset('seasonal-food.jpg'),
  },
];
