const config = require('./config.json')
const TypeormLogger = require('./dist/util/TypeormLogger')

module.exports = {
    type: 'mysql',
    host: config.mysql.host,
    port: config.mysql.port,
    username: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database,
    synchronize: false,
    entities: ['dist/entity/*.js'],
    subscribers: ['dist/subscriber/*.js'],
    migrations: ['dist/migration/*.js'],
    cli: {
        entitiesDir: 'dist/entity',
        migrationsDir: 'dist/migration',
        subscribersDir: 'dist/subscriber',
    },
    logging: 'all',
    logger: new TypeormLogger.default(),
    maxQueryExecutionTime: 1000,
}
