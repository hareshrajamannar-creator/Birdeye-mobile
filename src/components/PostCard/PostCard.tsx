import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import PlatformIcon from '../PlatformIcon/PlatformIcon';
import StatusChip from '../StatusChip/StatusChip';
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Layout,
} from '../../tokens';
import { formatTime, formatPostedOn } from '../../utils/dateUtils';
import type { Post } from '../../types';

interface PostCardProps {
  post: Post;
  onPress?: (post: Post) => void;
}

function PostCard({ post, onPress }: PostCardProps) {
  const timeLabel =
    post.status === 'published' && post.publishedAt
      ? formatPostedOn(post.publishedAt)
      : formatTime(post.scheduledAt);

  const handlePress = () => onPress?.(post);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${post.platform} post: ${post.content.slice(0, 60)}`}
    >
      {/* Content area */}
      <View style={styles.content}>
        {/* Top row: platform icon + time + status chip */}
        <View style={styles.metaRow}>
          <PlatformIcon platform={post.platform} size={16} />
          <Text style={styles.timeText}>{timeLabel}</Text>
          {post.status !== 'published' && post.status !== 'scheduled' && (
            <StatusChip status={post.status} />
          )}
        </View>

        {/* Post content text */}
        <Text style={styles.contentText} numberOfLines={2}>
          {post.content}
        </Text>
      </View>

      {/* Thumbnail */}
      {post.mediaUrl ? (
        <View style={styles.thumbnailWrapper}>
          <Image
            source={{ uri: post.mediaUrl }}
            style={styles.thumbnail}
            accessibilityLabel="Post media preview"
            accessibilityRole="image"
          />
          {post.mediaCount && post.mediaCount > 1 && (
            <View style={styles.mediaCountBadge}>
              <Text style={styles.mediaCountText}>
                1/{post.mediaCount}
              </Text>
            </View>
          )}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default memo(PostCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Layout.screenHorizontalPadding,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    minHeight: 90,
  },
  content: {
    flex: 1,
    paddingRight: Spacing.md,
    justifyContent: 'flex-start',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
    flexWrap: 'wrap',
  },
  timeText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.textPrimary,
    lineHeight: Typography.size.base * Typography.lineHeight.normal,
  },
  contentText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.textPrimary,
    lineHeight: Typography.size.base * Typography.lineHeight.relaxed,
    ...Platform.select({
      ios: { fontFamily: 'System' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  thumbnailWrapper: {
    position: 'relative',
  },
  thumbnail: {
    width: Layout.thumbnailSize,
    height: Layout.thumbnailSize,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.grey03,
  },
  mediaCountBadge: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  mediaCountText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium,
    color: Colors.white,
  },
});
