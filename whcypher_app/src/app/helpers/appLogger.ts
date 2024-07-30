import * as winston from 'winston'
import BrowserConsole from 'winston-transport-browserconsole'

const isProductionEnv = process.env.NODE_ENV === 'production'
const level = isProductionEnv ? 'error' : 'debug'

const logger = winston.createLogger({
  level,
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new BrowserConsole({
      format: winston.format.simple(),
      level,
    }),
  ],
})

export default logger
