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

// TODO 防抖
// TODO 节流

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
