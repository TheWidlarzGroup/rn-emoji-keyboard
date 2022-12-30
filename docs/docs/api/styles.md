---
sidebar_position: 5
title: Styles
---

import { ApiTable } from '../../src/components/ApiTable/ApiTable.js'

In this library you are able to use your own styles for every component. It allows user to modify styles of every component. However if you only want to adjust colors you should use **theme** prop.

:::caution
Because of how library calculates rows and columns some of the styles may break the layout. You should avoid passing styles that changes the dimensions of components, especially the emoji.
:::

### `styles`

This is the name of property that has every component styles inside.

<ApiTable typeVal='Record<string, ViewStyle>' defaultVal='{}'/>

### `Here is the full list of styles properties`

:::tip
You don't have to pass new styles for every component. The omitted ones will use default **theme** values.  
These props won't work outside of styles prop.
:::

### `container`

Set styles of the whole modal container.

<ApiTable typeVal='ViewStyle' defaultVal='{}'/>

### `header`

Set styles of the whole header. Header is the component containing category name.

<ApiTable typeVal='ViewStyle' defaultVal='{}'/>

### `knob`

Set styles of the modal knob.

:::caution
Works only in the modal mode with knob enabled.
:::

<ApiTable typeVal='ViewStyle' defaultVal='{}'/>

### `category`

Set styles of the category component. You can pass different styles for the container and the icon.

<ApiTable typeVal='ViewStyle' defaultVal='{ container: {}, icon: {} }'/>

### `searchBar`

Set styles of the searchBar component. You can pass different styles for the container and the text.

<ApiTable typeVal='ViewStyle' defaultVal='{ container: {}, text: {} }'/>
