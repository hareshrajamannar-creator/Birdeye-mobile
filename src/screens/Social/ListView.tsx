import React, { useCallback } from 'react';
import {
  SectionList,
  View,
  StyleSheet,
} from 'react-native';
import { PostCard, SectionHeader, Divider, EmptyState } from '../../components';
import { Colors } from '../../tokens';
import type { DayGroup, Post } from '../../types';

interface ListViewProps {
  groups: DayGroup[];
  onPostPress?: (post: Post) => void;
}

export default function ListView({ groups, onPostPress }: ListViewProps) {
  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <>
        <PostCard post={item} onPress={onPostPress} />
        <Divider />
      </>
    ),
    [onPostPress]
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: DayGroup }) => (
      <SectionHeader dateLabel={section.dateLabel} dayName={section.dayName} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  if (groups.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        subtitle="Create your first post to get started."
        iconName="article"
      />
    );
  }

  return (
    <SectionList
      sections={groups}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
      style={styles.list}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={null}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 100, // clear FAB
  },
});
