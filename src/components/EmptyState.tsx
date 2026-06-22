import { MdCalendarToday } from 'react-icons/md';
import { Colors, FontSize, Spacing } from '../tokens';

interface Props { message?: string }

export default function EmptyState({ message = 'No posts scheduled' }: Props) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:Spacing.md, padding:Spacing.xl }}>
      <div style={{ width:56, height:56, borderRadius:28, background:Colors.primaryLight, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <MdCalendarToday size={26} color={Colors.primary} />
      </div>
      <span style={{ fontSize:FontSize.base, color:Colors.textSecondary, textAlign:'center' }}>{message}</span>
    </div>
  );
}
