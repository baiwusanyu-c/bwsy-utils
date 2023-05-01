# @baiwusanyu/utils-task

## Type

### ITask

任务队列实例

```typescript
export interface ITask {
    // 任务函数
    fn: (...args: any[]) => any
    // 任务函数所需参数
    params: Array<any>
    // 重试次数，默认为0
    retry: number
    // 任务唯一id
    id: number
}
```

### ITaskQueueHooks

任务队列执行钩子对象

```typescript
export interface ITaskQueueHooks {
    // 所有任务执行完毕时钩子
    onFinished?: () => void
    // 任务执行成功时钩子
    onTaskSucceeded?: (index: number, task: ITask) => void
    // 任务执行失败时钩子
    onTaskFailed?: (index: number, task: ITask) => void
}
```

## Function

### setAsyncTaskList

生产一个异步任务列表

| 参数          | 参数类型                            | 默认值     | 说明 |
|-------------|---------------------------------|---------|-----------|
| taskNum     | `Number`                        | `-` | 异步任务数 |
| taskFunc    | `(index: number) => Promise<T>` | `-` | 异步任务函数 |

### runAsyncTaskList

执行一个异步任务列表

| 参数         | 参数类型                                                    | 默认值 | 说明        |
|------------|---------------------------------------------------------|-----|-----------|
| taskNum    | `Number`                                                | `-` | 异步任务数 |
| taskFunc   | `(index: number) => Promise<Record<any, any> / void>`   | `-` | 异步任务函数 |

### runAsyncTaskList

执行一个异步任务列表

| 参数        | 参数类型              | 默认值    | 说明     |
|-----------|-------------------|--------|--------|
| taskQueue | `Array<ITask>`    | `-`    | 任务队列   |
| hook      | `ITaskQueueHooks` | `-`    | 任务队列执行钩子对象 |
| maxRetry  | `Number`          | `5`    | 最大重试数量 |
| log       | `Boolean`         | `true` | 是否打印日志 |
