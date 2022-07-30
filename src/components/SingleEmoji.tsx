import * as React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import type { JsonEmoji } from '../types'

export class SingleEmoji extends React.Component<{
  item: JsonEmoji
  onPress: (emoji: JsonEmoji) => void
  emojiSize: number
}> {
  shouldComponentUpdate() {
    return false
  }
  handleEmojiPress() {
    this.props.onPress(this.props.item)
  }
  render() {
    const { item, emojiSize } = this.props
    return (
      <TouchableOpacity onPress={this.handleEmojiPress} style={styles.container}>
        <Text style={[styles.emoji, { fontSize: emojiSize }]}>{item.emoji}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, justifyContent: 'center', alignItems: 'center' },
  emoji: { color: '#000' },
})
