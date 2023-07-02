import { Slot, Stack, usePathname } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function ExampleLayout() {
  const pathname = usePathname().replaceAll('/', '')
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1)

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title }} />
      <Slot />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 2 / 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
