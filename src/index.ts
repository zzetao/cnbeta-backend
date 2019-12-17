import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Request, Response } from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { AppRoutes } from './routes'
import logger from './util/logger'

createConnection()
    .then(async () => {
        const app = express()
        app.use(bodyParser.json())

        // register all application routes
        AppRoutes.forEach(route => {
            app[route.method](route.path, (request: Request, response: Response, next: Function) => {
                route
                    .action(request, response)
                    .then(() => next)
                    .catch(err => next(err))
            })
        })

        const port = 3000
        app.listen(port)

        logger.info(`application running on port ${port}, env: ${process.env.NODE_ENV}`)
    })
    .catch(error => {
        logger.error('Typeorm connection error')
        logger.error(error)
    })
