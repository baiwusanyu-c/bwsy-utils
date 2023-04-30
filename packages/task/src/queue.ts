import { log as logger } from '@baiwusanyu/utils-log'
import type { ITask, ITaskQueueHooks } from '../types'

// TODO unit test
export async function runTaskQueue(
  taskQueue: Array<ITask>,
  hook?: ITaskQueueHooks,
  maxRetry = 5,
  log = true) {
  const MAX_RETRY = maxRetry
  const failList: Array<number> = []
  const successList: Array<number> = []
  const idToIndex = { } as Record<number, number>
  async function processTask(task: ITask) {
    try {
      await task.fn(...task.params)
      successList.push(task.id)
      hook && hook.onTaskSucceeded && hook.onTaskSucceeded(idToIndex[task.id], task)
      log && logger('info', `Task ${task.id} completed successfully`)
    } catch (error: any) {
      log && logger(
        'error',
          `Error processing task ${task.id}: ${error.message}`)
      task.retry++ // 增加重试次数
      if (task.retry < MAX_RETRY) {
        taskQueue.push(task) // 重试次数未达到最大值，将任务重新放入队列尾部
        log && logger(
          'info',
            `Task ${task.id} will be retried later`)
      } else {
        failList.push(task.id)
        hook && hook.onTaskFailed && hook.onTaskFailed(idToIndex[task.id], task)
        log && logger(
          'info',
            `Task ${task.id} has reached the maximum number of retries and will not be retried again`)
      }
    }
  }
  async function processTaskQueue() {
    let index = 0
    while (taskQueue.length > 0) {
      const task = taskQueue.shift() // 取出队列头部的任务
      if (task!.retry === 0) {
        idToIndex[task!.id] = index
        index++
      }
      await processTask(task!)
    }
  }
  await processTaskQueue()
  hook && hook.onFinished && hook.onFinished()
  return {
    success: successList,
    fail: failList,
  }
}
