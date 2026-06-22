import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Shadows, Layout } from '../../tokens';

interface FABProps {
  onPress: () => void;
  accessibilityLabel?: string;
}

/** Floating Action Button — compose new post */
export default function FAB({ onPress, accessibilityLabel = 'Create new post' }: FABProps) {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.85}
    >
      <MaterialIcons name="add" size={28} color={Colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: Layout.screenHorizontalPadding,
    bottom: Layout.bottomTabHeight + 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
});
