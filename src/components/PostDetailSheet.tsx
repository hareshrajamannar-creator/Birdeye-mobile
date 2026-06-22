import { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdEdit,
  MdCalendarToday,
  MdMoreHoriz,
  MdContentCopy,
  MdDeleteOutline,
  MdCheckCircle,
  MdBlock,
  MdAccessTime,
  MdErrorOutline,
  MdWarningAmber,
  MdBarChart,
} from 'react-icons/md';
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import { Colors, FontSize, Spacing, Radius } from '../tokens';
import type { Post, PostStatus, Platform } from '../types';
import dayjs from 'dayjs';

// ─── Platform icon helper ──────────────────────────────────────────────────────

const PLATFORM_ICON: Record<Platform, { Icon: React.ComponentType<{ size?: number; color?: string }>; color: string }> = {
  twitter:   { Icon: FaXTwitter,    color: '#14171A' },
  facebook:  { Icon: FaFacebook,    color: '#1877F2' },
  instagram: { Icon: FaInstagram,   color: '#E1306C' },
  linkedin:  { Icon: FaLinkedinIn,  color: '#0A66C2' },
  youtube:   { Icon: FaYoutube,     color: '#FF0000' },
};

// ─── Mock data ─────────────────────────────────────────────────────────────────

interface Channel { id: string; name: string; location: string; avatarBg: string; initials: string }

const CH: Channel[] = [
  { id: '1', name: 'Lush green landscaping', location: 'Jaipur',  avatarBg: '#4CAF50', initials: 'LG' },
  { id: '2', name: 'Lush green landscaping', location: 'Delhi',   avatarBg: '#2196F3', initials: 'LG' },
  { id: '3', name: 'Lush green landscaping', location: 'Mumbai',  avatarBg: '#9C27B0', initials: 'LG' },
  { id: '4', name: 'Lush green landscaping', location: 'Pune',    avatarBg: '#FF9800', initials: 'LG' },
];

const FAILED_MONITORING: Channel[] = [
  { id: 'f1', name: 'Lush green landscaping', location: 'India',     avatarBg: '#EF5350', initials: 'LG' },
];
const FAILED_RECONNECT: Channel[] = [
  { id: 'f2', name: 'Lush green landscaping', location: 'Australia', avatarBg: '#EF5350', initials: 'LG' },
  { id: 'f3', name: 'Lush green landscaping', location: 'UK',        avatarBg: '#EF5350', initials: 'LG' },
];

interface ActivityEntry { id: string; initials: string; avatarBg: string; text: React.ReactNode; date: string }

