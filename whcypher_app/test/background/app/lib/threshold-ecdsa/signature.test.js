import _chainServiceLib from '@whalesheaven/chain-service'
import * as bcu from 'bigint-crypto-utils'

import * as _paillier from '../../../../../src/serviceWorker/app/lib/threshold-ecdsa/paillier/paillier'
import Keys from '../../../../../src/serviceWorker/app/lib/threshold-ecdsa/protocol/keys'
import Signature from '../../../../../src/serviceWorker/app/lib/threshold-ecdsa/protocol/signature'

const curveModulo = 115792089237316195423570985008687907852837564279074904382605163141518161494337n

let cases = []
for (let i = 0; i < 1; i++) cases.push([3, 4])
// for (let i = 0; i < 4; i++) cases.push([2,2]);
// for (let i = 0; i < 3; i++) cases.push([2,3]);
// for (let i = 0; i < 3; i++) cases.push([3,3]);
// for (let i = 0; i < 2; i++) cases.push([2,4]);
// for (let i = 0; i < 2; i++) cases.push([3,4]);
// for (let i = 0; i < 2; i++) cases.push([4,4]);
// for (let i = 0; i < 1; i++) cases.push([2,5]);
// for (let i = 0; i < 1; i++) cases.push([3,5]);
// for (let i = 0; i < 1; i++) cases.push([4,5]);
// for (let i = 0; i < 1; i++) cases.push([5,5]);

function getRandomElements(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len)
  if (n > len) throw new RangeError('getRandom: more elements taken than available')
  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

