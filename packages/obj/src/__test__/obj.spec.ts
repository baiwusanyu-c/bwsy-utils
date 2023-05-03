import { describe, expect, test } from 'vitest'
import { deepClone, extend, jsonClone } from '../obj'

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
