import * as React from 'react';
import { Animated, useWindowDimensions, StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import { KeyboardContext } from '../KeyboardContext';

type KnobProps = {
  offsetY: Animated.Value;
  height: Animated.Value;
  onClose: () => void;
};

export const Knob = ({ offsetY, height, onClose }: KnobProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const ctx = React.useContext(KeyboardContext);

  const handleGesture = ({
    nativeEvent: { translationY, state },
  }: PanGestureHandlerGestureEvent) => {
    if (state === State.ACTIVE) {
      offsetY.setValue(translationY);
    }
    if (state === State.END) {
      // reset offset => return to current position
      Animated.spring(offsetY, {
        useNativeDriver: false,
        toValue: 0,
      }).start();
      // slide => expand/collapse keyboard
      if (translationY < -30) {
        Animated.spring(height, {
          useNativeDriver: false,
          toValue: screenHeight * ctx.expandedHeight,
        }).start();
      } else if (translationY > 150) {
        height.setValue(screenHeight * ctx.defaultHeight);
        offsetY.setValue(0);
        onClose();
      } else {
        Animated.spring(height, {
          useNativeDriver: false,
          toValue: screenHeight * ctx.defaultHeight,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleGesture}
      hitSlop={{ vertical: 20, horizontal: 40 }}
    >
      <Animated.View style={[styles.knob, ctx.knobStyles]} />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  knob: {
    height: 8,
    width: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
});
