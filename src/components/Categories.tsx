import * as React from 'react';
import { View, Animated, StyleSheet, FlatList, ViewStyle } from 'react-native';
import { defaultKeyboardContext } from '../contexts/KeyboardProvider';
import { KeyboardContext } from '../contexts/KeyboardContext';
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
    activeCategoryContainerColor,
    categoryPosition,
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
            backgroundColor: activeCategoryContainerColor,
          },
          {
            transform: [{ translateX: scrollNav }],
          },
        ]}
      />
    ),
    [activeCategoryContainerColor, scrollNav]
  );

  const getStylesBasedOnPosition = () => {
    const style: ViewStyle[] = [styles.navigation];
    switch (categoryPosition) {
      case 'floating':
        style.push(styles.navigationFloating);
        break;
      case 'top':
        style.push(styles.navigationTop);
        break;
      case 'bottom':
        style.push(styles.navigationBottom);
        break;
      default:
        break;
    }
    if (
      categoryContainerColor !==
        defaultKeyboardContext.categoryContainerColor ||
      categoryPosition === 'floating'
    )
      style.push({
        backgroundColor: categoryContainerColor,
      });
    return style;
  };

  return (
    <View style={[categoryPosition === 'floating' && styles.floating]}>
      <View style={getStylesBasedOnPosition()}>
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
  floating: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  navigation: {
    padding: 3,
    alignItems: 'center',
    borderColor: '#00000011',
  },
  navigationFloating: {
    borderRadius: 8,
  },
  navigationBottom: {
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
  },
  navigationTop: {
    paddingTop: 12,
    paddingBottom: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
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
    borderRadius: 6,
  },
  activeIndicatorContainer: {
    position: 'absolute',
    width: 28,
    height: 28,
  },
});
