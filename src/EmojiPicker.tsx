import * as React from 'react';
import {
  SafeAreaView,
  Modal,
  Animated,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { EmojiKeyboard } from './EmojiKeyboard';
import { Knob } from './components/Knob';
import { KeyboardProvider } from './KeyboardProvider';
import type { KeyboardProps } from './KeyboardContext';
import type { EmojiType } from './types';
import { ModalWithBackdrop } from './components/ModalWithBackdrop';

type EmojiPickerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EmojiPicker = ({
  onEmojiSelected,
  isOpen,
  onClose,
  ...props
}: EmojiPickerProps & KeyboardProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const offsetY = React.useRef(new Animated.Value(0)).current;
  const height = React.useRef(new Animated.Value(screenHeight * 0.4)).current;
  const translateY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? 0 : screenHeight,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, [isOpen, screenHeight, translateY]);

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
      isOpen={isOpen}
      {...props}
    >
      <ModalWithBackdrop isOpen={isOpen} backdropPress={close}>
        <>
          <Knob height={height} offsetY={offsetY} onClose={onClose} />
          <Animated.View
            style={[
              {
                height: Animated.subtract(height, offsetY),
              },
              styles.container,
            ]}
          >
            <EmojiKeyboard />
          </Animated.View>
        </>
      </ModalWithBackdrop>
    </KeyboardProvider>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'flex-end' },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
  backdrop: { backgroundColor: '#00000055' },
});
