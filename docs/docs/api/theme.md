---
sidebar_position: 4
title: Theme
---

import { ApiTable } from '../../src/components/ApiTable/ApiTable.js'

In this library you are able to use your own styles for every component. It allows user to easily match colours with the rest of the application. Of course it means that's using a dark mode is very convenient.

:::tip
To ensure smooth experience we recommend that you use it as high as possible in the React structure. eg. App.tsx file
:::

### `theme`

This is the name of property that has every component styles inside.

<ApiTable typeVal='Record<string, string | object>' defaultVal='defaultTheme'/>

### `Here is the full list of theme properties`

:::tip
You don't have to pass new styles for every component. The omitted ones will use default values.  
These props won't work outside of theme prop.
:::

### `backdrop`

Set background-color of the modal backdrop.

:::caution
Works only in the modal mode.
:::

<ApiTable typeVal='string' defaultVal='#00000055'/>

### `knob`

Set background-color of the modal knob.

:::caution
Works only in the modal mode with knob enabled.
:::

<ApiTable typeVal='string' defaultVal='#ffffff'/>

### `container`

Set background-color of the whole modal container.

<ApiTable typeVal='string' defaultVal='#ffffff'/>

### `header`

Set category name text color.

<ApiTable typeVal='string' defaultVal='#00000099'/>

### `skinTonesContainer`

Set background-color of the skin tones container.

<ApiTable typeVal='string' defaultVal='#e3dbcd'/>

### `category`

Set category component styles:

- **icon** - color of the icon. Default is #000000
- **iconActive** - color of the icon if it's active. Default is #005b96
- **container** - background-color of the categories container. Default is #e3dbcd
- **containerActive** - background-color of the currently active category. Default is #ffffff

<ApiTable typeVal='Object' defaultVal='See above'/>

### `search`

Set search component styles:

:::caution
Works only with enableSearchBar prop set to true
:::

- **text** - color of the search bar text. Default is #000000cc
- **placeholder** - color of the search bar placeholder text. Default is #00000055
- **icon** - color of the search bar icon. Default is #00000055
- **background** - background-color of the search bar. Default is #00000011

<ApiTable typeVal='Object' defaultVal='See above'/>
