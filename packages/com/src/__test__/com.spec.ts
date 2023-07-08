import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import {
  createHash,
  debounce,
  downloadFile,
  throttle,
} from '../com'

import { localCache, sessionCache } from '../cache'
describe('downloadFile', () => {
  test('should create an <a> element with the given URL and click it', () => {
    const url = 'https://example.com/file.txt'

    // Mock the createElement and click methods
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      href: 'a',
      click: vi.fn(),
    } as any)

    downloadFile(url)

    expect(createElementSpy).toHaveBeenCalledWith('a')
    expect(createElementSpy.mock.results[0].value.href).toBe(url)
    expect(createElementSpy.mock.results[0].value.click).toHaveBeenCalled()

    // Restore the original methods
    createElementSpy.mockRestore()
  })
})

describe('createHash', () => {
  test('should create an <a> element with the given URL and click it', () => {
    const res = createHash(undefined, 'prefix', 'suffix')
    expect(res.startsWith('prefix') && res.endsWith('suffix')).toBeTruthy()
    expect(createHash(undefined, '', 'suffix').endsWith('suffix')).toBeTruthy()
    expect(createHash(undefined, 'prefix').startsWith('prefix')).toBeTruthy()
    expect(createHash()).toBeTruthy()
    expect(createHash('test')).toBeTruthy()
    expect(createHash(123456)).toBeTruthy()
  })
})

describe('debounce', () => {
  let mockFn: any

  beforeEach(() => {
    mockFn = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks() // 清空所有的 mock 函数调用信息
    vi.useRealTimers() // 恢复原本的 timer
  })

  test('debounce function calls', () => {
    const debouncedFn = debounce(mockFn, 1000)

    debouncedFn()
    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)

    debouncedFn()
    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('passes arguments to debounced function', () => {
    const debouncedFn = debounce(mockFn, 1000)

    debouncedFn('hello', 123)
    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)

    expect(mockFn).toHaveBeenCalledWith('hello', 123)
  })
})

describe('throttle', () => {
  let mockFn: any

  beforeEach(() => {
    vi.useFakeTimers()
    mockFn = vi.fn()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  test('should throttle function calls', () => {
    const throttledFn = throttle(mockFn, 1000)

    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(1)

    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(500)

    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(600)

    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(2)
  })
})

describe('sessionCache', () => {
  beforeEach(() => {
    // 在每个测试之前重置sessionStorage
    sessionStorage.clear()
  })

  test('set and get value', () => {
    const key = 'testKey'
    const value = 'testValue'

    sessionCache.set(key, value)
    const retrievedValue = sessionCache.get(key)

    expect(retrievedValue).toBe(value)
  })

  test('set and get JSON value', () => {
    const key = 'testKey'
    const jsonValue = { name: 'John', age: 30 }

    sessionCache.setJSON(key, jsonValue)
    const retrievedJsonValue = sessionCache.getJSON(key)

    expect(retrievedJsonValue).toEqual(jsonValue)
  })

  test('remove value', () => {
    const key = 'testKey'
    const value = 'testValue'

    sessionCache.set(key, value)
    sessionCache.remove(key)
    const retrievedValue = sessionCache.get(key)

    expect(retrievedValue).toBeNull()
  })

  test('return null for invalid key', () => {
    const key = null
    const value = 'testValue'

    sessionCache.set(key, value)
    const retrievedValue = sessionCache.get(key)

    expect(retrievedValue).toBeNull()
  })

  test('return null for missing value', () => {
    const key = 'testKey'

    const retrievedValue = sessionCache.get(key)

    expect(retrievedValue).toBeNull()
  })
})

describe('sessionCache', () => {
  beforeEach(() => {
    // 在每个测试之前重置sessionStorage
    localStorage.clear()
  })

  test('set and get value', () => {
    const key = 'testKey'
    const value = 'testValue'

    localCache.set(key, value)
    const retrievedValue = localCache.get(key)

    expect(retrievedValue).toBe(value)
  })

  test('set and get JSON value', () => {
    const key = 'testKey'
    const jsonValue = { name: 'John', age: 30 }

    localCache.setJSON(key, jsonValue)
    const retrievedJsonValue = localCache.getJSON(key)

    expect(retrievedJsonValue).toEqual(jsonValue)
  })

  test('remove value', () => {
    const key = 'testKey'
    const value = 'testValue'

    localCache.set(key, value)
    localCache.remove(key)
    const retrievedValue = localCache.get(key)

    expect(retrievedValue).toBeNull()
  })

  test('return null for invalid key', () => {
    const key = null
    const value = 'testValue'

    localCache.set(key, value)
    const retrievedValue = localCache.get(key)

    expect(retrievedValue).toBeNull()
  })

  test('return null for missing value', () => {
    const key = 'testKey'

    const retrievedValue = localCache.get(key)

    expect(retrievedValue).toBeNull()
  })
})
