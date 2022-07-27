import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import type { JsonEmoji } from '../types'

export class SingleEmoji extends React.Component<{
  item: JsonEmoji
  onPress: (emoji: JsonEmoji) => void
  emojiSize: number
}> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { item, emojiSize, onPress } = this.props
    return (
      <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
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
