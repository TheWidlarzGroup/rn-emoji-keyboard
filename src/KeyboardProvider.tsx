import * as React from 'react';
import { useWindowDimensions } from 'react-native';
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
  categoryColor: '#000000',
  activeCategoryColor: '#005b96',
  categoryContainerColor: '#e3dbcd',
};

export const defaultKeyboardValues: ContextValues = {
  activeCategoryIndex: 0,
  setActiveCategoryIndex: () => {},
  numberOfColumns: 5,
  width: 0,
};

export const KeyboardProvider: React.FC<ProviderProps> = React.memo((props) => {
  const { width } = useWindowDimensions();
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);
  const numberOfColumns = React.useRef<number>(
    Math.floor(
      width /
        ((props.emojiSize
          ? props.emojiSize
          : defaultKeyboardContext.emojiSize) *
          2)
    )
  );
  React.useEffect(() => {
    if (props.open) setActiveCategoryIndex(0);
  }, [props.open]);

  const value: Required<KeyboardProps> & ContextValues = {
    ...defaultKeyboardContext,
    ...defaultKeyboardValues,
    ...props,
    activeCategoryIndex,
    setActiveCategoryIndex,
    numberOfColumns: numberOfColumns.current,
    width,
  };
  return (
    <KeyboardContext.Provider value={value}>
      {props.children}
    </KeyboardContext.Provider>
  );
});

KeyboardProvider.displayName = 'KeyboardProvider';
