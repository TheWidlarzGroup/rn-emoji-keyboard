import { useEffect } from 'react'
import { DevSettings, NativeModules } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useDebugMenu = () => {
  useEffect(() => {
    const clearAndReload = () => {
      AsyncStorage.clear().then(() => NativeModules.DevSettings.reload())
    }

    DevSettings.addMenuItem('Clear Async Storage', clearAndReload)
  }, [])

  return {}
}
