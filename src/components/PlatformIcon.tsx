import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import { Colors } from '../tokens';
import type { Platform } from '../types';

const cfg: Record<Platform, { Icon: React.ComponentType<{ size?: number; color?: string }>; color: string }> = {
  twitter:   { Icon: FaXTwitter,    color: Colors.platformX },
  facebook:  { Icon: FaFacebook,    color: Colors.platformFacebook },
  instagram: { Icon: FaInstagram,   color: Colors.platformInstagram },
  linkedin:  { Icon: FaLinkedinIn,  color: Colors.platformLinkedIn },
  youtube:   { Icon: FaYoutube,     color: Colors.platformYouTube },
};

interface Props { platform: Platform; size?: number }

export default function PlatformIcon({ platform, size = 16 }: Props) {
  const { Icon, color } = cfg[platform];
  return (
    <div style={{
      width: size + 8, height: size + 8,
      borderRadius: 6,
      background: `${color}18`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon size={size} color={color} />
    </div>
  );
}
