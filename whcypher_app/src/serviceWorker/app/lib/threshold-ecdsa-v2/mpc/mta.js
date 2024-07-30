const bcu = require('bigint-crypto-utils');

const _dlog = require('../proofs/dlog');
const _utils = require('../util/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const MtA =
/* #__PURE__ */
(function () {
  function MtA(curve) {
    _classCallCheck(this, MtA);

    this.curve = curve; // getCurve(curve); // elliptic.curves['secp256k1'].curve;
  }

  _createClass(MtA, [{
    key: 'messageA',
    value: function messageA(a_hex, ek) {
      const a = _utils.hexToInt(a_hex, 16);
      const c_a = ek.encrypt(a);

      return {
        c_a: _utils.intToHex(c_a),
      };
    },
  }, {
    key: 'messageB',
    value: function messageB(b_hex, c_a_hex, ek) {
      const b = _utils.hexToInt(b_hex);
      const c_a = _utils.hexToInt(c_a_hex);

      const beta_t = bcu.randBetween(BigInt(this.curve.n));
      const c_beta_t = ek.encrypt(beta_t);
      const b_c_a = ek.multiply(c_a, b);
      const c_b = ek.addition(b_c_a, c_beta_t);
      const beta = 0n - beta_t;

      const dlog = new _dlog(this.curve);
      const dlog_proof_b = dlog.prove(b);
      const dlog_proof_beta_t = dlog.prove(beta_t);

      return {
        messageB: {
          c_b: _utils.intToHex(c_b),
          proof_b: dlog_proof_b,
          proof_beta_t: dlog_proof_beta_t,
        },
        beta: beta_t,
      };
    },
  }, {
    key: 'verifyAndGetAlpha',
    value: function verifyAndGetAlpha(a_hex, c_b_hex, proof_b, proof_beta_t, dk) {
      const c_b = _utils.hexToInt(c_b_hex);
      const a = _utils.hexToInt(a_hex);
      const alpha = dk.decrypt(c_b) % BigInt(this.curve.n);
      const g_alpha = this.curve.g.mul(_utils.bigIntToBN(alpha));
      const proof_b_pk = this.curve.decodePoint(proof_b.pk, 'hex');
      const proof_beta_t_pk = this.curve.decodePoint(proof_beta_t.pk, 'hex');
      const ab_plus_beta_t = proof_b_pk.mul(_utils.bigIntToBN(a)).add(proof_beta_t_pk);
      const dlog = new _dlog(this.curve);
      const v_proof_b = dlog.verify(proof_b.pk, proof_b.random_commit, proof_b.response);
      const v_proof_beta_t = dlog.verify(proof_beta_t.pk, proof_beta_t.random_commit, proof_beta_t.response);
      const v_eq = g_alpha.eq(ab_plus_beta_t);

      if (v_proof_b && v_proof_beta_t && v_eq) {
        return _utils.intToHex(alpha);
      }
      return null;
    },
  }]);

  return MtA;
}());

module.exports = MtA;
