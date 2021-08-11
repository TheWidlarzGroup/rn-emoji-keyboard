import * as React from 'react'
import { useWindowDimensions } from 'react-native'
import { KeyboardProps, ContextValues, KeyboardContext, OnEmojiSelected } from './KeyboardContext'
import en from '../translation/en'
import type { EmojiType } from '../types'

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
  disabledCategory: [],
  enableRecentlyUsed: false,
  categoryPosition: 'floating',
  enableSearchBar: false,
  closeSearchColor: '#00000055',
  searchBarStyles: {},
  searchBarTextStyles: {},
  searchBarPlaceholderColor: '#00000055',
}

export const defaultKeyboardValues: ContextValues = {
  activeCategoryIndex: 0,
  setActiveCategoryIndex: () => {},
  numberOfColumns: 5,
  width: 0,
  searchPhrase: '',
  setSearchPhrase: (_phrase: string) => {},
}

export const KeyboardProvider: React.FC<ProviderProps> = React.memo((props) => {
  const { width } = useWindowDimensions()
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0)
  const [searchPhrase, setSearchPhrase] = React.useState('')
  const numberOfColumns = React.useRef<number>(
    Math.floor(width / ((props.emojiSize ? props.emojiSize : defaultKeyboardContext.emojiSize) * 2))
  )
  React.useEffect(() => {
    if (props.open) setActiveCategoryIndex(0)
    setSearchPhrase('')
  }, [props.open])

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
  }
  return <KeyboardContext.Provider value={value}>{props.children}</KeyboardContext.Provider>
})

KeyboardProvider.displayName = 'KeyboardProvider'
