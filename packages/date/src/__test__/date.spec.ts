import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test, vi,
} from 'vitest'
import {
  formatDate,
  getLastDay,
  setZeroDate,
} from '../date'
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

describe('formatDate', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: new Date('2023-05-08T00:00:00Z') })
    vi.setSystemTime(new Date('2023-05-08T00:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('formats date in the default format', () => {
    const result = formatDate('2023-05-08T07:32:39.000Z')
    expect(result).toBe('2023-05-08 15:32:39')
  })

  test('formats date in a custom format', () => {
    const result = formatDate('2023-05-08T07:32:39.000Z', 'YYYY-MM-DD')
    expect(result).toBe('2023-05-08')
  })

  test('adjusts the timezone if necessary', () => {
    const result = formatDate('2023-05-08T00:32:39.000Z')
    expect(result).toBe('2023-05-08 08:32:39')
  })
})
