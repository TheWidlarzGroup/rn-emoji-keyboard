import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import type { EmojiSizes, JsonEmoji } from '../types'

type Props = {
  item: JsonEmoji
  onPress: () => void
  emojiSize: number
  onLongPress: (emojiSizes: EmojiSizes) => () => void
}

export class SingleEmoji extends React.Component<Props, EmojiSizes> {
  constructor(props: Props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
  }
  shouldComponentUpdate() {
    return false
  }

  onLayout(width: EmojiSizes['width'], height: EmojiSizes['height']) {
    this.setState({
      width: width,
      height: height,
    })
  }

  render() {
    const { item, emojiSize, onPress, onLongPress } = this.props

    const handleLongPress = () => {
      const emojiSizes = {
        width: this.state.width,
        height: this.state.height,
      }
      onLongPress(emojiSizes)()
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        onLongPress={handleLongPress}
        onLayout={(e) => this.onLayout(e.nativeEvent.layout.width, e.nativeEvent.layout.height)}>
        <View style={styles.iconContainer}>
          <Text style={[styles.emoji, { fontSize: emojiSize }]}>{item.emoji}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  iconContainer: { justifyContent: 'center', alignItems: 'center' },
  emoji: { color: '#000' },
})
