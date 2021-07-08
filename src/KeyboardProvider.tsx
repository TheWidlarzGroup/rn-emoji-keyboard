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
  isOpen: false,
};

export const defaultKeyboardValues: ContextValues = {
  activeCategoryIndex: 0,
  setActiveCategoryIndex: () => {},
  numberOfColumns: 5,
};

export const KeyboardProvider: React.FC<ProviderProps> = React.memo((props) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);

  React.useEffect(() => {
    if (props.isOpen) setActiveCategoryIndex(0);
  }, [props.isOpen]);

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
