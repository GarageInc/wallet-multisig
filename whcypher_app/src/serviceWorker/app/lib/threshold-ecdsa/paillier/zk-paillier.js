const _jsSha = require('js-sha256');

// const bigInt = require('big-integer');
const { randBetween, modPow, modInv } = require('bigint-crypto-utils');
const _utils = require('../util/utils');

const zkPillierCorrectKeyProof = function zkPillierCorrectKeyProof(dk) {
  const K = 12;
  const { n } = dk.publicKey;
  const r = randBetween(n);
  const zi = [];
  let i;

  const p_hash = _jsSha.sha256.create();

  for (i = 0; i < K; i++) {
    const z = getZ(n);
    zi.push(z.toString(16));

    const xi = modPow(z, r, n);
    p_hash.update(xi.toString(16));
  }

  const e = _utils.hexToInt(_jsSha.sha256(p_hash.toString())) % n;

  const phi = (dk._p - 1n) * (dk._q - 1n);

  const y = r + ((n - phi) * e);
  return {
    zi,
    x: p_hash.toString(),
    y: y.toString(16),
  };
};

const zkPillierCorrectKeyVerify = function zkPillierCorrectKeyVerify(ek, zi, x, y) {
  const K = 12;
  const { n } = ek;
  let i;

  const v_hash = _jsSha.sha256.create();

  const e = hexToInt(_jsSha.sha256(x.toString())) % n;

  for (i = 0; i < K; i++) {
    const v = modPow(hexToInt(zi[i]), hexToInt(y), n) * (modInv(modPow(hexToInt(zi[i]), n*e, n), n)) % n;
    v_hash.update(v.toString(16));
  }

  if (x == v_hash.toString()) {
    return true;
  }

  return false;
};

function getZ(n) {
  const n_bitlength = BigInt(n.toString(2).length);
  const nh = modPow(2n, n_bitlength / 2n, n);
  let done = false;
  let result;

  while (!done) {
    const alpha = randBetween(nh);
    const beta = randBetween(nh);
    result = (alpha * nh + 1n) * (modPow(beta, nh, n)) % n;

    try {
      modInv(result, n); // for co-prime test
      done = true;
    } catch (e) {
    }
  }

  return result;
}

module.exports = {
  zkPillierCorrectKeyProof,
  zkPillierCorrectKeyVerify,
};
