import * as React from 'react'

import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  SafeAreaView,
  Platform,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'
import { type EmojisByCategory } from '../types'
import { EmojiCategory } from './EmojiCategory'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Categories } from './Categories'
import { SearchBar } from './SearchBar'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { ConditionalContainer } from './ConditionalContainer'
import { SkinTones } from './SkinTones'

const CATEGORY_ELEMENT_WIDTH = 37
const isAndroid = Platform.OS === 'android'

export const EmojiStaticKeyboard = React.memo(
  () => {
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
      width,
      setWidth,
    } = React.useContext(KeyboardContext)
    const { keyboardState } = useKeyboardStore()
    const flatListRef = React.useRef<FlatList>(null)

    const getItemLayout = React.useCallback(
      (_: EmojisByCategory[] | null | undefined, index: number) => ({
        length: width,
        offset: width * index,
        index,
      }),
      [width],
    )

    const [keyboardScrollOffsetY, setKeyboardScrollOffsetY] = React.useState(0)

    const renderItem = React.useCallback(
      (props) => {
        const item = { ...props.item, data: [] }
        const shouldRenderEmojis =
          activeCategoryIndex === props.index ||
          activeCategoryIndex === props.index - 1 ||
          activeCategoryIndex === props.index + 1

        if (shouldRenderEmojis) {
          return (
            <EmojiCategory
              setKeyboardScrollOffsetY={setKeyboardScrollOffsetY}
              {...props}
              activeCategoryIndex={activeCategoryIndex}
            />
          )
        } else {
          return (
            <EmojiCategory
              setKeyboardScrollOffsetY={setKeyboardScrollOffsetY}
              {...props}
              item={item}
              activeCategoryIndex={activeCategoryIndex}
            />
          )
        }
      },
      [activeCategoryIndex],
    )

    React.useEffect(() => {
      flatListRef.current?.scrollToIndex({
        index: activeCategoryIndex,
        animated: shouldAnimateScroll && enableCategoryChangeAnimation,
      })
      setKeyboardScrollOffsetY(0)
    }, [activeCategoryIndex, enableCategoryChangeAnimation, shouldAnimateScroll])

    const keyExtractor = React.useCallback((item: EmojisByCategory) => item.title, [])
    const scrollNav = React.useRef(new Animated.Value(0)).current

    const handleScroll = React.useCallback(
      (el: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = el.nativeEvent.contentOffset.x / width
        scrollNav.setValue(index * CATEGORY_ELEMENT_WIDTH)
      },
      [scrollNav, width],
    )

    const onScrollEnd = React.useCallback(
      (el: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = el.nativeEvent.contentOffset.x / width
        setActiveCategoryIndex(Math.round(index))
      },
      [setActiveCategoryIndex, width],
    )

    return (
      <View
        style={[
          styles.container,
          styles.containerShadow,
          categoryPosition === 'top' && disableSafeArea && styles.containerReverse,
          themeStyles.container,
          { backgroundColor: theme.container },
        ]}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <ConditionalContainer
          condition={!disableSafeArea}
          container={(children) => (
            <SafeAreaView
              style={[styles.flex, categoryPosition === 'top' && styles.containerReverse]}
            >
              {children}
            </SafeAreaView>
          )}
        >
          <>
            {enableSearchBar && <SearchBar />}
            <Animated.FlatList<EmojisByCategory>
              extraData={[keyboardState.recentlyUsed.length, searchPhrase]}
              data={renderList}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              removeClippedSubviews={isAndroid}
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
              onMomentumScrollEnd={onScrollEnd}
            />
            <Categories scrollNav={enableCategoryChangeGesture ? scrollNav : undefined} />
            <SkinTones keyboardScrollOffsetY={keyboardScrollOffsetY} />
          </>
        </ConditionalContainer>
      </View>
    )
  },
  () => true,
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
