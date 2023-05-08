import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test, vi,
} from 'vitest'
import moment from 'moment'
import {
  formatDate,
  getLastDay, relativeTime,
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

describe('relativeTime', () => {
  const baseTime = moment('2022-01-01T00:00:00.000Z')

  test('should return correct time difference when unit is hour', () => {
    const pastTime = moment('2022-01-01T02:00:00.000Z')
    const futureTime = moment('2022-01-01T23:00:00.000Z')
    expect(relativeTime(pastTime.toISOString(), baseTime.toISOString(), true, 'hour')).toBe('2 小时前')
    expect(relativeTime(futureTime.toISOString(), baseTime.toISOString(), false, 'hour')).toBe('23 小时后')
  })

  test('should return correct time difference when unit is day', () => {
    const pastTime = moment('2021-12-31T00:00:00.000Z')
    const futureTime = moment('2022-01-07T00:00:00.000Z')
    expect(relativeTime(pastTime.toISOString(), baseTime.toISOString(), true, 'day')).toBe('1 天前')
    expect(relativeTime(futureTime.toISOString(), baseTime.toISOString(), false, 'day')).toBe('6 天后')
  })

  test('should return correct time difference when unit is week', () => {
    const pastTime = moment('2021-12-18T00:00:00.000Z')
    const futureTime = moment('2022-02-05T00:00:00.000Z')
    expect(relativeTime(pastTime.toISOString(), baseTime.toISOString(), true, 'week')).toBe('2 周前')
    expect(relativeTime(futureTime.toISOString(), baseTime.toISOString(), false, 'week')).toBe('5 周后')
  })

  test('should return correct time difference when unit is minute', () => {
    const pastTime = moment('2022-01-01T00:20:00.000Z')
    const futureTime = moment('2022-01-01T01:50:00.000Z')
    expect(relativeTime(pastTime.toISOString(), baseTime.toISOString(), true, 'minute')).toBe('20 分钟前')
    expect(relativeTime(futureTime.toISOString(), baseTime.toISOString(), false, 'minute')).toBe('2 小时后')
  })

  test('should return correct time difference when unit is second', () => {
    const pastTime = moment('2022-01-01T00:00:10.000Z')
    const futureTime = moment('2022-01-01T00:00:20.000Z')
    expect(relativeTime(pastTime.toISOString(), baseTime.toISOString(), true, 'second')).toBe('10 秒前')
    expect(relativeTime(futureTime.toISOString(), baseTime.toISOString(), false, 'second')).toBe('20 秒后')
  })
})
