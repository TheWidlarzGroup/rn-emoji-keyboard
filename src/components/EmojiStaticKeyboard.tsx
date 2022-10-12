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
import { SkinTones } from './SkinTones'

export const EmojiStaticKeyboard = React.memo(
  () => {
    const { width } = useWindowDimensions()
    const {
      activeCategoryIndex,
      onCategoryChangeFailed,
      categoryPosition,
      enableSearchBar,
      searchPhrase,
      renderList,
      disableSafeArea,
      theme,
      styles: themeStyles,
      enableSearchAnimation,
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
        animated: enableSearchAnimation,
      })
    }, [activeCategoryIndex, enableSearchAnimation])

    const keyExtractor = React.useCallback((item: EmojisByCategory) => item.title, [])

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
              scrollEnabled={false}
              initialNumToRender={1}
              maxToRenderPerBatch={1}
              keyboardShouldPersistTaps="handled"
            />
            <Categories />
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
