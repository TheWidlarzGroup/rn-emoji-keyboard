import * as React from 'react'
import { EmojiStaticKeyboard } from './components/EmojiStaticKeyboard'
import { KeyboardProvider } from './contexts/KeyboardProvider'
import type { KeyboardProps } from './contexts/KeyboardContext'

type EmojiKeyboardProps = Omit<Partial<KeyboardProps>, 'open' | 'onClose' | 'emojisByGroup'> &
  Pick<KeyboardProps, 'onEmojiSelected' | 'emojisByGroup'>

export const EmojiKeyboard = (props: EmojiKeyboardProps) => {
  return (
    <KeyboardProvider {...props} open={true} onClose={() => {}} emojisByGroup={props.emojisByGroup}>
      <EmojiStaticKeyboard />
    </KeyboardProvider>
  )
}
