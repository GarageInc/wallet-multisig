import assert from 'assert';
import _bn from 'bn.js';

/**
 * Get value * Pow(10, decimal) value
 * @param {number} value - the value
 * @param {number} decimal - the decimal value
 */

export const getIntegralValue = (value: number | string, decimal: number) => {
  // console.log(value);
  if (value == 0 || value == null) return 0;
  value = value.toString().indexOf('.') < 0 ? `${value}.0` : value;

  const _values = value.toString().split('.'); // console.log(_values)

  assert(_values.length == 2);
  if (_values[0] != '0') {
    const result = `${_values[0]}${decimal == 0 ? '' : _values[1].padEnd(decimal, '0')}`;
    return Number(result);
  }
  return Number(decimal == 0 ? '' : _values[1].padEnd(decimal, '0'));
};

export const getIntegralValueBN = (value: number | string, decimal: number) => {
  if (value == 0 || value == null) return new _bn(0);
  value = value.toString().indexOf('.') < 0 ? `${value}.0` : value;

  const _values = value.toString().split('.'); // console.log(_values)

  assert(_values.length == 2);
  if (_values[0] != '0')
    return new _bn(`${_values[0]}${decimal == 0 ? '' : _values[1].padEnd(decimal, '0')}`);
  return new _bn(decimal == 0 ? '' : _values[1].padEnd(decimal, '0'));
};

/**
 * Get value / Pow(10, decimal) value
 * @param {number} value - the value
 * @param {number} decimal - the decimal value
 */
export const getDecimalValue = (value: number | string, decimal: number) => {
  if (value.toString() === '0' || value == null) return 0;
  let integral;
  let decimal_p;

  if (value.toString().length > decimal) {
    integral = value.toString().substring(0, value.toString().length - decimal);
    decimal_p =
      decimal === 0
        ? 0
        : value
            .toString()
            .substring(integral.toString().length, integral.toString().length + decimal);
  } else {
    integral = 0;
    decimal_p = value.toString().padStart(decimal, '0');
  }
  //console.log(value, decimal, integral, decimal_p, Number(integral + '.' +  decimal_p))

  return Number(`${integral}.${decimal_p}`);
};

export function CountDecimalDigits(number: number) {
  const char_array = number.toString().split(''); // split every single char

  const not_decimal = char_array.lastIndexOf('.'); //   console.log({not_decimal, number})

  return not_decimal < 0 ? 0 : char_array.length - not_decimal;
}

export function bufferToInt(uint8Arr: any[]) {
  const length = uint8Arr.length;

  if (length > 0) {
    const buffer = Buffer.from(uint8Arr);
    const result = buffer.readUIntBE(0, length);

    return result;
  } else {
    return 0;
  }
}

export function intToHex(bigint) {
  var base = 16;
  var hex = bigint.toString(base).padStart(64, '0');
  return hex;
}

export function hexToInt(hex) {
  var neg = hex.search('-') > -1;
  var num = BigInt('0x' + hex.replace('-', ''));
  return num * (neg ? -1n : 1n);
};

export function hexToUtf8(hexString) {
  const stringBuf = Buffer.from(hexString, "hex");
  return stringBuf.toString("utf8");
}

export function utf8ToHex(str) {
  return Array.from(str).map(c => 
    c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : 
    encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
  ).join('');
}

export default {
  getIntegralValue,
  getIntegralValueBN,
  getDecimalValue,
  CountDecimalDigits,
  bufferToInt,
  intToHex,
  hexToInt,
  hexToUtf8,
  utf8ToHex,
};
