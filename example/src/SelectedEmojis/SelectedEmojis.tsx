import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmojiPicker from 'rn-emoji-keyboard'
import type { EmojiType } from 'src/types'

type CurrentlySelected = {
  name: EmojiType['name']
  emoji: EmojiType['emoji']
}

const SelectedEmojis = () => {
  const [result, setResult] = React.useState<string>()
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [currentlySelected, setCurrentlySelected] = React.useState<CurrentlySelected[]>([])

  const handlePick = (emoji: EmojiType) => {
    console.log(emoji)
    setResult(emoji.emoji)
    if (emoji.alreadySelected)
      setCurrentlySelected((prev) => prev.filter((a) => a.name !== emoji.name))
    else setCurrentlySelected((prev) => [...prev, { name: emoji.name, emoji: emoji.emoji }])
  }

  const currSelectedEmojis = currentlySelected.map((a) => a.emoji)
  const currSelectedNames = currentlySelected.map((a) => a.name)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Result: {result}</Text>
      <Text style={styles.text}>Currently Selected Emojis: {currSelectedEmojis}</Text>
      <TouchableOpacity onPress={() => setIsModalOpen(true)}>
        <Text style={styles.text}>Open</Text>
      </TouchableOpacity>

      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedEmojis={currSelectedNames}
        allowMultipleSelections
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

export default SelectedEmojis
