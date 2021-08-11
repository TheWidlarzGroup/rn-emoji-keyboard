import recentEmojiReducer, { RecentEmojiAction, RecentEmojiState } from './RecentEmojiReducer'

// TODO:
// - combine Keyboard reducers in future

export type KeyboardState = RecentEmojiState
export type KeyboardAction = RecentEmojiAction
export default recentEmojiReducer
