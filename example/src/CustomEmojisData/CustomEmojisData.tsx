import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmojiPicker, { emojisByCategory } from 'rn-emoji-keyboard'

import type { EmojiType, EmojisByCategory } from 'src/types'

const getCustomEmojis = () => {
  const newEmojiSet: EmojisByCategory[] = []
  for (const [, value] of Object.entries(emojisByCategory)) {
    const newData = value.data.filter((emoji) => parseFloat(emoji.v) === 11)
    newEmojiSet.push({
      title: value.title,
      data: newData,
    })
  }
  return newEmojiSet
}

const CustomEmojisData = () => {
  const [result, setResult] = React.useState<string>()
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const handlePick = (emoji: EmojiType) => {
    console.log(emoji)
    setResult(emoji.emoji)
    setIsModalOpen((prev) => !prev)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Result: {result}</Text>
      <TouchableOpacity onPress={() => setIsModalOpen(true)}>
        <Text style={styles.text}>Open</Text>
      </TouchableOpacity>

      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        emojisByCategory={getCustomEmojis()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    margin: 64,
    fontSize: 18,
  },
})

export default CustomEmojisData
