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
import type { EmojiKeyboardProps } from './types';
import { EmojiKeyboard } from './EmojiKeyboard';
import { Knob } from './components/Knob';

type EmojiPickerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EmojiPicker = ({
  onEmojiSelected,
  isOpen,
  onClose,
}: EmojiPickerProps & EmojiKeyboardProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const offsetY = React.useRef(new Animated.Value(0)).current;
  const height = React.useRef(new Animated.Value(screenHeight * 0.4)).current;

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.modalContainer, styles.backdrop]}>
          <SafeAreaView style={styles.modalContainer}>
            <TouchableOpacity activeOpacity={1}>
              <>
                <Knob height={height} offsetY={offsetY} onClose={onClose} />
                <Animated.View
                  style={{ height: Animated.subtract(height, offsetY) }}
                >
                  <EmojiKeyboard
                    onEmojiSelected={(emoji) => {
                      height.setValue(screenHeight * 0.4);
                      offsetY.setValue(0);
                      onEmojiSelected(emoji);
                      onClose();
                    }}
                    containerStyles={styles.container}
                  />
                </Animated.View>
              </>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </TouchableOpacity>
    </Modal>
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
