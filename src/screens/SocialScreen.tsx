import { useState, useRef, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineCalendarMonth,
  MdOutlineFormatListBulleted,
  MdOutlineViewWeek,
  MdRefresh,
  MdOutlineTune,
  MdCalendarToday,
  MdSearch,
  MdFilterList,
  MdMoreVert,
} from 'react-icons/md';
import { Colors, FontSize, Spacing, Radius } from '../tokens';
import { mockPosts } from '../data/mockPosts';
import ListView, { type ListViewHandle } from './ListView';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import FAB from '../components/FAB';
import EngagementsScreen from './EngagementsScreen';
import BottomNav from '../components/BottomNav';
import PostFilterSheet from '../components/PostFilterSheet';
import ViewModeSheet from '../components/ViewModeSheet';
import PostDetailSheet from '../components/PostDetailSheet';
import type { ViewMode, Post } from '../types';

const TODAY_KEY = dayjs().format('YYYY-MM-DD');

function buildCalendarDays(month: dayjs.Dayjs): Array<{ key: string; dayNum: number } | null> {
  const first = month.startOf('month');
  const last = month.endOf('month');
  const days: Array<{ key: string; dayNum: number } | null> = [];
  for (let i = 0; i < first.day(); i++) days.push(null);
  for (let d = 1; d <= last.date(); d++) {
    const date = month.date(d);
    days.push({ key: date.format('YYYY-MM-DD'), dayNum: d });
  }
  const rem = days.length % 7;
  if (rem > 0) for (let i = 0; i < 7 - rem; i++) days.push(null);
  return days;
}

const iconBtn: React.CSSProperties = {
  width: 36, height: 36, border: 0, borderRadius: 18, background: 'transparent',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};

