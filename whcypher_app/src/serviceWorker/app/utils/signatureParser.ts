// This helper extracted from https://github.com/indutny/elliptic/blob/master/lib/elliptic/ec/signature.js#L69

const BN = require('bn.js')

function Position() {
  this.place = 0
}

function isSurrogatePair(msg: any, i: number) {
  if ((msg.charCodeAt(i) & 0xfc00) !== 0xd800) {
    return false
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false
  }
  return (msg.charCodeAt(i + 1) & 0xfc00) === 0xdc00
}

function toArray(msg: any, enc: any) {
  if (Array.isArray(msg)) return msg.slice()
  if (!msg) return []
  const res = []
  if (typeof msg === 'string') {
    if (!enc) {
      // Inspired by stringToUtf8ByteArray() in closure-library by Google
      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
      // Apache License 2.0
      // https://github.com/google/closure-library/blob/master/LICENSE
      let p = 0
      for (let i = 0; i < msg.length; i++) {
        let c = msg.charCodeAt(i)
        if (c < 128) {
          res[p++] = c
        } else if (c < 2048) {
          res[p++] = (c >> 6) | 192
          res[p++] = (c & 63) | 128
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03ff) << 10) + (msg.charCodeAt(++i) & 0x03ff)
          res[p++] = (c >> 18) | 240
          res[p++] = ((c >> 12) & 63) | 128
          res[p++] = ((c >> 6) & 63) | 128
          res[p++] = (c & 63) | 128
        } else {
          res[p++] = (c >> 12) | 224
          res[p++] = ((c >> 6) & 63) | 128
          res[p++] = (c & 63) | 128
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/gi, '')
      if (msg.length % 2 !== 0) msg = '0' + msg
      for (let i = 0; i < msg.length; i += 2) res.push(parseInt(msg[i] + msg[i + 1], 16))
    }
  } else {
    for (let i = 0; i < msg.length; i++) res[i] = msg[i] | 0
  }
  return res
}

function getLength(buf: any, p: any) {
  const initial = buf[p.place++]
  if (!(initial & 0x80)) {
    return initial
  }
  const octetLen = initial & 0xf

  // Indefinite length or overflow
  if (octetLen === 0 || octetLen > 4) {
    return false
  }

  let val = 0
  let off = p.place
  for (let i = 0; i < octetLen; i++, off++) {
    val <<= 8
    val |= buf[off]
    val >>>= 0
  }

  // Leading zeroes
  if (val <= 0x7f) {
    return false
  }

  p.place = off
  return val
}

const parseDER = function (data: any, enc: any) {
  data = toArray(data, enc)
  const p = new Position()
  if (data[p.place++] !== 0x30) {
    return false
  }
  const len = getLength(data, p)
  if (len === false) {
    return false
  }
  if (len + p.place !== data.length) {
    return false
  }
  if (data[p.place++] !== 0x02) {
    return false
  }
  const rlen = getLength(data, p)
  if (rlen === false) {
    return false
  }
  let r = data.slice(p.place, rlen + p.place)
  p.place += rlen
  if (data[p.place++] !== 0x02) {
    return false
  }
  const slen = getLength(data, p)
  if (slen === false) {
    return false
  }
  if (data.length !== slen + p.place) {
    return false
  }
  let s = data.slice(p.place, slen + p.place)
  if (r[0] === 0) {
    if (r[1] & 0x80) {
      r = r.slice(1)
    } else {
      // Leading zeroes
      return false
    }
  }
  if (s[0] === 0) {
    if (s[1] & 0x80) {
      s = s.slice(1)
    } else {
      // Leading zeroes
      return false
    }
  }

  const signature: ISignature = {}
  signature.r = new BN(r)
  signature.s = new BN(s)
  signature.recoveryParam = null

  return signature
}

interface ISignature {
  r?: any
  s?: any
  recoveryParam?: any
}

export default parseDER
