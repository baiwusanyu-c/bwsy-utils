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
 */
export function getLastDay(
  month: number,
  year: number = new Date().getFullYear(),
  isFull = false,
) {
  return moment(`${year}-${month}`, 'YYYY-MM').endOf('month').format('YYYY-MM-DD')
}
