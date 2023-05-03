
import { series } from 'gulp'
import { runTask } from './utils'
export default series(
  runTask('publish @baiwusanyu/utils-log', 'cd dist/log && pnpm run publish:npm'),
  runTask('publish @baiwusanyu/utils-task', 'cd dist/task && pnpm run publish:npm'),
  runTask('publish @baiwusanyu/utils-obj', 'cd dist/task && pnpm run publish:npm'),
  runTask('publish @baiwusanyu/utils-is', 'cd dist/task && pnpm run publish:npm'),
  runTask('publish baiwusanyu-utils', 'cd dist && pnpm run publish:npm'),
)
