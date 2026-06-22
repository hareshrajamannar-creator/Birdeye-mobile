import { MdImage, MdMoreVert } from 'react-icons/md';
import { Colors, FontSize, Spacing, Radius } from '../tokens';
import { formatTime } from '../utils/dateUtils';
import PlatformIcon from './PlatformIcon';
import StatusChip from './StatusChip';
import type { Post } from '../types';

interface Props {
  post: Post;
  onPress?: (post: Post) => void;
}

export default function PostCard({ post, onPress }: Props) {
  return (
    <div
      onClick={() => onPress?.(post)}
      style={{ cursor: onPress ? 'pointer' : 'default' }}
    >
    <div style={{
      background: Colors.white,
      borderRadius: Radius.lg,
      padding: Spacing.base,
      marginBottom: Spacing.sm,
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: Spacing.sm,
      border: `1px solid ${Colors.divider}`,
    }}>
      {/* Row 1: platform icon + time + overflow */}
      <div style={{ display:'flex', alignItems:'center', gap: Spacing.sm }}>
        <PlatformIcon platform={post.platform} size={14} />
        <span style={{ fontSize:FontSize.sm, color:Colors.textSecondary, flex:1 }}>
          {formatTime(post.scheduledAt)}
        </span>
        <StatusChip status={post.status} />
        <MdMoreVert size={18} color={Colors.textSecondary} style={{ cursor:'pointer', flexShrink:0 }} />
      </div>

      {/* Row 2: content */}
      {post.content ? (
        <p style={{ margin:0, fontSize:FontSize.base, color:Colors.textPrimary, lineHeight:1.45,
          overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
          {post.content}
        </p>
      ) : null}

      {/* Row 3: media preview if any */}
      {post.mediaUrl ? (
        <div style={{ position:'relative', borderRadius:Radius.md, overflow:'hidden', height:100, background:Colors.background, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <img src={post.mediaUrl} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
          {post.mediaCount && post.mediaCount > 1 && (
            <div style={{ position:'absolute', bottom:6, right:6, background:'rgba(0,0,0,0.55)', borderRadius:Radius.sm, padding:'2px 6px', display:'flex', alignItems:'center', gap:3 }}>
              <MdImage size={11} color="#fff" />
              <span style={{ fontSize:FontSize.xs, color:'#fff' }}>{post.mediaCount}</span>
            </div>
          )}
        </div>
      ) : null}
    </div>
    </div>
  );
}
