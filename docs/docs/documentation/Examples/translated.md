---
sidebar_position: 3
title: Translated
---

<!-- link to Internationalization -->

:::info
To play with examples you can clone [**the repo**](https://github.com/TheWidlarzGroup/rn-emoji-keyboard.git) and run `yarn example ios` or `yarn example android` to preview app with this examples.
:::

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.

```jsx
import EmojiPicker, { pl } from 'rn-emoji-keyboard'

const ExampleComponent = () => {
  // ...

  return (
    <EmojiPicker
      open={isOpen}
      onClose={handleOnClose}
      onEmojiSelected={handleOnEmojiSelected}
      //  add props below
      translation={pl}
    />
  )
}
```

![Preview](../../../assets/img/translated-preview.jpg)

:::tip
Look into [**internationalization section**](https://github.com/TheWidlarzGroup/rn-emoji-keyboard/docs/documentation/internationalization) for more details about translations.
:::
