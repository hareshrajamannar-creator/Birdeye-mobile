import React from 'react';
import {
  MdThumbUpOffAlt,
  MdChatBubbleOutline,
  MdReply,
  MdPersonAddAlt1,
  MdCheckCircleOutline,
  MdLabelOutline,
  MdMoreVert,
} from 'react-icons/md';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import { Colors, FontSize, Spacing, Radius } from '../tokens';
import { MOCK_ENGAGEMENTS } from '../data/mockEngagements';
import type {
  Engagement,
  Platform,
  EngagementCategory,
  EngagementSentiment,
  EngagementPriority,
} from '../types';

// ─── Chip config ──────────────────────────────────────────────────────────────

const CATEGORY_CHIP: Record<EngagementCategory, { label: string; bg: string; color: string }> = {
  complaint: { label: 'Complaint', bg: '#F5F5F5', color: '#555555' },
  question:  { label: 'Question',  bg: '#F5F5F5', color: '#555555' },
  praise:    { label: 'Praise',    bg: '#F5F5F5', color: '#555555' },
  other:     { label: 'Other',     bg: '#F5F5F5', color: '#555555' },
};

const SENTIMENT_CHIP: Record<EngagementSentiment, { label: string; bg: string; color: string }> = {
  positive: { label: 'Positive', bg: '#F1FAF0', color: '#377E2C' },
  neutral:  { label: 'Neutral',  bg: '#F5F5F5', color: '#555555' },
  negative: { label: 'Negative', bg: '#FEF6F5', color: '#DE1B0C' },
};

const PRIORITY_CHIP: Record<EngagementPriority, { label: string; bg: string; color: string }> = {
  high:   { label: 'High',   bg: '#FEF6F5', color: '#DE1B0C' },
  medium: { label: 'Medium', bg: '#FEF3D6', color: '#F57C00' },
  low:    { label: 'Low',    bg: '#F5F5F5', color: '#555555' },
};

// ─── Avatar colors ────────────────────────────────────────────────────────────

const AVATAR_COLORS = ['#8B6355', '#C0715A', '#4A7FB5', '#6A9E6F', '#A07BB5'];

// ─── Platform badge ───────────────────────────────────────────────────────────

type PlatformCfg = {
  background: string;
  borderRadius: number;
  Icon: React.ComponentType<{ size: number; color: string }>;
};

const PLATFORM_CFG: Partial<Record<Platform, PlatformCfg>> = {
  facebook: {
    background: '#1877F2',
    borderRadius: 999,
    Icon: FaFacebook,
  },
  instagram: {
    // Instagram gradient
    background: 'linear-gradient(45deg, #F9CE34 0%, #EE2A7B 50%, #6228D7 100%)',
    borderRadius: 999,
    Icon: FaInstagram,
  },
  linkedin: {
    background: '#0A66C2',
    borderRadius: 5,
    Icon: FaLinkedin,
  },
  twitter: {
    background: '#14171A',
    borderRadius: 999,
    Icon: FaTwitter,
  },
};

