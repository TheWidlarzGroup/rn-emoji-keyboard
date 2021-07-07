import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { CategoryTypes } from '../types';

type CategoryItemProps = {
  item: any;
  handleScrollToCategory: (category: CategoryTypes) => void;
};

export const CategoryItem = ({
  item,
  handleScrollToCategory,
}: CategoryItemProps) => (
  <TouchableOpacity onPress={() => handleScrollToCategory(item.category)}>
    <View style={styles.container}>
      <Text style={styles.icon}>{item.icon}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderRadius: 6,
  },
  icon: { textAlign: 'center' },
});
