import { log } from '@baiwusanyu/utils-log'

/**
 * 生成一个异步任务列表
 * @param taskNum 异步任务数量
 * @param taskFunc 异步任务函数
 */
export function setAsyncTaskList<T>(
  taskNum: number,
  taskFunc: (index: number) => Promise<T>,
) {
  const taskList = [] as Array<Promise<any>>
  for (let i = 0; i < taskNum; i++) {
    taskList.push(new Promise((resolve) => {
      resolve(taskFunc(i))
    }))
  }
  return taskList
}

/**
 * 执行一个异步任务列表
 * @param taskNum 异步任务数
 * @param taskFunc 异步任务函数
 */
export async function runAsyncTaskList(
  taskNum: number,
  taskFunc: (index: number) => Promise<Record<any, any> | void>,
) {
  try {
    const res = await Promise.all(
      setAsyncTaskList(taskNum, async(index: number) => {
        const runRes = await taskFunc(index)
        return runRes
      }),
    )
    return res
  } catch (e: any) {
    log('error', e.message)
  }
}
