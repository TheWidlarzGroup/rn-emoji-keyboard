export type EmojiType = {
  emoji: string;
  name: string;
  slug: string;
};

export type CategoryTypes =
  | 'smileys_emotion'
  | 'people_body'
  | 'animals_nature'
  | 'food_drink'
  | 'travel_places'
  | 'activities'
  | 'objects'
  | 'symbols'
  | 'flags';

export const CATEGORIES: CategoryTypes[] = [
  'smileys_emotion',
  'people_body',
  'animals_nature',
  'food_drink',
  'travel_places',
  'activities',
  'objects',
  'symbols',
  'flags',
];

export type CategoryNavigationItem = {
  icon: string;
  category: CategoryTypes;
};

export type CategoryTranslation = {
  [key in CategoryTypes]: string;
};

export const CATEGORIES_NAVIGATION: CategoryNavigationItem[] = [
  { icon: 'Smile', category: 'smileys_emotion' },
  { icon: 'Users', category: 'people_body' },
  { icon: 'Trees', category: 'animals_nature' },
  { icon: 'Pizza', category: 'food_drink' },
  { icon: 'Plane', category: 'travel_places' },
  { icon: 'Football', category: 'activities' },
  { icon: 'Lightbulb', category: 'objects' },
  { icon: 'Ban', category: 'symbols' },
  { icon: 'Flag', category: 'flags' },
];

export type EmojisByCategory = {
  title: CategoryTypes;
  data: EmojiType[];
};
