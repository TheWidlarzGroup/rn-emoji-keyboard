import en from '../translation/en'
import * as React from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import {
  CategoryTranslation,
  EmojiType,
  CategoryTypes,
  CategoryPosition,
  EmojisByCategory,
  CATEGORIES,
} from '../types'

export type OnEmojiSelected = (emoji: EmojiType) => void

export type KeyboardProps = {
  open: boolean
  onClose: () => void
  onEmojiSelected: OnEmojiSelected
  emojiSize?: number
  containerStyles?: ViewStyle
  knobStyles?: ViewStyle
  headerStyles?: TextStyle
  expandable?: boolean
  hideHeader?: boolean
  defaultHeight?: number | string
  expandedHeight?: number | string
  backdropColor?: string
  categoryColor?: string
  activeCategoryColor?: string
  categoryContainerColor?: string
  activeCategoryContainerColor?: string
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
  closeSearchColor?: string
  searchBarStyles?: ViewStyle
  searchBarTextStyles?: TextStyle
  searchBarPlaceholderColor?: string
  categoryOrder?: CategoryTypes[]
  onRequestClose?: () => void
  categoryContainerStyles?: ViewStyle
  disableSafeArea?: boolean
}
export type ContextValues = {
  activeCategoryIndex: number
  setActiveCategoryIndex: (index: number) => void
  numberOfColumns: number
  width: number
  searchPhrase: string
  setSearchPhrase: (phrase: string) => void
  renderList: EmojisByCategory[]
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
}

export const KeyboardContext = React.createContext<Required<KeyboardProps> & ContextValues>({
  ...defaultKeyboardContext,
  ...defaultKeyboardValues,
})
