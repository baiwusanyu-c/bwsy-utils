export const isEmptyObj = (val: unknown) => JSON.stringify(val) === '{}'

// 判定布尔
export const isBool = (val: unknown) => typeof val === 'boolean'

// 判定字符串
export const isString = (val: unknown) => typeof val === 'string' && val.constructor === String

// 判定数字
export const isNumber = (val: unknown) => typeof val === 'number'

// 判定是否是方法
export const isFunction = (val: unknown) =>
  Object.prototype.toString.call(val) === '[object Function]'
    || Object.prototype.toString.call(val) === '[object AsyncFunction]'

// 判定是否是对象
export function isObject(val: unknown) {
  if (val === undefined || val === null)
    return false
  else
    return toString.call(val) === '[object Object]'
}

// 判定是否是数组
export const isArray = (obj: unknown, func: null | undefined | Function = Array.isArray) => {
  if (func)
    return func(obj)
  else
    return toString.call(obj) === '[object Array]'
}

// 判断是否由纯数字组成(不支持前导0与科学计数法)
export function isNumberStr(str: string) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}
