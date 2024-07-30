const _bn = require('bn.js');

const bcu = require('bigint-crypto-utils');

const _hashCommitment = require('../commitments/hash-commitment');

const _lagrange = require('../../threshold-ecdsa/secret-sharing/lagrange');

const _dlog = require('../proofs/dlog');

const _mta = require('../mpc/mta');

const _jsSha = require('js-sha256');

const _zkpV = require('../proofs/zkp-v');

const _utils = require('../util/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const Signature =
/* #__PURE__ */
(function () {
  function Signature(partyIds, partyId, x_i) {
    const curve = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'secp256k1';

    _classCallCheck(this, Signature);

    this.curve = curve;

    this.modulus = BigInt(this.curve.n);
    this.gamma_i = bcu.randBetween(this.modulus);
    this.g_gamma_i = this.curve.g.mul(new _bn(this.gamma_i));
    this.k_i = bcu.randBetween(this.modulus);

    const l = _lagrange(partyIds, this.modulus);
    const lambda_i = l.coefficientFor(partyId);
    this.omega_i = lambda_i * x_i % this.modulus;

    this.x_i = x_i;
  }

  _createClass(Signature, [{
    key: 'getRound1n4BroadcastMessage',
    value: function getRound1n4BroadcastMessage() {
      const commit = (0, _hashCommitment.commitWithRandomBlind)(this.g_gamma_i.encodeCompressed('hex'));

      const deCommitMessage = {
        blind_factor: commit.blinding_factor,
        g_gamma_i: this.g_gamma_i.encodeCompressed('hex'),
      };
      const dlog = new _dlog(this.curve);
      const prove = dlog.prove(this.gamma_i);
      return {
        commit: commit.digest,
        decommit: deCommitMessage,
        dlog_proof_gamma_i: prove,
      };
    },
  }, {
    key: 'getRound1MessageA',
    value: function getRound1MessageA(ek) {
      const mta = new _mta(this.curve);
      const msgA = mta.messageA(_utils.intToHex(this.k_i), ek);
      return msgA;
    },
  }, {
    key: 'getRound2GammaMessageB',
    value: function getRound2GammaMessageB(msgA, ek) {
      const mta = new _mta(this.curve);
      const msgB = mta.messageB(_utils.intToHex(this.gamma_i), msgA.c_a, ek);
      return msgB;
    },
  }, {
    key: 'getRound2OmegaMessageB',
    value: function getRound2OmegaMessageB(msgA, ek) {
      const mta = new _mta(this.curve);
      const msgB = mta.messageB(_utils.intToHex(this.omega_i), msgA.c_a, ek);
      return msgB;
    },
  }, {
    key: 'verifyRound2AndGetAlpha',
    value: function verifyRound2AndGetAlpha(msgB, mydk) {
      const mta = new _mta(this.curve);

      const alpha = mta.verifyAndGetAlpha(_utils.intToHex(this.k_i), msgB.c_b, msgB.proof_b, msgB.proof_beta_t, mydk);

      if (!alpha) {
        throw new Error('Invalid message B from ');
      }

      return alpha;
    },
  }, {
    key: 'round3CalculateDeltaI',
    value: function round3CalculateDeltaI(alphas_hex, betas) {
      let delta_i = this.k_i * this.gamma_i;
      Object.keys(alphas_hex).forEach((key, index) => {
        delta_i = delta_i + _utils.hexToInt(alphas_hex[key]);
      });
      Object.keys(betas).forEach((key, index) => {
        delta_i = delta_i - betas[key];
      });
      delta_i = delta_i % this.modulus;

      return _utils.intToHex(delta_i);
    },
  }, {
    key: 'round3CalculateSigmaI',
    value: function round3CalculateSigmaI(mus_hex, upsilons) {
      let sigma_i = this.k_i * this.omega_i;
      Object.keys(mus_hex).forEach((key, index) => {
        sigma_i = sigma_i + _utils.hexToInt(mus_hex[key]);
      });
      Object.keys(upsilons).forEach((key, index) => {
        sigma_i = sigma_i - upsilons[key];
      });
      sigma_i = sigma_i % this.modulus;
      this.sigma_i = sigma_i;

      return _utils.intToHex(sigma_i);
    },
  }, {
    key: 'round3CalculateDeltaInverse',
    value: function round3CalculateDeltaInverse(deltas) {
      let delta = 0n;
      Object.keys(deltas).forEach((key, index) => {
        delta = delta + _utils.hexToInt(deltas[key]);
      });

      const delta_inv = bcu.modInv(delta, this.modulus);
      return delta_inv;
    },
  }, {
    key: 'round1n4Verify',
    value: function round1n4Verify(round1Messages) {
      // verify gamma commiment
      const dlog = new _dlog(this.curve);
      Object.keys(round1Messages).forEach((key, index) => {
        const { decommit } = round1Messages[key];
        const { commit } = round1Messages[key];
        const digest = (0, _hashCommitment.commitWithUserBlind)(decommit.g_gamma_i, decommit.blind_factor);

        if (commit != digest) {
          throw new Error(`Invalid gamma_i commitment. (${key})`);
        }

        // verify dlog
        const prove = round1Messages[key].dlog_proof_gamma_i;
        const result = dlog.verify(prove.pk, prove.random_commit, prove.response);

        if (!result) {
          throw new Error(`DLog proof verification failed (${key})`);
        }
      });
    },
  }, {
    key: 'round4CalculateR',
    value: function round4CalculateR(decommits, delta_inv) {
      const { curve } = this;
      let R = null;
      Object.keys(decommits).forEach((key, index) => {
        const g_gamma_i = curve.decodePoint(decommits[key].g_gamma_i, 'hex');

        if (R) {
          R = R.add(g_gamma_i);
        } else {
          R = g_gamma_i;
        }
      });

      R = R.mul(_utils.bigIntToBN(delta_inv));
      const r = R.getX().umod(this.curve.n);

      this.R = R;
      this.r = BigInt(r);

      return R.encodeCompressed('hex');
    },
  }, {
    key: 'round4CalculateSi',
    value: function round4CalculateSi(m) {
      if (!this.r || !this.k_i || !m || !this.sigma_i) {
        // console.log('throw')
        throw new Error('Missing required variables.');
      }

      if (typeof m === 'string') m = _utils.hexToInt(m);

      if (typeof m !== 'bigint') {
        throw new Error('Message hash needs to be of type BigInt.');
      }

      m = m % this.modulus;

      const s_i = ((m * this.k_i) + (this.r * this.sigma_i));
      this.s_i = s_i % this.modulus;

      return this.s_i;
    },
  }, {
    key: 'getRound5ABBroadcastMessage',
    value: function getRound5ABBroadcastMessage() {
      if (!this.R || !this.s_i) {
        throw new Error('Missing required variables R and S_i.');
      }

      this.l_i = bcu.randBetween(this.modulus) // 256 bit
      this.rho_i = bcu.randBetween(this.modulus) // 256 bit

      const V_i = this.R.mul(_utils.bigIntToBN(this.s_i)).add(this.curve.g.mul(_utils.bigIntToBN(this.l_i)));
      const A_i = this.curve.g.mul(_utils.bigIntToBN(this.rho_i));

      const hash = _jsSha.sha256.create();

      hash.update(V_i.encodeCompressed('hex'));
      hash.update(A_i.encodeCompressed('hex'));
      const hash_Vi_Ai = hash.toString();
      const commit = (0, _hashCommitment.commitWithRandomBlind)(hash_Vi_Ai);
      const deCommitMessage = {
        blind_factor: commit.blinding_factor,
        V_i: V_i.encodeCompressed('hex'),
        A_i: A_i.encodeCompressed('hex'),
      };
      const dlog = new _dlog(this.curve);

      // dlog proof for rho_i
      const prove_rho_i = dlog.prove(this.rho_i);

      // zkp for V
      const zkvp = new _zkpV(this.curve);
      const prove_V_i = zkvp.prove(this.R, V_i, _utils.bigIntToBN(this.s_i), _utils.bigIntToBN(this.l_i));

      zkvp.verify(this.R, V_i, prove_V_i.alpha, prove_V_i.response.t, prove_V_i.response.u);

      return {
        commit: commit.digest,
        decommit: deCommitMessage,
        dlog_proof_rho_i: prove_rho_i,
        zk_proof_V_i: prove_V_i,
      };
    },
  }, {
    key: 'round5ABVerify',
    value: function round5ABVerify(message) {

      const { decommit } = message;
      const { commit } = message;
      const V_i = this.curve.decodePoint(decommit.V_i, 'hex');
      const A_i = this.curve.decodePoint(decommit.A_i, 'hex');

      const hash = _jsSha.sha256.create();

      hash.update(V_i.encodeCompressed('hex'));
      hash.update(A_i.encodeCompressed('hex'));
      const hash_Vi_Ai = hash.toString();
      const digest = (0, _hashCommitment.commitWithUserBlind)(hash_Vi_Ai, decommit.blind_factor);

      if (commit != digest) {
        throw new Error('Invalid V_i, A_i commitment. ( ' + ' )');
      }

      // verify rho_i dlog
      const dlog = new _dlog(this.curve);
      const prove = message.dlog_proof_rho_i;
      const result = dlog.verify(prove.pk, prove.random_commit, prove.response);

      if (!result) {
        throw new Error('rho_i DLog proof verification failed (' + ')');
      }

      // verify zkp for V
      const zkvp = new _zkpV(this.curve);
      const prove1 = message.zk_proof_V_i;
      const result1 = zkvp.verify(this.R, V_i, prove1.alpha, prove1.response.t, prove1.response.u);

      if (!result1) {
        throw new Error('zero knowledge proof for V_i verification failed');
      }
    },
  }, {
    key: 'round6CalculateV',
    value: function round6CalculateV(m, yencoded, messages) {
      const y = this.curve.decodePoint(yencoded, 'hex');

      if (!this.r) {
        throw new Error('Missing required variables r. Please run calculateR first.');
      }

      const g_m = this.curve.g.mul(new _bn(m, 16).mod(this.curve.n));
      const y_r = y.mul(_utils.bigIntToBN(this.r));
      const { curve } = this;
      let V = null;
      Object.keys(messages).forEach((key, index) => {
        const V_i = curve.decodePoint(messages[key].decommit.V_i, 'hex');

        if (V) {
          V = V.add(V_i);
        } else {
          V = V_i;
        }
      });
      V = V.add(g_m.neg()).add(y_r.neg());

      this.V = V;
      return V.encodeCompressed('hex');
    },
  }, {
    key: 'round6CalculateA',
    value: function round6CalculateA(messages) {
      let A = null;
      const { curve } = this;
      Object.keys(messages).forEach((key, index) => {
        const A_i = curve.decodePoint(messages[key].decommit.A_i, 'hex');

        if (A) {
          A = A.add(A_i);
        } else {
          A = A_i;
        }
      });
      this.A = A;
      return A.encodeCompressed('hex');
    },
  }, {
    key: 'getRound7CDBroadcastMessage',
    value: function getRound7CDBroadcastMessage() {
      if (!this.V || !this.A) {
        throw new Error('Missing required variables V or A');
      }
      // compute U_i

      const U_i = this.V.mul(_utils.bigIntToBN(this.rho_i));
      const T_i = this.A.mul(_utils.bigIntToBN(this.l_i));

      // commit U_i, T_i
      const hash = _jsSha.sha256.create();
      hash.update(U_i.encodeCompressed('hex'));
      hash.update(T_i.encodeCompressed('hex'));
      const hash_Ui_Ti = hash.toString();

      const commit = (0, _hashCommitment.commitWithRandomBlind)(hash_Ui_Ti);

      const deCommitMessage = {
        blind_factor: commit.blinding_factor,
        U_i: U_i.encodeCompressed('hex'),
        T_i: T_i.encodeCompressed('hex'),
      };

      return {
        commit: commit.digest,
        decommit: deCommitMessage,
      };
    },
  }, {
    key: 'round7CDVerify',
    value: function round7CDVerify(message) {
      // decommit
      const { decommit } = message;
      const { commit } = message;
      const { U_i } = decommit;
      const { T_i } = decommit;

      const hash = _jsSha.sha256.create();
      hash.update(U_i);
      hash.update(T_i);
      const hash_Ui_Ti = hash.toString();
      const digest = (0, _hashCommitment.commitWithUserBlind)(hash_Ui_Ti, decommit.blind_factor);

      if (commit != digest) {
        throw new Error('Invalid U_i, T_i commitment.');
      }
    },
  }, {
    key: 'round7VerifyUT',
    value: function round7VerifyUT(messages) {
      let U = null;
      let T = null;
      const { curve } = this;
      Object.keys(messages).forEach((key, index) => {
        const U_i = curve.decodePoint(messages[key].decommit.U_i, 'hex');
        const T_i = curve.decodePoint(messages[key].decommit.T_i, 'hex');

        if (U) {
          U = U.add(U_i);
        } else {
          U = U_i;
        }

        if (T) {
          T = T.add(T_i);
        } else {
          T = T_i;
        }
      });

      if (!U.eq(T)) {
        throw new Error('U not equal to T');
      }
    },
  }, {
    key: 'getRound9EBroadcastMessage',
    value: function getRound9EBroadcastMessage() {
      if (!this.s_i) {
        throw new Error('Missing required variables s_i');
      }

      return _utils.intToHex(this.s_i);
    },
  }, {
    key: 'calculateSignature',
    value: function calculateSignature(messages) {
      const R = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.R = R ? this.curve.decodePoint(R, 'hex') : this.R;

      let s = new _bn(0);
      Object.keys(messages) // send message B
        .forEach((key, index) => {
          s = s.add(new _bn(messages[key], 16));
        });
      s = s.umod(this.curve.n);
      this.S = s;
      const r = this.R.getX().umod(this.curve.n);
      let recoveryParam = (this.R.getY().isOdd() ? 1 : 0) | (this.R.getX().cmp(r) !== 0 ? 2 : 0);
      const nh = this.curve.n.ushrn(1);

      if (s.cmp(nh) > 0) {
        s = this.curve.n.sub(s);
        recoveryParam ^= 1;
      }

      const sign = {
        r: _utils.intToHex(r),
        s: _utils.intToHex(s),
        recoveryParam,
        v: recoveryParam + 27,
      };

      return sign;
    },
  }]);

  return Signature;
}());

module.exports = Signature;
