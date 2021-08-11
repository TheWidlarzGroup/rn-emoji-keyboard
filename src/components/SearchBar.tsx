import * as React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Icon } from './Icon'

type SearchBarProps = {
  flatListRef: React.RefObject<FlatList>
}

export const SearchBar = ({ flatListRef }: SearchBarProps) => {
  const {
    searchPhrase,
    setSearchPhrase,
    translation,
    setActiveCategoryIndex,
    closeSearchColor,
    searchBarStyles,
    searchBarTextStyles,
    searchBarPlaceholderColor,
  } = React.useContext(KeyboardContext)
  const inputRef = React.useRef<TextInput>(null)

  const handleSearch = (text: string) => {
    setSearchPhrase(text)
  }
  const clearPhrase = () => {
    setSearchPhrase('')
    inputRef.current?.blur()
    setActiveCategoryIndex(0)
    flatListRef?.current?.scrollToIndex({ index: 0, animated: true })
  }

  return (
    <View style={[styles.container, searchBarStyles]}>
      <TextInput
        style={[styles.input, searchBarTextStyles]}
        value={searchPhrase}
        onChangeText={handleSearch}
        placeholder={translation.search}
        ref={inputRef}
        placeholderTextColor={searchBarPlaceholderColor}
      />
      {!!searchPhrase && (
        <TouchableOpacity onPress={clearPhrase} style={styles.button}>
          <Icon
            iconName={'Close'}
            isActive={true}
            normalColor={closeSearchColor}
            activeColor={closeSearchColor}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#00000011',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  button: {
    marginRight: 8,
  },
})
