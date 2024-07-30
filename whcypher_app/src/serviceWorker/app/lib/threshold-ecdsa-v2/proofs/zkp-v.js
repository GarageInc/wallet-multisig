const _bn = require('bn.js');

const { randBytesSync } = require('bigint-crypto-utils');

const _jsSha = require('js-sha256');

const _utils = require('../util/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const ZKVProof =
/* #__PURE__ */
(function () {
  function ZKVProof(curve) {
    _classCallCheck(this, ZKVProof);

    this.curve = curve; // getCurve(curve); //elliptic.curves['secp256k1'].curve;

    this.bitLength = this.curve.n.bitLength();
  }

  _createClass(ZKVProof, [{
    key: 'prove',
    value: function prove(R, V, s, l) {
      const bytes = this.bitLength / 8;

      const randStringA = randBytesSync(bytes, true);
      const aHex = `0x${Buffer.from(randStringA).toString('hex')}`; // Lenght of 64 = 32 bites
      const a = new _bn(_utils.stripHexNotation(aHex), 16).mod(this.curve.n);

      const randStringB = randBytesSync(bytes, true);
      const bHex = `0x${Buffer.from(randStringB).toString('hex')}`; // Lenght of 64 = 32 bites
      const b = new _bn(_utils.stripHexNotation(bHex), 16).mod(this.curve.n);

      const alpha = R.mul(a).add(this.curve.g.mul(b));

      const hash = _jsSha.sha256.create();

      hash.update(alpha.encodeCompressed('hex'));
      hash.update(R.encodeCompressed('hex'));
      hash.update(V.encodeCompressed('hex'));
      const e = new _bn(hash.toString(), 16).mod(this.curve.n);
      const t = a.add(e.mul(s)).mod(this.curve.n);
      const u = b.add(e.mul(l)).mod(this.curve.n);
      return {
        alpha: alpha.encodeCompressed('hex'),
        response: {
          t: t.toString(16),
          u: u.toString(16),
        },
      };
    },
  }, {
    key: 'verify',
    value: function verify(R, V, _alpha, _t, _u) {
      const alpha = this.curve.decodePoint(_alpha, 'hex');
      const t = new _bn(_t, 16);
      const u = new _bn(_u, 16);

      const hash = _jsSha.sha256.create();

      hash.update(alpha.encodeCompressed('hex'));
      hash.update(R.encodeCompressed('hex'));
      hash.update(V.encodeCompressed('hex'));
      const e = new _bn(hash.toString(), 16).mod(this.curve.n);
      const left = R.mul(t).add(this.curve.g.mul(u));
      const right = alpha.add(V.mul(e)); // console.log('left', left);
      // console.log('right', right);

      return left.eq(right);
    },
  }]);

  return ZKVProof;
}());

module.exports = ZKVProof;
