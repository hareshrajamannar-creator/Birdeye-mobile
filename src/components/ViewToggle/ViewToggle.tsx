import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../../tokens';
import type { ViewMode } from '../../types';

interface ViewToggleProps {
  mode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

export default function ViewToggle({ mode, onToggle }: ViewToggleProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, mode === 'list' && styles.btnActive]}
        onPress={() => onToggle('list')}
        accessibilityLabel="List view"
        accessibilityRole="button"
        accessibilityState={{ selected: mode === 'list' }}
      >
        <MaterialIcons
          name="format-list-bulleted"
          size={20}
          color={mode === 'list' ? Colors.primary : Colors.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, mode === 'month' && styles.btnActive]}
        onPress={() => onToggle('month')}
        accessibilityLabel="Calendar month view"
        accessibilityRole="button"
        accessibilityState={{ selected: mode === 'month' }}
      >
        <MaterialIcons
          name="calendar-today"
          size={20}
          color={mode === 'month' ? Colors.primary : Colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    gap: Spacing.xs,
  },
  btn: {
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: Colors.primaryLight,
  },
});
