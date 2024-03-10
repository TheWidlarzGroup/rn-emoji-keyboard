import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import { Icon } from './Icon'

type CustomButtonType = {
  customButtonPressHandler: () => void
}

export const CustomButton = ({ customButtonPressHandler }: CustomButtonType) => {
  const { theme } = React.useContext(KeyboardContext)
  return (
    <View style={styles.buttonContainer}>
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
        ]}
      >
        {({ pressed }) => (
          <Icon
            iconName={'Backspace'}
            isActive={pressed}
            normalColor={theme.customButton.icon}
            activeColor={theme.customButton.iconPressed}
          />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
})