const ACTIVITY: Record<PostStatus, ActivityEntry[]> = {
  scheduled: [
    { id:'a1', initials:'PR', avatarBg:'#E91E63', text: <><b>Priyanka</b> created the post</>,            date: 'May 5 · 5:12 PM' },
    { id:'a2', initials:'VI', avatarBg:'#3F51B5', text: <><b>Vijaya</b> dismissed failed attempts</>,     date: 'May 6 · 11:45 AM' },
    { id:'a3', initials:'AR', avatarBg:'#FF5722', text: <><b>Arjun</b> edited the post</>,                date: 'May 6 · 12:30 AM' },
    { id:'a4', initials:'VM', avatarBg:'#607D8B', text: <><b>Vimal</b> rescheduled the post</>,           date: 'May 6 · 12:30 AM' },
  ],
  published: [
    { id:'a1', initials:'PR', avatarBg:'#E91E63', text: <><b>Priyanka</b> created the post</>,            date: 'May 5 · 5:12 PM' },
    { id:'a2', initials:'VI', avatarBg:'#3F51B5', text: <><b>Vijaya</b> dismissed the failed attempts on all channels it wasn't posted</>, date: 'May 6 · 11:45 AM' },
    { id:'a3', initials:'AR', avatarBg:'#FF5722', text: <><b>Arjun</b> edited the post</>,                date: 'May 6 · 12:30 AM' },
    { id:'a4', initials:'VM', avatarBg:'#607D8B', text: <><b>Vimal</b> rescheduled the post</>,           date: 'May 6 · 12:30 AM' },
  ],
  post_expired: [
    { id:'a1', initials:'PR', avatarBg:'#E91E63', text: <><b>Priyanka</b> created the post</>,            date: 'May 5 · 5:12 PM' },
    { id:'a2', initials:'VI', avatarBg:'#3F51B5', text: <><b>Vijaya</b> dismissed the failed attempts on all channels it wasn't posted</>, date: 'May 6 · 11:45 AM' },
    { id:'a3', initials:'AR', avatarBg:'#FF5722', text: <><b>Arjun</b> edited the post</>,                date: 'May 6 · 12:30 AM' },
    { id:'a4', initials:'VM', avatarBg:'#607D8B', text: <><b>Vimal</b> rescheduled the post</>,           date: 'May 6 · 12:30 AM' },
  ],
  pending_approval: [
    { id:'a1', initials:'PR', avatarBg:'#E91E63', text: <><b>Priyanka</b> edited the post</>,             date: 'May 5 · 5:12 PM' },
    { id:'a2', initials:'VI', avatarBg:'#3F51B5', text: <><b>Vijaya</b> approved this post</>,            date: 'May 5 · 11:45 AM' },
    { id:'a3', initials:'AR', avatarBg:'#FF5722', text: <><b>Arjun</b> rejected this post "Can be better"</>, date: 'May 5 · 12:30 AM' },
    { id:'a4', initials:'VM', avatarBg:'#607D8B', text: <><b>Vimal</b> created this post</>,              date: 'May 5 · 12:30 AM' },
  ],
  rejected: [
    { id:'a1', initials:'VI', avatarBg:'#3F51B5', text: <><b>Vijaya</b> approved this post</>,            date: 'May 5 · 11:45 AM' },
    { id:'a2', initials:'AR', avatarBg:'#FF5722', text: <><b>Arjun</b> rejected this post "Can be better"</>, date: 'May 5 · 12:30 AM' },
  ],
  draft: [],
};

function getChannels(post: Post): { posted: Channel[]; failed: boolean } {
  const seed = parseInt(post.id, 10) || 1;
  const count = (seed % 3) + 1;
  return { posted: CH.slice(0, count), failed: post.status === 'post_expired' };
}

function getMetrics(post: Post) {
  const s = parseInt(post.id, 10) || 1;
  return [
    { label: 'Impressions', value: (s * 317 + 1200).toLocaleString() },
    { label: 'Reach',       value: s * 23 + 80 },
    { label: 'Engagement',  value: (s * 285 + 900).toLocaleString() },
    { label: 'Eng. rate',   value: `${(s * 3 + 12) % 40}%` },
  ];
}

// ─── Small pieces ──────────────────────────────────────────────────────────────

function Avatar({ initials, bg, size = 36 }: { initials: string; bg: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: size * 0.33, fontWeight: 700, color: '#fff', letterSpacing: 0.3 }}>
        {initials}
      </span>
    </div>
  );
}

function SectionDivider() {
  return <div style={{ height: 1, background: Colors.divider, margin: `${Spacing.lg}px 0` }} />;
}

function SectionTitle({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ margin: `0 0 ${Spacing.md}px`, fontSize: FontSize.base, fontWeight: 600, color: color ?? Colors.textPrimary }}>
      {children}
    </p>
  );
}

// Edit & Repost button (blue filled, used in failed sections)
function EditRepostButton() {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      width: '100%', height: 40,
      background: Colors.primary, border: 0, borderRadius: Radius.full,
      color: '#fff', fontSize: FontSize.base, fontWeight: 600, cursor: 'pointer',
      marginTop: Spacing.md,
    }}>
      <MdEdit size={16} />
      Edit &amp; Repost
    </button>
  );
}

// Channel row (used in both posted + failed sections)
function ChannelRow({ ch, isLast }: { ch: Channel; isLast: boolean }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.md, padding: `12px 0` }}>
        <Avatar initials={ch.initials} bg={ch.avatarBg} size={40} />
        <span style={{ flex: 1, fontSize: FontSize.base, color: Colors.textPrimary }}>
          {ch.name} · {ch.location}
        </span>
        <button style={{ width: 32, height: 32, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: Colors.textSecondary }}>
          <MdMoreHoriz size={20} />
        </button>
      </div>
      {!isLast && <div style={{ height: 1, background: Colors.divider }} />}
    </>
  );
}

// ─── Header right-side buttons per status ────────────────────────────────────

