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
  { icon: 'Smile', category: 'Smileys & Emotion' },
  { icon: 'Users', category: 'People & Body' },
  { icon: 'Trees', category: 'Animals & Nature' },
  { icon: 'Pizza', category: 'Food & Drink' },
  { icon: 'Plane', category: 'Travel & Places' },
  { icon: 'Football', category: 'Activities' },
  { icon: 'Lightbulb', category: 'Objects' },
  { icon: 'Ban', category: 'Symbols' },
  { icon: 'Flag', category: 'Flags' },
];

// export const CATEGORIES_NAVIGATION: CategoryNavigationItem[] = [
//   { icon: '😀', category: 'Smileys & Emotion' },
//   { icon: '👋', category: 'People & Body' },
//   { icon: '🐵', category: 'Animals & Nature' },
//   { icon: '🍇', category: 'Food & Drink' },
//   { icon: '🌍', category: 'Travel & Places' },
//   { icon: '🎃', category: 'Activities' },
//   { icon: '👓', category: 'Objects' },
//   { icon: '🏧', category: 'Symbols' },
//   { icon: '🏁', category: 'Flags' },
// ];
