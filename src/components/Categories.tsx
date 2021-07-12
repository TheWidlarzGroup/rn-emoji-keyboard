import * as React from 'react';
import { View, Animated, StyleSheet, FlatList } from 'react-native';
import { KeyboardContext } from '../KeyboardContext';
import {
  CATEGORIES,
  CATEGORIES_NAVIGATION,
  CategoryNavigationItem,
  CategoryTypes,
} from '../types';
import { CategoryItem } from './CategoryItem';

type CategoriesProps = {
  flatListRef: React.RefObject<FlatList>;
  scrollNav: Animated.Value;
};

export const Categories = ({ flatListRef, scrollNav }: CategoriesProps) => {
  const {
    activeCategoryIndex,
    categoryContainerColor,
    onCategoryChangeFailed,
    disabledCategory,
  } = React.useContext(KeyboardContext);

  const handleScrollToCategory = React.useCallback(
    (category: CategoryTypes) => {
      flatListRef?.current?.scrollToIndex({
        index: CATEGORIES.filter(
          (name) => !disabledCategory.includes(name)
        ).indexOf(category),
      });
    },
    [disabledCategory, flatListRef]
  );

  const rendarItem = React.useCallback(
    ({ item, index }: { item: CategoryNavigationItem; index: number }) => (
      <CategoryItem
        item={item}
        index={index}
        handleScrollToCategory={handleScrollToCategory}
      />
    ),
    [handleScrollToCategory]
  );

  const activeIndicator = React.useCallback(
    () => (
      <Animated.View
        style={[
          styles.activeIndicator,
          {
            transform: [{ translateX: scrollNav }],
          },
        ]}
      />
    ),
    [scrollNav]
  );

  return (
    <View style={styles.bottomBar}>
      <View
        style={[styles.navigation, { backgroundColor: categoryContainerColor }]}
      >
        {console.log(
          CATEGORIES_NAVIGATION.filter(
            ({ category }) => !disabledCategory.includes(category)
          )
        )}
        <FlatList
          data={CATEGORIES_NAVIGATION.filter(
            ({ category }) => !disabledCategory.includes(category)
          )}
          keyExtractor={(item) => item.category}
          renderItem={rendarItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          scrollEnabled={false}
          horizontal={true}
          onScrollToIndexFailed={onCategoryChangeFailed}
          ListHeaderComponent={activeIndicator}
          ListHeaderComponentStyle={styles.activeIndicatorContainer}
          extraData={activeCategoryIndex}
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
  activeIndicatorContainer: {
    position: 'absolute',
    width: 28,
    height: 28,
  },
});
