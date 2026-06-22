import { Colors, FontSize, Spacing } from '../tokens';

interface Props { dateLabel: string; dayName: string; count: number }

export default function SectionHeader({ dateLabel, dayName, count }: Props) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:Spacing.sm, paddingTop:Spacing.md, paddingBottom:Spacing.xs }}>
      <div style={{ display:'flex', flexDirection:'column' }}>
        <span style={{ fontSize:FontSize.md, fontWeight:700, color:Colors.textPrimary, lineHeight:1.2 }}>{dateLabel}</span>
        <span style={{ fontSize:FontSize.sm, color:Colors.textSecondary }}>{dayName}</span>
      </div>
      <div style={{ flex:1, height:1, background:Colors.divider }} />
      <span style={{ fontSize:FontSize.sm, color:Colors.textSecondary }}>{count} post{count !== 1 ? 's' : ''}</span>
    </div>
  );
}
