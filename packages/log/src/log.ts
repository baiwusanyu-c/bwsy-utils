import colors from 'ansi-colors'
import type { TLog } from '../types'

/**
 *  打印类，分为四中类型
 *  @internal
 */
export const logType = {
  info: (msg: string, prefix = '') => colors.blueBright.bold(`${prefix}${msg}`),
  error: (msg: string, prefix = '') => colors.redBright.bold(`${prefix}${msg}`),
  warning: (msg: string, prefix = '') => colors.yellowBright.bold(`${prefix}${msg}`),
  success: (msg: string, prefix = '') => colors.greenBright.bold(`${prefix}${msg}`),
}

/**
 * 全局打印前缀
 * @internal
 */
export const globalPrefix = Symbol('Global Prefix Key')

/**
 * 设置打印的全局前缀
 * @param prefix 全局前缀
 * @returns void
 */
export const setGlobalPrefix = (prefix: string) => {
  (globalThis as any)[globalPrefix] = prefix
}

/**
 * 打印日志函数
 * @param type 打印输出类别
 * @param msg 打印输出信息
 * @param prefix 打印输出前缀，默认全局前缀
 * @returns void
 */
export const log = (
  type: TLog,
  msg: string,
  prefix = (globalThis as any)[globalPrefix] as string) => {
  console.log(logType[type](msg, prefix))
}
