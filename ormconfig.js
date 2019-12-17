const config = require('./config.json')

module.exports = {
    type: 'mysql',
    host: config.mysql.host,
    port: config.mysql.port,
    username: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database,
    synchronize: true,
    entities: ['dist/entity/*.js'],
    subscribers: ['dist/subscriber/*.js'],
    migrations: ['dist/migration/*.js'],
    cli: {
        entitiesDir: 'dist/entity',
        migrationsDir: 'dist/migration',
        subscribersDir: 'dist/subscriber',
    },
}
