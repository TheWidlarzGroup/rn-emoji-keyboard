import * as React from 'react'

import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  Animated,
  SafeAreaView,
} from 'react-native'
import type { CategoryTypes, EmojisByCategory } from '../types'
import { EmojiCategory } from './EmojiCategory'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Categories } from './Categories'
import { SearchBar } from './SearchBar'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { ConditionalContainer } from './ConditionalContainer'

export const EmojiStaticKeyboard = () => {
  const { width } = useWindowDimensions()
  const {
    activeCategoryIndex,
    containerStyles,
    onCategoryChangeFailed,
    categoryPosition,
    enableSearchBar,
    searchPhrase,
    renderList,
    disableSafeArea,
  } = React.useContext(KeyboardContext)
  const { keyboardState } = useKeyboardStore()
  const flatListRef = React.useRef<FlatList>(null)

  const getItemLayout = (_: CategoryTypes[] | null | undefined, index: number) => ({
    length: width,
    offset: width * index,
    index,
  })

  const renderItem = React.useCallback((props) => <EmojiCategory {...props} />, [])

  React.useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: activeCategoryIndex,
    })
  }, [activeCategoryIndex])

  return (
    <View
      style={[
        styles.container,
        styles.containerShadow,
        categoryPosition === 'top' && disableSafeArea && styles.containerReverse,
        containerStyles,
      ]}>
      <ConditionalContainer
        condition={!disableSafeArea}
        container={(children) => (
          <SafeAreaView
            style={[styles.flex, categoryPosition === 'top' && styles.containerReverse]}>
            {children}
          </SafeAreaView>
        )}>
        <>
          {enableSearchBar && <SearchBar />}
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
          <Categories />
        </>
      </ConditionalContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