const iconBtn: React.CSSProperties = {
  width: 36, height: 36, border: 0, borderRadius: 18, background: 'transparent',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

function HeaderActions({ status }: { status: PostStatus }) {
  if (status === 'published' || status === 'post_expired') {
    return (
      <div style={{ display: 'flex', gap: 2 }}>
        <button style={iconBtn} aria-label="Duplicate"><MdContentCopy size={20} color={Colors.textPrimary} /></button>
        <button style={iconBtn} aria-label="Delete"><MdDeleteOutline size={22} color={Colors.textPrimary} /></button>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      <button style={iconBtn} aria-label="Edit"><MdEdit size={20} color={Colors.textPrimary} /></button>
      <button style={iconBtn} aria-label="Reschedule"><MdCalendarToday size={19} color={Colors.textPrimary} /></button>
      <button style={iconBtn} aria-label="More"><MdMoreHoriz size={22} color={Colors.textPrimary} /></button>
    </div>
  );
}

// ─── Status section (top of scrollable content) ───────────────────────────────

function StatusSection({ post }: { post: Post }) {
  const dateStr = dayjs(post.status === 'published' ? (post.publishedAt ?? post.scheduledAt) : post.scheduledAt)
    .format('ddd, MMM D · h:mm A');

  if (post.status === 'published') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: Spacing.base }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#E8F5E9', borderRadius: Radius.full,
          padding: '4px 10px 4px 6px',
        }}>
          <MdCheckCircle size={14} color="#388E3C" />
          <span style={{ fontSize: FontSize.sm, color: '#388E3C', fontWeight: 500 }}>
            Posted on {dateStr}
          </span>
        </div>
      </div>
    );
  }

  if (post.status === 'post_expired') {
    return (
      <div style={{ marginBottom: Spacing.base }}>
        {/* Red chip row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#FEECEB', borderRadius: Radius.full,
          padding: '5px 12px 5px 8px', marginBottom: Spacing.md,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MdErrorOutline size={15} color='#D32F2F' />
            <span style={{ fontSize: FontSize.sm, color: '#D32F2F', fontWeight: 600 }}>
              Failed on 3 pages
            </span>
          </div>
          <span style={{ fontSize: FontSize.sm, color: Colors.primary, fontWeight: 500 }}>View Details</span>
        </div>
        {/* Edit & Repost CTA */}
        <EditRepostButton />
      </div>
    );
  }

  if (post.status === 'pending_approval') {
    return (
      <div style={{ marginBottom: Spacing.base }}>
        {/* Amber chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#FFF8E1', borderRadius: Radius.md,
          padding: '10px 14px', marginBottom: Spacing.md,
          border: `1px solid #FFE082`,
        }}>
          <MdAccessTime size={16} color='#F57F17' style={{ flexShrink: 0 }} />
          <span style={{ fontSize: FontSize.base, color: '#5D4037', lineHeight: 1.4 }}>
            Pending approval from you, <strong>Balaji &amp; Senthil</strong>
          </span>
        </div>
        {/* Reject / Approve buttons */}
        <div style={{ display: 'flex', gap: Spacing.sm }}>
          <button style={{
            flex: 1, height: 40, border: `1.5px solid ${Colors.divider}`,
            borderRadius: Radius.full, background: Colors.white, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontSize: FontSize.base, fontWeight: 600, color: Colors.textPrimary,
          }}>
            <MdBlock size={17} color={Colors.textPrimary} />
            Reject
          </button>
          <button style={{
            flex: 1, height: 40, border: 0, borderRadius: Radius.full,
            background: Colors.primary, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontSize: FontSize.base, fontWeight: 600, color: '#fff',
          }}>
            <MdCheckCircle size={17} color="#fff" />
            Approve
          </button>
        </div>
      </div>
    );
  }

  if (post.status === 'rejected') {
    return (
      <div style={{ marginBottom: Spacing.base }}>
        {/* Red chip */}
        <div style={{
          background: '#FEECEB', borderRadius: Radius.md,
          padding: '8px 14px', marginBottom: Spacing.sm,
          border: `1px solid #FFCDD2`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <MdBlock size={14} color='#D32F2F' />
            <span style={{ fontSize: FontSize.sm, fontWeight: 700, color: '#C62828' }}>
              Rapid has rejected this post
            </span>
          </div>
          <p style={{ margin: 0, fontSize: FontSize.sm, color: '#7B1F1F', lineHeight: 1.45 }}>
            Thank you for submitting this post but it doesn't quite match our current social media strategy.
          </p>
        </div>
        {/* Fix and submit again */}
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          border: `1.5px solid ${Colors.primary}`, borderRadius: Radius.full,
          background: 'transparent', padding: '7px 16px',
          fontSize: FontSize.base, fontWeight: 600, color: Colors.primary, cursor: 'pointer',
        }}>
          Fix and submit again
        </button>
      </div>
    );
  }

  // scheduled / draft — no chip, just show the scheduled date below
  return null;
}

