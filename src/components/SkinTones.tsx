import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { parseEmoji } from '../utils'
import type { JsonEmoji } from '../types'
import { SingleSkinTone } from './SingleSkinTone'

type Props = {
  keyboardScrollOffsetY: number
}

export const SkinTones = ({ keyboardScrollOffsetY }: Props) => {
  const { onEmojiSelected, emojiTonesData, skinTonesContainerColor } =
    React.useContext(KeyboardContext)

  const { setKeyboardState } = useKeyboardStore()

  const handleEmojiPress = React.useCallback(
    (emoji: JsonEmoji) => {
      if (emoji.name === 'blank emoji') return
      console.log('emoji', emoji)
      const parsedEmoji = parseEmoji(emoji)
      onEmojiSelected(parsedEmoji)
      setKeyboardState({ type: 'RECENT_EMOJI_ADD', payload: emoji })
    },
    [onEmojiSelected, setKeyboardState]
  )

  const renderItem = React.useCallback(
    (props) => {
      return (
        <SingleSkinTone {...props} onPress={() => handleEmojiPress(props.item)} emojiSize={32} />
      )
    },
    [handleEmojiPress]
  )

  const posX = emojiTonesData?.position?.x || 0
  const posY = emojiTonesData?.position?.y - keyboardScrollOffsetY || 0

  if (!emojiTonesData?.emojis?.length) return null
  return (
    <View
      style={[
        styles.floating,
        { left: posX, top: posY, backgroundColor: skinTonesContainerColor },
      ]}>
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

    width: 226,
    height: 48,
    borderRadius: 8,
  },
  separator: {
    width: 1,
    height: 38,
    backgroundColor: '#00000011',
    marginHorizontal: 4,
    marginVertical: 5,
  },
  activeIndicatorContainer: {
    position: 'absolute',
    width: 28,
    height: 28,
  },
})
