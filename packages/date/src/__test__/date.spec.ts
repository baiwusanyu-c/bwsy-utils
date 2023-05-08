import { describe, expect, test } from 'vitest'
import { getLastDay, setZeroDate } from '../date'
describe('setZeroDate', () => {
  test('num <= 10', () => {
    expect(setZeroDate(8)).toBe('08')
  })

  test('num > 10', () => {
    expect(setZeroDate(12)).toBe('12')
  })
})

describe('getLastDay', () => {
  test('basic', () => {
    expect(getLastDay(12)).toBe(31)
    expect(getLastDay(12, 2022)).toBe(31)
    expect(getLastDay(12, undefined, true)).toBe(`${new Date().getFullYear()}-12-31`)
    expect(getLastDay(12, 2022, true)).toBe('2022-12-31')
  })
})
