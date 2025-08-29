import { delay } from 'es-toolkit'
import { startPptr } from './pptr'

await startPptr({ headless: false })
await delay(86400_000)
process.exit()
