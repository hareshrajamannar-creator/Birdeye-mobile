import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ListView from './ListView';
import CalendarMonthView from './CalendarMonthView';
import { FAB } from '../../components';
import { Colors, Typography, Spacing, Layout } from '../../tokens';
import { groupPostsByDay } from '../../utils/dateUtils';
import { MOCK_POSTS } from '../../data/mockPosts';
import type { ViewMode, Post } from '../../types';

export default function SocialScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const groups = useMemo(() => groupPostsByDay(MOCK_POSTS), []);

  const handlePostPress = useCallback((_post: Post) => {
    // TODO: open post detail bottom sheet
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'list' ? 'month' : 'list'));
  }, []);

  const handleFABPress = useCallback(() => {
    // TODO: open create post flow
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Top bar */}
      <View style={styles.topBar}>
        {/* Title with dropdown */}
        <TouchableOpacity
          style={styles.titleRow}
          accessibilityLabel="Filter posts"
          accessibilityRole="button"
        >
          <Text style={styles.title}>All posts</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>

        {/* Action icons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={toggleViewMode}
            style={[styles.iconBtn, viewMode === 'month' && styles.iconBtnActive]}
            accessibilityLabel={viewMode === 'list' ? 'Switch to calendar view' : 'Switch to list view'}
            accessibilityRole="button"
          >
            <MaterialIcons
              name={viewMode === 'list' ? 'calendar-today' : 'format-list-bulleted'}
              size={22}
              color={viewMode === 'month' ? Colors.primary : Colors.textPrimary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            accessibilityLabel="Refresh"
            accessibilityRole="button"
          >
            <MaterialIcons name="refresh" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            accessibilityLabel="Filters"
            accessibilityRole="button"
          >
            <MaterialIcons name="tune" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.topDivider} />

      {/* Content */}
      {viewMode === 'list' ? (
        <ListView groups={groups} onPostPress={handlePostPress} />
      ) : (
        <CalendarMonthView groups={groups} onPostPress={handlePostPress} />
      )}

      {/* FAB */}
      <FAB onPress={handleFABPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.screenHorizontalPadding,
    height: Layout.topBarHeight,
    backgroundColor: Colors.white,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnActive: {
    backgroundColor: Colors.primaryLight,
  },
  topDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider,
  },
});
