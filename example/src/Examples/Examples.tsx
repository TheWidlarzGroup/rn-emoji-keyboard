import * as React from 'react'
import { View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Examples: undefined
  Basic: undefined
  CategoryChangeGesture: undefined
  Dark: undefined
  Translated: undefined
  DisabledCategories: undefined
  StaticModal: undefined
  Static: undefined
  EnableRecently: undefined
  TopCategory: undefined
  BottomCategory: undefined
  SearchBar: undefined
}

type Props = StackScreenProps<RootStackParamList, 'Examples'>

const Examples = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View>
        <Button title="Basic" onPress={() => navigation.navigate('Basic')} />
        <Button
          title="Category Change Gesture"
          onPress={() => navigation.navigate('CategoryChangeGesture')}
        />
        <Button title="Dark" onPress={() => navigation.navigate('Dark')} />
        <Button title="Translated" onPress={() => navigation.navigate('Translated')} />
        <Button
          title="Disabled Categories"
          onPress={() => navigation.navigate('DisabledCategories')}
        />
        <Button
          title="Static Modal (wihtout knob)"
          onPress={() => navigation.navigate('StaticModal')}
        />
        <Button title="Static Component" onPress={() => navigation.navigate('Static')} />
        <Button
          title="Enable recently used"
          onPress={() => navigation.navigate('EnableRecently')}
        />
        <Button title="Category Top" onPress={() => navigation.navigate('TopCategory')} />
        <Button title="Category Bottom" onPress={() => navigation.navigate('BottomCategory')} />
        <Button title="Search Bar" onPress={() => navigation.navigate('SearchBar')} />
      </View>
    </SafeAreaView>
  )
}
export default Examples
