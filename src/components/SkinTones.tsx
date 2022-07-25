import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { parseEmoji } from '../utils'
import type { JsonEmoji } from '../types'
import { SingleSkinTone } from './SingleSkinTone'

export const SkinTones = () => {
  const { onEmojiSelected, isToneSelectorOpened, clearSelected, emojiTonesData } =
    React.useContext(KeyboardContext)

  const { setKeyboardState } = useKeyboardStore()

  const handleEmojiPress = React.useCallback(
    (emoji: JsonEmoji) => {
      if (emoji.name === 'blank emoji') return
      console.log('emoji', emoji)
      const parsedEmoji = parseEmoji(emoji)
      onEmojiSelected(parsedEmoji)
      clearSelected()
      setKeyboardState({ type: 'RECENT_EMOJI_ADD', payload: emoji })
    },
    [clearSelected, onEmojiSelected, setKeyboardState]
  )

  const renderItem = React.useCallback(
    (props: any) => {
      return (
        <SingleSkinTone {...props} onPress={() => handleEmojiPress(props.item)} emojiSize={32} />
      )
    },
    [handleEmojiPress]
  )

  const posX = emojiTonesData?.position?.x || 0
  const posY = emojiTonesData?.position?.y || 0

  if (!isToneSelectorOpened) return null
  return (
    <View style={[styles.floating, { left: posX, top: posY }]}>
      <View>
        <FlatList
          data={emojiTonesData.emojis}
          keyExtractor={(emoji) => emoji.index}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ListHeaderComponentStyle={styles.activeIndicatorContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  floating: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3dbcd',
    width: 226,
    borderRadius: 8,
  },
  navigation: {
    padding: 3,
    alignItems: 'center',
    borderColor: '#00000011',
  },
  navigationFloating: {
    borderRadius: 8,
  },
  navigationBottom: {
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
  },
  navigationTop: {
    paddingTop: 12,
    paddingBottom: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
  },
  separator: {
    width: 1,
    height: 48,
    backgroundColor: '#00000011',
    marginHorizontal: 4,
  },
  activeIndicator: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  activeIndicatorContainer: {
    position: 'absolute',
    width: 28,
    height: 28,
  },
})
