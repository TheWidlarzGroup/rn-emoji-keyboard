import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native'
import type { EmojiSizes, JsonEmoji } from '../types'

type Props = {
  item: JsonEmoji
  emojiSize: number
  index: number
  onPress: (emoji: JsonEmoji) => void
  onLongPress: (emoji: JsonEmoji, emojiIndex: number, emojiSizes: EmojiSizes) => void
  selectedEmojiStyle?: ViewStyle
}
export const SingleEmoji = React.memo(
  (p: Props) => {
    const handlePress = () => p.onPress(p.item)
    const handleLongPress = (e: GestureResponderEvent) => {
      // @ts-ignore
      e.target.measure((_x, _y, width, height) => {
        p.onLongPress(p.item, p.index, { width, height })
      })
    }

    return (
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={[styles.container, p.selectedEmojiStyle]}>
        <View pointerEvents={'none'}>
          <Text style={[styles.emoji, { fontSize: p.emojiSize }]}>{p.item.emoji}</Text>
        </View>
      </TouchableOpacity>
    )
  },
  () => true
)

const styles = StyleSheet.create({
  container: { flex: 1, padding: 4, margin: 4, justifyContent: 'center', alignItems: 'center' },
  emoji: { color: '#000' },
})
