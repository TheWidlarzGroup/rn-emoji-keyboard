import * as React from 'react'

import { StyleSheet, View, Text, FlatList } from 'react-native'
import type { EmojisByCategory, JsonEmoji } from '../types'
import { SingleEmoji } from './SingleEmoji'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { parseEmoji } from '../utils'

const emptyEmoji: JsonEmoji = {
  emoji: '',
  name: 'blank emoji',
  v: '0',
  toneEnabled: false,
}

export const EmojiCategory = ({ item: { title, data } }: { item: EmojisByCategory }) => {
  const {
    onEmojiSelected,
    emojiSize,
    numberOfColumns,
    width,
    hideHeader,
    headerStyles,
    translation,
    categoryPosition,
    clearSelected,
    generateEmojiTones,
  } = React.useContext(KeyboardContext)

  const { setKeyboardState } = useKeyboardStore()

  const [empty, setEmpty] = React.useState<JsonEmoji[]>([])

  React.useEffect(() => {
    if (data.length % numberOfColumns) {
      const fillWithEmpty = new Array(numberOfColumns - (data.length % numberOfColumns)).fill(
        emptyEmoji
      )
      setEmpty(fillWithEmpty)
    }
  }, [numberOfColumns, data])

  const getItemLayout = (_: JsonEmoji[] | null | undefined, index: number) => ({
    length: emojiSize ? emojiSize : 0,
    offset: emojiSize * Math.ceil(index / numberOfColumns),
    index,
  })

  const handleEmojiPress = React.useCallback(
    (emoji: JsonEmoji) => {
      if (emoji.name === 'blank emoji') return
      console.log('emoji', emoji)
      const parsedEmoji = parseEmoji(emoji)
      clearSelected()
      onEmojiSelected(parsedEmoji)
      setKeyboardState({ type: 'RECENT_EMOJI_ADD', payload: emoji })
    },
    [clearSelected, onEmojiSelected, setKeyboardState]
  )

  const renderItem = React.useCallback(
    (props) => {
      const handleLongPress = () => {
        clearSelected()
        generateEmojiTones(props.item, props.index)
      }

      return (
        <SingleEmoji
          {...props}
          onPress={() => handleEmojiPress(props.item)}
          emojiSize={emojiSize}
          onLongPress={handleLongPress}
        />
      )
    },
    [emojiSize, clearSelected, generateEmojiTones, handleEmojiPress]
  )

  return (
    <View style={[styles.container, { width: width }]}>
      {!hideHeader && <Text style={[styles.sectionTitle, headerStyles]}>{translation[title]}</Text>}
      <FlatList
        data={[...data, ...empty]}
        keyExtractor={(emoji) => emoji.name}
        numColumns={numberOfColumns}
        renderItem={renderItem}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        ListFooterComponent={() => (
          <View style={categoryPosition === 'floating' ? styles.footerFloating : styles.footer} />
        )}
        windowSize={20}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  sectionTitle: {
    opacity: 0.6,
    marginTop: 12,
    marginBottom: 6,
    marginLeft: 12,
  },
  footer: { height: 8 },
  footerFloating: { height: 70 },
})
