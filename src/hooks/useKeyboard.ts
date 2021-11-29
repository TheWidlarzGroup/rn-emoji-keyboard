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
    const showSubscription = Keyboard.addListener('keyboardWillShow', onKeyboardDidShow)
    const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardDidHide)
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return { keyboardVisible, keyboardHeight }
}
