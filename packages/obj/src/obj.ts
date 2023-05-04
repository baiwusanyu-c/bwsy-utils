import type { IDeepCloneObj } from '../types'

export const extend = <
    T extends Record<string, any>,
    U extends Record<string, any>>(
    objFir: T,
    objSec: U): T & U => {
  return Object.assign({}, objFir, objSec)
}

export function extendDeep<
  T extends (Record<string, any> & any[]),
  U extends (Record<string, any> & any[]) >(
  objFir: T,
  objSec: U,
): T & U {
  if (typeof objFir !== 'object')
    objFir = {} as T

  if (Array.isArray(objSec))
    return objSec.slice() as T & U

  Object.keys(objSec).forEach((property) => {
    const sourceProperty = objSec[property]
    if (typeof sourceProperty === 'object')
      objFir[property as keyof typeof objFir] = extendDeep(objSec[property], sourceProperty)
    else
      objFir[property as keyof typeof objFir] = sourceProperty
  })
  return objFir as T & U
}

export function jsonClone<T extends Record<any, any>>(val: T): T {
  return JSON.parse(JSON.stringify(val))
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    // 如果 obj 是 null 或者不是一个对象，则直接返回
    return obj
  }

  if (typeof obj === 'function') {
    // 如果 obj 是一个函数，则直接返回
    return obj
  }

  if (Array.isArray(obj)) {
    // 如果 obj 是一个数组，则创建一个新数组并递归复制每个元素
    return obj.map(item => deepClone(item)) as any
  }

  // 如果 obj 是一个对象，则创建一个新对象并递归复制每个属性
  const newObj: IDeepCloneObj = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      newObj[key] = deepClone(obj[key])
  }

  return newObj as T
}
