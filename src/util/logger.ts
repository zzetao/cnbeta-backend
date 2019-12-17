import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
const path = require('path')
const format = winston.format

const logFormat = format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...args }) => {
        const rest = Object.keys(args).length ? JSON.stringify(args, undefined, 2) : ''
        return `[${level.toLocaleUpperCase()}] ${timestamp} ${message} ${rest}`
    }),
)

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [],
})

if (process.env.NODE_ENV === 'production') {
    logger.add(
        new DailyRotateFile({
            filename: 'app-%DATE%.log',
            dirname: path.join(__dirname, '../../logs'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            createSymlink: true,
            symlinkName: 'current.log',
            maxFiles: '14d',
        }),
    )
} else {
    logger.add(new winston.transports.Console())
}

export default logger