function PlatformBadge({ platform }: { platform: Platform }) {
  const cfg = PLATFORM_CFG[platform];
  if (!cfg) return null;
  return (
    <span style={{
      width: 20,
      height: 20,
      borderRadius: cfg.borderRadius,
      background: cfg.background,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <cfg.Icon size={12} color="#fff" />
    </span>
  );
}

// ─── Info chip ────────────────────────────────────────────────────────────────

function InfoChip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{
      background: bg,
      color,
      fontSize: FontSize.sm,
      fontWeight: 400,
      lineHeight: '18px',
      padding: `${Spacing.xs}px ${Spacing.sm}px`,
      borderRadius: Radius.sm,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

// ─── Action button ────────────────────────────────────────────────────────────

function ActionBtn({ icon, count }: { icon: React.ReactNode; count?: number }) {
  return (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xs,
        border: `1px solid ${Colors.divider}`,
        borderRadius: Radius.sm,
        padding: `${Spacing.sm}px ${Spacing.md}px`,
        background: 'transparent',
        cursor: 'pointer',
        color: Colors.textPrimary,
        flexShrink: 0,
        minWidth: 36,
        height: 36,
      }}
    >
      {icon}
      {count !== undefined && (
        <span style={{ fontSize: 13, fontWeight: 400, color: Colors.textPrimary }}>
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Engagement card ──────────────────────────────────────────────────────────

function EngagementCard({
  engagement,
  avatarColor,
}: {
  engagement: Engagement;
  avatarColor: string;
}) {
  const {
    authorName,
    authorInitials,
    platform,
    timeLabel,
    category,
    sentiment,
    priority,
    contextBusiness,
    content,
    thumbnailUrl,
    likeCount,
    commentCount,
    suggestedReply,
  } = engagement;

  return (
    <div style={{
      background: Colors.white,
      borderBottom: `1px solid #E9E9EB`,
      paddingLeft: Spacing.base,
      paddingRight: Spacing.base,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.lg,
      display: 'flex',
      flexDirection: 'column',
      gap: Spacing.md,
    }}>

      {/* ── Header: avatar + name/time + platform badge ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <span style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            background: avatarColor,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: FontSize.sm,
            fontWeight: 600,
            color: '#fff',
            flexShrink: 0,
            letterSpacing: 0.5,
          }}>
            {authorInitials}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              color: Colors.textPrimary,
              lineHeight: '20px',
            }}>
              {authorName}
            </span>
            <span style={{
              fontSize: FontSize.sm,
              fontWeight: 400,
              color: '#555555',
              lineHeight: '16px',
            }}>
              {timeLabel}
            </span>
          </div>
        </div>
        <PlatformBadge platform={platform} />
      </div>

      {/* ── Chips ── */}
      <div style={{ display: 'flex', gap: Spacing.sm, flexWrap: 'wrap' }}>
        <InfoChip {...CATEGORY_CHIP[category]} />
        <InfoChip {...SENTIMENT_CHIP[sentiment]} />
        <InfoChip {...PRIORITY_CHIP[priority]} />
      </div>

      {/* ── Context line ── */}
      <p style={{
        margin: 0,
        fontSize: FontSize.sm,
        fontWeight: 400,
        color: '#555555',
        lineHeight: 1.5,
      }}>
        {'Commented on a post shared by '}
        <strong style={{ fontWeight: 600, color: '#555555' }}>{contextBusiness}</strong>
      </p>

      {/* ── Content + optional thumbnail ── */}
      <div style={{ display: 'flex', gap: Spacing.md, alignItems: 'flex-start' }}>
        <p style={{
          margin: 0,
          flex: 1,
          fontSize: FontSize.base,
          fontWeight: 400,
          color: Colors.textPrimary,
          lineHeight: 1.5,
          minWidth: 0,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: thumbnailUrl ? 4 : 3,
          WebkitBoxOrient: 'vertical',
        } as React.CSSProperties}>
          {content}
          {' '}
          <span style={{ fontWeight: 500, color: Colors.primary }}>... see more</span>
        </p>
        {thumbnailUrl && (
          <div style={{
            width: 64,
            height: 64,
            borderRadius: Radius.md,
            background: 'linear-gradient(135deg, #8FAF78 0%, #5C8050 100%)',
            flexShrink: 0,
            overflow: 'hidden',
          }} />
        )}
      </div>

      {/* ── AI suggested reply ── */}
      {suggestedReply && (
        <div style={{
          background: '#F9F7FD',
          borderRadius: Radius.md,
          padding: Spacing.md,
          display: 'flex',
          flexDirection: 'column',
          gap: Spacing.sm,
        }}>
          <span style={{
            fontSize: FontSize.sm,
            fontWeight: 400,
            color: '#6834B7',
            lineHeight: 1.5,
          }}>
            Reply suggested by Social engagement agent
          </span>
          <span style={{
            fontSize: FontSize.sm,
            fontWeight: 400,
            color: Colors.textPrimary,
            lineHeight: 1.5,
          }}>
            {suggestedReply}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: Spacing.sm }}>
            <button
              type="button"
              style={{
                background: Colors.primary,
                color: '#fff',
                border: 0,
                borderRadius: Radius.sm,
                padding: `6px ${Spacing.md}px`,
                fontSize: FontSize.sm,
                fontWeight: 500,
                cursor: 'pointer',
                lineHeight: '20px',
              }}
            >
              Post reply
            </button>
            <button
              type="button"
              style={{
                border: 0,
                background: 'transparent',
                cursor: 'pointer',
                color: '#555555',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MdMoreVert size={20} />
            </button>
          </div>
        </div>
      )}

      {/* ── Action bar ── */}
      <div style={{
        display: 'flex',
        gap: Spacing.sm,
        overflowX: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      } as React.CSSProperties}>
        <ActionBtn icon={<MdThumbUpOffAlt size={20} />} count={likeCount} />
        <ActionBtn icon={<MdChatBubbleOutline size={20} />} count={commentCount} />
        <ActionBtn icon={<MdReply size={20} />} />
        <ActionBtn icon={<MdPersonAddAlt1 size={20} />} />
        <ActionBtn icon={<MdCheckCircleOutline size={20} />} />
        <ActionBtn icon={<MdLabelOutline size={20} />} />
        <ActionBtn icon={<MdMoreVert size={20} />} />
      </div>
    </div>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function EngagementsScreen() {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      background: Colors.white,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
    }}>
      {MOCK_ENGAGEMENTS.map((eng, i) => (
        <EngagementCard
          key={eng.id}
          engagement={eng}
          avatarColor={AVATAR_COLORS[i % AVATAR_COLORS.length]}
        />
      ))}
    </div>
  );
}
