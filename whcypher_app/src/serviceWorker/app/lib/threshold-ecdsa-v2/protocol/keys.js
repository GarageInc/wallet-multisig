const bcu = require('bigint-crypto-utils')

const _ecies = require('../encryption/ecies')

const _paillier = require('../paillier/paillier')
const paillierBigint = require('paillier-bigint')

const _hashCommitment = require('../commitments/hash-commitment')

const _zkPaillier = require('../paillier/zk-paillier')

const _dlog = require('../proofs/dlog')

const _vss = require('../../threshold-ecdsa/secret-sharing/vss')

const _utils = require('../util/utils')

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

/**
 * A class to handle all threshold key generation for creating secret shares.
 * @param {integer} partyId - server assigned party id (1..n)
 * @param {BigNum} [u_i] - my secret key. If not provided, automatically generate from secure random
 * @param {BigNum} [ek] - my paillier encryption key
 * @param {BigNum} [dk] - my paillier decryption key
 * @class
 */
// We should be using BN instead of BigInt as elliptic gives wrong results for BigInt multiplication
// More details here: https://github.com/indutny/elliptic/issues/260
const Keys =
  /* #__PURE__ */
  (function () {
    function Keys(partyId, t, n) {
      const u_i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null
      const x_i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null
      const dk = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null
      const ek = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null
      const curveName = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'secp256k1'
      const p = arguments.length > 8 ? arguments[8] : undefined
      const q = arguments.length > 9 ? arguments[9] : undefined
      const g = arguments.length > 10 ? arguments[10] : undefined

      _classCallCheck(this, Keys)

      this.curve = _utils.getCurve(curveName)
      this.modulos = BigInt(this.curve.n)

      let d, u

      // Our private key share
      if (u_i) {
        u = u_i
      } else {
        do {
          u = bcu.randBetween(BigInt(this.curve.n))
        } while (u == 0n)
      }

      const y = this.curve.g.mul(_utils.bigIntToBN(u))
      let paillier

      if (dk || ek) {
        paillier = {
          publicKey: ek,
          privateKey: dk,
        }
      } else {
        paillier = _paillier.tripleToKeys(p, q, g)
      }

      if (!Number.isInteger(partyId)) {
        throw new Error('Parameter partyId needs to be of type integer')
      }

      this.u_i = u
      this.x_i = x_i
      this.y_i = y
      this.dk = paillier.privateKey
      this.ek = paillier.publicKey
      this.partyId = partyId

      this.t = t
      this.n = n
      this.parties = {}
      if (partyId) this.parties[partyId] = this.ek
    }

    /**
     * This generate the messages needed for the phase1 and phase2 of the key generation protocol
     * all necessary data is expeceted to be initialize in the constructor
     * @returns {Promise} walletKeys - contains threshold keys for the trading wallets
     */
    _createClass(Keys, [
      {
        key: 'getRound1n2BroadcastMessage',
        value: function getRound1n2BroadcastMessage() {
          const yi = this.y_i.encodeCompressed('hex')
          const commit = _hashCommitment.commitWithRandomBlind(yi)
          const correct_key_proof = _zkPaillier.zkPillierCorrectKeyProof(this.dk)

          const ek = {
            n: this.ek.n,
          }

          const commitMessage = {
            ek,
            commit: commit.digest,
            correct_key_proof,
          }

          const decommitMessage = {
            blind_factor: commit.blinding_factor,
            y_i: yi, // this is compressed hex encode string, remember to decode
          }

          return {
            commitMessage,
            decommitMessage,
          }
        },
      },
      {
        key: 'processRound1n2BroadcastMessage',
        value: function processRound1n2BroadcastMessage(partyId, message) {
          // verfiy y_i commitment
          const { commitMessage } = message
          const { decommitMessage } = message
          const ek_n = BigInt(commitMessage.ek.n)

          const ek = new paillierBigint.PublicKey(ek_n, ek_n + 1n)
          const digest = _hashCommitment.commitWithUserBlind(decommitMessage.y_i, decommitMessage.blind_factor)
          const { commit } = commitMessage

          // TODO: here you simple check that hash of used secret is matched. Both
          // commit and digiest are delivered by the same message => no way to really trust it.
          if (commit != digest) {
            throw new Error('Invalid public key commitment.')
          }

          // TODO: check that log2(ek.n) = log2(n)±1 where n is our key, and in the
          // case more than 2 parties => such conditions is hold for all of them.
          // Thus, all log2(n) should be the same (ideal), or +1 or -1, and not one
          // of them +1 and one -1.
          const lengthDiff = bcu.bitLength(ek_n) - bcu.bitLength(this.dk.n)

          // verify paillier key correctness
          const { correct_key_proof } = commitMessage
          // NOTE: this ZK simple proves hash from Pailler public key
          // such proof is delivered by the same channel than N, on the same message.
          // This design makes it useless.
          // Another implementation of Pailler ZK can be used to prove that remove side
          // knows secret key from that system. Not this one. I guess.
          const result = _zkPaillier.zkPillierCorrectKeyVerify(
            ek,
            correct_key_proof.zi,
            correct_key_proof.x,
            correct_key_proof.y,
          )

          if (!result) {
            throw new Error('Invalid paillier key correctness proof.')
          }

          // verified okay. store message content
          this.parties[partyId] = ek
          return [true, lengthDiff]
        },
      },
      {
        key: 'getRound3n4BroadcastMessages',
        value: async function getRound3n4BroadcastMessages(decommits) {
          const vss = new _vss(this.u_i, this.curve)
          const shares = vss.share(this.t, this.n)

          const round3Messages = {}
          const round4Message = { params: { t: this.t, n: this.n }, commitments: shares.commitments }

          for (let partyId = 1; partyId <= this.n; partyId++) {
            if (partyId == this.partyId) continue
            const secretShare = shares.secretShares[partyId]
            const partyPoint = this.curve.decodePoint(decommits[partyId].y_i, 'hex')
            const encPoint = partyPoint.mul(_utils.bigIntToBN(this.u_i))

            const enc_ss = await _ecies.encrypt(encPoint, _utils.intToHex(secretShare), 'hex')
            round3Messages[partyId] = enc_ss
          }

          return { round3Messages, round4Message, secretShares: shares.secretShares }
        },
      },
      {
        key: 'decryptRound3Messages',
        value: async function decryptRound3Messages(decommits, messages) {
          const decryptedMessages = {}

          for (let partyId = 1; partyId <= this.n; partyId++) {
            if (partyId == this.partyId) continue
            const partyPoint = this.curve.decodePoint(decommits[partyId].y_i, 'hex')
            const encPoint = partyPoint.mul(_utils.bigIntToBN(this.u_i))
            const dec_ss = await _ecies.decrypt(encPoint, messages[partyId], 'hex')
            decryptedMessages[partyId] = _utils.hexToInt(dec_ss)
          }

          return decryptedMessages
        },
      },
      {
        key: 'verifyRound4Messages',
        value: function verifyRound4Messages(round4Messages, partyShares, decommits) {
          let result = true

          for (let i = 1; i <= this.n; i++) {
            if (i == this.partyId) continue
            const vss = new _vss(null, this.curve)
            result =
              result &&
              round4Messages[i].commitments[0] == decommits[i].y_i &&
              vss.validateShare(partyShares[i], round4Messages[i].commitments, this.partyId)
          }

          if (!result) {
            new Error('VSS verification failed.')
          }

          return true
        },
      },
      {
        key: 'getRound5BroadcastMessage',
        value: function getRound5BroadcastMessage(x_i) {
          var x_i = x_i || this.x_i
          const dlog = new _dlog(this.curve)
          return dlog.prove(x_i)
        },
      },
      {
        key: 'processRound5BroadcastMessage',
        value: function processRound5BroadcastMessage(prove) {
          const dlog = new _dlog(this.curve)
          const result = dlog.verify(prove.pk, prove.random_commit, prove.response)

          if (!result) {
            throw new Error('DLog proof verification failed')
          }
          return true
        },
      },
      {
        key: 'calculateXi',
        value: function calculateXi(secretShares) {
          let x_i = 0n

          Object.values(secretShares).forEach((secretShare) => {
            x_i = x_i + secretShare
          })

          this.x_i = x_i % this.modulos

          return this.x_i
        },
      },
      {
        key: 'calculatedY',
        value: function calculatedY(yis) {
          let y = null
          const { curve } = this
          yis.forEach((y_i) => {
            if (y) {
              y = y.add(curve.decodePoint(y_i, 'hex'))
            } else {
              y = curve.decodePoint(y_i, 'hex')
            }
          })
          this.y = y
          return y
        },
      },
    ])

    return Keys
  })()

module.exports = Keys
