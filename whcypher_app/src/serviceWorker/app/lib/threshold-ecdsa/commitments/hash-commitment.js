const _jsSha = require('js-sha256');
const _utils = require('../util/utils');

const _bn = require('bn.js');

const { randBytesSync } = require('bigint-crypto-utils');

const commitWithRandomBlind = function commitWithRandomBlind(msg) {
  const hash = _jsSha.sha256.create();

  const bytes = 32;
  const randString = randBytesSync(bytes, true);
  const rand = `0x${Buffer.from(randString).toString('hex')}`;

  const blinding_factor = new _bn(_utils.stripHexNotation(rand), 16); // 256 bit

  hash.update(msg);

  hash.update(blinding_factor.toString(16));
  return {
    digest: hash.toString(),
    blinding_factor: blinding_factor.toString(16),
  };
};

const commitWithUserBlind = function commitWithUserBlind(msg, blind) {
  // take only string types
  const hash = _jsSha.sha256.create();

  hash.update(msg);
  hash.update(blind);
  return hash.toString();
};

module.exports = {
  commitWithRandomBlind,
  commitWithUserBlind,
};
