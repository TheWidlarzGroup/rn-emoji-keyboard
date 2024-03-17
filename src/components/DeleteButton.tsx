import React from 'react'
import { View, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Icon } from './Icon'

type DeleteButtonStyles = {
  containerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>)
  iconNormalColor?: string
  iconActiveColor?: string
}

type CustomButtonType = {
  customButtonPressHandler?: () => void
  style?: DeleteButtonStyles
}

export const DeleteButton = ({ customButtonPressHandler, style }: CustomButtonType) => {
  const { theme } = React.useContext(KeyboardContext)
  return (
    <View style={[styles.buttonContainer, style?.containerStyle]}>
      <Pressable
        onPress={customButtonPressHandler}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.customButton.backgroundPressed
              : theme.customButton.background,
            padding: 10,
            borderRadius: 100,
          },
          styles.button,
          typeof style?.buttonStyle === 'function'
            ? style.buttonStyle({ pressed })
            : style?.buttonStyle,
        ]}
      >
        {({ pressed }) => (
          <Icon
            iconName="Backspace"
            isActive={pressed}
            normalColor={style?.iconNormalColor || theme.customButton.icon}
            activeColor={style?.iconActiveColor || theme.customButton.iconPressed}
          />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
