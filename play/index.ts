import { log, setGlobalPrefix } from '@baiwusanyu/utils-log'
setGlobalPrefix('[@baiwusanyu/utils-log]: ')
log('warning', 'test')
log('error', 'error test', '[Error]: ')
