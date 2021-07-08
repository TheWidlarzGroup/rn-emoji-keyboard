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
  open: false,
  onClose: () => {},
  onEmojiSelected: (_emoji: EmojiType) => {},
  emojiSize: 28,
  containerStyles: {},
  knobStyles: {},
  headerStyles: {},
  expandable: true,
  hideHeader: false,
  defaultHeight: 0.4,
  expandedHeight: 0.8,
  backdropColor: '#00000055',
};

export const defaultKeyboardValues: ContextValues = {
  activeCategoryIndex: 0,
  setActiveCategoryIndex: () => {},
  numberOfColumns: 5,
};

export const KeyboardProvider: React.FC<ProviderProps> = React.memo((props) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);

  React.useEffect(() => {
    if (props.open) setActiveCategoryIndex(0);
  }, [props.open]);

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
