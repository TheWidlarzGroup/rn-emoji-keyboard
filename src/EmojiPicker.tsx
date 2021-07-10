import * as React from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { EmojiKeyboard } from './EmojiKeyboard';
import { Knob } from './components/Knob';
import { defaultKeyboardContext, KeyboardProvider } from './KeyboardProvider';
import type { KeyboardProps } from './KeyboardContext';
import type { EmojiType } from './types';
import { ModalWithBackdrop } from './components/ModalWithBackdrop';
import { getHeight } from './utils';

export const EmojiPicker = ({
  onEmojiSelected,
  open,
  onClose,
  expandable = defaultKeyboardContext.expandable,
  defaultHeight = defaultKeyboardContext.defaultHeight,
  ...props
}: KeyboardProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const offsetY = React.useRef(new Animated.Value(0)).current;
  const height = React.useRef(
    new Animated.Value(getHeight(defaultHeight, screenHeight))
  ).current;
  const translateY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: open ? 0 : screenHeight,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, [open, screenHeight, translateY]);

  const close = () => {
    height.setValue(screenHeight * 0.4);
    offsetY.setValue(0);
    onClose();
  };

  return (
    <KeyboardProvider
      onEmojiSelected={(emoji: EmojiType) => {
        onEmojiSelected(emoji);
        close();
      }}
      open={open}
      onClose={close}
      expandable={expandable}
      defaultHeight={defaultHeight}
      {...props}
    >
      <ModalWithBackdrop isOpen={open} backdropPress={close}>
        <>
          {expandable && (
            <Knob height={height} offsetY={offsetY} onClose={onClose} />
          )}
          <Animated.View
            style={[
              {
                height: Animated.subtract(height, offsetY),
              },
            ]}
          >
            <EmojiKeyboard />
          </Animated.View>
        </>
      </ModalWithBackdrop>
    </KeyboardProvider>
  );
};
