import dayjs from 'dayjs';
import type { Post, DayGroup } from '../types';

export const formatTime = (iso: string) => dayjs(iso).format('h:mm A');
export const formatPostedOn = (iso: string) => `Posted on ${dayjs(iso).format('D MMMM')}`;
export const toDateKey = (iso: string) => dayjs(iso).format('YYYY-MM-DD');
export const formatDateLabel = (iso: string) => dayjs(iso).format('MMM D');
export const formatDayName = (iso: string) => dayjs(iso).format('dddd');
export const isToday = (iso: string) => dayjs(iso).isSame(dayjs(), 'day');

export function groupPostsByDay(posts: Post[]): DayGroup[] {
  const map = new Map<string, Post[]>();
  posts.forEach(p => {
    const key = toDateKey(p.scheduledAt);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  });
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateKey, ps]) => ({
      dateKey,
      dateLabel: formatDateLabel(ps[0].scheduledAt),
      dayName: formatDayName(ps[0].scheduledAt),
      posts: ps,
    }));
}

export function getCalendarDays(year: number, month: number): Array<{
  dateKey: string; day: number; isCurrentMonth: boolean; isToday: boolean;
}> {
  const first = dayjs().year(year).month(month).startOf('month');
  const last  = dayjs().year(year).month(month).endOf('month');
  const days: Array<{ dateKey: string; day: number; isCurrentMonth: boolean; isToday: boolean }> = [];

  for (let i = first.day() - 1; i >= 0; i--) {
    const d = first.subtract(i + 1, 'day');
    days.push({ dateKey: d.format('YYYY-MM-DD'), day: d.date(), isCurrentMonth: false, isToday: false });
  }
  for (let d = 1; d <= last.date(); d++) {
    const date = dayjs().year(year).month(month).date(d);
    days.push({ dateKey: date.format('YYYY-MM-DD'), day: d, isCurrentMonth: true, isToday: date.isSame(dayjs(), 'day') });
  }
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const d = last.add(i, 'day');
      days.push({ dateKey: d.format('YYYY-MM-DD'), day: d.date(), isCurrentMonth: false, isToday: false });
    }
  }
  return days;
}
