import { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform, type KeyboardEvent } from 'react-native'

export const useKeyboard = (isOpen: boolean) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const onKeyboardShow = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      setKeyboardHeight(e.endCoordinates.height)
      setKeyboardVisible(true)
    },
    [isOpen],
  )

  const onKeyboardWillHide = useCallback(() => {
    setKeyboardHeight(0)
    setKeyboardVisible(false)
  }, [])

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'

    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    const showSubscription = Keyboard.addListener(showEvent, onKeyboardShow)

    const hideSubscription = Keyboard.addListener(hideEvent, onKeyboardWillHide)

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [onKeyboardWillHide, onKeyboardShow])

  return { keyboardVisible, keyboardHeight }
}
