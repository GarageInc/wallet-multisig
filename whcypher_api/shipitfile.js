module.exports = shipit => {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  const appName = 'cosig-api';

  shipit.initConfig({
    default: {
      deployTo: '/var/www/signer.whalesheaven.com',
      repositoryUrl: 'git@github.com:WhalesHeaven/cosigner-api.git',
      keepReleases: 5,
      shared: {
        overwrite: true,
        dirs: ['node_modules'],
        files: ['.env.production']
      }
    },
    production: {
      servers: 'deploy01@65.21.109.193'
    }
  });

  const path = require('path');
  const envProductionFilePath = path.join(
    shipit.config.deployTo,
    'shared',
    '.env.production'
  );

  const pm2ConfigFilePath = path.join(
    shipit.config.deployTo,
    'current',
    'pm2.config.js'
  );

  // Our listeners and tasks will go here

  shipit.on('updated', () => {
    shipit.start('npm-install', 'copy-env-production', 'npm-symlink-env');
  });

  shipit.on('published', () => {
    shipit.start('pm2-server');
  });

  shipit.blTask('npm-install', async () => {
    await shipit.remote(`cd ${shipit.releasePath} && npm install --production`);
  });

  shipit.blTask('copy-env-production', async () => {
    await shipit.copyToRemote('.env.production', envProductionFilePath);
  });

  shipit.blTask('npm-symlink-env', async () => {
    await shipit.remote(`cd ${shipit.releasePath} && ln -sf .env.production .env`);
  });

  // shipit.blTask('npm-build', async () => {
  //   await shipit.remote(`cd ${shipit.releasePath} && npm run build`);
  // });

  shipit.blTask('pm2-server', async () => {
    await shipit.remote(`pm2 delete -s ${appName} || :`);
    await shipit.remote(
      `cd ${shipit.releasePath} && npm run prod`
    );
  });

};
