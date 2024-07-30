const bcu = require('bigint-crypto-utils');

module.exports = function (_xPoints, _fieldModulo) {
  const points = _xPoints;
  const fieldModulo = _fieldModulo;

  const f = {
    coefficientFor: function coefficientFor(_j) {
      const j = BigInt(_j);

      let nom = 1n, denom = 1n;
      for (let i = 0; i < points.length; i++) {
        if ( j != points[i] ) {
          nom = nom * BigInt(points[i]);
          denom = denom * (BigInt(points[i]) - j);
        }
      }

      return nom * bcu.modInv(denom, fieldModulo) % fieldModulo;
    },
  };
  return f;
};
