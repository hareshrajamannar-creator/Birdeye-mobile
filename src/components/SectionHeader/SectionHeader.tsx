import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Layout } from '../../tokens';

interface SectionHeaderProps {
  dateLabel: string;
  dayName: string;
}

export default function SectionHeader({ dateLabel, dayName }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{dateLabel}</Text>
      <Text style={styles.dayText}>{dayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: Layout.screenHorizontalPadding,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xs,
    backgroundColor: Colors.background,
    gap: Spacing.sm,
  },
  dateText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
    lineHeight: Typography.size.md * Typography.lineHeight.tight,
  },
  dayText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.textSecondary,
    lineHeight: Typography.size.base * Typography.lineHeight.normal,
  },
});
