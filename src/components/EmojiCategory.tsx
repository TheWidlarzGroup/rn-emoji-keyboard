import * as React from 'react'

import { StyleSheet, View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import type { EmojisByCategory, EmojiSizes, JsonEmoji } from '../types'
import { SingleEmoji } from './SingleEmoji'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { parseEmoji } from '../utils/parseEmoji'

const emptyEmoji: JsonEmoji = {
  emoji: '',
  name: 'blank emoji',
  v: '0',
  toneEnabled: false,
}

export const EmojiCategory = React.memo(
  ({
    item: { title, data },
    setKeyboardScrollOffsetY,
  }: {
    item: EmojisByCategory
    setKeyboardScrollOffsetY: React.Dispatch<React.SetStateAction<number>>
  }) => {
    const {
      onEmojiSelected,
      emojiSize,
      numberOfColumns,
      width,
      hideHeader,
      translation,
      categoryPosition,
      clearEmojiTonesData,
      generateEmojiTones,
      theme,
      styles: themeStyles,
    } = React.useContext(KeyboardContext)

    const { setKeyboardState, keyboardState } = useKeyboardStore()

    const [empty, setEmpty] = React.useState<JsonEmoji[]>([])

    React.useEffect(() => {
      if (data.length % numberOfColumns) {
        const fillWithEmpty = new Array(numberOfColumns - (data.length % numberOfColumns)).fill(
          emptyEmoji
        )
        setEmpty(fillWithEmpty)
      }
    }, [numberOfColumns, data])

    const getItemLayout = React.useCallback(
      (_: JsonEmoji[] | null | undefined, index: number) => ({
        length: emojiSize ? emojiSize : 0,
        offset: emojiSize * Math.ceil(index / numberOfColumns),
        index,
      }),
      [emojiSize, numberOfColumns]
    )

    const handleEmojiPress = React.useCallback(
      (emoji: JsonEmoji) => {
        if (emoji.name === 'blank emoji') return
        const parsedEmoji = parseEmoji(emoji)
        onEmojiSelected(parsedEmoji)
        setKeyboardState({ type: 'RECENT_EMOJI_ADD', payload: emoji })
      },
      [onEmojiSelected, setKeyboardState]
    )

    const handleEmojiLongPress = React.useCallback(
      (emoji: JsonEmoji, emojiIndex: number, emojiSizes: EmojiSizes) => {
        clearEmojiTonesData()
        generateEmojiTones(emoji, emojiIndex, emojiSizes)
      },
      [clearEmojiTonesData, generateEmojiTones]
    )

    const renderItem = React.useCallback(
      (props: ListRenderItemInfo<JsonEmoji>) => {
        const recentlyUsed = keyboardState?.recentlyUsed || []
        const recentlyUsedEmoji = recentlyUsed?.find((emoji) => emoji.name === props.item.name)
        return (
          <SingleEmoji
            {...props}
            item={recentlyUsedEmoji || props.item}
            emojiSize={emojiSize}
            onPress={handleEmojiPress}
            onLongPress={handleEmojiLongPress}
          />
        )
      },
      [emojiSize, handleEmojiLongPress, handleEmojiPress, keyboardState?.recentlyUsed]
    )
    const handleOnScroll = (ev: { nativeEvent: { contentOffset: { y: number } } }) => {
      setKeyboardScrollOffsetY(ev.nativeEvent.contentOffset.y)
      clearEmojiTonesData()
    }
    const keyExtractor = React.useCallback((item: JsonEmoji) => item.name, [])

    return (
      <View style={[styles.container, { width }]}>
        {!hideHeader && (
          <Text style={[styles.sectionTitle, themeStyles.header, { color: theme.header }]}>
            {translation[title]}
          </Text>
        )}
        <FlatList
          data={[...data, ...empty]}
          keyExtractor={keyExtractor}
          numColumns={numberOfColumns}
          renderItem={renderItem}
          removeClippedSubviews={true}
          getItemLayout={getItemLayout}
          onScroll={handleOnScroll}
          ListFooterComponent={() => (
            <View style={categoryPosition === 'floating' ? styles.footerFloating : styles.footer} />
          )}
          initialNumToRender={10}
          windowSize={10}
          maxToRenderPerBatch={5}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    )
  },
  (prevProps, nextProps) => {
    if (nextProps.item.title !== 'search') {
      return true
    }
    if (prevProps.item.data.length !== nextProps.item.data.length) {
      return false
    }
    return (
      prevProps.item.data.map((d) => d.name).join() ===
      nextProps.item.data.map((d) => d.name).join()
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 6,
    marginLeft: 12,
  },
  footer: { height: 8 },
  footerFloating: { height: 70 },
})