describe.each(cases)('Test signature protocol case %p of %p', (minPartyAmount, partyCount) => {
  let keys = {}
  let partiesSet = []
  let subsets = []
  let calculatedPubKey

  for (let i = 1; i <= partyCount; i++) partiesSet.push(i)
  for (let i = 0; i < 1; i++) subsets.push(getRandomElements(partiesSet, minPartyAmount))

  beforeAll(async () => {
    let triples = {},
      privKeys = {}
    for (let i = 1; i <= partyCount; i++) {
      triples[i] = await _paillier.generateRandomTriple(2048, true)
      privKeys[i] = bcu.randBetween(curveModulo)
      keys[i] = new Keys(
        i,
        minPartyAmount,
        partyCount,
        privKeys[i],
        null,
        null,
        null,
        'secp256k1',
        triples[i].p,
        triples[i].q,
        triples[i].g,
      )
    }

    let messages1 = {}
    for (let i = 1; i <= partyCount; i++) {
      messages1[i] = keys[i].getRound1n2BroadcastMessage()
    }

    let decommits = {}
    for (let i = 1; i <= partyCount; i++) {
      for (let j = 1; j <= partyCount; j++) {
        if (i != j) {
          if (decommits[i] == undefined) decommits[i] = {}
          decommits[i][j] = messages1[j].decommitMessage
        }
      }
    }

    let messages3n4 = {}
    for (let i = 1; i <= partyCount; i++) {
      messages3n4[i] = await keys[i].getRound3n4BroadcastMessages(decommits[i])
    }

    let round3Messages = {}
    for (let i = 1; i <= partyCount; i++) {
      for (let j = 1; j <= partyCount; j++) {
        if (i != j) {
          if (round3Messages[i] == undefined) round3Messages[i] = {}
          round3Messages[i][j] = messages3n4[j].round3Messages[i]
        }
      }
    }

    let partyShares = {}
    for (let i = 1; i <= partyCount; i++) {
      partyShares[i] = await keys[i].decryptRound3Messages(decommits[i], round3Messages[i])
      partyShares[i][i] = messages3n4[i].secretShares[i]
    }

    for (let i = 1; i <= partyCount; i++) {
      keys[i].calculateXi(partyShares[i])
    }

    const yis = Object.values(messages1).map((message) => message.decommitMessage.y_i)
    const calculatedPubKeyPoint = keys[1].calculatedY(yis)
    calculatedPubKey = calculatedPubKeyPoint.encodeCompressed('hex')
  })

  test.each(subsets)('variant %p, %p, %p, %p, %p', async (...set) => {
    const messageHash = '0101010101010101010101010101010101010101010101010101010101010101'
    const partyCount = set.length

    let signatureShares = {}
    for (let i = 0; i < partyCount; i++) {
      const partyId = set[i]
      signatureShares[partyId] = new Signature(set, partyId, keys[partyId].x_i, keys[partyId].curve)
    }

    let messages1 = {},
      messagesA = {},
      messages1Decommits = {}
    for (let i = 0; i < partyCount; i++) {
      const partyId = set[i]
      messages1[partyId] = signatureShares[partyId].getRound1n4BroadcastMessage()
      messagesA[partyId] = signatureShares[partyId].getRound1MessageA(keys[partyId].ek)
      messages1Decommits[partyId] = messages1[partyId].decommit
    }

    let messagesBGamma = {},
      messagesBOmega = {},
      betasGammas = {},
      betasOmegas = {}
    for (let i = 0; i < partyCount; i++) {
      const myPartyId = set[i]
      for (let j = 0; j < partyCount; j++) {
        if (i != j) {
          const theirPartyId = set[j]
          if (messagesBGamma[theirPartyId] == undefined) messagesBGamma[theirPartyId] = {}
          if (messagesBOmega[theirPartyId] == undefined) messagesBOmega[theirPartyId] = {}
          messagesBGamma[theirPartyId][myPartyId] = signatureShares[myPartyId].getRound2GammaMessageB(
            messagesA[theirPartyId],
            keys[theirPartyId].ek,
          )
          messagesBOmega[theirPartyId][myPartyId] = signatureShares[myPartyId].getRound2OmegaMessageB(
            messagesA[theirPartyId],
            keys[theirPartyId].ek,
          )

          if (betasGammas[theirPartyId] == undefined) betasGammas[theirPartyId] = {}
          if (betasOmegas[theirPartyId] == undefined) betasOmegas[theirPartyId] = {}
          betasGammas[theirPartyId][myPartyId] = messagesBGamma[theirPartyId][myPartyId].beta
          betasOmegas[theirPartyId][myPartyId] = messagesBOmega[theirPartyId][myPartyId].beta
        }
      }
    }

    let alphaGammas = {},
      alphaOmegas = {}
    for (let i = 0; i < partyCount; i++) {
      const myPartyId = set[i]
      for (let j = 0; j < partyCount; j++) {
        if (i != j) {
          const theirPartyId = set[j]
          if (alphaGammas[myPartyId] == undefined) alphaGammas[myPartyId] = {}
          if (alphaOmegas[myPartyId] == undefined) alphaOmegas[myPartyId] = {}
          alphaGammas[myPartyId][theirPartyId] = signatureShares[myPartyId].verifyRound2AndGetAlpha(
            messagesBGamma[myPartyId][theirPartyId].messageB,
            keys[myPartyId].dk,
          )
          alphaOmegas[myPartyId][theirPartyId] = signatureShares[myPartyId].verifyRound2AndGetAlpha(
            messagesBOmega[myPartyId][theirPartyId].messageB,
            keys[myPartyId].dk,
          )
        }
      }
    }

    let deltaIs = {},
      sigmaIs = {}
    for (let i = 0; i < partyCount; i++) {
      const myPartyId = set[i]
      for (let j = 0; j < partyCount; j++) {
        if (i != j) {
          const theirPartyId = set[j]
          deltaIs[myPartyId] = signatureShares[myPartyId].round3CalculateDeltaI(
            alphaGammas[myPartyId],
            betasGammas[myPartyId],
          )
          sigmaIs[myPartyId] = signatureShares[myPartyId].round3CalculateSigmaI(
            alphaOmegas[myPartyId],
            betasOmegas[myPartyId],
          )
        }
      }
    }

    const deltaInv = signatureShares[set[0]].round3CalculateDeltaInverse(Object.values(deltaIs))
    const bigR = signatureShares[set[0]].round4CalculateR(messages1Decommits, deltaInv)
    for (let i = 1; i < partyCount; i++) {
      const partyId = set[i]
      signatureShares[partyId].round3CalculateDeltaInverse(Object.values(deltaIs))
      signatureShares[partyId].round4CalculateR(messages1Decommits, deltaInv)
    }

    const sIs = {}
    for (let i = 0; i < partyCount; i++) {
      const partyId = set[i]
      sIs[partyId] = signatureShares[partyId].round4CalculateSi(messageHash)
    }

    let messages5AB = {}
    for (let i = 0; i < partyCount; i++) {
      const partyId = set[i]
      messages5AB[partyId] = signatureShares[partyId].getRound5ABBroadcastMessage()
    }

    for (let i = 0; i < partyCount; i++) {
      const myPartyId = set[i]
      signatureShares[myPartyId].round5ABVerify(messages5AB[myPartyId])
    }

    for (let i = 0; i < partyCount; i++) {
      const partyId = set[i]
      signatureShares[partyId].round6CalculateV(messageHash, calculatedPubKey, messages5AB)
      signatureShares[partyId].round6CalculateA(messages5AB)
    }

    let messages7CD = {}
    for (let i = 0; i < partyCount; i++) {
      const partyId = set[i]
      messages7CD[partyId] = signatureShares[partyId].getRound7CDBroadcastMessage()
    }

    for (let i = 0; i < partyCount; i++) {
      const myPartyId = set[i]
      signatureShares[myPartyId].round7CDVerify(messages7CD[myPartyId])
    }

    for (let i = 0; i < partyCount; i++) {
      const myPartyId = set[i]
      signatureShares[myPartyId].round7VerifyUT(Object.values(messages7CD))
    }

    let messages9E = {}
    for (let i = 0; i < partyCount; i++) {
      const partyId = set[i]
      messages9E[partyId] = signatureShares[partyId].getRound9EBroadcastMessage()
    }

    const signatureChunks = Object.values(messages9E).map((roundMessage) => roundMessage.message)
    const signature = signatureShares[set[0]].calculateSignature(signatureChunks)

    const chainAdapter = new _chainServiceLib.Chain('Bitcoin')

    expect(chainAdapter.verifySignature(signature, calculatedPubKey)).toBeTruthy()
  })
})
