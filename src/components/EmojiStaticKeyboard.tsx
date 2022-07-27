import * as React from 'react'

import { StyleSheet, View } from 'react-native'
import type { EmojisByCategory } from '../types'
import { EmojiCategory } from './EmojiCategory'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Categories } from './Categories'
import { SearchBar } from './SearchBar'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { FlashList } from '@shopify/flash-list'

export const EmojiStaticKeyboard = () => {
  const {
    activeCategoryIndex,
    containerStyles,
    categoryPosition,
    enableSearchBar,
    searchPhrase,
    renderList,
    disableSafeArea,
  } = React.useContext(KeyboardContext)
  const { keyboardState } = useKeyboardStore()
  const isCategoryPositionTop = categoryPosition === 'top'
  const ref = React.useRef<FlashList<EmojisByCategory>>(null)

  const renderItem = React.useCallback((props) => <EmojiCategory {...props} />, [])
  const keyExtractor = React.useCallback((item: EmojisByCategory) => item.title, [])

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
        isCategoryPositionTop && disableSafeArea && styles.containerReverse,
        containerStyles,
      ]}>
      <View style={[styles.flex, isCategoryPositionTop && styles.containerReverse]}>
        {enableSearchBar && <SearchBar />}
        <FlashList<EmojisByCategory>
          {...{
            ref,
            renderItem,
            keyExtractor,
            data: renderList,
            extraData: [keyboardState.recentlyUsed.length, searchPhrase],
            horizontal: true,
            pagingEnabled: true,
            removeClippedSubviews: true,
            scrollEnabled: false,
            showsHorizontalScrollIndicator: false,
            estimatedItemSize: 300,
            keyboardShouldPersistTaps: 'handled',
          }}
        />
        <Categories />
      </View>
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
