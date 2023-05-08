import moment from 'moment'
/**
 * 补0
 * @param num
 */
export function setZeroDate(num: number) {
  return num < 10 ? `0${num}` : `${num}`
}

/**
 * 获取某个月最后一天
 * @param year
 * @param month
 * @param isFull
 */
export function getLastDay(
  month: number,
  year: number = new Date().getFullYear(),
  isFull = false,
) {
  const m = moment(`${year}-${month}`, 'YYYY-MM').endOf('month')
  return isFull ? m.format('YYYY-MM-DD') : new Date(year, month, 0).getDate()
}

/**
 * 给定一个时间（2023-04-27T07:32:39.000+00:00），
 * 返回指定格式日期字符串
 * @param time
 * @param format
 */
export function formatDate(
  time: string,
  format = 'YYYY-MM-DD HH:mm:ss',
) {
  const dateObj = moment(time)
  if (dateObj.utcOffset() !== moment().utcOffset())
    dateObj.utcOffset('+08:00')

  return dateObj.format(format)// 格式化日期
}
