import { describe, expect, test } from 'vitest'
import {
  normalizeEllipsis,
  normalizePath,
  normalizeSizeUnits,
} from '../normalize'
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

describe('normalizeSizeUnits', () => {
  test('returns "0 bytes" when input is 0', () => {
    const result = normalizeSizeUnits(0)
    expect(result).toEqual('0 bytes')
  })

  test('returns "1 byte" when input is 1', () => {
    const result = normalizeSizeUnits(1)
    expect(result).toEqual('1 bytes')
  })

  test('returns "2 bytes" when input is 2', () => {
    const result = normalizeSizeUnits(2)
    expect(result).toEqual('2 bytes')
  })

  test('returns "1.00 KB" when input is 1024', () => {
    const result = normalizeSizeUnits(1024)
    expect(result).toEqual('1 KB')
  })

  test('returns "1.50 KB" when input is 1536', () => {
    const result = normalizeSizeUnits(1536)
    expect(result).toEqual('1.5 KB')
  })

  test('returns "1.00 MB" when input is 1048576', () => {
    const result = normalizeSizeUnits(1048576)
    expect(result).toEqual('1 MB')
  })

  test('returns "1.23 GB" when input is 1320702444', () => {
    const result = normalizeSizeUnits(1320702444)
    expect(result).toEqual('1.23 GB')
  })
})
