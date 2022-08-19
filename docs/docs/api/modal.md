---
sidebar_position: 1
title: Modal Mode
---

import { TitleWithRequiredBadge } from '../../src/components/TitleWithRequiredBadge/TitleWithRequiredBadge.js'
import { ApiTable } from '../../src/components/ApiTable/ApiTable.js'

# Modal Mode

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

## Required

### <TitleWithRequiredBadge>`open`</TitleWithRequiredBadge>

Required props which indicates whether the modal should be displayed on screen, or not.

<ApiTable typeVal='boolean' defaultVal='false'/>

### <TitleWithRequiredBadge>`onClose`</TitleWithRequiredBadge>

Callback fired when the component requests to be closed.

<ApiTable typeVal='() => void' defaultVal='undefined'/>

### <TitleWithRequiredBadge>`onEmojiSelected`</TitleWithRequiredBadge>

Callback fired when the emoji is selected.

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

Specify collapsed container height (number is points, string is a percentage of the screen height).

<ApiTable typeVal='number | string' defaultVal='40%'/>

### `disabledCategories`

Allow to hide specific categories by passing an array with their slugs.

<ApiTable typeVal='CategoryTypes[]' defaultVal='[]'/>

### `disableSafeArea`

Allow to disable `SafeAreaView` inside the emoji keyboard. Look into [React Native documentation](https://reactnative.dev/docs/safeareaview) for more details about `SafeAreaView`.

<ApiTable typeVal='boolean' defaultVal='false'/>

### `emojiSize`

Allow to set size of the single emoji.

<ApiTable typeVal='number' defaultVal='28'/>

### `enableRecentlyUsed`

Show `Recently used` category in the bar with all available categories.

<ApiTable typeVal='boolean' defaultVal='false'/>

### `enableSearchBar`

Set this `true` to reveal the search bar.

<ApiTable typeVal='boolean' defaultVal='false'/>

### `expandable`

Show knob and enable expand on swipe up.

<ApiTable typeVal='boolean' defaultVal='true'/>

### `expandedHeight`

Specify expanded container height (number is points, string is a percentage of the screen height) works only if expandable is `true`.

<ApiTable typeVal='number | string' defaultVal='80%'/>

### `hideHeader`

Hide labels with category names.

<ApiTable typeVal='boolean' defaultVal='false'/>

### `onCategoryChangeFailed`

Callback fired when the category change failed.

<ApiTable typeVal='( info: {index, highestMeasuredFrameIndex, averageItemLength} ) => void' defaultVal='warn(info)'/>

### `onRequestClose`

Handle onRequestClose in modal

<ApiTable typeVal='() => void' defaultVal='undefined'/>

### `translation`

Used to change the library language. Look into [internationalization section](https://github.com/TheWidlarzGroup/rn-emoji-keyboard/docs/documentation/internationalization) for more details.

<ApiTable typeVal='CategoryTranslation' defaultVal='en'/>
