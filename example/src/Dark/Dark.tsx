import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmojiPicker from 'rn-emoji-keyboard'
import type { EmojiType } from 'src/types'

const Dark = () => {
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
        backdropColor="#16161888"
        categoryContainerColor="#252427"
        categoryColor="#766dfc"
        activeCategoryColor="#fff"
        activeCategoryContainerColor="#766dfc"
        knobStyles={styles.knobStyles}
        containerStyles={styles.containerStyles}
        headerStyles={styles.headerStyles}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161618',
  },
  text: {
    textAlign: 'center',
    margin: 64,
    fontSize: 18,
    color: '#fff',
  },
  knobStyles: {
    backgroundColor: '#766dfc',
  },
  containerStyles: {
    backgroundColor: '#282829',
  },
  headerStyles: {
    color: '#fff',
    fontSize: 16,
  },
})

export default Dark
