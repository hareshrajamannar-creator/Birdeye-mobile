import { useState } from 'react';
import { MdFormatListBulleted, MdCalendarMonth, MdSearch, MdTune } from 'react-icons/md';
import { Colors, FontSize, Spacing } from '../tokens';
import { mockPosts } from '../data/mockPosts';
import ListView from './ListView';
import CalendarMonthView from './CalendarMonthView';
import FAB from '../components/FAB';
import type { ViewMode } from '../types';

export default function SocialScreen() {
  const [view, setView] = useState<ViewMode>('list');

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', minHeight:0, background:Colors.background, position:'relative', fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      {/* Header */}
      <div style={{ background:Colors.white, borderBottom:`1px solid ${Colors.divider}`, flexShrink:0 }}>
        {/* Title row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingLeft:Spacing.base, paddingRight:Spacing.base, paddingTop:Spacing.sm, paddingBottom:Spacing.sm }}>
          <span style={{ fontSize:FontSize.lg, fontWeight:700, color:Colors.textPrimary }}>Social</span>
          <div style={{ display:'flex', gap:Spacing.sm }}>
            <button style={{ border:'none', background:'none', cursor:'pointer', padding:4, display:'flex' }}>
              <MdSearch size={22} color={Colors.textPrimary} />
            </button>
            <button style={{ border:'none', background:'none', cursor:'pointer', padding:4, display:'flex' }}>
              <MdTune size={22} color={Colors.textPrimary} />
            </button>
          </div>
        </div>

        {/* View toggle tabs */}
        <div style={{ display:'flex', paddingLeft:Spacing.base, paddingRight:Spacing.base, gap:0 }}>
          {([
            { mode: 'list' as ViewMode, Icon: MdFormatListBulleted, label: 'List' },
            { mode: 'month' as ViewMode, Icon: MdCalendarMonth, label: 'Calendar' },
          ]).map(({ mode, Icon, label }) => {
            const active = view === mode;
            return (
              <button
                key={mode}
                onClick={() => setView(mode)}
                style={{
                  flex:1, border:'none', background:'none', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:5,
                  paddingTop:Spacing.sm, paddingBottom:Spacing.sm,
                  borderBottom: active ? `2px solid ${Colors.primary}` : '2px solid transparent',
                  color: active ? Colors.primary : Colors.textSecondary,
                }}
              >
                <Icon size={17} />
                <span style={{ fontSize:FontSize.sm, fontWeight: active ? 600 : 400 }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      {view === 'list'
        ? <ListView posts={mockPosts} />
        : <CalendarMonthView posts={mockPosts} />
      }

      <FAB />
    </div>
  );
}
