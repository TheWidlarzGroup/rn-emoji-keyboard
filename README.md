<p align="center">
  🚀
</p>
<p align="center">
  Lightweight, fully customizable emoji keyboard, written as a React Native component (without native elements).<br />
  Designated to be user and developer friendly! 💖 <br/>
  <a href="https://github.com/TheWidlarzGroup/rn-emoji-keyboard">rn-emoji-keyboard</a>
</p>

---

## 🪄 Installation

```sh
yarn add rn-emoji-keyboard
```

## 📖 Documentation

Check the docs here [Click](https://github.com/TheWidlarzGroup/rn-emoji-keyboard/)

[links here]

## ⚡️ Example

![Preview](/example/assets/preview-small.gif)

```js
import EmojiPicker from 'rn-emoji-keyboard'

export default function App() {
  const [isOpen, setIsOpen] = React.useState < boolean > false

  return <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
}
```

## 📊 Comparison

![comparison table](/example/assets/table-comparison-small.png)

## 🖼 Usage as static

```js
import { EmojiKeyboard } from 'rn-emoji-keyboard'

// ...
;<EmojiKeyboard onEmojiSelected={handlePick} />
```

Example about serving as static keyboard [you can find here](/example/src/Dark/Dark.tsx).

## 🇺🇸 Internationalization

### Pre-defined

Due to the limited translation possibilities, we only provide a few pre-defined translations into the following languages:

- `en` - English 🇺🇸
- `pl` - Polish 🇵🇱
- `fr` - French 🇫🇷
- `it` - Italian 🇮🇹
- `ko` - Korean 🇰🇷
- `id` - Indonesian 🇲🇨
- `es` - Spanish 🇪🇸
- `de` - German 🇩🇪
- `pt` - Portuguese 🇧🇷

First import lang and use it as `translation` prop.

```ts
import { pl } from 'rn-emoji-keyboard'

// ...

translation = { pl }
```

### 🏁 Own

There is possibility to pass own translation to library with the prop called `translation` like this

```ts
translation={{
  smileys_emotion: 'Smileys & Emotion',
  people_body: 'People & Body',
  animals_nature: 'Animals & Nature',
  food_drink: 'Food & Drink',
  travel_places: 'Travel & Places',
  activities: 'Activities',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags',
}}
```

_If you have written a translation into your language, we strongly encourage you to create a Pull Request and add your language to the package, following the example of other langs._

## 🎉 Examples

You can clone the repo and run `yarn example ios` or `yarn example android` to preview app with this examples.

### [Basic](/example/src/Basic/Basic.tsx)

![Preview](/example/assets/light-preview.jpg)

### [Dark](/example/src/Dark/Dark.tsx)

![Preview](/example/assets/dark-preview.jpg)

### [Translated](/example/src/Translated/Translated.tsx)

![Preview](/example/assets/translated-preview.jpg)

### [Disabled Categories](/example/src/DisabledCategories/DisabledCategories.tsx)

![Preview](/example/assets/categories-preview.jpg)

### [Static Modal (without knob)](/example/src/StaticModal/StaticModal.tsx)

![Preview](/example/assets/static-modal-preview.jpg)

### [Static](/example/src/Static/Static.tsx)

![Preview](/example/assets/static-preview.jpg)

### [Recently used](/example/src/EnableRecently/EnableRecently.tsx)

![Preview](/example/assets/enable-recently-used-preview.jpg)

### [Categories Top](/example/src/TopCategory/TopCategory.tsx)

![Preview](/example/assets/categories-top-preview.jpg)

### [Categories Bottom](/example/src/BottomCategory/BottomCategory.tsx)

![Preview](/example/assets/categories-bottom-preview.jpg)

### [Search Bar](/example/src/SearchBar/SearchBar.tsx)

![Preview](/example/assets/search-bar-preview.gif)

## 📈 Future plans

- Skin tone palette selector.
- Write native module to display forbidden emojis on android.

## ⚖️ License

**[MIT](/LICENSE)**

## 📝 Contribute

If you want to contribute read the [CONTRIBUTING.md](/CONTRIBUTING.md) guide.
