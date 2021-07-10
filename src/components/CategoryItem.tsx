import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardContext } from '../KeyboardContext';
import type { CategoryTypes } from '../types';
import { Icon } from './Icon';

type CategoryItemProps = {
  item: any;
  index: number;
  handleScrollToCategory: (category: CategoryTypes) => void;
};

export const CategoryItem = ({
  item,
  index,
  handleScrollToCategory,
}: CategoryItemProps) => {
  const ctx = React.useContext(KeyboardContext);

  return (
    <TouchableOpacity
      onPress={() => {
        handleScrollToCategory(item.category);
        ctx?.setActiveCategoryIndex(index);
      }}
    >
      <View style={styles.container}>
        <Icon
          iconName={item.icon}
          isActive={ctx?.activeCategoryIndex === index}
          normalColor={ctx.categoryColor}
          activeColor={ctx.activeCategoryColor}
        />
      </View>
    </TouchableOpacity>
  );
};

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
