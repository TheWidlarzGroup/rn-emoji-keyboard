export type RecursivePartial<T> = Partial<{
  [P in keyof T]: T[P] extends object ? Partial<T[P]> : T[P]
}>

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
