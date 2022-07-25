import * as React from 'react'
import { useWindowDimensions } from 'react-native'
import { KeyboardProps, ContextValues, KeyboardContext, OnEmojiSelected } from './KeyboardContext'
import en from '../translation/en'
import emojisByGroup from '../assets/emojis.json'
import { useKeyboardStore } from '../store/useKeyboardStore'
import type { EmojiType, CategoryTypes, EmojisByCategory, JsonEmoji } from '../types'
import { CATEGORIES } from '../types'
import { skinTones } from '../utils'

type ProviderProps = Partial<KeyboardProps> & {
  children: React.ReactNode
  onEmojiSelected: OnEmojiSelected
}

export const defaultKeyboardContext: Required<KeyboardProps> = {
  open: false,
  onClose: () => {},
  onEmojiSelected: (_emoji: EmojiType) => {},
  emojiSize: 28,
  containerStyles: {},
  knobStyles: {},
  headerStyles: {},
  expandable: true,
  hideHeader: false,
  defaultHeight: '40%',
  expandedHeight: '80%',
  backdropColor: '#00000055',
  categoryColor: '#000000',
  activeCategoryColor: '#005b96',
  categoryContainerColor: '#e3dbcd',
  activeCategoryContainerColor: '#ffffff',
  onCategoryChangeFailed: (info) => {
    console.warn(info)
  },
  translation: en,
  disabledCategories: [],
  enableRecentlyUsed: false,
  categoryPosition: 'floating',
  enableSearchBar: false,
  closeSearchColor: '#00000055',
  searchBarStyles: {},
  searchBarTextStyles: {},
  searchBarPlaceholderColor: '#00000055',
  categoryOrder: [...CATEGORIES],
  onRequestClose: () => {},
  categoryContainerStyles: {},
  disableSafeArea: false,
}

export const defaultKeyboardValues: ContextValues = {
  activeCategoryIndex: 0,
  setActiveCategoryIndex: () => {},
  numberOfColumns: 5,
  width: 0,
  searchPhrase: '',
  setSearchPhrase: (_phrase: string) => {},
  renderList: [],
  isToneSelectorOpened: false,
  clearSelected: () => {},
  generateEmojiTones: (_emoji) => {},
  emojiTonesData: {
    emojis: [],
    position: {
      x: 0,
      y: 0,
    },
  },
}

const EMOJI_PADDING = 8
const KEYBOARD_PADDING = 10

export const KeyboardProvider: React.FC<ProviderProps> = React.memo((props) => {
  const { width } = useWindowDimensions()
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0)
  const [searchPhrase, setSearchPhrase] = React.useState('')
  const { keyboardState } = useKeyboardStore()
  const [isToneSelectorOpened, setIsToneSelectorOpened] = React.useState(false)

  const [emojiTonesData, setEmojiTonesData] = React.useState<any>({})

  const numberOfColumns = React.useRef<number>(
    Math.floor(width / ((props.emojiSize ? props.emojiSize : defaultKeyboardContext.emojiSize) * 2))
  )

  const generateEmojiTones = (emoji: JsonEmoji, emojiIndex: number) => {
    if (!emoji || !emoji.toneEnabled) return

    const modifiedEmojis = skinTones.map((tone) => ({
      index: tone.name,
      emoji: emoji.emoji + tone.color,
      name: emoji.name,
      v: emoji.v,
    }))

    const singleEmojiWidth =
      (props.emojiSize ? props.emojiSize : defaultKeyboardContext.emojiSize) * 2

    const numOfColumns = numberOfColumns.current

    const centerColumn = Math.floor(numOfColumns / 2)

    const emojiIndexInRow = emojiIndex % numOfColumns

    const x =
      emojiIndexInRow < Math.floor(numOfColumns / 2)
        ? emojiIndexInRow * singleEmojiWidth
        : centerColumn * singleEmojiWidth

    const y = emojiIndex / numOfColumns >= 1 ? Math.floor(emojiIndex / numOfColumns) : 0

    const basicXPosition = KEYBOARD_PADDING + EMOJI_PADDING
    const position = {
      x: emojiIndexInRow === 0 ? basicXPosition : x + basicXPosition,
      y: y * (singleEmojiWidth - EMOJI_PADDING),
    }

    setIsToneSelectorOpened(true)
    setEmojiTonesData({
      emojis: modifiedEmojis,
      position,
    })
  }

  const clearSelected = () => {
    setIsToneSelectorOpened(false)
    setEmojiTonesData({})
  }

  React.useEffect(() => {
    if (props.open) setActiveCategoryIndex(0)
    setSearchPhrase('')
  }, [props.open])

  const renderList = React.useMemo(() => {
    let data = emojisByGroup.filter((category) => {
      const title = category.title as CategoryTypes
      if (props.disabledCategories) return !props.disabledCategories.includes(title)
      return true
    })
    if (keyboardState.recentlyUsed.length && props.enableRecentlyUsed) {
      data.push({
        title: 'recently_used' as CategoryTypes,
        data: keyboardState.recentlyUsed,
      })
    }
    if (props.enableSearchBar) {
      data.push({
        title: 'search' as CategoryTypes,
        data: emojisByGroup
          .map((group) => group.data)
          .flat()
          .filter((emoji) => {
            if (searchPhrase.length < 2) return false
            return (
              emoji.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
              emoji.emoji.toLowerCase().includes(searchPhrase)
            )
          }),
      })
    }
    if (props.categoryOrder) {
      const orderedData = props.categoryOrder.flatMap((name) =>
        data.filter((el) => el.title === name)
      )
      const restData = data.filter(
        (el) => !props?.categoryOrder?.includes(el.title as CategoryTypes)
      )
      data = [...orderedData, ...restData]
    }
    return data as EmojisByCategory[]
  }, [
    keyboardState.recentlyUsed,
    props.enableRecentlyUsed,
    props.enableSearchBar,
    props.categoryOrder,
    props.disabledCategories,
    searchPhrase,
  ])

  const value: Required<KeyboardProps> & ContextValues = {
    ...defaultKeyboardContext,
    ...defaultKeyboardValues,
    ...props,
    activeCategoryIndex,
    setActiveCategoryIndex,
    numberOfColumns: numberOfColumns.current,
    width,
    searchPhrase,
    setSearchPhrase,
    renderList,
    isToneSelectorOpened,
    clearSelected,
    generateEmojiTones,
    emojiTonesData,
  }
  return <KeyboardContext.Provider value={value}>{props.children}</KeyboardContext.Provider>
})

KeyboardProvider.displayName = 'KeyboardProvider'
