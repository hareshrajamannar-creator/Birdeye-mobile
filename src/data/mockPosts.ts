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

  // ── Additional posts to populate the week view ─────────────────────────────

  // Today
  { id: 'w1',  platform: 'instagram', status: 'published',        scheduledAt: schedule(0, '07:00'), publishedAt: schedule(0, '07:00'), content: 'Good morning! Start your day with us.', mediaUrl: asset('fashion.jpg') },
  { id: 'w2',  platform: 'linkedin',  status: 'published',        scheduledAt: schedule(0, '08:30'), publishedAt: schedule(0, '08:30'), content: 'New partnership announcement — we are thrilled!' },
  { id: 'w3',  platform: 'youtube',   status: 'scheduled',        scheduledAt: schedule(0, '14:00'), content: 'Watch our latest product demo video — link in bio.' },
  { id: 'w4',  platform: 'instagram', status: 'pending_approval', scheduledAt: schedule(0, '18:00'), content: 'Evening giveaway! Tag a friend to win.', mediaUrl: asset('fashion.jpg') },

  // Day +1
  { id: 'w5',  platform: 'facebook',  status: 'scheduled',        scheduledAt: schedule(1, '08:00'), content: 'Flash sale starts at 9 AM. Do not miss out!', mediaUrl: asset('seasonal-food.jpg') },
  { id: 'w6',  platform: 'twitter',   status: 'scheduled',        scheduledAt: schedule(1, '10:30'), content: 'Customer spotlight — read how @user transformed their workflow.' },
  { id: 'w7',  platform: 'instagram', status: 'scheduled',        scheduledAt: schedule(1, '13:00'), content: 'Behind the scenes of our new campaign shoot.', mediaUrl: asset('fashion.jpg') },
  { id: 'w8',  platform: 'linkedin',  status: 'pending_approval', scheduledAt: schedule(1, '16:00'), content: 'We are expanding to 3 new cities this quarter.' },
  { id: 'w9',  platform: 'facebook',  status: 'scheduled',        scheduledAt: schedule(1, '19:30'), content: 'Week-end recap — highlights from our community.', mediaUrl: asset('hotel.jpg') },

  // Day +2
  { id: 'w10', platform: 'twitter',   status: 'scheduled',        scheduledAt: schedule(2, '09:00'), content: 'Tip Tuesday: 5 ways to boost your online presence.' },
  { id: 'w11', platform: 'instagram', status: 'scheduled',        scheduledAt: schedule(2, '11:30'), content: 'User-generated content feature — meet our community!', mediaUrl: asset('seasonal-food.jpg') },
  { id: 'w12', platform: 'youtube',   status: 'scheduled',        scheduledAt: schedule(2, '15:00'), content: 'Tutorial: getting started with our mobile app.' },

  // Day +3
  { id: 'w13', platform: 'facebook',  status: 'scheduled',        scheduledAt: schedule(3, '08:00'), content: 'Happy Wednesday! Midweek motivation from our team.', mediaUrl: asset('hotel.jpg') },
  { id: 'w14', platform: 'twitter',   status: 'scheduled',        scheduledAt: schedule(3, '10:00'), content: 'We just hit 50k customers — thank you!' },
  { id: 'w15', platform: 'linkedin',  status: 'scheduled',        scheduledAt: schedule(3, '14:00'), content: 'Webinar recap: future of social media marketing.' },
  { id: 'w16', platform: 'instagram', status: 'scheduled',        scheduledAt: schedule(3, '17:00'), content: 'Product of the week — swipe to explore features.', mediaUrl: asset('fashion.jpg') },

  // Day +4
  { id: 'w17', platform: 'twitter',   status: 'scheduled',        scheduledAt: schedule(4, '07:30'), content: 'Throwback to our very first post — how far we have come!' },
  { id: 'w18', platform: 'facebook',  status: 'scheduled',        scheduledAt: schedule(4, '11:00'), content: 'New blog post: top 10 social media trends of 2026.', mediaUrl: asset('seasonal-food.jpg') },
  { id: 'w19', platform: 'instagram', status: 'scheduled',        scheduledAt: schedule(4, '16:30'), content: 'Sunset session — our brand shoot highlights.', mediaUrl: asset('fashion.jpg') },

  // Day +5
  { id: 'w20', platform: 'linkedin',  status: 'scheduled',        scheduledAt: schedule(5, '09:00'), content: 'Friday feature: meet our Head of Product.' },
  { id: 'w21', platform: 'twitter',   status: 'scheduled',        scheduledAt: schedule(5, '12:00'), content: 'TGIF! What are you reading this weekend? Share below.' },
  { id: 'w22', platform: 'facebook',  status: 'scheduled',        scheduledAt: schedule(5, '15:00'), content: 'Weekend prep — shop our curated weekend essentials.', mediaUrl: asset('hotel.jpg') },
  { id: 'w23', platform: 'instagram', status: 'scheduled',        scheduledAt: schedule(5, '19:00'), content: 'Friday evening vibes — your weekend playlist.', mediaUrl: asset('fashion.jpg') },

  // Day +6
  { id: 'w24', platform: 'instagram', status: 'scheduled',        scheduledAt: schedule(6, '10:00'), content: 'Saturday special — exclusive member discount inside.', mediaUrl: asset('seasonal-food.jpg') },
  { id: 'w25', platform: 'facebook',  status: 'scheduled',        scheduledAt: schedule(6, '14:00'), content: 'Weekend spotlight: our top rated product this month.' },
];
