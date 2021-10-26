import * as React from 'react'
import {
  SafeAreaView,
  Modal,
  Animated,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { useTimeout } from '../hooks/useTimeout'

type ModalWithBackdropProps = {
  isOpen: boolean
  backdropPress: () => void
  onRequestClose: ()=> void
  children: React.ReactNode
}

export const ModalWithBackdrop = ({ isOpen, backdropPress, onRequestClose, children }: ModalWithBackdropProps) => {
  const { height: screenHeight } = useWindowDimensions()
  const translateY = React.useRef(new Animated.Value(screenHeight)).current
  const { backdropColor } = React.useContext(KeyboardContext)
  const handleTimeout = useTimeout()

  React.useEffect(() => {
    Animated.spring(translateY, {
      toValue: isOpen ? 0 : screenHeight,
      useNativeDriver: true,
    }).start()
  }, [isOpen, screenHeight, translateY])

  const handleClose = () => {
    Animated.spring(translateY, {
      toValue: screenHeight,
      useNativeDriver: true,
    }).start()
    handleTimeout(() => backdropPress(), 200)
  }

  return (
    <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={onRequestClose}>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={handleClose}>
        <View style={[styles.modalContainer, { backgroundColor: backdropColor }]}>
          <SafeAreaView style={styles.modalContainer}>
            <TouchableOpacity activeOpacity={1}>
              <Animated.View
                style={{
                  transform: [{ translateY }],
                }}>
                {children}
              </Animated.View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'flex-end' },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 10,
  },
})
