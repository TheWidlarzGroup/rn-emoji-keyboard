import * as React from 'react'
import { EmojiStaticKeyboard } from './components/EmojiStaticKeyboard'
import { KeyboardProvider } from './contexts/KeyboardProvider'
import type { KeyboardProps, OnEmojiSelected } from './contexts/KeyboardContext'

type EmojiKeyboardProps = {
  onEmojiSelected: OnEmojiSelected
} & Partial<KeyboardProps>

export const EmojiKeyboard = (props: EmojiKeyboardProps) => {
  return (
    <KeyboardProvider {...props}>
      <EmojiStaticKeyboard />
    </KeyboardProvider>
  )
}
