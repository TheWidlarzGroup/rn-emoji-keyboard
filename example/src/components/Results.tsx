import React from 'react'
import { StyleSheet, Text } from 'react-native'

type ResultsProps = {
  label?: string
}
export const Results = (p: ResultsProps) => {
  return <Text style={styles.text}>{p.label || ' '}</Text>
}

export const styles = StyleSheet.create({
  text: {
    marginHorizontal: 16,
    marginVertical: 32,
    textAlign: 'center',
    fontSize: 42,
    color: '#000',
  },
})
