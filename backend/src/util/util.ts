export const now = (): Date => {
  return new Date()
}

export type Nullable<T> = { [K in keyof T]+?: T[K] | null };


export const objWithoutUndefinedFields = <T, >(obj: T | undefined | null): T | undefined | null => {
  if (!(obj instanceof Object) || obj instanceof Array) {
    return obj
  }

  const result = {} as T
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.keys(obj).filter(key => obj[key] !== undefined).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    result[key] = obj[key]
  })
  return result
}
