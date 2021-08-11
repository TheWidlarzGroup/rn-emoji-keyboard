import * as React from 'react'
import { Animated, useWindowDimensions, StyleSheet, View, PanResponder } from 'react-native'
import { getHeight } from '../utils'
import { KeyboardContext } from '../contexts/KeyboardContext'

type KnobProps = {
  offsetY: Animated.Value
  height: Animated.Value
  onClose: () => void
}

export const Knob = ({ offsetY, height, onClose }: KnobProps) => {
  const { height: screenHeight } = useWindowDimensions()
  const { expandedHeight, defaultHeight, knobStyles } = React.useContext(KeyboardContext)

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: Animated.event([null, { dy: offsetY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        Animated.spring(offsetY, {
          useNativeDriver: false,
          toValue: 0,
        }).start()
        if (gestureState.dy < -50) {
          Animated.spring(height, {
            useNativeDriver: false,
            toValue: getHeight(expandedHeight, screenHeight),
          }).start()
        } else if (gestureState.dy > 150) {
          height.setValue(getHeight(defaultHeight, screenHeight))
          offsetY.setValue(0)
          onClose()
        } else {
          Animated.spring(height, {
            useNativeDriver: false,
            toValue: getHeight(defaultHeight, screenHeight),
          }).start()
        }
      },
      onShouldBlockNativeResponder: () => {
        return true
      },
    })
  ).current

  return (
    <View {...panResponder.panHandlers}>
      <View style={styles.panContainer}>
        <Animated.View style={[styles.knob, knobStyles]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  panContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignSelf: 'center',
    flexDirection: 'column-reverse',
    backgroundColor: '#00000000',
  },
  knob: {
    height: 6,
    width: 50,
    backgroundColor: '#fff',
    marginBottom: 6,
    alignSelf: 'center',
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
})
