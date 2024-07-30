Docker
-----

* `docker-compose up -p cosigner-api -d`

Development

* `docker-compose exec mongo mongo admin --eval "db.createUser({ user: 'adminUser', pwd: 'smarty_pants', roles: [ { role: 'userAdminAnyDatabase', db: 'admin' } ]})"`
* `docker-compose exec mongo mongo admin -u adminUser -p smarty_pants --authenticationDatabase "admin"`
* 'use admin'
* 'db.createUser({ user: "cosigner_api_app", pwd: "smarty_pants", roles: [ { role: "dbOwner", db: "cosigner_api_development" } ]})'
* 'exit'

Provision server

* Make sure .env.production file is present
* Make sure passwod variables are provided in /etc/ansible/hosts
* `ansible-playbook config/ansible/000-setup.yml`
* `ansible-playbook config/ansible/001-nginx.yml`
* `ansible-playbook config/ansible/002-node.yml`
* `ansible-playbook config/ansible/003-mongodb.yml`
* `ansible-playbook config/ansible/004-pm2.setup.yml`
* `ansible-playbook config/ansible/005-pm2.start.yml`

Deploy

* `npx shipit production deploy`
