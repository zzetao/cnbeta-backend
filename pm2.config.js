module.exports = {
    apps: [
        {
            name: 'cnbeta',
            script: './dist/index.js',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
}
