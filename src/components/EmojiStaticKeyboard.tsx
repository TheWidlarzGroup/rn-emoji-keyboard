import * as React from 'react'

import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  Animated,
  SafeAreaView,
} from 'react-native'
import { SearchBar } from './SearchBar'
import { Categories } from './Categories'
import { EmojiCategory } from './EmojiCategory'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { ConditionalContainer } from './ConditionalContainer'
import type { CategoryTypes, EmojisByCategory } from '../types'

export const EmojiStaticKeyboard = () => {
  const { width } = useWindowDimensions()
  const {
    renderList,
    searchPhrase,
    enableSearchBar,
    containerStyles,
    disableSafeArea,
    categoryPosition,
    activeCategoryIndex,
    onCategoryChangeFailed,
  } = React.useContext(KeyboardContext)
  const { keyboardState } = useKeyboardStore()
  const ref = React.useRef<FlatList>(null)

  const renderItem = React.useCallback((props) => <EmojiCategory {...props} />, [])
  const keyExtractor = React.useCallback((item: EmojisByCategory) => item.title, [])
  const getItemLayout = (_: CategoryTypes[] | null | undefined, index: number) => ({
    length: width,
    offset: width * index,
    index,
  })

  React.useEffect(() => {
    ref.current?.scrollToIndex({
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
            {...{
              ref,
              renderItem,
              keyExtractor,
              getItemLayout,
              data: renderList,
              extraData: [keyboardState.recentlyUsed.length, searchPhrase],
              onScrollToIndexFailed: onCategoryChangeFailed,
              horizontal: true,
              pagingEnabled: true,
              scrollEnabled: false,
              removeClippedSubviews: true,
              showsHorizontalScrollIndicator: false,
              windowSize: 2,
              initialNumToRender: 1,
              maxToRenderPerBatch: 1,
              scrollEventThrottle: 16,
              keyboardShouldPersistTaps: 'handled',
            }}
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
