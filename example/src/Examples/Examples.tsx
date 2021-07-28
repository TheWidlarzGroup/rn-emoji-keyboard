import * as React from 'react';
import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Examples: undefined;
  Basic: undefined;
  Dark: undefined;
  Translated: undefined;
  DisabledCategories: undefined;
  StaticModal: undefined;
  Static: undefined;
  HideRecently: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Examples'>;

const Examples = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View>
        <Button title="Basic" onPress={() => navigation.navigate('Basic')} />
        <Button title="Dark" onPress={() => navigation.navigate('Dark')} />
        <Button
          title="Translated"
          onPress={() => navigation.navigate('Translated')}
        />
        <Button
          title="DisabledCategories"
          onPress={() => navigation.navigate('DisabledCategories')}
        />
        <Button
          title="StaticModal"
          onPress={() => navigation.navigate('StaticModal')}
        />
        <Button title="Static" onPress={() => navigation.navigate('Static')} />
        <Button
          title="Hide recently used"
          onPress={() => navigation.navigate('HideRecently')}
        />
      </View>
    </SafeAreaView>
  );
};
export default Examples;
