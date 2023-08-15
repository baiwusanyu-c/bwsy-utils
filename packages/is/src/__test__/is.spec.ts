import { describe, expect, test } from 'vitest'
import {
  isArray,
  isBool,
  isEmail,
  isEmptyObj,
  isFunction,
  isHttp,
  isLowerCase,
  isMobileCN,
  isNumber,
  isNumberStr,
  isObject, isRegex,
  isString,
  isUpperCase,
  isValidURL,
} from '../is'

describe('is', () => {
  test('isEmptyObj should return true for empty object', () => {
    expect(isEmptyObj({})).toBeTruthy()
  })

  test('isEmptyObj should return false for non-empty object', () => {
    expect(isEmptyObj({ foo: 'bar' })).not.toBeTruthy()
  })

  test('isEmptyObj should return false for non-object values', () => {
    expect(isEmptyObj('foo')).not.toBeTruthy()
    expect(isEmptyObj(1)).not.toBeTruthy()
    expect(isEmptyObj([])).not.toBeTruthy()
    expect(isEmptyObj(null)).not.toBeTruthy()
    expect(isEmptyObj(undefined)).not.toBeTruthy()
  })

  test('isBool should return true for boolean values', () => {
    expect(isBool(true)).toBeTruthy()
    expect(isBool(false)).toBeTruthy()
  })

  test('isBool should return false for non-boolean values', () => {
    expect(isBool(null)).not.toBeTruthy()
    expect(isBool(undefined)).not.toBeTruthy()

    expect(isBool(42)).not.toBeTruthy()
    expect(isBool('foo')).not.toBeTruthy()

    expect(isBool({})).not.toBeTruthy()
    expect(isBool([])).not.toBeTruthy()
  })

  test('isString should return true for string values', () => {
    expect(isString('')).toBeTruthy()
    expect(isString('foo')).toBeTruthy()
    expect(isString(String('bar'))).toBeTruthy()
  })

  test('isString should return false for non-string values', () => {
    expect(isString(null)).not.toBeTruthy()
    expect(isString(undefined)).not.toBeTruthy()

    expect(isString(42)).not.toBeTruthy()
    expect(isString('foo')).toBeTruthy()

    expect(isString({})).not.toBeTruthy()
    expect(isString([])).not.toBeTruthy()
  })

  test('isNumber should return true for number values', () => {
    expect(isNumber(0)).toBeTruthy()
    expect(isNumber(42)).toBeTruthy()
    expect(isNumber(-3.14)).toBeTruthy()
  })

  test('isNumber should return false for non-number values', () => {
    expect(isNumber(null)).not.toBeTruthy()
    expect(isNumber(undefined)).not.toBeTruthy()
    expect(isNumber('foo')).not.toBeTruthy()
    expect(isNumber(true)).not.toBeTruthy()
    expect(isNumber({})).not.toBeTruthy()
    expect(isNumber([])).not.toBeTruthy()
  })

  test('isFunction should return true for function values', () => {
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction(async() => {})).toBeTruthy()
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction(async() => {})).toBeTruthy()
  })

  test('isFunction should return false for non-function values', () => {
    expect(isFunction(null)).not.toBeTruthy()
    expect(isFunction(undefined)).not.toBeTruthy()
    expect(isFunction('foo')).not.toBeTruthy()
    expect(isFunction(true)).not.toBeTruthy()
    expect(isFunction({})).not.toBeTruthy()
    expect(isFunction([])).not.toBeTruthy()
  })

  test('isObject should return true for object values', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject({ a: 1 })).toBeTruthy()
    expect(isObject(Object.create(null as any))).toBeTruthy()
  })

  test('isObject should return false for non-object values', () => {
    expect(isObject(null)).not.toBeTruthy()
    expect(isObject(undefined)).not.toBeTruthy()
    expect(isObject('foo')).not.toBeTruthy()
    expect(isObject(true)).not.toBeTruthy()
    expect(isObject(42)).not.toBeTruthy()
    expect(isObject([])).not.toBeTruthy()
    expect(isObject(() => {})).not.toBeTruthy()
    expect(isObject(new Date())).not.toBeTruthy()
  })

  test('isArray should return true for array values', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray([1, 2, 3])).toBeTruthy()
    expect(isArray([])).toBeTruthy()
  })

  test('isArray should return false for non-array values', () => {
    expect(isArray(null)).not.toBeTruthy()
    expect(isArray(undefined)).not.toBeTruthy()
    expect(isArray('foo')).not.toBeTruthy()
    expect(isArray(true)).not.toBeTruthy()
    expect(isArray(42)).not.toBeTruthy()
    expect(isArray({})).not.toBeTruthy()
    expect(isArray(() => {})).not.toBeTruthy()
  })
})

