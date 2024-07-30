const _bigpoly = require('./bigpoly');

const _bn = require('bn.js');

const _utils = require('../util/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// We should be using BN instead of BigInt as elliptic gives wrong results for BigInt multiplication
// More details here: https://github.com/indutny/elliptic/issues/260
const VerifiableSS =
/* #__PURE__ */
(function () {
  function VerifiableSS(secret, curve) {
    _classCallCheck(this, VerifiableSS);

    this.modulus = BigInt(curve.n); // elliptic.curves['secp256k1'].curve.n;
    this.secret = secret;
    this.curve = curve;
    this.coefficients = [];
  }

  _createClass(VerifiableSS, [{
    key: 'share',
    value: function share(t, n) {
      // Here should be t-1, since we need minimum 2 points to define a line (polynom degree of 1),
      // 3 points to define parabola (polynom degree of 2) and so on. Here we generate polynom coeffs
      const bigpoly = _bigpoly(this.secret, t-1, this.modulus, this.coefficients);
      let i;
      const secretShares = {};
      const commitments = [];

      for (i = 1; i <= n; i++) {
        const secretShare = bigpoly.getYCoord(i);
        secretShares[i] = secretShare; // BigInt
      }

      for (i = 0; i < t; i++) {
        const coeff = bigpoly.getCoeff(i);
        const commitment = this.curve.g.mul(_utils.bigIntToBN(coeff));
        commitments.push(_utils.pointToCoords(commitment));
      }

      return {
        secretShares,
        commitments,
      };
    },
  }, {
    key: 'validateShare',
    value: function validateShare(secretShare, commitments, index) {
      const ssg = this.curve.g.mul(new _bn(secretShare));
      let ssg_v = _utils.coordsToPoint(this.curve, commitments[0]);

      for (let i = 1; i < commitments.length; i++) {
        const index_pow = BigInt(index) ** BigInt(i);
        const commit_pt = _utils.coordsToPoint(this.curve, commitments[i]);
        ssg_v = ssg_v.add(commit_pt.mul(new _bn(index_pow)));
      }

      return ssg.eq(ssg_v);
    },
  }]);

  return VerifiableSS;
}());

module.exports = VerifiableSS;
