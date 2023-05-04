import { describe, expect, test, vi } from 'vitest'
import colors from 'ansi-colors'
import { runAsyncTaskList, setAsyncTaskList } from '../async'
describe('setAsyncTaskList', () => {
  test('should return an empty array when taskNum is 0', async() => {
    const taskList = setAsyncTaskList(0, async() => {})
    expect(taskList).toEqual([])
  })

  test('should return an array of length taskNum when taskNum is positive', async() => {
    const taskList = setAsyncTaskList(3, async() => {})
    expect(taskList.length).toBe(3)
  })

  test('should call taskFunc with the correct index for each task', async() => {
    const taskFunc = vi.fn(async() => {})
    const taskList = setAsyncTaskList(5, taskFunc)

    await Promise.all(taskList)

    expect(taskFunc).toHaveBeenCalledTimes(5)
    // @ts-expect-error ignore ts error
    expect(taskFunc.mock.calls[0][0]).toBe(0)
    // @ts-expect-error ignore ts error
    expect(taskFunc.mock.calls[1][0]).toBe(1)
    // @ts-expect-error ignore ts error
    expect(taskFunc.mock.calls[2][0]).toBe(2)
    // @ts-expect-error ignore ts error
    expect(taskFunc.mock.calls[3][0]).toBe(3)
    // @ts-expect-error ignore ts error
    expect(taskFunc.mock.calls[4][0]).toBe(4)
  })

  test('should return an array of promises that resolve with the result of taskFunc', async() => {
    const taskList = setAsyncTaskList(2, async(i) => {
      const re = await i * 2
      return re
    })
    const results = await Promise.all(taskList)
    expect(results).toEqual([0, 2])
  })
})

describe('runAsyncTaskList', () => {
  test('runAsyncTaskList should execute the task function correctly', async() => {
    const taskNum = 3
    const mockTaskFunc = vi.fn(async(index: number) => {
      return { index, value: index * 2 }
    })

    const expected = [
      { index: 0, value: 0 },
      { index: 1, value: 2 },
      { index: 2, value: 4 },
    ]

    const res = await runAsyncTaskList(taskNum, mockTaskFunc)

    expect(mockTaskFunc).toHaveBeenCalledTimes(taskNum)
    expect(res).toEqual(expected)
  })

  test('runAsyncTaskList should catch the error thrown from the task function', async() => {
    const taskNum = 1
    const errorMessage = 'Test error'
    const mockTaskFunc = vi.fn(async() => {
      throw new Error(errorMessage)
    })

    const mockLog = vi.fn()

    const originalLog = console.log
    console.log = mockLog

    await runAsyncTaskList(taskNum, mockTaskFunc)

    console.log = originalLog

    expect(mockTaskFunc).toHaveBeenCalledTimes(taskNum)
    expect(mockLog).toHaveBeenCalledWith(colors.redBright.bold(`${errorMessage}`))
  })
})
