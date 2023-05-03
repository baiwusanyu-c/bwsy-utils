import { isArray, isObject } from '@baiwusanyu/utils-is'

export const extend = <
    T extends Record<string, any>,
    U extends Record<string, any>>(
    objFir: T,
    objSec: U): T & U => {
  return Object.assign({}, objFir, objSec)
}

export function jsonClone<T extends Record<any, any>>(val: T): T {
  return JSON.parse(JSON.stringify(val))
}

// TODO：unit test and document
export function deepCopy(obj: unknown) {
  const temp = {}

  function deepClone(target: any, source: any) {
    for (const k in source) {
      const item = source[k]
      if (isArray(item)) {
        target[k] = []
        deepClone(target[k], item)
      } else if (isObject(item)) {
        target[k] = {}
        deepClone(target[k], item)
      } else {
        target[k] = item
      }
    }
  }
  deepClone(temp, obj)
  return temp
}
