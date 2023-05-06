/**
 * 根据下载链接下载文件
 * @param url
 */
export const downloadFile = (url: string) => {
  const aLink = document.createElement('a')
  aLink.href = url
  aLink.click()
}
