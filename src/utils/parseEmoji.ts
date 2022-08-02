import type { JsonEmoji } from 'src/types'

export const parseEmoji = (emoji: JsonEmoji) => ({
  name: emoji.name,
  emoji: emoji.emoji,
  unicode_version: emoji.v,
  slug: emoji?.name?.replace(/ /g, '_'),
  toneEnabled: emoji.toneEnabled,
})
