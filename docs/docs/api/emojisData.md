---
sidebar_position: 6
title: Emojis Data
---

The library provides the ability to import a `.json` file containing all currently available emojis. Additionally, you can pass your own set of emojis, provided they follow our structure and types.

To import the emojis data, use the following code:

```ts
import { emojisByCategory } from 'rn-emoji-keyboard'
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

const emojisByCategory: EmojisByCategory[]
```
