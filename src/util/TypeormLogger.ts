import { Logger } from 'typeorm'
import logger from './logger'

const TAG = '[ORM]'

export default class implements Logger {
    /**
     * Logs query and parameters used in it.
     */
    public logQuery(query: string, parameters?: any[]) {
        logger.info(`${TAG} ${query} ${parameters || ''}`)
    }
    /**
     * Logs query that is failed.
     */
    public logQueryError(error: string, query: string, parameters?: any[]) {
        logger.error(`${TAG} QueryError ${error} ${query} ${parameters || ''}`)
    }
    /**
     * Logs query that is slow.
     */
    public logQuerySlow(time: number, query: string, parameters?: any[]) {
        logger.warn(`${TAG} QuerySlow ${time}ms ${query} ${parameters || ''}`)
    }
    /**
     * Logs events from the schema build process.
     */
    public logSchemaBuild(message: string) {
        logger.debug(`${TAG} SchemaBuild ${message}`)
    }
    /**
     * Logs events from the migrations run process.
     */
    public logMigration(message: string) {
        logger.debug(`${TAG} Migration ${message}`)
    }
    /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
    public log(level: 'log' | 'info' | 'warn', message: any) {
        if (level === 'warn') {
            logger.warn(`${TAG} ${message}`)
        } else if (level === 'info') {
            logger.info(`${TAG} ${message}`)
        } else {
            logger.debug(`${TAG} ${message}`)
        }
    }
}
