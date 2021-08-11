import * as React from 'react'

import { StyleSheet, View, FlatList, useWindowDimensions, Animated } from 'react-native'
import type { CategoryTypes, EmojisByCategory } from '../types'
import { EmojiCategory } from './EmojiCategory'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Categories } from './Categories'
import emojisByGroup from '../assets/emojis.json'
import { SearchBar } from './SearchBar'
import { useKeyboardStore } from '../store/useKeyboardStore'

const CATEGORY_ELEMENT_WIDTH = 37

export const EmojiStaticKeyboard = () => {
  const { width } = useWindowDimensions()
  const {
    activeCategoryIndex,
    containerStyles,
    onCategoryChangeFailed,
    disabledCategory,
    categoryPosition,
    enableSearchBar,
    searchPhrase,
    setActiveCategoryIndex,
    enableRecentlyUsed,
  } = React.useContext(KeyboardContext)
  const { keyboardState } = useKeyboardStore()
  const flatListRef = React.useRef<FlatList>(null)
  const scrollNav = React.useRef(new Animated.Value(0)).current

  const getItemLayout = (_: CategoryTypes[] | null | undefined, index: number) => ({
    length: width,
    offset: width * index,
    index,
  })

  const renderItem = React.useCallback((props) => <EmojiCategory {...props} />, [])
  React.useEffect(() => {
    Animated.spring(scrollNav, {
      toValue: activeCategoryIndex * CATEGORY_ELEMENT_WIDTH,
      useNativeDriver: true,
    }).start()
  }, [activeCategoryIndex, scrollNav])

  const renderList = React.useMemo(() => {
    const data = emojisByGroup.filter((category) => {
      const title = category.title as CategoryTypes
      return !disabledCategory.includes(title)
    })
    if (keyboardState.recentlyUsed.length && enableRecentlyUsed) {
      data.push({
        title: 'recently_used',
        data: keyboardState.recentlyUsed,
      })
    }
    data.push({
      title: 'search',
      data: emojisByGroup
        .map((group) => group.data)
        .flat()
        .filter((emoji) => {
          if (searchPhrase && searchPhrase.length < 2) return false
          return emoji.name.toLowerCase().includes(searchPhrase.toLowerCase())
        }),
    })
    return data
  }, [disabledCategory, enableRecentlyUsed, keyboardState.recentlyUsed, searchPhrase])

  React.useEffect(() => {
    if (searchPhrase !== '') {
      flatListRef.current?.scrollToEnd()
      setActiveCategoryIndex(renderList.length - 1)
    }
  }, [renderList, searchPhrase, setActiveCategoryIndex])

  return (
    <View
      style={[
        styles.container,
        styles.containerShadow,
        categoryPosition === 'top' && styles.containerReverse,
        containerStyles,
      ]}>
      {enableSearchBar && <SearchBar flatListRef={flatListRef} />}
      <Animated.FlatList
        extraData={[keyboardState.recentlyUsed.length, searchPhrase]}
        data={renderList}
        keyExtractor={(item: EmojisByCategory) => item.title}
        renderItem={renderItem}
        removeClippedSubviews={true}
        ref={flatListRef}
        onScrollToIndexFailed={onCategoryChangeFailed}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        scrollEnabled={false}
        initialNumToRender={1}
        windowSize={2}
        maxToRenderPerBatch={1}
      />
      <Categories flatListRef={flatListRef} scrollNav={scrollNav} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  containerReverse: { flexDirection: 'column-reverse' },
  containerShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 10,
  },
})
