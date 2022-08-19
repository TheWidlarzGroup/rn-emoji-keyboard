---
sidebar_position: 1
title: Modal Mode
---

import { TitleWithRequiredBadge } from '../../src/components/TitleWithRequiredBadge/TitleWithRequiredBadge.js'
import { ApiTable } from '../../src/components/ApiTable/ApiTable.js'

# Modal Mode

### <TitleWithRequiredBadge>`onEmojiSelected`</TitleWithRequiredBadge>

Callback on emoji selected

<ApiTable typeVal='function' defaultVal='undefined'/>

### <TitleWithRequiredBadge>`open`</TitleWithRequiredBadge>

Opens modal picker

<ApiTable typeVal='boolean' defaultVal='false'/>

### <TitleWithRequiredBadge>`onClose`</TitleWithRequiredBadge>

Request close modal runs when onEmojiSelected or backdrop pressed

<ApiTable typeVal='function' defaultVal='undefined'/>

### `emojiSize`

Custom emoji size

<ApiTable typeVal='number' defaultVal='28'/>

### `enableRecentlyUsed`

Enable recently used emojis in categories

<ApiTable typeVal='boolean' defaultVal='false'/>

### `categoryPosition`

Specify category container position

<ApiTable typeVal="'floating' | 'top' | 'bottom'" defaultVal="floating"/>

### `enableSearchBar`

Enable search bar

<ApiTable typeVal='boolean' defaultVal='false'/>

### `hideHeader`

Hide category names

<ApiTable typeVal='boolean' defaultVal='false'/>

### `allowMultipleSelections`

Allow selecting multiple emoji without dismissing keyboard

<ApiTable typeVal='boolean' defaultVal='false'/>

### `expandable`

Show knob and enable expand on swipe up

<ApiTable typeVal='boolean' defaultVal='true'/>

### `defaultHeight`

Specify collapsed container height (number is points, string is a percentage of the screen height)

<ApiTable typeVal='number | string' defaultVal='40%'/>

### `expandedHeight`

Specify expanded container height (number is points, string is a percentage of the screen height) works only if expandable is true

<ApiTable typeVal='number | string' defaultVal='80%'/>

### `onCategoryChangeFailed`

Callback on category change failed (info: {index, highestMeasuredFrameIndex, averageItemLength})

<ApiTable typeVal='function' defaultVal='warn(info)'/>

### `translation`

Translation object see translation section

<ApiTable typeVal='CategoryTranslation' defaultVal='en'/>

### `disabledCategories`

Hide categories by passing their slugs

<ApiTable typeVal='CategoryTypes[]' defaultVal='[]'/>

### `categoryOrder`

Set category sequence

<ApiTable typeVal='CategoryTypes[]' defaultVal='[]'/>

### `onRequestClose`

Handle onRequestClose in modal

<ApiTable typeVal='function' defaultVal='undefined'/>

### `disableSafeArea`

Disable safe area inside modal

<ApiTable typeVal='boolean' defaultVal='false'/>
