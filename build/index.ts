import * as process from 'process'
import * as path from 'path'
import { defineConfig } from 'tsup'
import { entry as entryConfig } from './dir'
let entry = {} as Record<string, string>
const buildMode = process.env.BUILD_MODE
const baseConfig = {
  entry: {},
  external: [
    'chalk',
    'fs-extra',
    'vue',
    'fast-glob',
    'fs-extra',
    'magic-string',
  ],
  format: ['cjs', 'esm'],
  clean: true,
  minify: true,
  dts: false,
  outDir: path.resolve(process.cwd(), '../dist'),

}
const configOptions = []

if (buildMode === 'prod') {
  entry = entryConfig
  for (const entryKey in entry) {
    const config = JSON.parse(JSON.stringify(baseConfig))
    config.entry = [entry[entryKey]]
    // config.outDir = entry[entryKey]
    config.outDir = entryKey === 'index'
      ? path.resolve(process.cwd(), '../dist') : path.resolve(process.cwd(), `../dist/${entryKey}`)
    config.dts = true
    configOptions.push(config)
  }
}

export default defineConfig(configOptions)
