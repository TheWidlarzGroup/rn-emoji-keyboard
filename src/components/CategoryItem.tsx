import * as React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { KeyboardContext } from '../contexts/KeyboardContext'
import type { CategoryNavigationItem, CategoryTypes } from '../types'
import { Icon } from './Icon'

type CategoryItemProps = {
  item: CategoryNavigationItem
  index: number
  handleScrollToCategory: (category: CategoryTypes) => void
}

export const CategoryItem = ({ item, index, handleScrollToCategory }: CategoryItemProps) => {
  const { activeCategoryIndex, categoryColor, activeCategoryColor, setActiveCategoryIndex } =
    React.useContext(KeyboardContext)

  const handleSelect = () => {
    handleScrollToCategory(item.category)
    setActiveCategoryIndex(index)
  }

  return (
    <TouchableOpacity onPress={handleSelect}>
      <View style={styles.container}>
        <Icon
          iconName={item.icon}
          isActive={activeCategoryIndex === index}
          normalColor={categoryColor}
          activeColor={activeCategoryColor}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderRadius: 6,
  },
  icon: { textAlign: 'center' },
})
