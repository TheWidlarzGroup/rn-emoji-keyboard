import * as React from 'react';
import {
  KeyboardProps,
  ContextValues,
  KeyboardContext,
} from './KeyboardContext';
import type { EmojiType } from './types';

type ProviderProps = KeyboardProps & {
  children: React.ReactNode;
};

export const defaultKeyboardContext: KeyboardProps = {
  onEmojiSelected: (_emoji: EmojiType) => {},
  numberOfColumns: 7,
  emojiSize: 24,
};

export const defaultKeyboardValues: Partial<ContextValues> = {
  //   activeCategoryIndex: 0,
};

export const KeyboardProvider: React.FC<ProviderProps> = React.memo((props) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);

  const value: KeyboardProps & ContextValues = {
    ...defaultKeyboardContext,
    ...defaultKeyboardValues,
    ...props,
    activeCategoryIndex,
    setActiveCategoryIndex,
  };
  return (
    <KeyboardContext.Provider value={value}>
      {props.children}
    </KeyboardContext.Provider>
  );
});

KeyboardProvider.displayName = 'KeyboardProvider';
