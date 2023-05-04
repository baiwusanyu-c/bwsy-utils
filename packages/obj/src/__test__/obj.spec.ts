import { describe, expect, test } from 'vitest'
import { deepClone, extend, extendDeep, jsonClone } from '../obj'

describe('obj', () => {
  test('extend: merge object', () => {
    const mockObj1 = {
      foo: 'foo1',
      bar: 'bar1',
      head: 'head1',
    }
    const mockObj2 = {
      foo: 'foo1',
      bar: 'bar2',
      fix: 'fix',
    }

    const mergeRes = extend(mockObj1, mockObj2)
    expect(mergeRes).toMatchObject(
      {
        foo: 'foo1',
        bar: 'bar2',
        fix: 'fix',
        head: 'head1',
      },
    )
  })

  test('jsonClone', () => {
    const mockObj1 = {
      foo: 'foo1',
      bar: 'bar1',
      head: 'head1',
    }

    const mergeRes = jsonClone(mockObj1)
    expect(mergeRes).toMatchObject(
      {
        foo: 'foo1',
        bar: 'bar1',
        head: 'head1',
      },
    )

    expect(mergeRes === mockObj1).not.toBeTruthy()
  })
})

describe('deepClone', () => {
  test('should return null for null input', () => {
    expect(deepClone(null)).toBeNull()
  })

  test('should return undefined for undefined input', () => {
    expect(deepClone(undefined)).toBeUndefined()
  })

  test('should return a copy of a number', () => {
    expect(deepClone(123)).toBe(123)
  })

  test('should return a copy of a string', () => {
    expect(deepClone('hello')).toBe('hello')
  })

  test('should return a copy of a boolean', () => {
    expect(deepClone(true)).toBe(true)
  })

  test('should return a copy of an array', () => {
    const arr = [1, 2, 3]
    const copy = deepClone(arr)
    expect(copy).toEqual(arr)
    expect(copy).not.toBe(arr)
  })

  test('should return a copy of an object', () => {
    const obj = { a: 1, b: { c: 'hello' } }
    const copy = deepClone(obj)
    expect(copy).toEqual(obj)
    expect(copy).not.toBe(obj)
    expect(copy.b).not.toBe(obj.b)
  })

  test('should not clone functions', () => {
    const func = () => 'hello'
    expect(deepClone(func)).toBe(func)
  })
})

describe('extendDeep', () => {
  test('should return an empty object when both inputs are empty', () => {
    const result = extendDeep({}, {})
    expect(result).toEqual({})
  })

  test('should return the first object when the second object is empty', () => {
    const obj = { a: 1, b: 'test' }
    const result = extendDeep(obj, {})
    expect(result).toEqual(obj)
  })

  test('should copy simple properties from the second object to the first object', () => {
    const obj1 = { a: 1, b: 'test' }
    const obj2 = { c: 2, d: 'example' }
    const expected = { ...obj1, ...obj2 }
    const result = extendDeep(obj1, obj2)
    expect(result).toEqual(expected)
  })

  test('should overwrite properties in the first object with properties in the second object', () => {
    const obj1 = { a: 1, b: 'test' }
    const obj2 = { b: 2, c: 'example' }
    const expected = { ...obj1, ...obj2 }
    const result = extendDeep(obj1, obj2)
    expect(result).toEqual(expected)
  })

  test('should copy nested objects and arrays', () => {
    const obj1 = { a: { b: { c: 'test' } } }
    const obj2 = { a: { b: { d: 'example' } }, e: [1, 2, 3] }
    const expected = { ...obj1, ...obj2 }
    const result = extendDeep(obj1, obj2)
    expect(result).toEqual(expected)
  })

  test('should handle circular references', () => {
    const obj1: any = { a: null }
    obj1.a = obj1
    const obj2 = { b: 2 }
    const expected = { ...obj1, ...obj2 }
    const result = extendDeep(obj1, obj2)
    expect(result).toEqual(expected)
  })
})