describe('isNumberStr', () => {
  test('returns true for valid positive integers', () => {
    expect(isNumberStr('1')).toBe(true)
    expect(isNumberStr('123')).toBe(true)
    expect(isNumberStr('456789')).toBe(true)
  })

  test('returns true for valid negative integers', () => {
    expect(isNumberStr('-1')).toBe(true)
    expect(isNumberStr('-123')).toBe(true)
    expect(isNumberStr('-456789')).toBe(true)
  })

  test('returns true for valid positive floating point numbers', () => {
    expect(isNumberStr('0.1')).toBe(true)
    expect(isNumberStr('1.0')).toBe(true)
    expect(isNumberStr('123.45')).toBe(true)
    expect(isNumberStr('456789.123456789')).toBe(true)
  })

  test('returns true for valid negative floating point numbers', () => {
    expect(isNumberStr('-0.1')).toBe(true)
    expect(isNumberStr('-1.0')).toBe(true)
    expect(isNumberStr('-123.45')).toBe(true)
    expect(isNumberStr('-456789.123456789')).toBe(true)
  })

  test('returns true for zero', () => {
    expect(isNumberStr('0')).toBe(true)
  })

  test('returns false for invalid number strings', () => {
    expect(isNumberStr('')).toBe(false)
    expect(isNumberStr('.')).toBe(false)
    expect(isNumberStr('1.2.3')).toBe(false)
    expect(isNumberStr('e')).toBe(false)
    expect(isNumberStr('1.23e-4')).toBe(false)
    expect(isNumberStr('00123')).toBe(false)
  })
})

describe('isHttp function', () => {
  test('should return true for http urls', () => {
    expect(isHttp('http://www.example.com')).toBe(true)
  })

  test('should return true for https urls', () => {
    expect(isHttp('https://www.example.com')).toBe(true)
  })

  test('should return false for non-http urls', () => {
    expect(isHttp('ftp://www.example.com')).toBe(false)
  })

  test('should return false for non-url strings', () => {
    expect(isHttp('not a url')).toBe(false)
  })

  test('should return true for urls with query parameters', () => {
    expect(isHttp('http://www.example.com?param1=value1&param2=value2')).toBe(true)
  })

  test('should return true for urls with fragments', () => {
    expect(isHttp('http://www.example.com#fragment')).toBe(true)
  })

  test('should return true for urls with both query parameters and fragments', () => {
    expect(isHttp('http://www.example.com?param1=value1&param2=value2#fragment')).toBe(true)
  })

  test('should return false for empty string', () => {
    expect(isHttp('')).toBe(false)
  })
})

describe('isValidURL', () => {
  test('returns true for a valid http URL', () => {
    expect(isValidURL('http://www.example.com')).toBe(true)
  })

  test('returns true for a valid https URL', () => {
    expect(isValidURL('https://www.example.com')).toBe(true)
  })

  test('returns true for a valid ftp URL', () => {
    expect(isValidURL('ftp://ftp.example.com')).toBe(true)
  })

  test('returns true for a valid URL with port number', () => {
    expect(isValidURL('https://www.example.com:8080')).toBe(true)
  })

  test('returns true for a valid URL with path', () => {
    expect(isValidURL('https://www.example.com/path/to/file.html')).toBe(true)
  })

  test('returns true for a valid URL with query string', () => {
    expect(isValidURL('https://www.example.com/search?q=term&page=2')).toBe(true)
  })

  test('returns true for a valid URL with special characters', () => {
    expect(isValidURL('https://www.example.com/#/path?param=value&flag=true')).toBe(true)
  })

  test('returns false for an invalid URL', () => {
    expect(isValidURL('www.example.com')).toBe(false)
  })

  test('returns false for an invalid URL without protocol', () => {
    expect(isValidURL('example.com')).toBe(false)
  })

  test('returns false for an invalid URL with invalid top-level domain', () => {
    expect(isValidURL('https://www.example.123')).toBe(false)
  })
})

