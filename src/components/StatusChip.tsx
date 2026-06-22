import { MdSchedule, MdBlock, MdCheckCircle, MdAccessTime } from 'react-icons/md';
import { FontSize, Spacing, Radius, StatusConfig } from '../tokens';
import type { PostStatus } from '../types';

const iconMap = {
  schedule: MdAccessTime,
  block:    MdBlock,
  check:    MdCheckCircle,
};

interface Props { status: PostStatus }

export default function StatusChip({ status }: Props) {
  if (status === 'published' || status === 'draft') {
    if (status === 'published') {
      return (
        <div style={{ display:'flex', alignItems:'center', gap:3, background:'#E8F5E9', borderRadius:Radius.full, paddingLeft:Spacing.sm, paddingRight:Spacing.sm, paddingTop:3, paddingBottom:3, alignSelf:'flex-start' }}>
          <MdCheckCircle size={11} color="#388E3C" />
          <span style={{ fontSize:FontSize.xs, color:'#388E3C', fontWeight:500 }}>Published</span>
        </div>
      );
    }
    return null;
  }

  const cfg = StatusConfig[status as keyof typeof StatusConfig];
  if (!cfg) return null;

  const Icon = iconMap[cfg.icon as keyof typeof iconMap] ?? MdSchedule;

  return (
    <div style={{ display:'flex', alignItems:'center', gap:3, background:cfg.bg, borderRadius:Radius.full, paddingLeft:Spacing.sm, paddingRight:Spacing.sm, paddingTop:3, paddingBottom:3, alignSelf:'flex-start' }}>
      <Icon size={11} color={cfg.color} />
      <span style={{ fontSize:FontSize.xs, color:cfg.color, fontWeight:500 }}>{cfg.label}</span>
    </div>
  );
}
