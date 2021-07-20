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
  Static: undefined;
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
        <Button title="Static" onPress={() => navigation.navigate('Static')} />
      </View>
    </SafeAreaView>
  );
};
export default Examples;
