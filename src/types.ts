export const CATEGORIES_NAVIGATION = [
  { icon: 'Smile', category: 'smileys_emotion' },
  { icon: 'Users', category: 'people_body' },
  { icon: 'Trees', category: 'animals_nature' },
  { icon: 'Pizza', category: 'food_drink' },
  { icon: 'Plane', category: 'travel_places' },
  { icon: 'Football', category: 'activities' },
  { icon: 'Lightbulb', category: 'objects' },
  { icon: 'Ban', category: 'symbols' },
  { icon: 'Flag', category: 'flags' },
  { icon: 'Clock', category: 'recently_used' },
  { icon: 'Search', category: 'search' },
] as const

export type IconNames = (typeof CATEGORIES_NAVIGATION)[number]['icon']
export type CategoryTypes = (typeof CATEGORIES_NAVIGATION)[number]['category']

export const CATEGORIES: readonly CategoryTypes[] = CATEGORIES_NAVIGATION.map(
  ({ category }) => category,
)

export type JsonEmoji = {
  emoji: string
  name: string
  v: string
  toneEnabled: boolean
  keywords?: string[]
}

export type ToneSelectorEmoji = Omit<JsonEmoji, 'toneEnabled'> & {
  index: string
}

export type EmojiType = {
  emoji: string
  name: string
  slug: string
  unicode_version: string
  toneEnabled: boolean
  alreadySelected?: boolean
}

export type CategoryPosition = 'floating' | 'top' | 'bottom'

export type CategoryNavigationItem = {
  icon: IconNames
  category: CategoryTypes
}

export type CategoryTranslation = {
  [key in CategoryTypes]: string
}

export type EmojisByCategory = {
  title: CategoryTypes
  data: JsonEmoji[]
}

export type EmojiTonesData = {
  emojis: ToneSelectorEmoji[]
  position: {
    x: number
    y: number
  }
  funnelXPosition: number
} | null

export type EmojiSizes = {
  width: number
  height: number
}
export type RecentPicksPersistenceConfig = {
  initialization: () => Promise<JsonEmoji[]>
  onStateChange: (nextState: Readonly<JsonEmoji[]>) => void | Promise<void>
}
