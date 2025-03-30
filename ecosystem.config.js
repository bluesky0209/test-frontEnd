module.exports = {
    apps: [
        {
            name: 'nuxt-app',
            exec_mode: 'cluster',
            instances: '1',
            script: '.output/server/index.mjs',
            env: {
                PORT: 3334,
                HOST: '0.0.0.0'
            }
        }
    ]
} 