
// http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
// https://www.jianshu.com/p/ebcf41c75786
module.exports = {
    apps: [{
        name: 'nodeJS-admin',
        script: 'index.js',
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '1G',
        output: 'logs/out.log',
        error: 'logs/error.log',
        log: 'logs/combined.outerr.log',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production',
            HOST: '0.0.0.0',
            PORT: 8001
        }
    }],
    deploy: {
        production: {
            user: 'root',
            host: ['47.94.156.128'],
            port: '22',
            ref: 'origin/master',
            repo: 'git@github.com:perfectSymphony/nodeJS-admin.git',
            path: '/root/nodeJS-admin',
            'ssh_options': 'StrictHostKeyChecking=no',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
}