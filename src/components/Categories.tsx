import * as React from 'react';
import { View, Animated, StyleSheet, FlatList } from 'react-native';
import { CATEGORIES, CATEGORIES_NAVIGATION, CategoryTypes } from '../types';
import { CategoryItem } from './CategoryItem';

type CategoriesProps = {
  flatListRef: React.RefObject<FlatList>;
  scrollNav: Animated.Value;
};

export const Categories = ({ flatListRef, scrollNav }: CategoriesProps) => {
  const handleScrollToCategory = (category: CategoryTypes) => {
    flatListRef?.current?.scrollToIndex({
      index: CATEGORIES.indexOf(category),
    });
  };
  return (
    <View style={styles.bottomBar}>
      <View style={styles.navigation}>
        <FlatList
          data={CATEGORIES_NAVIGATION}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              handleScrollToCategory={handleScrollToCategory}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          scrollEnabled={false}
          horizontal={true}
          onScrollToIndexFailed={(e) => console.log(e)}
          ListHeaderComponent={() => {
            return (
              <Animated.View
                style={[styles.activeIndicator, { left: scrollNav }]}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  navigation: {
    backgroundColor: '#e3dbcd',
    padding: 3,
    borderRadius: 8,
  },
  separator: {
    width: 1,
    height: 28,
    backgroundColor: '#00000011',
    marginHorizontal: 4,
  },
  activeIndicator: {
    position: 'absolute',
    width: 28,
    height: 28,
    backgroundColor: 'white',
    borderRadius: 6,
  },
});
