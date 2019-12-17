import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Request, Response } from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { AppRoutes } from './routes'

createConnection()
    .then(async () => {
        // create express app
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

        // run app
        app.listen(3000)

        console.log('Express application is up and running on port 3000')
    })
    .catch(error => console.log('TypeORM connection error: ', error))
