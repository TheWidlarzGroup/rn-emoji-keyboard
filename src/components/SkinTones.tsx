import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { useKeyboardStore } from '../store/useKeyboardStore'
import { parseEmoji } from '../utils'
import type { JsonEmoji } from '../types'
import { SingleEmoji } from './SingleEmoji'

export const SkinTones = () => {
  const { selectedEmojiTones, onEmojiSelected, isToneSelectorOpened, clearSelected } =
    React.useContext(KeyboardContext)

  const { setKeyboardState } = useKeyboardStore()

  //   const getStylesBasedOnPosition = () => {
  //     const style: ViewStyle[] = [styles.navigation, categoryContainerStyles]
  //     switch (categoryPosition) {
  //       case 'floating':
  //         style.push(styles.navigationFloating)
  //         break
  //       case 'top':
  //         style.push(styles.navigationTop)
  //         break
  //       case 'bottom':
  //         style.push(styles.navigationBottom)
  //         break
  //       default:
  //         exhaustiveTypeCheck(categoryPosition)
  //         break
  //     }

  //     if (
  //       categoryContainerColor !== defaultKeyboardContext.categoryContainerColor ||
  //       categoryPosition === 'floating'
  //     )
  //       style.push({
  //         backgroundColor: categoryContainerColor,
  //       })
  //     return style
  //   }

  const handleEmojiPress = React.useCallback(
    (emoji: JsonEmoji) => {
      if (emoji.name === 'blank emoji') return
      console.log('emoji', emoji)
      const parsedEmoji = parseEmoji(emoji)
      onEmojiSelected(parsedEmoji)
      clearSelected()
      setKeyboardState({ type: 'RECENT_EMOJI_ADD', payload: emoji })
    },
    [clearSelected, onEmojiSelected, setKeyboardState]
  )

  const renderItem = React.useCallback(
    (props: any) => {
      return <SingleEmoji {...props} onPress={() => handleEmojiPress(props.item)} emojiSize={28} />
    },
    [handleEmojiPress]
  )

  if (!isToneSelectorOpened) return null
  return (
    <View style={styles.floating}>
      <View>
        <FlatList
          data={selectedEmojiTones}
          keyExtractor={(emoji) => emoji.index}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ListHeaderComponentStyle={styles.activeIndicatorContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  floating: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: '#e3dbcd',
    width: '70%',
  },
  navigation: {
    padding: 3,
    alignItems: 'center',
    borderColor: '#00000011',
  },
  navigationFloating: {
    borderRadius: 8,
  },
  navigationBottom: {
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
  },
  navigationTop: {
    paddingTop: 12,
    paddingBottom: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
  },
  separator: {
    width: 1,
    height: 28,
    backgroundColor: '#00000011',
    marginHorizontal: 4,
  },
  activeIndicator: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  activeIndicatorContainer: {
    position: 'absolute',
    width: 28,
    height: 28,
  },
})
