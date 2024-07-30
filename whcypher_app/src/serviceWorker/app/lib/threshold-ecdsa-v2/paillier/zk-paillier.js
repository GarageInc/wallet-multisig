const _jsSha = require('js-sha256');

// const bigInt = require('big-integer');
const { randBetween, modPow, modInv } = require('bigint-crypto-utils');
const _utils = require('../util/utils');

const zkPillierCorrectKeyProof = function zkPillierCorrectKeyProof(dk) {
  const K = 12;
  const { n } = dk.publicKey;
  let r, p_hash, e, zi;

  do {
    zi = [];
    r = randBetween(n**2n);
    p_hash = _jsSha.sha256.create();
  
    for (let i = 0; i < K; i++) {
      const z = getZ(n);
      zi.push(z.toString(16));
  
      const xi = modPow(z, r, n);
      p_hash.update(xi.toString(16));
    }
  
    e = _utils.hexToInt(_jsSha.sha256(p_hash.toString())) % n;
  } while (Math.log10(e.toString()) > Math.log10(n.toString()));
  // [FIXME] THis does not seem right
  // console.log('e', e, 'log(e)', Math.log10(e.toString()));
  // console.log('n', n, 'log(n)', Math.log10(n.toString()));

  const phi = (dk._p - 1n) * (dk._q - 1n);

  // TODO: seems that you're leaking phi here. `r` is ~2048 bits, `n - phi` is also ~2048 bits
  // and e is ~256 bits => ((n - phi) * e) ~ 2304 bits and `r + ((n - phi) * e)` leaking ~256 upper bits of phi.
  // That seems enough for Coppersmith method.
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

  const e = _utils.hexToInt(_jsSha.sha256(x.toString())) % n;

  for (i = 0; i < K; i++) {
    const v = modPow(_utils.hexToInt(zi[i]), _utils.hexToInt(y), n) * (modInv(modPow(_utils.hexToInt(zi[i]), n*e, n), n)) % n;
    v_hash.update(v.toString(16));
  }

  if (x == v_hash.toString()) {
    return true;
  }

  return false;
};

function getZ(n) {
  const n_bitlength = BigInt(n.toString(2).length);
  // TODO: that is value 2n here?
  const nh = modPow(2n, n_bitlength / 2n, n);
  let done = false;
  let result;

  while (!done) {
    const alpha = randBetween(nh);
    const beta = randBetween(nh);
    result = (alpha * nh + 1n) * (modPow(beta, nh, n)) % n;

    // TODO: inversion always exists with one exception when result is one of factors
    // chances that you got here nil. Really nil.
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
