import { describe, expect, test } from 'vitest'
import { normalizePath } from '../normalize'
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
})
