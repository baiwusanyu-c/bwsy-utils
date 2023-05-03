import { describe, expect, test } from 'vitest'
import { extend } from '../obj'

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
})
