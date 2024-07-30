const _bn = require('bn.js');

const bcu = require('bigint-crypto-utils');

const _jsSha = require('js-sha256');

const _utils = require('../util/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// We should be using BN instead of BigInt as elliptic gives wrong results for BigInt multiplication
// More details here: https://github.com/indutny/elliptic/issues/260
const DLogProof =
/* #__PURE__ */
(function () {
  function DLogProof(curve) {
    _classCallCheck(this, DLogProof);

    // BN
    this.curve = curve; /// elliptic.curves['secp256k1'].curve;

    this.bitLength = this.curve.n.bitLength();
  }

  _createClass(DLogProof, [{
    key: 'prove',
    value: function prove(xi) {
      const r = bcu.randBetween(BigInt(this.curve.n));
      const rc = this.curve.g.mul(new _bn(r));
      const pk = this.curve.g.mul(new _bn(xi)); // y

      const rc_hash = _jsSha.sha256.create();
      rc_hash.update(rc.getX().toString(16));
      rc_hash.update(rc.getY().toString(16));
      const e = _utils.hexToInt(rc_hash.toString());

      const response = r + (xi * e);
      const pke = pk.mul(new _bn(e));
      const xie = this.curve.g.mul(new _bn(xi * e));

      return {
        pk: pk.encodeCompressed('hex'),
        random_commit: rc.encodeCompressed('hex'),
        response: response.toString(16), // challenge response
      };
    },
  }, {
    key: 'verify',
    value: function verify(pkRaw, randomCommitRaw, responseRaw) {
      const rc = this.curve.decodePoint(randomCommitRaw, 'hex');
      const pk = this.curve.decodePoint(pkRaw, 'hex');
      const response = _utils.hexToInt(responseRaw);

      const rc_hash = _jsSha.sha256.create();
      rc_hash.update(rc.getX().toString(16));
      rc_hash.update(rc.getY().toString(16));
      const e = _utils.hexToInt(rc_hash.toString());

      const gs_v = rc.add(pk.mul(new _bn(e)));
      const gs = this.curve.g.mul(new _bn(response));

      return gs.eq(gs_v);
    },
  }]);

  return DLogProof;
}());

module.exports = DLogProof;
