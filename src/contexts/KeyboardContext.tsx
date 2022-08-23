import * as React from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import { defaultKeyboardContext, defaultKeyboardValues } from './KeyboardProvider'
import type {
  CategoryTranslation,
  EmojiType,
  CategoryTypes,
  CategoryPosition,
  EmojisByCategory,
  JsonEmoji,
  EmojiTonesData,
  EmojiSizes,
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
}

export const KeyboardContext = React.createContext<
  Required<KeyboardProps> & ContextValues & { theme: Theme; styles: Styles }
>({
  ...defaultKeyboardContext,
  ...defaultKeyboardValues,
})
