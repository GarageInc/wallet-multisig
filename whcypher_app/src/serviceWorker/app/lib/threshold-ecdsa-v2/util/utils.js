
const _bn = require('bn.js');

const _elliptic = require('elliptic');

const EC = _elliptic.ec;

const getCurve = function getCurve(curve) {
  switch (curve) {
    case 'secp256k1':
      var _curve = _elliptic.curves.secp256k1.curve;
      return _curve;
      break;

    case 'p256':
      //    return new EC('p256').curve;
      return _elliptic.curves.p256.curve;
      break;

    default:
      throw new Error(`Curve is not supported (${curve})`);
  }
};

const intToHex = function intToHex(bigint) {
  var base = 16;
  var hex = bigint.toString(base).padStart(64, '0');
  return hex;
}

const hexToInt = function hexToInt(hex) {
  var neg = hex.search('-') > -1;
  var num = BigInt('0x'+hex.replace('-', ''));
  return num * (neg ? -1n : 1n);
}

const bigIntToBN = function bigIntToBN(bigint) {
  return new _bn( bigint.toString(16), 16 );
}

const stripHexNotation = function stripHexNotation(hex) {
  return hex.replace('0x', '')
}

const pointToCoords = function pointToCoords(point) {
  return point.encodeCompressed('hex');
}

const coordsToPoint = function coordsToPoint(curve, coords) {
  return curve.decodePoint(coords, "hex");
}

module.exports = {
  getCurve,
  intToHex,
  hexToInt,
  bigIntToBN,
  stripHexNotation,
  pointToCoords,
  coordsToPoint,
};
