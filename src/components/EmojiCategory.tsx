import * as React from 'react'

import type { EmojisByCategory, JsonEmoji } from '../types'
import { FlashList } from '@shopify/flash-list'
import { parseEmoji } from '../utils'
import { SingleEmoji } from './SingleEmoji'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { StyleSheet, View, Text } from 'react-native'

const emptyEmoji: JsonEmoji = {
  emoji: '',
  name: 'blank emoji',
  v: '0',
}

export const EmojiCategory = ({ item: { title, data } }: { item: EmojisByCategory }) => {
  const {
    width,
    emojiSize,
    hideHeader,
    translation,
    headerStyles,
    onEmojiSelected,
    categoryPosition,
    numberOfColumns,
  } = React.useContext(KeyboardContext)

  const { setKeyboardState } = useKeyboardStore()

  const [empty, setEmpty] = React.useState<JsonEmoji[]>([])

  const handleEmojiPress = React.useCallback(
    (emoji: JsonEmoji) => {
      if (emoji.name === 'blank emoji') return
      const parsedEmoji = parseEmoji(emoji)
      onEmojiSelected(parsedEmoji)
      setKeyboardState({ type: 'RECENT_EMOJI_ADD', payload: emoji })
    },
    [onEmojiSelected, setKeyboardState]
  )

  const keyExtractor = React.useCallback((_, index) => index, [])
  const renderItem = React.useCallback(
    (props) => <SingleEmoji {...props} onPress={handleEmojiPress} emojiSize={emojiSize} />,
    [emojiSize, handleEmojiPress]
  )
  const ListFooterComponent = React.useMemo(
    () => <View style={categoryPosition === 'floating' ? styles.footerFloating : styles.footer} />,
    [categoryPosition]
  )

  React.useEffect(() => {
    if (data.length % numberOfColumns) {
      const fillWithEmpty = new Array(numberOfColumns - (data.length % numberOfColumns)).fill(
        emptyEmoji
      )
      setEmpty(fillWithEmpty)
    }
  }, [numberOfColumns, data])

  return (
    <View style={[styles.container, { width: width }]}>
      {!hideHeader && <Text style={[styles.sectionTitle, headerStyles]}>{translation[title]}</Text>}

      <FlashList
        {...{
          data: [...data, ...empty],
          renderItem,
          numColumns: numberOfColumns,
          keyExtractor,
          ListFooterComponent,
          estimatedItemSize: 50,
          removeClippedSubviews: true,
          keyboardShouldPersistTaps: 'handled',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
