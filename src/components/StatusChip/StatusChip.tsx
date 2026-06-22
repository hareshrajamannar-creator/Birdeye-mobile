import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusConfig, Typography, Spacing, BorderRadius, Layout } from '../../tokens';
import type { PostStatus } from '../../types';

interface StatusChipProps {
  status: PostStatus;
}

/** Statuses that show a chip — 'published', 'draft', 'scheduled' render nothing */
const CHIP_STATUSES: PostStatus[] = ['post_expired', 'pending_approval', 'rejected'];

export default function StatusChip({ status }: StatusChipProps) {
  if (!CHIP_STATUSES.includes(status)) return null;

  const config = StatusConfig[status as keyof typeof StatusConfig];

  return (
    <View
      style={[styles.chip, { backgroundColor: config.backgroundColor }]}
      accessibilityLabel={config.label}
      accessibilityRole="text"
    >
      <MaterialIcons
        name={config.icon as React.ComponentProps<typeof MaterialIcons>['name']}
        size={12}
        color={config.textColor}
        style={styles.icon}
      />
      <Text style={[styles.label, { color: config.textColor }]} numberOfLines={1}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    height: Layout.statusChipHeight,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 3,
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    lineHeight: Typography.size.sm * Typography.lineHeight.normal,
  },
});
