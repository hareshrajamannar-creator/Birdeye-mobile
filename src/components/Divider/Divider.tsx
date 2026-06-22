import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Layout } from '../../tokens';

interface DividerProps {
  indented?: boolean;
}

export default function Divider({ indented = false }: DividerProps) {
  return (
    <View
      style={[
        styles.divider,
        indented && { marginLeft: Layout.screenHorizontalPadding },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider,
  },
});
