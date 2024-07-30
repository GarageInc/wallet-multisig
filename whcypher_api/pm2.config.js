module.exports = {
apps: [
  {
    name: 'cosigner-api',
    script: 'npm run prod',
    watch: true,
    autorestart: true,
    restart_delay: 1000,
    cwd: '/var/www/signer.whalesheaven.com/current',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }
]
};
