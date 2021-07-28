import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { KeyboardContext } from '../contexts/KeyboardContext';

export const SearchBar = () => {
  const [search, setSearch] = React.useState('');
  const { setSearchPhrase, translation } = React.useContext(KeyboardContext);
  React.useEffect(() => {
    console.log(search);
  }, [search]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setSearchPhrase(text);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={handleSearch}
        placeholder={translation.search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#00000011',
  },
});
