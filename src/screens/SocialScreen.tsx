import { useState } from 'react';
import {
  MdKeyboardArrowDown,
  MdOutlineCalendarMonth,
  MdOutlineFormatListBulleted,
  MdOutlineViewWeek,
  MdRefresh,
  MdTune,
} from 'react-icons/md';
import { Colors, FontSize, Spacing } from '../tokens';
import { mockPosts } from '../data/mockPosts';
import ListView from './ListView';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import FAB from '../components/FAB';
import BottomNav from '../components/BottomNav';
import PostFilterSheet from '../components/PostFilterSheet';
import ViewModeSheet from '../components/ViewModeSheet';
import type { ViewMode } from '../types';

export default function SocialScreen() {
  const [view, setView] = useState<ViewMode>('list');
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    key: 'publish:All posts',
    label: 'All posts',
  });

  const viewOptions = [
    { mode: 'list' as ViewMode, Icon: MdOutlineFormatListBulleted },
    { mode: 'week' as ViewMode, Icon: MdOutlineViewWeek },
    { mode: 'month' as ViewMode, Icon: MdOutlineCalendarMonth },
  ];
  const ActiveViewIcon = viewOptions.find(option => option.mode === view)?.Icon ?? MdOutlineFormatListBulleted;

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', minHeight:0, background:Colors.background, position:'relative', fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      {/* Header */}
      <div style={{ background:Colors.white, borderBottom:`1px solid ${Colors.divider}`, flexShrink:0, position:'relative', zIndex:40 }}>
        <div style={{ height:56, display:'flex', alignItems:'center', justifyContent:'space-between', paddingLeft:Spacing.lg, paddingRight:Spacing.md }}>
          <button
            type="button"
            aria-label="Choose post filter"
            aria-expanded={isFilterSheetOpen}
            onClick={() => { setIsViewSheetOpen(false); setIsFilterSheetOpen(true); }}
            style={{ border:0, background:'transparent', display:'flex', alignItems:'center', gap:Spacing.xs, padding:0, cursor:'pointer', color:Colors.textPrimary }}
          >
            <span style={{ fontSize:FontSize.lg, fontWeight:700 }}>{selectedFilter.label}</span>
            <MdKeyboardArrowDown size={20} />
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:Spacing.xs }}>
            <button
              type="button"
              aria-label={`Choose view, current view is ${view}`}
              aria-expanded={isViewSheetOpen}
              onClick={() => { setIsFilterSheetOpen(false); setIsViewSheetOpen(true); }}
              style={{ width:36, height:36, border:0, borderRadius:18, background:view !== 'list' ? Colors.primaryLight : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:view !== 'list' ? Colors.primary : Colors.textPrimary }}
            >
              <ActiveViewIcon size={21} />
            </button>
            <button type="button" aria-label="Refresh posts" style={{ width:36, height:36, border:0, borderRadius:18, background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:Colors.textPrimary }}>
              <MdRefresh size={23} />
            </button>
            <button type="button" aria-label="Filter posts" style={{ width:36, height:36, border:0, borderRadius:18, background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:Colors.textPrimary }}>
              <MdTune size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      {view === 'list' && <ListView posts={mockPosts} />}
      {view === 'week' && <CalendarWeekView posts={mockPosts} />}
      {view === 'month' && <CalendarMonthView posts={mockPosts} />}

      <FAB />
      <BottomNav />
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
