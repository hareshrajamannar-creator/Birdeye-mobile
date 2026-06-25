import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, CalendarTokens } from '../../tokens';
import { getCalendarDays } from '../../utils/dateUtils';
import type { Post } from '../../types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CELL_WIDTH = Math.floor(SCREEN_WIDTH / 7);

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];


interface CalendarGridProps {
  year: number;
  month: number;
  /** Map of YYYY-MM-DD → Post[] */
  postsByDay: Map<string, Post[]>;
  selectedDateKey: string;
  onSelectDay: (dateKey: string) => void;
}

function CalendarGrid({
  year,
  month,
  postsByDay,
  selectedDateKey,
  onSelectDay,
}: CalendarGridProps) {
  const days = getCalendarDays(year, month);

  return (
    <View style={styles.container}>
      {/* Day of week header row */}
      <View style={styles.dowRow}>
        {DAYS_OF_WEEK.map((d) => (
          <View key={d} style={styles.dowCell}>
            <Text style={styles.dowText}>{d}</Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      <View style={styles.grid}>
        {days.map((day) => {
          const posts = postsByDay.get(day.dateKey) ?? [];
          const isSelected = day.dateKey === selectedDateKey;
          const hasPosts = posts.length > 0;

          return (
            <TouchableOpacity
              key={day.dateKey}
              style={styles.dayCell}
              onPress={() => onSelectDay(day.dateKey)}
              accessibilityLabel={`${day.dateKey}${posts.length > 0 ? `, ${posts.length} posts` : ''}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              {/* Day number with circle */}
              <View
                style={[
                  styles.dayCircle,
                  isSelected && styles.dayCircleSelected,
                  day.isToday && !isSelected && styles.dayCircleToday,
                ]}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    !day.isCurrentMonth && styles.dayNumberOtherMonth,
                    isSelected && styles.dayNumberSelected,
                    day.isToday && !isSelected && styles.dayNumberToday,
                  ]}
                >
                  {day.day}
                </Text>
              </View>

              {/* Single blue dot — indicates day has posts */}
              {hasPosts && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default memo(CalendarGrid);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingBottom: Spacing.md,
  },
  dowRow: {
    flexDirection: 'row',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  dowCell: {
    width: CELL_WIDTH,
    alignItems: 'center',
  },
  dowText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: CELL_WIDTH,
    height: CalendarTokens.dayRowHeight,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  dayCircle: {
    width: CalendarTokens.daySize,
    height: CalendarTokens.daySize,
    borderRadius: CalendarTokens.daySize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: Colors.primary,
  },
  dayCircleToday: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  dayNumber: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.regular,
    color: Colors.textPrimary,
    lineHeight: Typography.size.base * 1.4,
  },
  dayNumberOtherMonth: {
    color: Colors.textSecondary,
    opacity: 0.4,
  },
  dayNumberSelected: {
    color: Colors.white,
    fontWeight: Typography.weight.semibold,
  },
  dayNumberToday: {
    color: Colors.primary,
    fontWeight: Typography.weight.semibold,
  },
  dot: {
    width: CalendarTokens.dotSize,
    height: CalendarTokens.dotSize,
    borderRadius: CalendarTokens.dotSize / 2,
    backgroundColor: Colors.primary,
    marginTop: 3,
  },
});
