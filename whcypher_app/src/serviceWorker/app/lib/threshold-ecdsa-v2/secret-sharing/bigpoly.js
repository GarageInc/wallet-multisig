const bcu = require('bigint-crypto-utils');

/**
 * creator for creating a BigPoly based on random coefficients and a
 * given first term.
 * @param firstTerm the first term to be used
 * @param degree the degree of the poly to be created
 * @param _modulos the modulo of the field to be used in BigInteger calculations
 * @param _coefficient the random coefficients
 */
module.exports = function (
  firstTerm, // BigInt
  degree, // integer
  _modulos, // BigInt
  _coefficients, // array of BigInt
) {
  // Somehow we get modulus calculation bug when calculating Xi, Sum of Xi is different that sum of Ui
  // this is the way we can fix this bug, until we find what cause it
  const modulos = _modulos;
  const coefficients = new Array(degree + 1); // First term is first coeff

  // Throw if first term is absent or 0
  coefficients[0] = firstTerm % modulos;

  for (let idx = 1; idx <= degree; idx++) {
    let rndCoef = _coefficients && _coefficients[idx] ? _coefficients[idx] : bcu.randBetween(modulos);
    coefficients[idx] = rndCoef % modulos;

    // The last coefficient should not be zero, to ensure that the degree is correct
    if (idx == degree) {
      while (coefficients[idx] == 0n) {
        coefficients[idx] = bcu.randBetween(modulos);
      }
    }
  }

  const f = {
    /**
       * returns the Y coord which is the result of assigning XCoord into
       * the poly
       * @param XCoord the value of X to be assigned into the poly
       * @return the Y value which is the result of assigning X into the
       * poly
       */
    getYCoord: function getYCoord(xCoord) {
      if (!coefficients.length) return null;
      let result = 0n;

      for (let idx = 0; idx < coefficients.length; idx++) {
        // result = result.add(coefficients[idx].mul(XCoord.pow(new _bn.default(idx, 10)).umod(modulos))).umod(modulos);
        result = (result + (coefficients[idx] * ((BigInt(xCoord) ** BigInt(idx)) % modulos))) % modulos;
      }

      return result;
    },

    /**
     * returns the idx's coefficient of the poly
     * @param idx the index of the required coefficient
     * @return the value of the coefficient which index is idx
     */
    getCoeff: function getCoeff(idx) {
      return coefficients[idx];
    },
  };
  return f;
};
