import hash from 'hash-sum'
/**
 * 根据下载链接下载文件
 * @param url
 */
export const downloadFile = (url: string) => {
  const aLink: HTMLAnchorElement = document.createElement('a')
  aLink.href = url
  aLink.click()
}

/**
 * 防抖函数
 * @param func
 * @param wait
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: number | undefined

  return function debounced(...args: Parameters<T>): void {
    if (timeoutId !== undefined)
      clearTimeout(timeoutId)

    timeoutId = window.setTimeout(() => {
      func(...args)
      timeoutId = undefined
    }, wait)
  }
}

/**
 * 节流函数
 * @param func
 * @param wait
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let isThrottled = false

  return function throttled(...args: Parameters<T>): void {
    if (!isThrottled) {
      func(...args)
      isThrottled = true

      setTimeout(() => {
        isThrottled = false
      }, wait)
    }
  }
}

/**
 * 基于 hash sum 生成一个随机哈希
 * @param id 生成hash的id
 * @param prefix 自定义前缀
 * @param suffix 自定义后缀
 */
export const createHash = (
  id: string | number = (new Date()).getTime().toString(),
  prefix = '',
  suffix = '',
) => {
  return `${prefix}${hash(id)}${suffix}`
}
