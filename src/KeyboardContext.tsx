import * as React from 'react';
import type { ViewStyle } from 'react-native';
import type { EmojiType } from './types';

export type KeyboardProps = {
  onEmojiSelected: (emoji: EmojiType) => void;
  numberOfColumns?: number;
  emojiSize?: number;
  containerStyles?: ViewStyle;
};
export type ContextValues = {
  activeCategoryIndex: number;
  setActiveCategoryIndex: (index: number) => void;
};

export const KeyboardContext = React.createContext<
  (KeyboardProps & ContextValues) | null
>(null);
