import * as React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity,useWindowDimensions, Animated } from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Icon } from './Icon'
import { getHeight } from '../utils'

export const SearchBar = (props) => {
  const {
    searchPhrase,
    setSearchPhrase,
    translation,
    setActiveCategoryIndex,
    closeSearchColor,
    searchBarStyles,
    searchBarTextStyles,
    searchBarPlaceholderColor,
    renderList,
    expandedHeight
  } = React.useContext(KeyboardContext)
  const inputRef = React.useRef<TextInput>(null)

  const { height: screenHeight } = useWindowDimensions()

  const handleSearch = (text: string) => {
    setSearchPhrase(text)
    if (text === '') return setActiveCategoryIndex(0)
    const searchIndex = renderList.findIndex((cat) => cat.title === 'search')
    if (searchIndex !== -1) setActiveCategoryIndex(searchIndex)
  }
  const clearPhrase = () => {
    setSearchPhrase('')
    inputRef.current?.blur()
    setActiveCategoryIndex(0)
  }
  const increaseHeightOnFocus=()=>{
    Animated.spring(props.height, {
      useNativeDriver: false,
      toValue: getHeight(expandedHeight, screenHeight),
    }).start()
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
        onFocus={increaseHeightOnFocus}
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
