import * as React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import {
  defaultKeyboardContext,
  defaultKeyboardValues,
} from './KeyboardProvider';
import type { EmojiType } from './types';

export type KeyboardProps = {
  open: boolean;
  onClose: () => void;
  onEmojiSelected: (emoji: EmojiType) => void;
  emojiSize?: number;
  containerStyles?: ViewStyle;
  knobStyles?: ViewStyle;
  headerStyles?: TextStyle;
  expandable?: boolean;
  hideHeader?: boolean;
  defaultHeight?: number | string;
  expandedHeight?: number | string;
  backdropColor?: string;
  categoryColor?: string;
  activeCategoryColor?: string;
  categoryContainerColor?: string;
};
export type ContextValues = {
  activeCategoryIndex: number;
  setActiveCategoryIndex: (index: number) => void;
  numberOfColumns: number;
  width: number;
};

export const KeyboardContext = React.createContext<
  Required<KeyboardProps> & ContextValues
>({
  ...defaultKeyboardContext,
  ...defaultKeyboardValues,
});
