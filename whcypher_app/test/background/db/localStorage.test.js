import * as bcu from 'bigint-crypto-utils';
import Keys from '../../../src/serviceWorker/app/lib/threshold-ecdsa/protocol/keys';
import * as _paillier from '../../../src/serviceWorker/app/lib/threshold-ecdsa/paillier/paillier';

const curveModulo = 115792089237316195423570985008687907852837564279074904382605163141518161494337n;

let cases = [];
for (let i = 0; i < 1; i++) cases.push([2,3]);

describe("Test local storage", () => {

  let keys = {};
  const spies = {};

  beforeEach(async () => {
    ['setItem', 'getItem', 'clear'].forEach((fn) => {
      const mock = jest.fn(localStorage[fn])
      spies[fn] = jest.spyOn(Storage.prototype, fn).mockImplementation(mock)
    })

    const minPartyAmount = 2;
    const partyCount = 2;

    let triples = {}, privKeys = {};
    for (let i = 1; i <= partyCount; i++) {
      triples[i] = await _paillier.generateRandomTriple(2048, true);
      privKeys[i] = bcu.randBetween(curveModulo);
      keys[i] = new Keys(i, minPartyAmount, partyCount, privKeys[i], null, null, null, 'secp256k1', triples[i].p, triples[i].q, triples[i].g);
    }

    let messages1 = {};
    for (let i = 1; i <= partyCount; i++) {
      messages1[i] = keys[i].getRound1n2BroadcastMessage();
    }

    let decommits = {};
    for (let i = 1; i <= partyCount; i++) {
      for (let j = 1; j <= partyCount; j++) {
        if ( i != j ) {
          if (decommits[i] == undefined) decommits[i] = {};
          decommits[i][j] = messages1[j].decommitMessage;
        }
      }
    }

    let messages3n4 = {};
    for (let i = 1; i <= partyCount; i++) {
      messages3n4[i] = await keys[i].getRound3n4BroadcastMessages(decommits[i]);
    }

    let round3Messages = {};
    for (let i = 1; i <= partyCount; i++) {
      for (let j = 1; j <= partyCount; j++) {
        if ( i != j ) {
          if (round3Messages[i] == undefined) round3Messages[i] = {};
          round3Messages[i][j] = messages3n4[j].round3Messages[i];
        }
      }
    }

    let partyShares = {};
    for (let i = 1; i <= partyCount; i++) {
      partyShares[i] = await keys[i].decryptRound3Messages(decommits[i], round3Messages[i]);
      partyShares[i][i] = messages3n4[i].secretShares[i];
    }

    for (let i = 1; i <= partyCount; i++) {
      keys[i].calculateXi(partyShares[i]);
    }
  })

  afterEach(() => {
    Object.keys(spies).forEach((key) => spies[key].mockRestore())
  })

  test('', async () => {
    // const vault = new Vault(localStorage);
    // await vault.appendSeed('inmate spot middle odor obvious wash govern shop useless hammer update equip', 'test123')
    // await vault.appendTsVault(keys[1]);
    //
    // expect(spies.setItem).toHaveBeenCalledTimes(1)
  });

});
