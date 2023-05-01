import { describe, expect, test, vi } from 'vitest'
import { runTaskQueue } from '../queue'

describe('runTaskQueue', () => {
  test('should process task queue successfully', async() => {
    const taskFn1 = vi.fn()
    const taskFn2 = vi.fn()

    const tasks = [
      {
        id: 1,
        fn: taskFn1,
        params: [1],
        retry: 0,
      },
      {
        id: 2,
        fn: taskFn2,
        params: [2],
        retry: 0,
      },
    ]
    const hooks = {
      onFinished: vi.fn(),
      onTaskFailed: vi.fn(),
      onTaskSucceeded: vi.fn(),
    }
    const result = await runTaskQueue(tasks, hooks, 5, false)
    expect(result.success).toEqual([1, 2])
    expect(result.fail).toEqual([])
    expect(hooks.onFinished).toHaveBeenCalled()
    expect(hooks.onTaskFailed).not.toHaveBeenCalled()
    expect(hooks.onTaskSucceeded).toHaveBeenCalledTimes(2)
    expect(taskFn1).toHaveBeenCalled()
    expect(taskFn2).toHaveBeenCalled()
  })

  test('should retry failed tasks and eventually fail', async() => {
    const taskFn1 = vi.fn()
    const taskFn2 = vi.fn()
    const tasks = [
      {
        id: 1,
        fn: taskFn1.mockRejectedValue(new Error('Task failed')),
        params: [],
        retry: 0,
      },
      {
        id: 2,
        fn: taskFn2.mockRejectedValue(new Error('Task failed')),
        params: [],
        retry: 0,
      },
    ]
    const hooks = {
      onFinished: vi.fn(),
      onTaskFailed: vi.fn(),
      onTaskSucceeded: vi.fn(),
    }
    const result = await runTaskQueue(tasks, hooks, 2, false)
    expect(result.success).toEqual([])
    expect(result.fail).toEqual([1, 2])
    expect(hooks.onFinished).toHaveBeenCalled()
    expect(hooks.onTaskFailed).toHaveBeenCalledTimes(2)
    expect(hooks.onTaskSucceeded).not.toHaveBeenCalled()
    expect(taskFn1).toHaveBeenCalledTimes(2)
    expect(taskFn2).toHaveBeenCalledTimes(2)
  })
})
