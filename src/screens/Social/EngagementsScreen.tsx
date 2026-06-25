import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { EngagementCard } from '../../components';
import { Colors } from '../../tokens';
import { MOCK_ENGAGEMENTS } from '../../data/mockEngagements';
import type { Engagement } from '../../types';

interface EngagementsScreenProps {
  onPostReply?: (id: string) => void;
}

export default function EngagementsScreen({ onPostReply }: EngagementsScreenProps) {
  const renderItem: ListRenderItem<Engagement> = useCallback(
    ({ item }) => (
      <EngagementCard engagement={item} onPostReply={onPostReply} />
    ),
    [onPostReply],
  );

  const keyExtractor = useCallback((item: Engagement) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_ENGAGEMENTS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    flexGrow: 1,
  },
});