// ─── Metadata line (platform icon + date) ────────────────────────────────────

function MetaLine({ post }: { post: Post }) {
  const { Icon, color } = PLATFORM_ICON[post.platform];
  const isPublished = post.status === 'published';
  const isPastFailed = post.status === 'post_expired';
  const date = dayjs(isPublished || isPastFailed ? (post.publishedAt ?? post.scheduledAt) : post.scheduledAt)
    .format('ddd, MMM D · h:mm A');
  const prefix = isPublished || isPastFailed ? 'Posted on' : 'Scheduled for';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: Spacing.base }}>
      <Icon size={14} color={color} />
      <span style={{ fontSize: FontSize.sm, color: Colors.textSecondary }}>
        {prefix} {date}
      </span>
    </div>
  );
}

// ─── Metrics row ──────────────────────────────────────────────────────────────

function MetricsSection({ post }: { post: Post }) {
  const items = getMetrics(post);
  return (
    <div style={{ marginBottom: Spacing.lg }}>
      <SectionTitle>Metrics</SectionTitle>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        background: Colors.white,
        border: `1px solid ${Colors.divider}`,
        borderRadius: Radius.md,
        overflow: 'hidden',
      }}>
        {items.map((m, i) => (
          <div key={m.label} style={{
            padding: `${Spacing.md}px ${Spacing.xs}px`,
            borderLeft: i > 0 ? `1px solid ${Colors.divider}` : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <span style={{ fontSize: FontSize.md + 2, fontWeight: 700, color: Colors.textPrimary }}>{m.value}</span>
            <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center', lineHeight: 1.3 }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props { post: Post | null; onClose: () => void }

export default function PostDetailSheet({ post, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAllChannels, setShowAllChannels] = useState(false);

  useEffect(() => {
    if (post) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
    setExpanded(false);
    setShowAllChannels(false);
  }, [post]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  if (!post) return null;

  function close() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  const { posted: postedChannels, failed } = getChannels(post);
  const activity = ACTIVITY[post.status] ?? ACTIVITY.scheduled;
  const isPublished = post.status === 'published';
  const isFailed = post.status === 'post_expired';
  const showMetrics = isPublished || isFailed;
  const isLong = post.content.length > 140;

  const channelsToShow = showAllChannels ? postedChannels : postedChannels.slice(0, 3);
  const hasMoreChannels = postedChannels.length > 3;

  const sectionLabel =
    isPublished ? `Posted on ${postedChannels.length} page${postedChannels.length > 1 ? 's' : ''}` :
    `Scheduled on ${postedChannels.length} page${postedChannels.length > 1 ? 's' : ''}`;

  return (
    <div
      role="presentation"
      onClick={close}
      style={{
        position: 'absolute', inset: 0,
        background: `rgba(0,0,0,${visible ? 0.45 : 0})`,
        transition: 'background 0.3s ease',
        zIndex: 200,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Post details"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', inset: 0,
          background: Colors.white,
          display: 'flex', flexDirection: 'column',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          height: 56, flexShrink: 0,
          paddingLeft: Spacing.xs, paddingRight: Spacing.sm,
          background: Colors.white,
          borderBottom: `1px solid ${Colors.divider}`,
          position: 'relative', zIndex: 2,
        }}>
          {/* Back button: chevron + "Details" label together as a single tap target */}
          <button
            onClick={close}
            aria-label="Go back"
            style={{
              display: 'flex', alignItems: 'center', gap: 0,
              border: 0, background: 'transparent', cursor: 'pointer', padding: '0 4px',
              color: Colors.primary,
            }}
          >
            <MdChevronLeft size={28} color={Colors.primary} />
            <span style={{ fontSize: FontSize.base, fontWeight: 400, color: Colors.primary }}>Details</span>
          </button>
          <div style={{ flex: 1 }} />
          <HeaderActions status={post.status} />
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex: 1, overflowY: 'auto', background: Colors.white, padding: `${Spacing.base}px ${Spacing.base}px 80px` }}>

          {/* Status section (chip + CTA buttons) */}
          <StatusSection post={post} />

          {/* Metadata line */}
          <MetaLine post={post} />

          {/* Post content */}
          <div style={{ marginBottom: Spacing.base }}>
            <p style={{
              margin: 0,
              fontSize: FontSize.base, color: Colors.textPrimary, lineHeight: 1.55,
              overflow: expanded ? 'visible' : 'hidden',
              display: expanded ? 'block' : '-webkit-box',
              WebkitLineClamp: expanded ? undefined : 5,
              WebkitBoxOrient: 'vertical',
            }}>
              {post.content}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded(v => !v)}
                style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: 0, marginTop: 4, fontSize: FontSize.base, fontWeight: 500, color: Colors.primary }}
              >
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Media */}
          {post.mediaUrl && (
            <div style={{ marginBottom: Spacing.base }}>
              <div style={{ borderRadius: Radius.lg, overflow: 'hidden', width: '100%', aspectRatio: '4/3', background: Colors.divider, position: 'relative' }}>
                <img
                  src={post.mediaUrl} alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                {post.mediaCount && post.mediaCount > 1 && (
                  <div style={{
                    position: 'absolute', top: Spacing.sm, right: Spacing.sm,
                    background: 'rgba(0,0,0,0.55)', borderRadius: Radius.full,
                    padding: '3px 9px',
                    fontSize: FontSize.sm, color: '#fff', fontWeight: 600,
                  }}>
                    1/{post.mediaCount}
                  </div>
                )}
              </div>
              {/* Page dots */}
              {post.mediaCount && post.mediaCount > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: Spacing.sm }}>
                  {Array.from({ length: Math.min(post.mediaCount, 5) }).map((_, i) => (
                    <div key={i} style={{
                      width: i === 0 ? 16 : 6, height: 6,
                      borderRadius: 3,
                      background: i === 0 ? Colors.primary : Colors.divider,
                      transition: 'width 0.2s',
                    }} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Metrics */}
          {showMetrics && (
            <>
              <SectionDivider />
              <MetricsSection post={post} />
            </>
          )}

          <SectionDivider />

          {/* Posted / Scheduled channels */}
          <SectionTitle>{sectionLabel}</SectionTitle>
          {channelsToShow.map((ch, i) => (
            <ChannelRow key={ch.id} ch={ch} isLast={i === channelsToShow.length - 1 && !hasMoreChannels} />
          ))}
          {hasMoreChannels && !showAllChannels && (
            <button
              onClick={() => setShowAllChannels(true)}
              style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: '8px 0', fontSize: FontSize.base, color: Colors.primary, fontWeight: 500 }}
            >
              View more
            </button>
          )}

          {/* Failed channels (post_expired only) */}
          {failed && (
            <>
              <SectionDivider />
              <SectionTitle color="#D32F2F">Failed on 3 pages</SectionTitle>

              {/* Sub-section 1: Posting failed */}
              <div style={{ marginBottom: Spacing.lg }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.sm }}>
                  <MdWarningAmber size={17} color="#F57F17" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: FontSize.base, fontWeight: 600, color: Colors.textPrimary }}>Posting failed</p>
                    <p style={{ margin: '2px 0 0', fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 1.4 }}>
                      We are monitoring such failed posts for potential fixes
                    </p>
                  </div>
                </div>
                {FAILED_MONITORING.map((ch, i) => (
                  <ChannelRow key={ch.id} ch={ch} isLast={i === FAILED_MONITORING.length - 1} />
                ))}
                <EditRepostButton />
              </div>

              {/* Sub-section 2: Pages need to be reconnected */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.sm }}>
                  <MdErrorOutline size={17} color="#D32F2F" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: FontSize.base, fontWeight: 600, color: Colors.textPrimary }}>Pages need to be reconnected</p>
                    <p style={{ margin: '2px 0 0', fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 1.4 }}>
                      Password or permissions may have changed on the pages
                    </p>
                  </div>
                </div>
                {FAILED_RECONNECT.map((ch, i) => (
                  <ChannelRow key={ch.id} ch={ch} isLast={i === FAILED_RECONNECT.length - 1} />
                ))}
                <EditRepostButton />
              </div>
            </>
          )}

          <SectionDivider />

          {/* Activity */}
          <SectionTitle>Activity</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {activity.map((item, i) => (
              <div key={item.id}>
                <div style={{ display: 'flex', gap: Spacing.md, alignItems: 'flex-start', padding: `10px 0` }}>
                  <Avatar initials={item.initials} bg={item.avatarBg} size={38} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: FontSize.base, color: Colors.textPrimary, lineHeight: 1.45 }}>
                      {item.text}
                    </p>
                    <span style={{ fontSize: FontSize.sm, color: Colors.textSecondary, display: 'block', marginTop: 2 }}>
                      {item.date}
                    </span>
                  </div>
                </div>
                {i < activity.length - 1 && <div style={{ height: 1, background: Colors.divider }} />}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
