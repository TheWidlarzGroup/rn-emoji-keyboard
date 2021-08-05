import * as React from 'react'
import { Animated, FlatList, StyleSheet, View, ViewStyle } from 'react-native'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { defaultKeyboardContext } from '../contexts/KeyboardProvider'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { CATEGORIES_NAVIGATION, CategoryNavigationItem, CategoryTypes } from '../types'
import { CategoryItem } from './CategoryItem'
import { exhaustiveTypeCheck, getCategoryIndex } from '../utils'

type CategoriesProps = {
  flatListRef: React.RefObject<FlatList>
  scrollNav: Animated.Value
}

export const Categories = ({ flatListRef, scrollNav }: CategoriesProps) => {
  const {
    activeCategoryIndex,
    categoryContainerColor,
    onCategoryChangeFailed,
    disabledCategory,
    activeCategoryContainerColor,
    enableRecentlyUsed,
    categoryPosition,
    searchPhrase,
  } = React.useContext(KeyboardContext)
  const { keyboardState } = useKeyboardStore()
  const handleScrollToCategory = React.useCallback(
    (category: CategoryTypes) => {
      flatListRef?.current?.scrollToIndex(getCategoryIndex(disabledCategory, category))
    },
    [disabledCategory, flatListRef]
  )

  const renderItem = React.useCallback(
    ({ item, index }: { item: CategoryNavigationItem; index: number }) => (
      <CategoryItem item={item} index={index} handleScrollToCategory={handleScrollToCategory} />
    ),
    [handleScrollToCategory]
  )

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
  )

  const getStylesBasedOnPosition = () => {
    const style: ViewStyle[] = [styles.navigation]
    switch (categoryPosition) {
      case 'floating':
        style.push(styles.navigationFloating)
        break
      case 'top':
        style.push(styles.navigationTop)
        break
      case 'bottom':
        style.push(styles.navigationBottom)
        break
      default:
        exhaustiveTypeCheck(categoryPosition)
        break
    }

    if (
      categoryContainerColor !== defaultKeyboardContext.categoryContainerColor ||
      categoryPosition === 'floating'
    )
      style.push({
        backgroundColor: categoryContainerColor,
      })
    return style
  }

  const renderData = React.useMemo(() => {
    const isRecentlyUsedHidden = (category: CategoryTypes) =>
      category === 'recently_used' &&
      (keyboardState.recentlyUsed.length === 0 || !enableRecentlyUsed)
    return CATEGORIES_NAVIGATION.filter(({ category }) => {
      if (searchPhrase === '' && category === 'search') return false
      if (isRecentlyUsedHidden(category)) return false
      return !disabledCategory.includes(category)
    })
  }, [disabledCategory, enableRecentlyUsed, keyboardState.recentlyUsed.length, searchPhrase])

  return (
    <View style={[categoryPosition === 'floating' && styles.floating]}>
      <View style={getStylesBasedOnPosition()}>
        <FlatList
          data={renderData}
          keyExtractor={(item) => item.category}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          onScrollToIndexFailed={onCategoryChangeFailed}
          ListHeaderComponent={activeIndicator}
          ListHeaderComponentStyle={styles.activeIndicatorContainer}
          extraData={activeCategoryIndex}
        />
      </View>
    </View>
  )
}

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
})
