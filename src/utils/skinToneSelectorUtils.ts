import { TONES_CONTAINER_WIDTH } from '../components/SkinTones'

const EMOJI_PADDING = 8
const KEYBOARD_PADDING = 10
const FUNNEL_HEIGHT = 7
const SKIN_TONE_WIDTH = 36

const sumOfPaddings = KEYBOARD_PADDING + EMOJI_PADDING

export const generateToneSelectorPosition = (
  numOfColumns: number,
  emojiIndex: number,
  windowWidth: number,
  singleEmojiSize: number,
  extraSearchTop: number
) => {
  // get column in the center to measure tone selector x position
  const halfOfColumns = numOfColumns / 2
  const centerColumn = Number.isInteger(halfOfColumns)
    ? halfOfColumns - 1
    : Math.floor(halfOfColumns)

  // emoji index in singleRow perspective based on emojiIndex in flatlist and numberOfColumns
  const emojiIndexInRow = emojiIndex % numOfColumns

  // maximum x at which tone selector is fully visible on the screen
  const maxXPosition = windowWidth - TONES_CONTAINER_WIDTH - sumOfPaddings * 2

  // different x position for emojis before and after center column
  const x = emojiIndexInRow < centerColumn ? emojiIndexInRow * singleEmojiSize : maxXPosition

  // current row number
  const rowNumber = emojiIndex / numOfColumns >= 1 ? Math.floor(emojiIndex / numOfColumns) : 0

  // tone selector y based on emoji size and search input on the top
  const y = rowNumber * (singleEmojiSize - EMOJI_PADDING) + extraSearchTop - FUNNEL_HEIGHT

  const position = {
    x: emojiIndexInRow === 0 ? sumOfPaddings : x + sumOfPaddings,
    y,
  }

  return position
}

export const generateToneSelectorFunnelPosition = (
  numOfColumns: number,
  emojiIndex: number,
  windowWidth: number,
  singleEmojiSize: number
) => {
  const emojiIndexInRow = emojiIndex % numOfColumns

  const backwardIndex = Math.abs((emojiIndex % numOfColumns) + 1 - numOfColumns)

  const maxXPosition = windowWidth - TONES_CONTAINER_WIDTH - sumOfPaddings * 2

  const funnelXAfterCenterColumn =
    windowWidth -
    KEYBOARD_PADDING -
    singleEmojiSize -
    maxXPosition -
    backwardIndex * singleEmojiSize

  const funnelXPosition =
    emojiIndexInRow < Math.floor(numOfColumns / 2) ? SKIN_TONE_WIDTH / 2 : funnelXAfterCenterColumn

  return funnelXPosition
}

export const insertAtCertainIndex = (arr: string[], index: number, newItem: string) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
]

export const zeroWidthJoiner = String.fromCodePoint(0x200d)
export const variantSelector = String.fromCodePoint(0xfe0f)

export const skinTones = [
  {
    name: 'light_skin_tone',
    color: '🏻',
  },
  {
    name: 'medium_light_skin_tone',
    color: '🏼',
  },
  {
    name: 'medium_skin_tone',
    color: '🏽',
  },
  {
    name: 'medium_dark_skin_tone',
    color: '🏾',
  },
  {
    name: 'dark_skin_tone',
    color: '🏿',
  },
]
