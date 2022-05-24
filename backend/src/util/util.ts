export const now = (): Date => {
  return new Date()
}

export type Nullable<T> = { [K in keyof T]+?: T[K] | null };


export const objWithoutUndefinedFields = (obj: any | undefined | null): any => {
  if (!(obj instanceof Object) || obj instanceof Array) {
    return obj
  }
  // @ts-ignore
  const result = {}
  // @ts-ignore
  Object.keys(obj).filter(key => obj[key] !== undefined).forEach(key => {
    // @ts-ignore
    result[key] = obj[key]
  })
  return result
}
