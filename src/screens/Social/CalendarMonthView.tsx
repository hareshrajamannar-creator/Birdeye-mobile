import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import dayjs from 'dayjs';
import { MaterialIcons } from '@expo/vector-icons';
import { CalendarGrid, PostCard, Divider, EmptyState } from '../../components';
import { Colors, Typography, Spacing, Layout, Shadows } from '../../tokens';
import type { Post, DayGroup } from '../../types';
import { toDateKey, formatDateLabel, formatDayName } from '../../utils/dateUtils';

interface CalendarMonthViewProps {
  groups: DayGroup[];
  onPostPress?: (post: Post) => void;
}

export default function CalendarMonthView({ groups, onPostPress }: CalendarMonthViewProps) {
  const today = dayjs();
  const [displayYear, setDisplayYear] = useState(today.year());
  const [displayMonth, setDisplayMonth] = useState(today.month()); // 0-indexed
  const [selectedDateKey, setSelectedDateKey] = useState(today.format('YYYY-MM-DD'));

  // Build a Map<dateKey, Post[]> from the grouped data for O(1) calendar lookups
  const postsByDay = useMemo(() => {
    const map = new Map<string, Post[]>();
    groups.forEach((g) => map.set(g.dateKey, g.posts));
    return map;
  }, [groups]);

  // Posts for the currently selected day
  const selectedPosts = useMemo(
    () => postsByDay.get(selectedDateKey) ?? [],
    [postsByDay, selectedDateKey]
  );

  const selectedDateLabel = useMemo(() => {
    const isoString = selectedDateKey + 'T00:00:00Z';
    return `${formatDateLabel(isoString)} · ${formatDayName(isoString)}`;
  }, [selectedDateKey]);

  const monthLabel = useMemo(
    () => dayjs().year(displayYear).month(displayMonth).format('MMMM YYYY'),
    [displayYear, displayMonth]
  );

  const goToPrevMonth = useCallback(() => {
    const prev = dayjs().year(displayYear).month(displayMonth).subtract(1, 'month');
    setDisplayYear(prev.year());
    setDisplayMonth(prev.month());
  }, [displayYear, displayMonth]);

  const goToNextMonth = useCallback(() => {
    const next = dayjs().year(displayYear).month(displayMonth).add(1, 'month');
    setDisplayYear(next.year());
    setDisplayMonth(next.month());
  }, [displayYear, displayMonth]);

  const handleSelectDay = useCallback((dateKey: string) => {
    setSelectedDateKey(dateKey);
  }, []);

  const renderPost = useCallback(
    ({ item }: { item: Post }) => (
      <>
        <PostCard post={item} onPress={onPostPress} />
        <Divider />
      </>
    ),
    [onPostPress]
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <View style={styles.container}>
      {/* Month navigation header */}
      <View style={styles.monthHeader}>
        <TouchableOpacity
          onPress={goToPrevMonth}
          style={styles.navBtn}
          accessibilityLabel="Previous month"
          accessibilityRole="button"
        >
          <MaterialIcons name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.monthLabel}>{monthLabel}</Text>

        <TouchableOpacity
          onPress={goToNextMonth}
          style={styles.navBtn}
          accessibilityLabel="Next month"
          accessibilityRole="button"
        >
          <MaterialIcons name="chevron-right" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Calendar grid */}
      <CalendarGrid
        year={displayYear}
        month={displayMonth}
        postsByDay={postsByDay}
        selectedDateKey={selectedDateKey}
        onSelectDay={handleSelectDay}
      />

      {/* Divider between calendar and day posts */}
      <View style={styles.sectionDivider} />

      {/* Selected day header */}
      <View style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>{selectedDateLabel}</Text>
        {selectedPosts.length > 0 && (
          <View style={styles.dayCountBadge}>
            <Text style={styles.dayCountText}>{selectedPosts.length}</Text>
          </View>
        )}
      </View>

      {/* Posts list for selected day */}
      {selectedPosts.length === 0 ? (
        <EmptyState
          title="No posts on this day"
          subtitle="Tap another day or create a new post."
          iconName="event-busy"
        />
      ) : (
        <FlatList
          data={selectedPosts}
          keyExtractor={keyExtractor}
          renderItem={renderPost}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.postListContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.screenHorizontalPadding,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  monthLabel: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionDivider: {
    height: Spacing.sm,
    backgroundColor: Colors.background,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.screenHorizontalPadding,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    gap: Spacing.sm,
  },
  dayHeaderText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
  },
  dayCountBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  dayCountText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.white,
  },
  postListContent: {
    paddingBottom: 100,
  },
});
