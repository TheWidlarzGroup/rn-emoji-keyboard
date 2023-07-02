import React from 'react'
import { DevSettings } from 'react-native'

export const useDebugMenu = () => {
  React.useEffect(() => {
    const clearAndReload = () => {
      //   AsyncStorage.clear().then(() => NativeModules.DevSettings.reload())
    }

    DevSettings.addMenuItem('Clear Async Storage', clearAndReload)
  }, [])

  return {}
}
