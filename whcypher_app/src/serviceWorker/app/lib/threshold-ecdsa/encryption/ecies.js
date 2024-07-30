const _eccrypto = require('eccrypto');
const _utils = require('../util/utils');

exports.decrypt = async (point, encrypted_buf, encoding = 'hex') => {

  const encrypted_cnv = {
    iv: Buffer.from(encrypted_buf.iv, 'hex'),
    ephemPublicKey: Buffer.from(encrypted_buf.ephemPublicKey, 'hex'),
    ciphertext: Buffer.from(encrypted_buf.ciphertext, 'hex'),
    mac: Buffer.from(encrypted_buf.mac, 'hex'),
  };

  const plaintext = await _eccrypto.decrypt(Buffer.from(_utils.intToHex(point.x), 'hex'), encrypted_cnv);
  if (encoding == 'utf8') return plaintext.toString(); return plaintext.toString(encoding);
};

exports.encrypt = async (point, plaintext, encoding = 'hex') => {
  const pubkey = _eccrypto.getPublic(point.x.toArrayLike(Buffer, 'be', 32));

  const buf = encoding == 'utf8' ? Buffer.from(plaintext) : Buffer.from(plaintext, encoding);
  const encrypted = await _eccrypto.encrypt(pubkey, buf);
  const encrypted_buf = {
    iv: encrypted.iv.toString('hex'),
    ephemPublicKey: encrypted.ephemPublicKey.toString('hex'),
    ciphertext: encrypted.ciphertext.toString('hex'),
    mac: encrypted.mac.toString('hex'),
  };

  return encrypted_buf;
};
