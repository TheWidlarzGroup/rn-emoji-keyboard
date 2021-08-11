import { CATEGORIES, CategoryTypes, JsonEmoji } from './types'

export const getHeight = (value: string | number, screenHeight: number) =>
  typeof value === 'number' ? value : (screenHeight / 100) * parseInt(value.replace('%', ''), 10)

export const exhaustiveTypeCheck = (arg: never, strict = true) => {
  console.log(`unhandled union case for : ${arg}`)
  if (strict) {
    throw new Error(`unhandled union case for : ${arg}`)
  }
}

export const parseEmoji = (emoji: JsonEmoji) => ({
  name: emoji.name,
  emoji: emoji.emoji,
  unicode_version: emoji.v,
  slug: emoji.name.replace(' ', '_'),
})

export const getCategoryIndex = (disabledCategory: CategoryTypes[], category: CategoryTypes) => ({
  index: CATEGORIES.filter((name) => !disabledCategory.includes(name)).indexOf(category),
})
