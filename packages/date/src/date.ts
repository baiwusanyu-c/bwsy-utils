import dayjs, { OpUnitType } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
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
  const m = dayjs(`${year}-${month}`, 'YYYY-MM').endOf('month')
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
  dayjs.extend(utc);
  const dateObj = dayjs(time)
  if (dateObj.utcOffset() !== dayjs().utcOffset())
    dateObj.utcOffset('+08:00')

  return dateObj.format(format)// 格式化日期
}

/**
 * 返回一个相对时间 （x小时前/后）
 * @param cTime
 * @param rTime
 * @param isBefore
 * @param unit
 * @param lang
 */
export function relativeTime(
  rTime: string,
  cTime: string,
  isBefore = true,
  unit: OpUnitType = 'hour',
  lang = 'zh-cn',
) {
  dayjs.extend(duration);
  const currentTime = dayjs(cTime)
  const relativeTime = dayjs(rTime)
  const diff = dayjs.duration(
    isBefore
      ? currentTime.diff(relativeTime)
      : relativeTime.diff(currentTime),
  )
  let res = ''
  const handleDiff = (unit: OpUnitType) => {
    let finalRes = ''
    let diffRes = 0
    switch (unit) {
      case 'hour':
        diffRes = Number(diff.asHours().toFixed(0))
        if (diffRes === 0) {
          unit = 'minute'
          finalRes = handleDiff(unit)
          break
        }
        if (Math.abs(diffRes) >= 24) {
          unit = 'day'
          finalRes = handleDiff(unit)
          break
        }
        finalRes = `${Math.abs(diffRes)} ${lang === 'zh-cn' ? '小时' : 'hours'}`
        break
      case 'day':
        diffRes = Math.abs(Number(diff.asDays().toFixed(0)))
        if (diffRes === 0) {
          unit = 'hour'
          finalRes = handleDiff(unit)
          break
        }

        if (Math.abs(diffRes) >= 7) {
          unit = 'week'
          finalRes = handleDiff(unit)
          break
        }
        finalRes = `${Math.abs(diffRes)} ${lang === 'zh-cn' ? '天' : 'days'}`
        break
      case 'week':
        diffRes = Math.abs(Number(diff.asWeeks().toFixed(0)))
        if (diffRes === 0) {
          unit = 'day'
          finalRes = handleDiff(unit)
          break
        }
        if (Math.abs(diffRes) >= 28) {
          unit = 'month'
          finalRes = handleDiff(unit)
          break
        }
        finalRes = `${Math.abs(diffRes)} ${lang === 'zh-cn' ? '周' : 'weeks'}`
        break
      case 'minute':
        diffRes = Math.abs(Number(diff.asMinutes().toFixed(0)))
        if (diffRes === 0) {
          unit = 'second'
          finalRes = handleDiff(unit)
          break
        }
        if (Math.abs(diffRes) >= 60) {
          unit = 'hour'
          finalRes = handleDiff(unit)
          break
        }
        finalRes = `${Math.abs(diffRes)} ${lang === 'zh-cn' ? '分钟' : 'minutes'}`
        break
      case 'second':
        diffRes = Math.abs(Number(diff.asSeconds().toFixed(0)))
        finalRes = `${Math.abs(diffRes)} ${lang === 'zh-cn' ? '秒' : 'seconds'}`
        break
      case 'month':
        diffRes = Math.abs(Number(diff.asMonths().toFixed(0)))
        if (diffRes === 0) {
          unit = 'week'
          finalRes = handleDiff(unit)
          break
        }
        if (Math.abs(diffRes) >= 12) {
          finalRes = cTime
          break
        }
        finalRes = `${Math.abs(diffRes)} ${lang === 'zh-cn' ? '月' : 'months'}`
        break
      default:
        break
    }
    return finalRes
  }
  res = handleDiff(unit)
  res = `${res}${isBefore ? lang === 'zh-cn' ? '前' : ' ago' : lang === 'zh-cn' ? '后' : ' after'}`
  return res
}
