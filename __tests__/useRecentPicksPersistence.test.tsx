import { act, renderHook } from '@testing-library/react-native'
import { useRecentPicksPersistence } from '../src/hooks/useRecentPicksPersistence'
import { useKeyboardStore } from '../src/store/useKeyboardStore'
import { delay } from '../src/utils/delay'

describe('useRecentPickPersistence tests', () => {
  const testData = [
    {
      emoji: '🥒',
      name: 'cucumber',
      slug: 'cucumber',
      toneEnabled: false,
      v: '3.0',
    },
    {
      emoji: '🥰',
      name: 'smiling face with hearts',
      slug: 'smiling_face_with_hearts',
      toneEnabled: false,
      v: '11.0',
    },
  ]

  it('should initialize with proper value', async () => {
    renderHook(() =>
      useRecentPicksPersistence({
        initialization: async () => testData,
        onStateChange: jest.fn(),
      })
    )

    await delay(0)

    const { result } = renderHook(useKeyboardStore)

    expect(result.current.keyboardState.recentlyUsed).toStrictEqual(testData)
  })

  it('should trigger onStateChange when global state change', async () => {
    const onStateChangeMock = jest.fn()
    const addedEmoji = {
      emoji: '🥒',
      name: 'cucumber',
      toneEnabled: false,
      v: '3.0',
    }

    renderHook(() =>
      useRecentPicksPersistence({
        initialization: async () => [],
        onStateChange: onStateChangeMock,
      })
    )

    await delay(0)

    const { result } = renderHook(() => useKeyboardStore())

    act(() => {
      result.current.setKeyboardState({
        type: 'RECENT_EMOJI_ADD',
        payload: addedEmoji,
      })
    })

    expect(result.current.keyboardState.recentlyUsed[0]).toStrictEqual(addedEmoji)
    expect(onStateChangeMock).toHaveBeenCalledWith([addedEmoji])
  })
})
