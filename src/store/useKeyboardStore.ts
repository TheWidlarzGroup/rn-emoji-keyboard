import { useEffect, useState } from 'react'
import type { KeyboardAction, KeyboardState } from './reducers'
import keyboardReducer from './reducers'

let globalKeyboardState: KeyboardState = {
  recentlyUsed: [],
}

type KeyboardStateSetter = () => any
const keyboardStateListeners = new Set<KeyboardStateSetter>()

const setKeyboardState = (action: KeyboardAction) => {
  globalKeyboardState = keyboardReducer(globalKeyboardState, action)
  keyboardStateListeners.forEach((listener) => listener())
}

export const useKeyboardStore = () => {
  const [keyboardState, setState] = useState(globalKeyboardState)

  useEffect(() => {
    const listener = () => setState(globalKeyboardState)
    keyboardStateListeners.add(listener)
    return () => {
      keyboardStateListeners.delete(listener)
    }
  }, [keyboardState])

  return { keyboardState, setKeyboardState }
}
