import { useEffect } from 'react'
import { DevSettings } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useDebugMenu = () => {
  useEffect(() => {
    DevSettings.addMenuItem('Clear Async Storage', () => AsyncStorage.clear)
  }, [])

  return {}
}
