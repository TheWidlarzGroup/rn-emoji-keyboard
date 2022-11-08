import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Examples, { RootStackParamList } from './Examples/Examples'
import Basic from './Basic/Basic'
import Dark from './Dark/Dark'
import Translated from './Translated/Translated'
import DisabledCategories from './DisabledCategories/DisabledCategories'
import StaticModal from './StaticModal/StaticModal'
import Static from './Static/Static'
import EnableRecently from './EnableRecently/EnableRecently'
import TopCategory from './TopCategory/TopCategory'
import BottomCategory from './BottomCategory/BottomCategory'
import SearchBar from './SearchBar/SearchBar'
import CategoryChangeGesture from './Basic/CategoryChangeGesture'

const Stack = createStackNavigator<RootStackParamList>()
export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Examples" component={Examples} />
        <Stack.Screen name="Basic" component={Basic} />
        <Stack.Screen name="EnableRecently" component={EnableRecently} />
        <Stack.Screen name="SearchBar" component={SearchBar} />
        <Stack.Screen name="Dark" component={Dark} />
        <Stack.Screen name="TopCategory" component={TopCategory} />
        <Stack.Screen name="BottomCategory" component={BottomCategory} />
        <Stack.Screen name="Translated" component={Translated} />
        <Stack.Screen name="DisabledCategories" component={DisabledCategories} />
        <Stack.Screen name="CategoryChangeGesture" component={CategoryChangeGesture} />
        <Stack.Screen name="StaticModal" component={StaticModal} />
        <Stack.Screen name="Static" component={Static} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
