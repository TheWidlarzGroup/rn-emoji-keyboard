---
sidebar_position: 6
title: Emojis Data JSON
---

The library gives you the possibility to import .JSON file with all emojis currently available in it. And also pass your own set of emojis. Keep in mind that your own emojis must follow our structure and types.

```ts
import { emojisByGroup } from 'rn-emoji-keyboard'
```

Here is the EmojisData structure explained as Typescript code

```ts
type EmojiType = {
  emoji: string // Visual representation of emoji
  name: string
  slug: string
  unicode_version: string
  toneEnabled: boolean
  alreadySelected?: boolean
}

type EmojisByCategory = {
  title: CategoryTypes
  data: JsonEmoji[]
}

const emojisByGroup: EmojisByCategory[]
```
