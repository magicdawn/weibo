import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import fse from 'fs-extra'
dayjs.extend(utc)
export { dayjs }
export { fse }
