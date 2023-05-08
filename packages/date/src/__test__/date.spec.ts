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
    expect(getLastDay(12)).toBe(`${new Date().getFullYear()}-12-31`)
  })
})