describe('isLowerCase', () => {
  test('should return true for all lowercase letters', () => {
    expect(isLowerCase('abcdefghijklmnopqrstuvwxyz')).toBe(true)
  })

  test('should return false for strings that contain uppercase letters', () => {
    expect(isLowerCase('Abcdefg')).toBe(false)
    expect(isLowerCase('aBcdefg')).toBe(false)
    expect(isLowerCase('abcdefG')).toBe(false)
    expect(isLowerCase('ABCD')).toBe(false)
  })

  test('should return false for strings that contain non-letter characters', () => {
    expect(isLowerCase('abc123')).toBe(false)
    expect(isLowerCase('abc-def')).toBe(false)
    expect(isLowerCase('abc.def')).toBe(false)
    expect(isLowerCase(' ')).toBe(false)
    expect(isLowerCase('')).toBe(false)
  })
})

describe('isUpperCase function', () => {
  test('should return true for uppercase letters', () => {
    expect(isUpperCase('HELLO')).toBe(true)
    expect(isUpperCase('WORLD')).toBe(true)
    expect(isUpperCase('A')).toBe(true)
    expect(isUpperCase('Z')).toBe(true)
  })

  test('should return false for lowercase letters and mixed case strings', () => {
    expect(isUpperCase('hello')).toBe(false)
    expect(isUpperCase('World')).toBe(false)
    expect(isUpperCase('tExt')).toBe(false)
  })

  test('should return false for empty string', () => {
    expect(isUpperCase('')).toBe(false)
  })

  test('should return false for non-letter strings', () => {
    expect(isUpperCase('123')).toBe(false)
    expect(isUpperCase('#$%')).toBe(false)
    expect(isUpperCase(' ')).toBe(false)
  })
})

describe('isEmail', () => {
  test('should return true for valid email addresses', () => {
    expect(isEmail('example@example.com')).toBe(true)
    expect(isEmail('john.doe@example.com')).toBe(true)
    expect(isEmail('john-doe@example.com')).toBe(true)
    expect(isEmail('john+doe@example.com')).toBe(true)
    expect(isEmail('jane.doe@subdomain.example.com')).toBe(true)
    expect(isEmail('jane.doe+tag@subdomain.example.com')).toBe(true)
  })

  test('should return false for invalid email addresses', () => {
    expect(isEmail('example')).toBe(false)
    expect(isEmail('example.com')).toBe(false)
    expect(isEmail('example@com')).toBe(false)
    expect(isEmail('example@.com')).toBe(false)
    expect(isEmail('example@subdomain')).toBe(false)
    expect(isEmail('example@subdomain.')).toBe(false)
    expect(isEmail('example@subdomain.c')).toBe(false)
    expect(isEmail('example@subdomain.123')).toBe(false)
  })
})

describe('isMobileCN', () => {
  test('isMobileCN returns true for valid Chinese phone number', () => {
    const phoneNumber = '13812345678'
    const result = isMobileCN(phoneNumber)
    expect(result).toBeTruthy()
  })

  test('isMobileCN returns false for invalid Chinese phone number', () => {
    const phoneNumber = '1381234567'
    const result = isMobileCN(phoneNumber)
    expect(result).not.toBeTruthy()
  })

  test('isMobileCN returns false for non-Chinese phone number', () => {
    const phoneNumber = '12345678901'
    const result = isMobileCN(phoneNumber)
    expect(result).not.toBeTruthy()
  })
})

describe('isRegex', () => {
  test('should return true for a regular expression', () => {
    expect(isRegex(/[a-z]/)).toBe(true)
  })

  test('should return false for a non-regular expression value', () => {
    expect(isRegex('not a regex')).toBe(false)
    expect(isRegex(42)).toBe(false)
    expect(isRegex(null)).toBe(false)
  })
})
