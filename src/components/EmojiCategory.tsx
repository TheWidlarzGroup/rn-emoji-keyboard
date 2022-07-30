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
}

export const EmojiCategory = React.memo(
  ({ item: { title, data } }: { item: EmojisByCategory }) => {
    const {
      onEmojiSelected,
      emojiSize,
      numberOfColumns,
      width,
      hideHeader,
      headerStyles,
      translation,
      categoryPosition,
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

    const renderItem = React.useCallback(
      (props) => <SingleEmoji {...props} onPress={handleEmojiPress} emojiSize={emojiSize} />,
      [emojiSize, handleEmojiPress]
    )

    const keyExtractor = React.useCallback((item: JsonEmoji) => item.name, [])

    return (
      <View style={[styles.container, { width }]}>
        {!hideHeader && (
          <Text style={[styles.sectionTitle, headerStyles]}>{translation[title]}</Text>
        )}
        <FlatList
          data={[...data, ...empty]}
          keyExtractor={keyExtractor}
          numColumns={numberOfColumns}
          renderItem={renderItem}
          removeClippedSubviews={true}
          getItemLayout={getItemLayout}
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
  () => true
)

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
