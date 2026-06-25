import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PlatformIcon } from '../index';
import { Colors, Typography, Spacing, BorderRadius } from '../../tokens';
import type { Engagement, EngagementCategory, EngagementSentiment, EngagementPriority } from '../../types';

interface EngagementCardProps {
  engagement: Engagement;
  onPostReply?: (id: string) => void;
}

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoChip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Text style={[styles.chipText, { color }]}>{label}</Text>
    </View>
  );
}

function AvatarCircle({ initials }: { initials: string }) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function ActionIconBtn({
  iconName,
  count,
}: {
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
  count?: number;
}) {
  return (
    <View style={[styles.actionBtn, count !== undefined && styles.actionBtnWithCount]}>
      <MaterialIcons name={iconName} size={20} color={Colors.textPrimary} />
      {count !== undefined && (
        <Text style={styles.actionCount}>{count}</Text>
      )}
    </View>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────

export default function EngagementCard({ engagement, onPostReply }: EngagementCardProps) {
  const {
    id,
    authorName,
    authorInitials,
    platform,
    timeLabel,
    category,
    sentiment,
    priority,
    contextBusiness,
    content,
    likeCount,
    commentCount,
    suggestedReply,
  } = engagement;

  const handlePostReply = useCallback(() => {
    onPostReply?.(id);
  }, [id, onPostReply]);

  const categoryChip  = CATEGORY_CHIP[category];
  const sentimentChip = SENTIMENT_CHIP[sentiment];
  const priorityChip  = PRIORITY_CHIP[priority];

  return (
    <View style={styles.card}>
      {/* Header: avatar + name/time + platform icon */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <AvatarCircle initials={authorInitials} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{authorName}</Text>
            <Text style={styles.authorMeta}>{timeLabel}</Text>
          </View>
        </View>
        <PlatformIcon platform={platform} size={20} />
      </View>

      {/* Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chipsRow}
      >
        <InfoChip {...categoryChip} />
        <InfoChip {...sentimentChip} />
        <InfoChip {...priorityChip} />
      </ScrollView>

      {/* Context line */}
      <Text style={styles.contextText} numberOfLines={1}>
        {'Commented on a post shared by '}
        <Text style={styles.contextBusiness}>{contextBusiness}</Text>
      </Text>

      {/* Comment content */}
      <Text style={styles.content} numberOfLines={3}>
        {content}
        <Text style={styles.seeMore}>{' ... see more'}</Text>
      </Text>

      {/* AI suggested reply */}
      {suggestedReply ? (
        <View style={styles.aiReplyCard}>
          <Text style={styles.aiReplyLabel}>Reply suggested by Social engagement agent</Text>
          <Text style={styles.aiReplyText}>{suggestedReply}</Text>
          <View style={styles.aiReplyActions}>
            <TouchableOpacity
              style={styles.postReplyBtn}
              onPress={handlePostReply}
              accessibilityRole="button"
              accessibilityLabel="Post reply"
            >
              <Text style={styles.postReplyBtnText}>Post reply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="More options"
            >
              <MaterialIcons name="more-vert" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* Action bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionBar}
      >
        <ActionIconBtn iconName="thumb-up" count={likeCount} />
        <ActionIconBtn iconName="mode-comment" count={commentCount} />
        <ActionIconBtn iconName="reply" />
        <ActionIconBtn iconName="person-add" />
        <ActionIconBtn iconName="check-circle" />
        <ActionIconBtn iconName="label" />
        <ActionIconBtn iconName="more-vert" />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const AVATAR_SIZE = 36;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.white,
  },
  authorInfo: {
    gap: 2,
  },
  authorName: {
    fontSize: 15,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
  },
  authorMeta: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.regular,
    color: '#555555',
  },

  // Chips
  chipsScroll: {
    flexGrow: 0,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  chipText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.regular,
    lineHeight: 18,
  },

  // Context
  contextText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.regular,
    color: '#555555',
    lineHeight: Typography.size.sm * Typography.lineHeight.normal,
  },
  contextBusiness: {
    fontWeight: Typography.weight.semibold,
    color: '#555555',
  },

  // Content
  content: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.textPrimary,
    lineHeight: Typography.size.base * Typography.lineHeight.normal,
  },
  seeMore: {
    fontWeight: Typography.weight.medium,
    color: Colors.primary,
  },

  // AI reply card
  aiReplyCard: {
    backgroundColor: '#F9F7FD',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  aiReplyLabel: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.regular,
    color: '#6834B7',
    lineHeight: Typography.size.sm * Typography.lineHeight.normal,
  },
  aiReplyText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.regular,
    color: Colors.textPrimary,
    lineHeight: Typography.size.sm * Typography.lineHeight.normal,
  },
  aiReplyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  postReplyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm - 2,
  },
  postReplyBtnText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.white,
  },

  // Action bar
  actionBar: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  actionBtn: {
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
  },
  actionBtnWithCount: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionCount: {
    fontSize: 13,
    fontWeight: Typography.weight.regular,
    color: Colors.textPrimary,
  },
});
