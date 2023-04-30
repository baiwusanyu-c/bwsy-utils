export interface ITask {
  fn: (...args: any[]) => any
  params: Array<any>
  retry: number
  id: number
}
export interface ITaskQueueHooks {
  onFinished?: () => void
  onTaskSucceeded?: (index: number, task: ITask) => void
  onTaskFailed?: (index: number, task: ITask) => void
}
