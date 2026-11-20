import * as React from 'react'
import { act, render, screen } from '@testing-library/react-native'
import { EmojiCategory } from '../components/EmojiCategory'
import { CATEGORIES, type EmojisByCategory } from '../types'

const item: EmojisByCategory = {
  title: 'smileys_emotion',
  data: [
    { emoji: '😀', name: 'grinning face', v: '1.0', toneEnabled: false },
    { emoji: '😃', name: 'grinning face with big eyes', v: '0.6', toneEnabled: false },
    { emoji: '😄', name: 'grinning face with smiling eyes', v: '0.6', toneEnabled: false },
  ],
}
const ownCategoryIndex = CATEGORIES.indexOf(item.title)
const otherCategoryIndex = CATEGORIES.indexOf('animals_nature')

const renderCategory = (activeCategoryIndex = ownCategoryIndex) => (
  <EmojiCategory
    item={item}
    setKeyboardScrollOffsetY={jest.fn()}
    activeCategoryIndex={activeCategoryIndex}
  />
)

const runPendingTimers = () => act(() => jest.runOnlyPendingTimers())

// What `import { InteractionManager } from 'react-native'` gives on React Native 0.87 and later.
const interactionManagerOnReactNative087 = {
  // react-native/index.js defines a getter that throws when `__DEV__` is true
  'debug build': {
    configurable: true,
    get() {
      throw new Error(
        'InteractionManager has been removed from react-native core. ' +
          "Please refactor long tasks into smaller ones, and use 'requestIdleCallback' instead.",
      )
    },
  },
  // and has no export at all otherwise
  'release build': { configurable: true, value: undefined },
}

describe('EmojiCategory', () => {
  const reactNative = jest.requireActual('react-native')
  const originalInteractionManager = Object.getOwnPropertyDescriptor(
    reactNative,
    'InteractionManager',
  )!

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    Object.defineProperty(reactNative, 'InteractionManager', originalInteractionManager)
    jest.useRealTimers()
  })

  it.each(Object.entries(interactionManagerOnReactNative087))(
    'shows emojis without InteractionManager (React Native 0.87, %s)',
    (_build, descriptor) => {
      Object.defineProperty(reactNative, 'InteractionManager', descriptor)

      render(renderCategory())
      runPendingTimers()

      expect(screen.getByText('😀')).toBeTruthy()
    },
  )

  it('shows emojis after the first render, not during it', () => {
    render(renderCategory())

    expect(screen.queryByText('😀')).toBeNull()

    runPendingTimers()

    expect(screen.getByText('😀')).toBeTruthy()
  })

  it('leaves nothing scheduled after unmount', () => {
    const { unmount } = render(renderCategory())

    unmount()

    expect(jest.getTimerCount()).toBe(0)
  })

  it('shows emojis again after a category change clears them', () => {
    const { rerender } = render(renderCategory())
    runPendingTimers()

    rerender(renderCategory(otherCategoryIndex))

    expect(screen.queryByText('😀')).toBeNull()

    runPendingTimers()

    expect(screen.getByText('😀')).toBeTruthy()
  })
})
