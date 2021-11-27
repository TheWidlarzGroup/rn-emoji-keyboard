import { useEffect, useState } from 'react'
import { Keyboard, KeyboardEvent } from 'react-native'

export const useKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height)
    setKeyboardVisible(true)
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0)
    setKeyboardVisible(false)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardDidShow)
    Keyboard.addListener('keyboardWillHide', onKeyboardDidHide)
    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow)
      Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide)
    }
  }, [])

  return { keyboardVisible, keyboardHeight }
}
