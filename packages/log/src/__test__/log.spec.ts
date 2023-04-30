import { assert, beforeEach, expect, test, vi } from 'vitest'
import * as colors from 'ansi-colors'
import { globalPrefix, log, logType, setGlobalPrefix } from '../log'

beforeEach(() => {
  setGlobalPrefix('')
})
test('logType functions should format strings with the correct color and prefix', () => {
  const msg = 'test message'
  const prefix = 'test prefix'

  assert.equal(logType.info(msg, prefix), colors.blueBright.bold(`${prefix}${msg}`))
  assert.equal(logType.error(msg, prefix), colors.redBright.bold(`${prefix}${msg}`))
  assert.equal(logType.warning(msg, prefix), colors.yellowBright.bold(`${prefix}${msg}`))
  assert.equal(logType.success(msg, prefix), colors.greenBright.bold(`${prefix}${msg}`))
})

test('setGlobalPrefix function should set the globalPrefix variable', () => {
  setGlobalPrefix('test')
  assert.equal((globalThis as any)[globalPrefix], 'test')
})

test('log function should log messages with the correct color and prefix', () => {
  console.log = vi.fn()
  log('info', 'test message')
  expect(console.log).toHaveBeenCalledWith(colors.blueBright.bold('test message'))

  setGlobalPrefix('new prefix')
  log('error', 'test message')
  expect(console.log).toHaveBeenCalledWith(colors.redBright.bold('new prefixtest message'))

  log('warning', 'test message', 'custom prefix')
  expect(console.log).toHaveBeenCalledWith(colors.yellowBright.bold('custom prefixtest message'))

  log('success', 'test message', '')
  expect(console.log).toHaveBeenCalledWith(colors.greenBright.bold('test message'))
})
