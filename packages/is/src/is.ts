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
export const isArray = <T>(
  obj: T,
  func?: (target: T) => void) => {
  if (isFunction(func) && func)
    return func(obj)
  else
    return toString.call(obj) === '[object Array]'
}

// 判断是否由纯数字组成(不支持前导0与科学计数法)
export function isNumberStr(str: string) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

// 判断url是否是http或https
export function isHttp(url: string) {
  return url.includes('http://') || url.includes('https://')
}

// 判断字符串是否为有效的URL
export function isValidURL(url: string) {
  const reg
    = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

// 判断字符串是否为纯小写
export function isLowerCase(str: string) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

// 判断字符串是否为纯大写
export function isUpperCase(str: string) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

// 判断是否为有效的Email
export function isEmail(email: string) {
  const reg
    = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

// 判断是否为中國手機號
export function isMobileCN(num: string) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(num)
}
