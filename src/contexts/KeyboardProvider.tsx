import * as React from 'react'
import { useWindowDimensions } from 'react-native'
import {
  KeyboardProps,
  ContextValues,
  KeyboardContext,
  OnEmojiSelected,
  Theme,
  Styles,
} from './KeyboardContext'
import en from '../translation/en'
import emojisByGroup from '../assets/emojis.json'
import { useKeyboardStore } from '../store/useKeyboardStore'
import type {
  EmojiType,
  CategoryTypes,
  EmojisByCategory,
  JsonEmoji,
  EmojiTonesData,
} from '../types'
import { CATEGORIES } from '../types'
import {
  skinTones,
  generateToneSelectorFunnelPosition,
  generateToneSelectorPosition,
  insertAtCertainIndex,
  variantSelector,
  zeroWidthJoiner,
} from '../utils/skinToneSelectorUtils'
import { deepMerge } from '../utils/deepMerge'

type ProviderProps = Partial<KeyboardProps> & {
  children: React.ReactNode
  onEmojiSelected: OnEmojiSelected
}

export const emptyStyles: Styles = {
  container: {},
  header: {},
  category: {
    icon: {},
    container: {},
  },
  searchBar: {
    container: {},
    text: {},
  },
  knob: {},
}
export const defaultTheme: Theme = {
  backdrop: '#00000055',
  knob: '#ffffff',
  container: '#ffffff',
  header: '#00000099',
  skinTonesContainer: '#e3dbcd',
  category: {
    icon: '#000000',
    iconActive: '#005b96',
    container: '#e3dbcd',
    containerActive: '#ffffff',
  },
  search: {
    text: '#000000cc',
    placeholder: '#00000055',
    icon: '#00000055',
    background: '#00000011',
  },
}

export const defaultKeyboardContext: Required<KeyboardProps> & { theme: Theme; styles: Styles } = {
  open: false,
  onClose: () => {},
  onEmojiSelected: (_emoji: EmojiType) => {},
  emojiSize: 28,
  expandable: true,
  hideHeader: false,
  defaultHeight: '40%',
  expandedHeight: '80%',
  onCategoryChangeFailed: (info) => {
    console.warn(info)
  },
  translation: en,
  disabledCategories: [],
  enableRecentlyUsed: false,
  categoryPosition: 'floating',
  enableSearchBar: false,
  categoryOrder: [...CATEGORIES],
  onRequestClose: () => {},
  disableSafeArea: false,
  allowMultipleSelections: false,
  theme: defaultTheme,
  styles: emptyStyles,
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
  clearEmojiTonesData: () => {},
  generateEmojiTones: (_emoji) => {},
  emojiTonesData: {
    emojis: [],
    position: {
      x: 0,
      y: 0,
    },
    funnelXPosition: 0,
  },
}

export const KeyboardProvider: React.FC<ProviderProps> = React.memo((props) => {
  const { width } = useWindowDimensions()
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0)
  const [searchPhrase, setSearchPhrase] = React.useState('')
  const { keyboardState } = useKeyboardStore()

  const [emojiTonesData, setEmojiTonesData] = React.useState<EmojiTonesData>(null)

  const numberOfColumns = React.useRef<number>(
    Math.floor(width / ((props.emojiSize ? props.emojiSize : defaultKeyboardContext.emojiSize) * 2))
  )

  const generateEmojiTones = React.useCallback(
    (emoji: JsonEmoji, emojiIndex: number, emojiSizes: any) => {
      if (!emoji || !emoji.toneEnabled) return

      const EXTRA_SEARCH_TOP = props.enableSearchBar ? 50 : 0

      const splittedEmoji = emoji.emoji.split('')
      const ZWJIndex = splittedEmoji.findIndex((a) => a === zeroWidthJoiner)
      const selectorIndex = splittedEmoji.findIndex((a) => a === variantSelector)
      const modifiedEmojis = skinTones.map((tone) => {
        const basicEmojiData = {
          index: tone.name,
          name: emoji.name,
          v: emoji.v,
        }
        // Check for emojis special signs which might break tone modify
        switch (true) {
          case ZWJIndex > 0:
            return {
              ...basicEmojiData,
              emoji: insertAtCertainIndex(splittedEmoji, ZWJIndex, tone.color).join(''),
            }
          case selectorIndex > 0:
            return {
              ...basicEmojiData,
              emoji: insertAtCertainIndex(splittedEmoji, selectorIndex, tone.color).join(''),
            }
          default:
            return {
              ...basicEmojiData,
              emoji: emoji.emoji + tone.color,
            }
        }
      })

      const skinTonePosition = generateToneSelectorPosition(
        numberOfColumns.current,
        emojiIndex,
        width,
        emojiSizes.width,
        emojiSizes.height,
        EXTRA_SEARCH_TOP
      )

      const funnelXPosition = generateToneSelectorFunnelPosition(
        numberOfColumns.current,
        emojiIndex,
        emojiSizes.width
      )

      setEmojiTonesData({
        emojis: modifiedEmojis,
        position: skinTonePosition,
        funnelXPosition,
      })
    },
    [props.enableSearchBar, width]
  )

  const clearEmojiTonesData = () => setEmojiTonesData(null)

  React.useEffect(() => {
    if (props.open) setActiveCategoryIndex(0)
    setSearchPhrase('')
    clearEmojiTonesData()
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

  const value: typeof defaultKeyboardContext & ContextValues = React.useMemo(
    () => ({
      ...defaultKeyboardContext,
      ...defaultKeyboardValues,
      ...props,
      theme: props.theme ? deepMerge(defaultTheme, props.theme) : defaultTheme,
      styles: props.styles ? deepMerge(emptyStyles, props.styles) : emptyStyles,
      activeCategoryIndex,
      setActiveCategoryIndex,
      numberOfColumns: numberOfColumns.current,
      width,
      searchPhrase,
      setSearchPhrase,
      renderList,
      clearEmojiTonesData,
      generateEmojiTones,
      emojiTonesData,
    }),
    [
      activeCategoryIndex,
      emojiTonesData,
      generateEmojiTones,
      props,
      renderList,
      searchPhrase,
      width,
    ]
  )
  return <KeyboardContext.Provider value={value}>{props.children}</KeyboardContext.Provider>
})

KeyboardProvider.displayName = 'KeyboardProvider'
