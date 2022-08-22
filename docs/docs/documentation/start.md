---
sidebar_position: 2
title: Getting Started
---

# Getting Started

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

## 🪄 Installation

```sh
yarn add rn-emoji-keyboard
```

or

```sh
npm install rn-emoji-keyboard
```

## ⚡️ Usage

```js
import EmojiPicker from 'rn-emoji-keyboard'

export default function App() {
  const [isOpen, setIsOpen] = React.useState < boolean > false

  const handlePick = (emojiObject: EmojiType) => {
    console.log(emojiObject)
    /* example emojiObject = {
        "emoji": "❤️",
        "name": "red heart",
        "slug": "red_heart",
        "unicode_version": "0.6",
      }
    */
  }

  return <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
}
```
