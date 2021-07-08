import * as React from 'react';
import type { ViewStyle } from 'react-native';
import {
  defaultKeyboardContext,
  defaultKeyboardValues,
} from './KeyboardProvider';
import type { EmojiType } from './types';

export type KeyboardProps = {
  onEmojiSelected: (emoji: EmojiType) => void;
  emojiSize?: number;
  containerStyles?: ViewStyle;
  isOpen?: boolean;
};
export type ContextValues = {
  activeCategoryIndex: number;
  setActiveCategoryIndex: (index: number) => void;
  numberOfColumns: number;
};

export const KeyboardContext = React.createContext<
  Required<KeyboardProps> & ContextValues
>({
  ...defaultKeyboardContext,
  ...defaultKeyboardValues,
});
