import type { ViewStyle } from 'react-native';

export type EmojiType = {
  emoji: string;
  emoji_version: string;
  name: string;
  skin_tone_support: boolean;
  slug: string;
  unicode_version: string;
};

export type CategoryTypes =
  | 'Smileys & Emotion'
  | 'People & Body'
  | 'Animals & Nature'
  | 'Food & Drink'
  | 'Travel & Places'
  | 'Activities'
  | 'Objects'
  | 'Symbols'
  | 'Flags';

export const CATEGORIES: CategoryTypes[] = [
  'Smileys & Emotion',
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Travel & Places',
  'Activities',
  'Objects',
  'Symbols',
  'Flags',
];

type CategoryNavigationItem = {
  icon: string;
  category: CategoryTypes;
};

export const CATEGORIES_NAVIGATION: CategoryNavigationItem[] = [
  { icon: '😀', category: 'Smileys & Emotion' },
  { icon: '👋', category: 'People & Body' },
  { icon: '🐵', category: 'Animals & Nature' },
  { icon: '🍇', category: 'Food & Drink' },
  { icon: '🌍', category: 'Travel & Places' },
  { icon: '🎃', category: 'Activities' },
  { icon: '👓', category: 'Objects' },
  { icon: '🏧', category: 'Symbols' },
  { icon: '🏁', category: 'Flags' },
];

export type EmojiKeyboardProps = {
  onEmojiSelected: (emoji: EmojiType) => void;
  containerStyles?: ViewStyle;
  numberOfColumns?: number;
  emojiSize?: number;
};
