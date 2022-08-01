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
  slug: emoji.name.replace(/ /g, '_'),
})

export const getCategoryIndex = (disabledCategory: CategoryTypes[], category: CategoryTypes) => ({
  index: CATEGORIES.filter((name) => !disabledCategory.includes(name)).indexOf(category),
})

export type RecursivePartial<T> = Partial<
  {
    [P in keyof T]: T[P] extends object ? Partial<T[P]> : T[P]
  }
>

const objectKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[]

export const deepMerge = <T extends object>(source: T, additional: RecursivePartial<T>): T => {
  const result = { ...source }
  objectKeys(additional).forEach((key) => {
    if (key && additional[key] && typeof additional[key] === 'object') {
      // @ts-ignore
      result[key] = deepMerge(source[key], additional[key]) as unknown as T[typeof key]
    } else {
      // @ts-ignore
      result[key] = additional[key]
    }
  })
  return result
}
