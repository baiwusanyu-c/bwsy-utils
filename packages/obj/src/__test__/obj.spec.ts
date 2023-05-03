import { describe, expect, test } from 'vitest'
import { extend, jsonClone } from '../obj'

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
