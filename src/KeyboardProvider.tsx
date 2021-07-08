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

export const defaultKeyboardContext: Required<KeyboardProps> = {
  onEmojiSelected: (_emoji: EmojiType) => {},
  emojiSize: 24,
  containerStyles: {},
};

export const defaultKeyboardValues: ContextValues = {
  activeCategoryIndex: 0,
  setActiveCategoryIndex: () => {},
  numberOfColumns: 5,
};

export const KeyboardProvider: React.FC<ProviderProps> = React.memo((props) => {
  const [activeCategoryIndex, setActive] = React.useState(0);

  const setActiveCategoryIndex = React.useCallback((index: number) => {
    setActive(index);
  }, []);

  const value: Required<KeyboardProps> & ContextValues = {
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
