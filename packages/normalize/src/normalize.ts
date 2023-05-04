export function normalizePath(path: string): string {
  return path.replace(/[\\/]/g, '/')
}

export function normalizeEllipsis(str = '', limitLen = 24) {
  let len = 0
  // eslint-disable-next-line no-control-regex
  const reg = /[\x00-\xFF]/ // 半角字符的正则匹配
  const strContent = str.split('')
  const inx = strContent.findIndex((s) => {
    len += reg.test(s) ? 1 : 2
    if (len > limitLen)
      return true
    else
      return false
  })
  return inx === -1 ? str : `${str.substr(0, inx)}...`
}

export function normalizeSizeUnits(bytes: number): string {
  if (bytes === 0) return '0 bytes'

  const units = ['bytes', 'KB', 'MB', 'GB']
  const index = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = +(bytes / Math.pow(1024, index)).toFixed(2)
  const unit = units[index]

  return `${size} ${unit}`
}
