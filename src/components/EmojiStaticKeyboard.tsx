import * as React from 'react'

import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  Animated,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import type { CategoryTypes, EmojisByCategory } from '../types'
import { EmojiCategory } from './EmojiCategory'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Categories } from './Categories'
import { SearchBar } from './SearchBar'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { ConditionalContainer } from './ConditionalContainer'
import { SkinTones } from './SkinTones'

const CATEGORY_ELEMENT_WIDTH = 37

export const EmojiStaticKeyboard = React.memo(
  () => {
    const { width } = useWindowDimensions()
    const {
      activeCategoryIndex,
      setActiveCategoryIndex,
      onCategoryChangeFailed,
      enableCategoryChangeGesture,
      categoryPosition,
      enableSearchBar,
      searchPhrase,
      renderList,
      disableSafeArea,
      theme,
      styles: themeStyles,
      shouldAnimateScroll,
      enableCategoryChangeAnimation,
    } = React.useContext(KeyboardContext)
    const { keyboardState } = useKeyboardStore()
    const flatListRef = React.useRef<FlatList>(null)

    const getItemLayout = React.useCallback(
      (_: CategoryTypes[] | null | undefined, index: number) => ({
        length: width,
        offset: width * index,
        index,
      }),
      [width]
    )

    const [keyboardScrollOffsetY, setKeyboardScrollOffsetY] = React.useState(0)

    const renderItem = React.useCallback(
      (props) => <EmojiCategory setKeyboardScrollOffsetY={setKeyboardScrollOffsetY} {...props} />,
      []
    )

    React.useEffect(() => {
      flatListRef.current?.scrollToIndex({
        index: activeCategoryIndex,
        animated: shouldAnimateScroll && enableCategoryChangeAnimation,
      })
    }, [activeCategoryIndex, enableCategoryChangeAnimation, shouldAnimateScroll])

    const keyExtractor = React.useCallback((item: EmojisByCategory) => item.title, [])
    const scrollNav = React.useRef(new Animated.Value(0)).current

    const handleScroll = React.useCallback(
      (el: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = el.nativeEvent.contentOffset.x / width
        scrollNav.setValue(index * CATEGORY_ELEMENT_WIDTH)
        if (Number.isInteger(index)) setActiveCategoryIndex(index)
      },
      [scrollNav, setActiveCategoryIndex, width]
    )

    return (
      <View
        style={[
          styles.container,
          styles.containerShadow,
          categoryPosition === 'top' && disableSafeArea && styles.containerReverse,
          themeStyles.container,
          { backgroundColor: theme.container },
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
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              removeClippedSubviews={true}
              ref={flatListRef}
              onScrollToIndexFailed={onCategoryChangeFailed}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              scrollEventThrottle={16}
              getItemLayout={getItemLayout}
              scrollEnabled={enableCategoryChangeGesture}
              initialNumToRender={1}
              maxToRenderPerBatch={1}
              onScroll={handleScroll}
              keyboardShouldPersistTaps="handled"
            />
            <Categories scrollNav={enableCategoryChangeGesture ? scrollNav : undefined} />
            <SkinTones keyboardScrollOffsetY={keyboardScrollOffsetY} />
          </>
        </ConditionalContainer>
      </View>
    )
  },
  () => true
)

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    borderRadius: 16,
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
