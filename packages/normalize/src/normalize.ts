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

export const normalizeNum2Comma = (num: number, decimal = 6): string => {
  const text = `${num}`
  const x: Array<string> = text.split('.') // 按照小数点分隔
  let x1: string = x[0] // 整数部分
  const x2: string = x.length > 1 ? `.${x[1]}` : '' // 小数部分
  const rgx = /(\d+)(\d{3})/ // 正则式定义
  while (rgx.test(x1)) {
    // 正则式匹配
    x1 = x1.replace(rgx, '$1' + ',' + '$2') // 正则式替换
  }

  return x1 + x2.slice(0, decimal + 1)
}

export function normalizeVarStrEmpty<T>(str?: T) {
  if (!str || str === 'undefined' || str === 'null')
    return ''

  return str
}
