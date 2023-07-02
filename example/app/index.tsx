import { Link } from 'expo-router'
import * as React from 'react'

import { StyleSheet, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="/basic">Home</Link>
      <Link href="/dark">Dark</Link>
      <Link href="/translated">Translated</Link>
      <Link href="/disabled-categories">Disabled Categories</Link>
      <Link href="/static-modal">Static Modal (without knob)</Link>
      <Link href="/static">Static Component</Link>
      <Link href="/enable-recently">Enable recently used</Link>
      <Link href="/enable-recently-persistence">Enable recently used with persistence</Link>
      <Link href="/category-top">Category Top</Link>
      <Link href="/category-bottom">Category Bottom</Link>
      <Link href="/search">Search Bar</Link>
      <Link href="/selected-emojis">Selected Emojis</Link>
      <Link href="/emoji-data">Custom Emojis Data</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
