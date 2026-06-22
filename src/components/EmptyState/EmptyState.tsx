import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../tokens';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  iconName?: React.ComponentProps<typeof MaterialIcons>['name'];
}

export default function EmptyState({
  title,
  subtitle,
  iconName = 'article',
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={iconName} size={48} color={Colors.grey03} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.xxxl,
  },
  icon: {
    marginBottom: Spacing.base,
  },
  title: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.size.base * Typography.lineHeight.relaxed,
  },
});
