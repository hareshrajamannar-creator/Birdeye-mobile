import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ListView from './ListView';
import CalendarMonthView from './CalendarMonthView';
import EngagementsScreen from './EngagementsScreen';
import { FAB } from '../../components';
import { Colors, Typography, Spacing, Layout, BorderRadius, Shadows } from '../../tokens';
import { groupPostsByDay } from '../../utils/dateUtils';
import { mockPosts as MOCK_POSTS } from '../../data/mockPosts';
import type { ViewMode, Post } from '../../types';

type FeedMode = 'posts' | 'engagements';

const FEED_OPTIONS: { value: FeedMode; label: string }[] = [
  { value: 'posts',       label: 'All posts' },
  { value: 'engagements', label: 'All engagements' },
];

export default function SocialScreen() {
  const [feedMode, setFeedMode]   = useState<FeedMode>('posts');
  const [viewMode, setViewMode]   = useState<ViewMode>('list');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const selectFeedMode = useCallback((mode: FeedMode) => {
    setFeedMode(mode);
    setDropdownOpen(false);
  }, []);

  const currentLabel = FEED_OPTIONS.find((o) => o.value === feedMode)?.label ?? 'All posts';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Top bar */}
      <View style={styles.topBar}>
        {/* Title with dropdown */}
        <TouchableOpacity
          style={styles.titleRow}
          onPress={() => setDropdownOpen(true)}
          accessibilityLabel="Select feed type"
          accessibilityRole="button"
        >
          <Text style={styles.title}>{currentLabel}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>

        {/* Action icons */}
        <View style={styles.actionRow}>
          {feedMode === 'posts' ? (
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
          ) : (
            <TouchableOpacity
              style={styles.iconBtn}
              accessibilityLabel="Search engagements"
              accessibilityRole="button"
            >
              <MaterialIcons name="search" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.iconBtn}
            accessibilityLabel="Refresh"
            accessibilityRole="button"
          >
            <MaterialIcons name="refresh" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            accessibilityLabel={feedMode === 'posts' ? 'Filters' : 'More options'}
            accessibilityRole="button"
          >
            <MaterialIcons
              name={feedMode === 'posts' ? 'tune' : 'more-vert'}
              size={22}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.topDivider} />

      {/* Content */}
      {feedMode === 'engagements' ? (
        <EngagementsScreen />
      ) : viewMode === 'list' ? (
        <ListView groups={groups} onPostPress={handlePostPress} />
      ) : (
        <CalendarMonthView groups={groups} onPostPress={handlePostPress} />
      )}

      {/* FAB — only on posts view */}
      {feedMode === 'posts' && <FAB onPress={handleFABPress} />}

      {/* Feed-mode dropdown modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setDropdownOpen(false)}>
          <View style={styles.dropdown}>
            {FEED_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.dropdownItem,
                  feedMode === option.value && styles.dropdownItemActive,
                ]}
                onPress={() => selectFeedMode(option.value)}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    feedMode === option.value && styles.dropdownItemTextActive,
                  ]}
                >
                  {option.label}
                </Text>
                {feedMode === option.value && (
                  <MaterialIcons name="check" size={18} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
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
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.medium,
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

  // Dropdown modal
  modalBackdrop: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: Layout.topBarHeight + 44, // below status bar + top bar
    left: Layout.screenHorizontalPadding,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
    minWidth: 200,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  dropdownItemActive: {
    backgroundColor: Colors.primaryLight,
  },
  dropdownItemText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.textPrimary,
  },
  dropdownItemTextActive: {
    fontWeight: Typography.weight.semibold,
    color: Colors.primary,
  },
});
