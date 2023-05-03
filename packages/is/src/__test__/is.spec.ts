import { describe, expect, test } from 'vitest'
import {
  isArray,
  isBool,
  isEmptyObj,
  isFunction,
  isNumber,
  isObject,
  isString,
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
