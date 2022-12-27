import * as React from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import en from '../translation/en'
import {
  CategoryTranslation,
  EmojiType,
  CategoryTypes,
  CategoryPosition,
  EmojisByCategory,
  JsonEmoji,
  EmojiTonesData,
  EmojiSizes,
  CATEGORIES,
} from '../types'
import type { RecursivePartial } from '../utils/deepMerge'

export type OnEmojiSelected = (emoji: EmojiType) => void

export type Styles = {
  container: ViewStyle
  header: TextStyle
  knob: ViewStyle
  category: {
    container: ViewStyle
    icon: TextStyle
  }
  searchBar: {
    container: ViewStyle
    text: TextStyle
  }
}

export type Theme = {
  backdrop: string
  knob: string
  container: string
  header: string
  skinTonesContainer: string
  category: {
    icon: string
    iconActive: string
    container: string
    containerActive: string
  }
  search: {
    background: string
    text: string
    placeholder: string
    icon: string
  }
}

export type KeyboardProps = {
  open: boolean
  onClose: () => void
  onEmojiSelected: OnEmojiSelected
  emojiSize?: number
  expandable?: boolean
  hideHeader?: boolean
  defaultHeight?: number | string
  expandedHeight?: number | string
  onCategoryChangeFailed?: (info: {
    index: number
    highestMeasuredFrameIndex: number
    averageItemLength: number
  }) => void
  translation?: CategoryTranslation
  disabledCategories?: CategoryTypes[]
  enableRecentlyUsed?: boolean
  categoryPosition?: CategoryPosition
  enableSearchBar?: boolean
  categoryOrder?: CategoryTypes[]
  onRequestClose?: () => void
  disableSafeArea?: boolean
  allowMultipleSelections?: boolean
  theme?: RecursivePartial<Theme>
  styles?: RecursivePartial<Styles>
  enableSearchAnimation?: boolean
  enableCategoryChangeAnimation?: boolean

  enableCategoryChangeGesture?: boolean
}
export type ContextValues = {
  activeCategoryIndex: number
  setActiveCategoryIndex: (index: number) => void
  numberOfColumns: number
  width: number
  searchPhrase: string
  setSearchPhrase: (phrase: string) => void
  renderList: EmojisByCategory[]
  isToneSelectorOpened: boolean
  clearEmojiTonesData: () => void
  generateEmojiTones: (emoji: JsonEmoji, emojiIndex: number, emojiSizes: EmojiSizes) => void
  emojiTonesData: EmojiTonesData
  shouldAnimateScroll: boolean
  setShouldAnimateScroll: (value: boolean) => void
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
  enableSearchAnimation: true,
  enableCategoryChangeAnimation: true,
  enableCategoryChangeGesture: true,
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
  shouldAnimateScroll: true,
  setShouldAnimateScroll: (_value: boolean) => {},
}

export const KeyboardContext = React.createContext<
  Required<KeyboardProps> & ContextValues & { theme: Theme; styles: Styles }
>({
  ...defaultKeyboardContext,
  ...defaultKeyboardValues,
})
