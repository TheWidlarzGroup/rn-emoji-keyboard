import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EmojiKeyboard } from 'rn-emoji-keyboard'
import type { EmojiType } from 'src/types'

const Static = () => {
  const [result, setResult] = React.useState<string>()

  const handlePick = (emoji: EmojiType) => {
    setResult(emoji.emoji)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Result: {result}</Text>
      </View>
      <View style={styles.container}>
        <EmojiKeyboard onEmojiSelected={handlePick} containerStyles={styles.keyboardContainer} />
      </View>
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
  keyboardContainer: {
    borderRadius: 0,
  },
})

export default Static
