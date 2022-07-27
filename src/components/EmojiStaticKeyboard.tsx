import * as React from 'react'

import { StyleSheet, View, SafeAreaView } from 'react-native'
import type { EmojisByCategory } from '../types'
import { EmojiCategory } from './EmojiCategory'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Categories } from './Categories'
import { SearchBar } from './SearchBar'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { ConditionalContainer } from './ConditionalContainer'
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
  const flatListRef = React.useRef<FlashList<EmojisByCategory>>(null)

  const renderItem = React.useCallback((props) => <EmojiCategory {...props} />, [])
  const keyExtractor = React.useCallback((item: EmojisByCategory) => item.title, [])

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

          <FlashList<EmojisByCategory>
            ref={flatListRef}
            extraData={[keyboardState.recentlyUsed.length, searchPhrase]}
            data={renderList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="handled"
            estimatedItemSize={9}
            scrollEnabled={false}
            horizontal
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
