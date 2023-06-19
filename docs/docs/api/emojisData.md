---
sidebar_position: 6
title: Emojis Data JSON
---

The library gives you the possibility to import .JSON file with all emojis currently available in it.

```ts
import { EmojisData } from 'rn-emoji-keyboard'
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

type SingleCategory = {
  title: string
  data: EmojiType[]
}

type EmojisData = SingleCategory[]
```
