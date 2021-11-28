import * as React from 'react'
import { Animated, useWindowDimensions } from 'react-native'
import { EmojiStaticKeyboard } from './components/EmojiStaticKeyboard'
import { Knob } from './components/Knob'
import { defaultKeyboardContext, KeyboardProvider } from './contexts/KeyboardProvider'
import type { KeyboardProps } from './contexts/KeyboardContext'
import type { EmojiType } from './types'
import { ModalWithBackdrop } from './components/ModalWithBackdrop'
import { getHeight } from './utils'
import { useKeyboard } from './hooks/useKeyboard'

export const EmojiPicker = ({
  onEmojiSelected,
  onRequestClose,
  open,
  onClose,
  expandable = defaultKeyboardContext.expandable,
  defaultHeight = defaultKeyboardContext.defaultHeight,
  ...props
}: KeyboardProps) => {
  const { height: screenHeight } = useWindowDimensions()
  const offsetY = React.useRef(new Animated.Value(0)).current
  const height = React.useRef(new Animated.Value(getHeight(defaultHeight, screenHeight))).current
  const additionalHeight = React.useRef(new Animated.Value(0)).current
  const { keyboardVisible, keyboardHeight } = useKeyboard()
  const [isExpanded, setIsExpanded] = React.useState(false)

  React.useEffect(() => {
    if (keyboardVisible && !isExpanded) {
      Animated.timing(additionalHeight, {
        toValue: keyboardHeight,
        useNativeDriver: false,
        duration: 200,
      }).start()
    } else {
      Animated.timing(additionalHeight, {
        toValue: 0,
        useNativeDriver: false,
        duration: 200,
      }).start()
    }
  }, [additionalHeight, isExpanded, keyboardHeight, keyboardVisible])

  const close = () => {
    height.setValue(getHeight(defaultHeight, screenHeight))
    offsetY.setValue(0)
    onClose()
  }

  return (
    <KeyboardProvider
      onEmojiSelected={(emoji: EmojiType) => {
        onEmojiSelected(emoji)
        close()
      }}
      open={open}
      onClose={close}
      expandable={expandable}
      defaultHeight={defaultHeight}
      {...props}>
      <ModalWithBackdrop isOpen={open} backdropPress={close} onRequestClose={onRequestClose}>
        <>
          {expandable && (
            <Knob
              height={height}
              offsetY={offsetY}
              onClose={onClose}
              setIsExpanded={setIsExpanded}
            />
          )}
          <Animated.View
            style={[
              {
                height: Animated.add(Animated.subtract(height, offsetY), additionalHeight),
              },
            ]}>
            <EmojiStaticKeyboard />
          </Animated.View>
        </>
      </ModalWithBackdrop>
    </KeyboardProvider>
  )
}
