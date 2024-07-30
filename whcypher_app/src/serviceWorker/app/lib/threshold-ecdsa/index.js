const _protocol = require('./protocol');

const _paillier = require('./paillier/paillier');

const tecdsa = {
  protocol: _protocol,
  paillier: _paillier,
};

module.exports = tecdsa
