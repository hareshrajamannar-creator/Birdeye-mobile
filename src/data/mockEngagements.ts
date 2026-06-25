import type { Engagement } from '../types';

export const MOCK_ENGAGEMENTS: Engagement[] = [
  {
    id: 'eng-1',
    authorName: 'Jaxson Septimus',
    authorInitials: 'JS',
    platform: 'facebook',
    timeLabel: '10:40 PM • Georgia',
    category: 'complaint',
    sentiment: 'positive',
    priority: 'high',
    contextBusiness: 'Lush Green Landscapes',
    content:
      "I'm honestly really disappointed with my experience. I reached out to your support team last week regarding an issue with my order — not only did no one respond for days, but when someone finally did, they gave me completely incorrect information.",
    thumbnailUrl: 'placeholder',
    likeCount: 22,
    commentCount: 22,
    suggestedReply:
      '"Hi Jaxson, I\'m really sorry to hear about this delay. Could you please DM us your order number so we can investigate immediately?"',
  },
  {
    id: 'eng-2',
    authorName: 'Sarah Jenkins',
    authorInitials: 'SJ',
    platform: 'instagram',
    timeLabel: '10:40 PM • Georgia',
    category: 'question',
    sentiment: 'positive',
    priority: 'high',
    contextBusiness: 'Fresh Brew Co.',
    content:
      "Does the holiday blend come in whole bean or just ground? I'd love to try it for my espresso machine!",
    likeCount: 22,
    commentCount: 22,
    suggestedReply:
      '"Hi Sarah! Our holiday blend is available in both whole bean and ground options. You can select your preference on our site!"',
  },
  {
    id: 'eng-3',
    authorName: 'Marco Rossi',
    authorInitials: 'MR',
    platform: 'linkedin',
    timeLabel: '10:40 PM • Georgia',
    category: 'praise',
    sentiment: 'positive',
    priority: 'high',
    contextBusiness: 'Fresh Brew Co.',
    content:
      "Great insight on the new scalability features. We've been looking for a way to optimize our cloud overhead and this looks promising.",
    thumbnailUrl: 'placeholder',
    likeCount: 22,
    commentCount: 22,
    suggestedReply:
      '"Thanks for the feedback, Marco! We\'re glad to hear TechFlow is helping you scale more effectively."',
  },
  {
    id: 'eng-4',
    authorName: 'Priya Sharma',
    authorInitials: 'PS',
    platform: 'twitter',
    timeLabel: '9:15 AM • California',
    category: 'complaint',
    sentiment: 'negative',
    priority: 'high',
    contextBusiness: 'StyleHouse',
    content:
      'Ordered three weeks ago and still nothing. This is unacceptable. Where is my package?',
    likeCount: 5,
    commentCount: 3,
    suggestedReply:
      '"Hi Priya, we sincerely apologize for the delay! Please DM us your order number and we\'ll prioritize getting this resolved today."',
  },
  {
    id: 'eng-5',
    authorName: 'Tom Fletcher',
    authorInitials: 'TF',
    platform: 'facebook',
    timeLabel: '2:30 PM • Texas',
    category: 'praise',
    sentiment: 'positive',
    priority: 'low',
    contextBusiness: 'Lush Green Landscapes',
    content:
      'Just got my garden makeover done and wow — the team did an absolutely incredible job. Highly recommend!',
    likeCount: 47,
    commentCount: 12,
    suggestedReply:
      '"Thank you so much, Tom! We\'re thrilled you love it. Feel free to tag us in any photos — we\'d love to see the results!"',
  },
];
