import { describe, expect, test } from 'vitest'
import { normalizeEllipsis, normalizePath } from '../normalize'
describe('normalize', () => {
  test('normalizePath replaces backslashes with forward slashes', () => {
    const path = 'C:\\Users\\John\\Documents\\file.txt'
    const expected = 'C:/Users/John/Documents/file.txt'
    const result = normalizePath(path)
    expect(result).toBe(expected)
  })

  test('normalizePath leaves forward slashes unchanged', () => {
    const path = '/home/john/Documents/file.txt'
    const expected = '/home/john/Documents/file.txt'
    const result = normalizePath(path)
    expect(result).toBe(expected)
  })

  test('normalizePath handles mixed slashes correctly', () => {
    const path = 'C:\\Users/John/Documents/file.txt'
    const expected = 'C:/Users/John/Documents/file.txt'
    const result = normalizePath(path)
    expect(result).toBe(expected)
  })

  test('returns empty string when input is empty', () => {
    const result = normalizeEllipsis('')
    expect(result).toEqual('')
  })

  test('returns input string when input is already shorter than limit', () => {
    const result = normalizeEllipsis('hello world', 20)
    expect(result).toEqual('hello world')
  })

  test('adds ellipsis when input is longer than limit', () => {
    const result = normalizeEllipsis('hello world', 5)
    expect(result).toEqual('hello...')
  })

  test('adds ellipsis when input contains non-ascii characters', () => {
    const result = normalizeEllipsis('你好，世界！', 5)
    expect(result).toEqual('你好...')
  })

  test('adds ellipsis when input contains mixed ascii and non-ascii characters', () => {
    const result = normalizeEllipsis('hello 世界！', 6)
    expect(result).toEqual('hello ...')
  })

  test('returns input string without ellipsis when input contains exactly limitLen characters', () => {
    const result = normalizeEllipsis('hello world', 11)
    expect(result).toEqual('hello world')
  })

  test('returns input string without ellipsis when input contains exactly (limitLen-1) characters', () => {
    const result = normalizeEllipsis('hello world', 10)
    expect(result).toEqual('hello worl...')
  })
})
