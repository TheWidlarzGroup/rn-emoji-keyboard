# react-native-emoji-keyboard

![Preview](/example/assets/preview-small.gif)

## Usage

```js
import EmojiPicker from '{package-name}';

export default function App() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handlePick = (emojiObject: EmojiType) => {
    console.log(emojiObject);
    /* example emojiObject = {    {
        "emoji": "❤️",
        "name": "red heart",
        "slug": "red_heart",
      },
    */
  };

  return (
    <EmojiPicker
      onEmojiSelected={handleSelect}
      open={isOpen}
      onClose={() => setIsOpen(false)} />
  )
}
```

## Installation
```sh
yarn add {package-name}
```

or

```sh
npm install {package-name}
```
## Full Example
```js
TODO
```
## Accepted props (current implemented)
| Name | Type | Default Value | Required | Description |
|---|---|---|---|---|
| onEmojiSelected | function | undefined | yes | Callback on emoji selected |
| open | boolean | false | yes | Opens modal picker |
| onClose | function | undefined | yes | Request close modal *runs when onEmojiSelected or backdrop pressed* |
| emojiSize | number | 28 | no | Custom emoji size |
| headerStyles | TextStyle | {} | no | Override category name styles |
| knobStyles | ViewStyle | {} | no | Override knob styles |
| containerStyles | ViewStyle | {} | no | Override container styles |
| hideHeader | boolean | false | no | Hide category names | 
| expandable | boolean | true | no | Show knob and enable expand on swipe up |
| defaultHeight | number \| string | "40%" | no | Specify collapsed container height (number is points, string is a percentage of the screen height) |
| expandedHeight | number \| string | "80%" | no | Specify expanded container height (number is points, string is a percentage of the screen height) _works only if expandable is true_ |
| backdropColor | string | "#00000055" | no | Change backdrop color and alpha |
| categoryColor | string | "#000000" | no | Change category item color |
| activeCategoryColor | string | "#005b96" | no | Change active category item color |
| categoryContainerColor | string | "#e3dbcd" | no | Change category container color |
| onCategoryChangeFailed | function | warn(info) | no | Callback on category change failed (info: {index, highestMeasuredFrameIndex, averageItemLength}) |
| translation | CategoryTranslation | en | no | Translation object *see translation section* |
## Internationalization
### Pre-defined
Due to the limited translation possibilities, we only provide a few pre-defined translations into the following languages:
* `en` - English
* `pl` - Polish

First import lang and use it as `translation` prop.
```ts
import { pl } from '{package-name}';

// ...

translation={pl}
```
### Own
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
*If you have written a translation into your language, we strongly encourage you to create a Pull Request and add your language to the package, following the example of other langs.*
## License
 **MIT**

<br /><br /><br />
## TODO
categories => Specify displayed categories 

