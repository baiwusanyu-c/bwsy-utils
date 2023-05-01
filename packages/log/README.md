# @baiwusanyu/utils-log

## Type

### TLog

打印输出的情感类型

```typescript
declare type TLog = 'error' | 'warning' | 'info' | 'success'
```

## Function

### log

打印函数，用于情感类型打印，支持`node`和浏览器运行

| 参数       | 参数类型     | 默认值     | 说明 |
|----------|----------|---------|-----------|
| type     | `TLog`   | `-`     | 情感类型 |
| msg      | `String` | `-`     | 文本内容 |
| prefix   | `String` | `globalPrefix` | 自定义前缀 |

### setGlobalPrefix

设置全局的打印前缀

| 参数       | 参数类型     | 默认值 | 说明        |
|----------|----------|-----|-----------|
| prefix   | `String` | `-` | 自定义全局打印前缀 |
