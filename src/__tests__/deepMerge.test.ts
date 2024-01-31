import { deepMerge } from '../utils/deepMerge'
import { defaultTheme, emptyStyles } from '../contexts/KeyboardContext'

describe('deepMerge tests', () => {
  const newTheme = {
    container: '#000',
    emoji: {
      selected: '#fff',
    },
  }
  const newStyles = {
    container: { backgroundColor: '#000' },
    emoji: {
      selected: {
        backgroundColor: '#000',
        transform: [{ rotate: '45deg' }],
      },
    },
  }

  it('should merge theme properly', () => {
    expect(deepMerge(defaultTheme, newTheme)).toStrictEqual({
      ...defaultTheme,
      container: newTheme.container,
      emoji: {
        ...defaultTheme.emoji,
        selected: newTheme.emoji.selected,
      },
    })
  })

  it('should merge styles properly', () => {
    expect(deepMerge(emptyStyles, newStyles)).toStrictEqual({
      ...emptyStyles,
      container: newStyles.container,
      emoji: {
        ...emptyStyles.emoji,
        selected: newStyles.emoji.selected,
      },
    })
  })
})
