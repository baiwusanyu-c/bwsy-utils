import { describe, expect, test } from 'vitest'
import {
  normalizeEllipsis,
  normalizeNum2Comma,
  normalizePath,
  normalizeSizeUnits, normalizeVarStrEmpty,
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

describe('normalizeNum2Comma function', () => {
  test('should return "1,234.56" when input is 1234.56', () => {
    const result = normalizeNum2Comma(1234.56)
    expect(result).toBe('1,234.56')
  })

  test('should return "0.000123" when input is 0.000123', () => {
    const result = normalizeNum2Comma(0.000123)
    expect(result).toBe('0.000123')
  })

  test('should return "1,000,000" when input is 1000000', () => {
    const result = normalizeNum2Comma(1000000)
    expect(result).toBe('1,000,000')
  })

  test('should return "-123,456.789" when input is -123456.789', () => {
    const result = normalizeNum2Comma(-123456.789)
    expect(result).toBe('-123,456.789')
  })

  test('should return "1,000.123456" when input is 1000.123456789 and decimal is 6', () => {
    const result = normalizeNum2Comma(1000.123456789, 6)
    expect(result).toBe('1,000.123456')
  })

  test('should return "1,000.123" when input is 1000.123456789 and decimal is 3', () => {
    const result = normalizeNum2Comma(1000.123456789, 3)
    expect(result).toBe('1,000.123')
  })

  test('should return "0" when input is 0', () => {
    const result = normalizeNum2Comma(0)
    expect(result).toBe('0')
  })

  test('should return "NaN" when input is NaN', () => {
    const result = normalizeNum2Comma(NaN)
    expect(result).toBe('NaN')
  })

  test('should return "Infinity" when input is Infinity', () => {
    const result = normalizeNum2Comma(Infinity)
    expect(result).toBe('Infinity')
  })

  test('should return "-Infinity" when input is -Infinity', () => {
    const result = normalizeNum2Comma(-Infinity)
    expect(result).toBe('-Infinity')
  })
})

describe('normalizeVarStrEmpty function', () => {
  test('should return ""', () => {
    expect(normalizeVarStrEmpty('null')).toBe('')
    expect(normalizeVarStrEmpty('undefined')).toBe('')
    expect(normalizeVarStrEmpty(null)).toBe('')
    expect(normalizeVarStrEmpty(undefined)).toBe('')
    expect(normalizeVarStrEmpty('')).toBe('')
    expect(normalizeVarStrEmpty(1)).toBe(1)
    expect(normalizeVarStrEmpty(0)).toBe('')
  })

  test('should return params', () => {
    const result = normalizeVarStrEmpty(1)
    expect(result).toBe(1)
  })
})