export default function SocialScreen() {
  const [view, setView] = useState<ViewMode>('list');
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({ key: 'publish:All posts', label: 'All posts' });

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visibleDateKey, setVisibleDateKey] = useState(TODAY_KEY);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(() => dayjs());

  const listViewRef = useRef<ListViewHandle>(null);

  const postDateKeys = useMemo(
    () => new Set(mockPosts.map(p => dayjs(p.scheduledAt).format('YYYY-MM-DD'))),
    [],
  );

  const isEngagements = selectedFilter.key === 'engage:View all engagements';
  const showTodayBtn = !isEngagements && view === 'list' && visibleDateKey !== TODAY_KEY;

  const handleVisibleDateChange = useCallback((dateKey: string) => {
    setVisibleDateKey(dateKey);
  }, []);

  const handleJumpToDate = useCallback((key: string) => {
    listViewRef.current?.scrollToDate(key);
    setShowDatePicker(false);
    setVisibleDateKey(key);
  }, []);

  const handleTodayPress = useCallback(() => {
    listViewRef.current?.scrollToDate(TODAY_KEY);
  }, []);

  const viewOptions = [
    { mode: 'list' as ViewMode, Icon: MdOutlineFormatListBulleted },
    { mode: 'week' as ViewMode, Icon: MdOutlineViewWeek },
    { mode: 'month' as ViewMode, Icon: MdOutlineCalendarMonth },
  ];
  const ActiveViewIcon = viewOptions.find(o => o.mode === view)?.Icon ?? MdOutlineFormatListBulleted;

  const visibleDay = dayjs(visibleDateKey);
  const stickyLabel = `${visibleDay.format('MMM D')}  ·  ${visibleDay.format('dddd')}`;

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      background: Colors.background, position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    }}>
      {/* Header */}
      <div style={{ background: Colors.white, borderBottom: `1px solid ${Colors.divider}`, flexShrink: 0, position: 'relative', zIndex: 40 }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: Spacing.lg, paddingRight: Spacing.md }}>
          <button
            type="button"
            aria-label="Choose post filter"
            aria-expanded={isFilterSheetOpen}
            onClick={() => { setIsViewSheetOpen(false); setIsFilterSheetOpen(true); }}
            style={{ border: 0, background: 'transparent', display: 'flex', alignItems: 'center', gap: Spacing.xs, padding: 0, cursor: 'pointer', color: Colors.textPrimary }}
          >
            <span style={{ fontSize: FontSize.lg, fontWeight: 700 }}>
              {isEngagements ? 'All engagements' : selectedFilter.label}
            </span>
            <MdKeyboardArrowDown size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.xs }}>
            {isEngagements ? (
              <>
                <button type="button" aria-label="Search engagements" style={{ ...iconBtn, color: Colors.textPrimary }}>
                  <MdSearch size={23} />
                </button>
                <button type="button" aria-label="Filter engagements" style={{ ...iconBtn, color: Colors.textPrimary }}>
                  <MdFilterList size={22} />
                </button>
                <button type="button" aria-label="More options" style={{ ...iconBtn, color: Colors.textPrimary }}>
                  <MdMoreVert size={22} />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  aria-label={`Choose view, current view is ${view}`}
                  aria-expanded={isViewSheetOpen}
                  onClick={() => { setIsFilterSheetOpen(false); setIsViewSheetOpen(true); }}
                  style={{ ...iconBtn, background: Colors.primaryLight, color: Colors.primary }}
                >
                  <ActiveViewIcon size={21} />
                </button>
                <button type="button" aria-label="Refresh posts" style={{ ...iconBtn, color: Colors.textPrimary }}>
                  <MdRefresh size={23} />
                </button>
                <button type="button" aria-label="Filter posts" style={{ ...iconBtn, color: Colors.textPrimary }}>
                  <MdOutlineTune size={22} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sticky date bar — list view only, not on engagements */}
        {!isEngagements && view === 'list' && (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowDatePicker(v => !v)}
              style={{
                width: '100%', height: 40, paddingLeft: Spacing.base, paddingRight: Spacing.md,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: Colors.white, border: 0, borderTop: `1px solid ${Colors.divider}`,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: FontSize.sm, fontWeight: 600, color: Colors.textPrimary, letterSpacing: 0.1 }}>
                {stickyLabel}
              </span>
              <MdKeyboardArrowDown
                size={18}
                color={Colors.textSecondary}
                style={{ transform: showDatePicker ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              />
            </button>

            {/* Date picker popup */}
            {showDatePicker && (
              <>
                {/* Backdrop */}
                <div
                  onClick={() => setShowDatePicker(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 48 }}
                />
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0,
                  background: Colors.white, zIndex: 49,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.14)',
                  borderBottomLeftRadius: Radius.lg,
                  borderBottomRightRadius: Radius.lg,
                }}>
                  {/* Month nav */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 6px' }}>
                    <button
                      onClick={() => setPickerMonth(m => m.subtract(1, 'month'))}
                      style={{ ...iconBtn, color: Colors.textPrimary }}
                    >
                      <MdKeyboardArrowLeft size={20} />
                    </button>
                    <span style={{ fontSize: FontSize.base, fontWeight: 600, color: Colors.textPrimary }}>
                      {pickerMonth.format('MMMM YYYY')}
                    </span>
                    <button
                      onClick={() => setPickerMonth(m => m.add(1, 'month'))}
                      style={{ ...iconBtn, color: Colors.textPrimary }}
                    >
                      <MdKeyboardArrowRight size={20} />
                    </button>
                  </div>

                  {/* Day-of-week labels */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 8px' }}>
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                      <div key={d} style={{ textAlign: 'center', fontSize: FontSize.xs, color: Colors.textSecondary, padding: '2px 0 4px' }}>
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 8px 12px', gap: '2px 0' }}>
                    {buildCalendarDays(pickerMonth).map((day, i) => {
                      if (!day) return <div key={`e-${i}`} />;
                      const isSelected = day.key === visibleDateKey;
                      const hasPost = postDateKeys.has(day.key);
                      const isToday = day.key === TODAY_KEY;
                      return (
                        <button
                          key={day.key}
                          disabled={!hasPost}
                          onClick={() => handleJumpToDate(day.key)}
                          style={{
                            height: 34, border: 0,
                            cursor: hasPost ? 'pointer' : 'default',
                            borderRadius: Radius.full,
                            background: isSelected ? Colors.primary : 'transparent',
                            color: isSelected ? '#fff' : isToday ? Colors.primary : hasPost ? Colors.textPrimary : Colors.textSecondary,
                            fontSize: FontSize.sm,
                            fontWeight: isSelected || isToday ? 700 : hasPost ? 500 : 400,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexDirection: 'column', gap: 1,
                            opacity: hasPost ? 1 : 0.35,
                          }}
                        >
                          {day.dayNum}
                          {hasPost && !isSelected && (
                            <span style={{ width: 4, height: 4, borderRadius: 2, background: isToday ? Colors.primary : Colors.primary, opacity: 0.7 }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content area */}
      {selectedFilter.key === 'engage:View all engagements' ? (
        <EngagementsScreen />
      ) : (
        <>
          {view === 'list' && (
            <ListView
              ref={listViewRef}
              posts={mockPosts}
              onVisibleDateChange={handleVisibleDateChange}
              onPostPress={setSelectedPost}
            />
          )}
          {view === 'week' && <CalendarWeekView posts={mockPosts} />}
          {view === 'month' && <CalendarMonthView posts={mockPosts} />}
        </>
      )}

      {/* Today floater — appears above FAB when scrolled away from today */}
      {showTodayBtn && (
        <button
          onClick={handleTodayPress}
          style={{
            position: 'absolute', bottom: 164, right: 20,
            height: 34, paddingLeft: 10, paddingRight: 12,
            borderRadius: Radius.full,
            background: Colors.white,
            border: `1px solid ${Colors.divider}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
            boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            color: Colors.primary,
            fontSize: FontSize.sm,
            fontWeight: 600,
            zIndex: 20,
          }}
        >
          <MdCalendarToday size={14} />
          Today
        </button>
      )}

      {selectedFilter.key !== 'engage:View all engagements' && <FAB />}
      <BottomNav />

      <PostDetailSheet post={selectedPost} onClose={() => setSelectedPost(null)} />

      <PostFilterSheet
        isOpen={isFilterSheetOpen}
        selectedKey={selectedFilter.key}
        onClose={() => setIsFilterSheetOpen(false)}
        onSelect={(key, label) => { setSelectedFilter({ key, label }); setIsFilterSheetOpen(false); }}
      />
      <ViewModeSheet
        isOpen={isViewSheetOpen}
        selectedMode={view}
        onClose={() => setIsViewSheetOpen(false)}
        onSelect={mode => { setView(mode); setIsViewSheetOpen(false); }}
      />
    </div>
  );
}
