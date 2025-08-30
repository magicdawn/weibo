import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import fse from 'fs-extra'

export { fse }

dayjs.extend(utc)
export { dayjs }
