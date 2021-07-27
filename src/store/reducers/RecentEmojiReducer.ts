import type { EmojiType } from 'src/types';

export type RecentEmojiState = {
  recentlyUsed: EmojiType[];
};

export type RecentEmojiAction =
  | { type: 'RECENT_EMOJI_ADD'; payload: EmojiType }
  | { type: 'RECENT_EMOJI_REMOVE'; payload: EmojiType }
  | { type: 'RECENT_EMOJI_CLEAR' };

export default function recentEmojiReducer(
  state: RecentEmojiState,
  action: RecentEmojiAction
): RecentEmojiState {
  switch (action.type) {
    case 'RECENT_EMOJI_ADD':
      return {
        ...state,
        recentlyUsed: [...filterEmoji(state, action.payload), action.payload],
      };
    case 'RECENT_EMOJI_REMOVE':
      return {
        ...state,
        recentlyUsed: filterEmoji(state, action.payload),
      };
    case 'RECENT_EMOJI_CLEAR':
      return { ...state, recentlyUsed: [] };
    default:
      return state;
  }
}

const filterEmoji = (state: RecentEmojiState, emoji: EmojiType) =>
  state.recentlyUsed.filter((usedEmoji) => usedEmoji.emoji !== emoji.emoji);
