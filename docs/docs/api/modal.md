---
sidebar_position: 1
title: Modal Mode
---

import { TitleWithRequiredBadge } from '../../src/components/TitleWithRequiredBadge/TitleWithRequiredBadge.js'
import { ApiTable } from '../../src/components/ApiTable/ApiTable.js'

# Modal Mode

The library gives you the possibility to choose from two modes: modal or static. This section refers to the modal mode (for static mode, see: [static section](/docs/api/static))

To apply the modal mode in your app, use a default import from `rn-emoji-keyboard`

```ts
import EmojiKeyboard from 'rn-emoji-keyboard'
```

## Required

### <TitleWithRequiredBadge>`open`</TitleWithRequiredBadge>

Required props which indicates whether the modal should be displayed on screen.

<ApiTable typeVal='boolean' defaultVal='false'/>

### <TitleWithRequiredBadge>`onClose`</TitleWithRequiredBadge>

Callback fired when the component requests to be closed.

<ApiTable typeVal='() => void' defaultVal='undefined'/>

### <TitleWithRequiredBadge>`onEmojiSelected`</TitleWithRequiredBadge>

Callback fired when the emoji is selected. The passed function exposed an object with selected emoji data.

<ApiTable typeVal='(emoji:{ emoji, name, slug, unicode_version }) => void' defaultVal='undefined'/>

## Optional

### `allowMultipleSelections`

Allow select multiple emoji without dismiss keyboard.

<ApiTable typeVal='boolean' defaultVal='false'/>

### `categoryPosition`

Allow to change the position of a container with available emoji categories.

<ApiTable typeVal="'floating' | 'top' | 'bottom'" defaultVal="floating"/>

### `categoryOrder`

Allow to change order of a container with available emoji categories.

<ApiTable typeVal='CategoryTypes[]' defaultVal='[]'/>

### `defaultHeight`

Specify collapsed container height. It can be both a number in points or a string in a percentage of the screen.

<ApiTable typeVal='number | string' defaultVal='40%'/>

### `disabledCategories`

Allow to hide specific categories by passing an array with their slugs.

<ApiTable typeVal='CategoryTypes[]' defaultVal='[]'/>

### `disableSafeArea`

Allow to disable `SafeAreaView` inside the emoji keyboard.

:::tip
Look into [**React Native documentation**](https://reactnative.dev/docs/safeareaview) for more details about `SafeAreaView`.
:::

<ApiTable typeVal='boolean' defaultVal='false'/>

### `emojiSize`

Allow to set size of the single emoji.

<ApiTable typeVal='number' defaultVal='28'/>

### `enableRecentlyUsed`

Reveal extra category with recently used emojis.

<ApiTable typeVal='boolean' defaultVal='false'/>

### `enableSearchBar`

Reveal the search bar, used to find specific emoji.

<ApiTable typeVal='boolean' defaultVal='false'/>

### `expandable`

Show knob and enable expand on swipe up.

<ApiTable typeVal='boolean' defaultVal='true'/>

### `expandedHeight`

Specify expanded container height. It can be both a number in points or a string in a percentage of the screen.

:::caution
`expandedHeight` works only if `expandable` props is set to `true`.
:::

<ApiTable typeVal='number | string' defaultVal='80%'/>

### `hideHeader`

Hide labels with category names.

<ApiTable typeVal='boolean' defaultVal='false'/>

### `onCategoryChangeFailed`

Callback fired when the category change failed.

<ApiTable typeVal='( info: {index, highestMeasuredFrameIndex, averageItemLength} ) => void' defaultVal='warn(info)'/>

### `onRequestClose`

Callback fired when emoji keyboard is closing.

<ApiTable typeVal='() => void' defaultVal='undefined'/>

### `translation`

Used to change the library language.

:::tip
Look into [**internationalization section**](/docs/documentation/internationalization) for more details about translations.
:::

<ApiTable typeVal='CategoryTranslation' defaultVal='en'/>
