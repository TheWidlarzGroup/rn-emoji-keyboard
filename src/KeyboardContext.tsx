import * as React from 'react';
import type { EmojiType } from './types';

export const defaultKeyboardContext = {
  onEmojiSelected: (_emoji: EmojiType) => {},
  numberOfColumns: 7,
  emojiSize: 24,
};

export const KeyboardContext = React.createContext(defaultKeyboardContext);
