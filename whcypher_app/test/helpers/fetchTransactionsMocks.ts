import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import fetchMock from 'node-fetch'

export const transactionsSearchUrl = 'https://signer.whalesheaven.com/v1/signatures/search'
export const transactionPostUrl = 'https://signer.whalesheaven.com/v1/signatures'
export const transaction1Url = 'https://signer.whalesheaven.com/v1/signatures/63622310a1a0b155908d5f75/'
export const transaction2Url = 'https://signer.whalesheaven.com/v1/signatures/63639fc1a1a0b155908d5fc3/'

export const transaction3RejectUrl = 'https://signer.whalesheaven.com/v1/signatures/63626566a1a0b155908d5f77/reject'

export const walletBalanceRequestUrl =
  'https://api-goerli.etherscan.io//api?module=logs&action=getLogs&fromBlock=5837926&toBlock=latest&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&topic2=0x000000000000000000000000e835ac9f13c3f4899e7cea0dc4aad363ab01284f&apikey=AQ9I9MK3VM3FKBJMAYEKXI6RQSZCJQBENG'

// Valid for seed "east decorate sunset hood armor plastic dune tiny duty ice season brick never frozen view"
// DATA
export const transactionSearchPayload = () => {
  return {
    vaults: [
      ['Bitcoin', '17625PGZCazfRdZhmX6rQ4Ld8hbwenrkXW'],
      ['Bitcoin', '141coQ2EBguK8QPeEaG7BqMRqrtT7n16Sd'],
      ['Bitcoin', '1HL7JxRzx8eqcnR3RvwsWJYnwe6cDSP7Qr'],
      ['EthereumGoerli', '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f'],
    ],
  }
}

export const transaction1WalletRequestPayload = () => {
  return {
    amount: 0.001,
    blockchain: 'EthereumGoerli',
    destination: '0x0123456789012345678901234567890123456789',
    destinationSignature: '',
    destinationSignatureValid: false,
    destinationSignedByPubKey: '',
    expiresAt: 1667509249701,
    from: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
    initiatorAccountPubKey: '023a045125d49297ccc30aef1892469f43c63e7c50b5b15ad3a8c013d50faacb85',
    initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
    joinedParties: ['02dc764ab03eb34b72d1f1fe8a89b446e1bfa82bf8f04b06d60e8f6dbc0d1f6261'],
    minimumSigAmount: 2,
    networkFee: 0.000048522918696,
    networkFeeTicker: 'ETH:GOERLI',
    processStep: 0,
    processSteps: 9,
    requestName: 'GROUP_TRANSACTION_SESSION',
    requestPath: '/home/requests',
    sessionId: '63622310a1a0b155908d5f75',
    startAutoApproving: false,
    state: 'REQUEST',
    status: 'pending',
    ticker: 'ETH:GOERLI',
    transactionId: null,
    walletId: '292bc98763c159570a87900ef423cc6b20ef004db1c723051228f7b8481468ca',
  }
}

export const transaction2PostPayload = () => {
  return {
    blockchain: 'EthereumGoerli',
    assetId: 'ETH',
    assetType: CHAIN_ADAPTERS.COIN,
    addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
    destination: '0x0123456789012345678901234567890123456789',
    partiesAmount: 2,
    partyId: 2,
    transactionHex: 'eb808506ee592b3182520894012345678901234567890123456789012345678987214e626d21f47880808080',
    protocolVersion: 'secp256k1-v1',
  }
}

export const searchResponseEmpty = () => {
  return {
    body: {
      requests: [],
    },
    status: 200,
  }
}

export const searchWithRequestsFromUsResponse = () => {
  return {
    body: {
      requests: [
        {
          status: 'pending',
          _id: '63622310a1a0b155908d5f75',
          blockchain: 'EthereumGoerli',
          assetId: 'ETH:GOERLI',
          assetType: CHAIN_ADAPTERS.COIN,
          addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
          destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
          partiesAmount: 2,
          transactionHex: 'eb80850aa866d66682520894e3682e8c7b39a9b836fc66415b426d94d7e5766587201cac3bdda0d080808080',
          protocolVersion: 'secp256k1-v1',
          initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
          partiesState: [
            {
              status: 'pending',
              accountPubKey: '023a045125d49297ccc30aef1892469f43c63e7c50b5b15ad3a8c013d50faacb85',
              partyPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
              partyPubKeySignature:
                '304602210090ecd7c270bd17cd5009678a29a0cfeccec1c44a85a978d2a785955de7c765bf022100c0313cc1f48e7df1d10bf952fb468339a06a646054222d4e8a1733b88b6e57ab',
              sequence: 2,
            },
          ],
          state: [],
          initiatedAt: '2022-11-02T07:58:08.622Z',
        },
      ],
    },
    status: 200,
  }
}

export const searchWithRequestsFromUsCreatorNotJoinedResponse = () => {
  return {
    body: {
      requests: [
        {
          status: 'pending',
          _id: '63622310a1a0b155908d5f75',
          blockchain: 'EthereumGoerli',
          assetId: 'ETH:GOERLI',
          assetType: CHAIN_ADAPTERS.COIN,
          addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
          destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
          partiesAmount: 2,
          transactionHex: 'eb80850aa866d66682520894e3682e8c7b39a9b836fc66415b426d94d7e5766587201cac3bdda0d080808080',
          protocolVersion: 'secp256k1-v1',
          initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
          partiesState: [],
          state: [],
          initiatedAt: '2022-11-02T07:58:08.622Z',
        },
      ],
    },
    status: 200,
  }
}

export const transaction1FromUsResponse = () => {
  return {
    body: {
      status: 'pending',
      _id: '63622310a1a0b155908d5f75',
      blockchain: 'EthereumGoerli',
      assetId: 'ETH:GOERLI',
      assetType: CHAIN_ADAPTERS.COIN,
      addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
      destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
      partiesAmount: 2,
      transactionHex: 'eb80850aa866d66682520894e3682e8c7b39a9b836fc66415b426d94d7e5766587201cac3bdda0d080808080',
      protocolVersion: 'secp256k1-v1',
      initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
      partiesState: [
        {
          status: 'pending',
          accountPubKey: '023a045125d49297ccc30aef1892469f43c63e7c50b5b15ad3a8c013d50faacb85',
          partyPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
          partyPubKeySignature:
            '304602210090ecd7c270bd17cd5009678a29a0cfeccec1c44a85a978d2a785955de7c765bf022100c0313cc1f48e7df1d10bf952fb468339a06a646054222d4e8a1733b88b6e57ab',
          sequence: 2,
        },
      ],
      state: [],
      initiatedAt: '2022-11-02T07:58:08.622Z',
    },
    status: 200,
  }
}

export const transaction1FromUsCreatorNotJoinedResponse = () => {
  return {
    body: {
      status: 'pending',
      _id: '63622310a1a0b155908d5f75',
      blockchain: 'EthereumGoerli',
      assetId: 'ETH:GOERLI',
      assetType: CHAIN_ADAPTERS.COIN,
      addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
      destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
      partiesAmount: 2,
      transactionHex: 'eb80850aa866d66682520894e3682e8c7b39a9b836fc66415b426d94d7e5766587201cac3bdda0d080808080',
      protocolVersion: 'secp256k1-v1',
      initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
      partiesState: [],
      state: [],
      initiatedAt: '2022-11-02T07:58:08.622Z',
    },
    status: 200,
  }
}

export const searchWithRequestsFromThemResponse = () => {
  return {
    body: {
      requests: [
        {
          status: 'pending',
          _id: '63626566a1a0b155908d5f77',
          blockchain: 'EthereumGoerli',
          assetId: 'ETH:GOERLI',
          assetType: CHAIN_ADAPTERS.COIN,
          addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
          destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
          partiesAmount: 2,
          transactionHex: 'eb808507514aaa7782520894e3682e8c7b39a9b836fc66415b426d94d7e5766587212eadfad18e4880808080',
          protocolVersion: 'secp256k1-v1',
          initiatorPubKey: '02697825b023717813d16c30d95f70c1a27fd1473646350794c3ddddc5c3d237b7',
          partiesState: [
            {
              status: 'pending',
              accountPubKey: '02dc764ab03eb34b72d1f1fe8a89b446e1bfa82bf8f04b06d60e8f6dbc0d1f6261',
              partyPubKey: '02697825b023717813d16c30d95f70c1a27fd1473646350794c3ddddc5c3d237b7',
              partyPubKeySignature:
                '3046022100d4a71d803eee1b9b87c02d19c7fceaaf08d26f28930b53e90c830da9780082bb022100d2481e9a4df8cd82a79ecc411e7331af05f70d644219d26ae1b9e44222c9c51e',
              sequence: 1,
            },
          ],
          state: [],
          initiatedAt: '2022-11-02T12:41:10.652Z',
        },
      ],
    },
    status: 200,
  }
}

export const searchWithRequestsFromThemAdvancedVersionResponse = () => {
  return {
    body: {
      requests: [
        {
          status: 'pending',
          _id: '63626566a1a0b155908d5f77',
          blockchain: 'EthereumGoerli',
          assetId: 'ETH:GOERLI',
          assetType: CHAIN_ADAPTERS.COIN,
          addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
          destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
          partiesAmount: 2,
          transactionHex: 'eb808507514aaa7782520894e3682e8c7b39a9b836fc66415b426d94d7e5766587212eadfad18e4880808080',
          protocolVersion: '2',
          initiatorPubKey: '02697825b023717813d16c30d95f70c1a27fd1473646350794c3ddddc5c3d237b7',
          partiesState: [
            {
              status: 'pending',
              accountPubKey: '02dc764ab03eb34b72d1f1fe8a89b446e1bfa82bf8f04b06d60e8f6dbc0d1f6261',
              partyPubKey: '02697825b023717813d16c30d95f70c1a27fd1473646350794c3ddddc5c3d237b7',
              partyPubKeySignature:
                '3046022100d4a71d803eee1b9b87c02d19c7fceaaf08d26f28930b53e90c830da9780082bb022100d2481e9a4df8cd82a79ecc411e7331af05f70d644219d26ae1b9e44222c9c51e',
              sequence: 1,
            },
          ],
          state: [],
          initiatedAt: '2022-11-02T12:41:10.652Z',
        },
      ],
    },
    status: 200,
  }
}

export const searchWithRequestsFromThemCreatorNotJoinedResponse = () => {
  return {
    body: {
      requests: [
        {
          status: 'pending',
          _id: '63626566a1a0b155908d5f77',
          blockchain: 'EthereumGoerli',
          assetId: 'ETH:GOERLI',
          assetType: CHAIN_ADAPTERS.COIN,
          addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
          destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
          partiesAmount: 2,
          transactionHex: 'eb808507514aaa7782520894e3682e8c7b39a9b836fc66415b426d94d7e5766587212eadfad18e4880808080',
          protocolVersion: 'secp256k1-v1',
          initiatorPubKey: '02697825b023717813d16c30d95f70c1a27fd1473646350794c3ddddc5c3d237b7',
          partiesState: [],
          state: [],
          initiatedAt: '2022-11-02T12:41:10.652Z',
        },
      ],
    },
    status: 200,
  }
}

export const transaction1FromThemResponse = () => {
  return {
    body: {
      status: 'pending',
      _id: '63622310a1a0b155908d5f75',
      blockchain: 'EthereumGoerli',
      assetId: 'ETH:GOERLI',
      assetType: CHAIN_ADAPTERS.COIN,
      addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
      destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
      partiesAmount: 2,
      transactionHex: 'eb80850aa866d66682520894e3682e8c7b39a9b836fc66415b426d94d7e5766587201cac3bdda0d080808080',
      protocolVersion: 'secp256k1-v1',
      initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
      partiesState: [
        {
          status: 'pending',
          accountPubKey: '023a045125d49297ccc30aef1892469f43c63e7c50b5b15ad3a8c013d50faacb85',
          partyPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
          partyPubKeySignature:
            '304602210090ecd7c270bd17cd5009678a29a0cfeccec1c44a85a978d2a785955de7c765bf022100c0313cc1f48e7df1d10bf952fb468339a06a646054222d4e8a1733b88b6e57ab',
          sequence: 2,
        },
      ],
      state: [],
      initiatedAt: '2022-11-02T07:58:08.622Z',
    },
    status: 200,
  }
}

export const transaction1FromThemAdvancedVersionResponse = () => {
  return {
    body: {
      status: 'pending',
      _id: '63622310a1a0b155908d5f75',
      blockchain: 'EthereumGoerli',
      assetId: 'ETH:GOERLI',
      assetType: CHAIN_ADAPTERS.COIN,
      addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
      destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
      partiesAmount: 2,
      transactionHex: 'eb80850aa866d66682520894e3682e8c7b39a9b836fc66415b426d94d7e5766587201cac3bdda0d080808080',
      protocolVersion: '2',
      initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
      partiesState: [
        {
          status: 'pending',
          accountPubKey: '023a045125d49297ccc30aef1892469f43c63e7c50b5b15ad3a8c013d50faacb85',
          partyPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
          partyPubKeySignature:
            '304602210090ecd7c270bd17cd5009678a29a0cfeccec1c44a85a978d2a785955de7c765bf022100c0313cc1f48e7df1d10bf952fb468339a06a646054222d4e8a1733b88b6e57ab',
          sequence: 2,
        },
      ],
      state: [],
      initiatedAt: '2022-11-02T07:58:08.622Z',
    },
    status: 200,
  }
}

export const transaction1FromThemCreatorNotJoinedResponse = () => {
  return {
    body: {
      status: 'pending',
      _id: '63622310a1a0b155908d5f75',
      blockchain: 'EthereumGoerli',
      assetId: 'ETH:GOERLI',
      assetType: CHAIN_ADAPTERS.COIN,
      addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
      destination: '0xe3682e8c7B39A9b836fc66415B426D94d7E57665',
      partiesAmount: 2,
      transactionHex: 'eb80850aa866d66682520894e3682e8c7b39a9b836fc66415b426d94d7e5766587201cac3bdda0d080808080',
      protocolVersion: 'secp256k1-v1',
      initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
      partiesState: [],
      state: [],
      initiatedAt: '2022-11-02T07:58:08.622Z',
    },
    status: 200,
  }
}

export const walletBalanceRequestResponse = () => {
  return {
    body: { status: '0', message: 'No records found', result: [] },
    status: 200,
  }
}

export const transaction2PostResponse = () => {
  return {
    body: { sessionId: '63639fc1a1a0b155908d5fc3' },
    status: 200,
  }
}

export const searchWithRequestPostedByUsResponse = () => {
  return {
    body: {
      requests: [
        {
          status: 'pending',
          _id: '63639fc1a1a0b155908d5fc3',
          blockchain: 'EthereumGoerli',
          assetId: 'ETH:GOERLI',
          assetType: CHAIN_ADAPTERS.COIN,
          addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
          destination: '0x0123456789012345678901234567890123456789',
          partiesAmount: 2,
          transactionHex: 'eb80850a196168a982520894012345678901234567890123456789012345678987204a80712f98b880808080',
          protocolVersion: 'secp256k1-v1',
          initiatorPubKey: '02697825b023717813d16c30d95f70c1a27fd1473646350794c3ddddc5c3d237b7',
          partiesState: [
            {
              status: 'pending',
              accountPubKey: '02dc764ab03eb34b72d1f1fe8a89b446e1bfa82bf8f04b06d60e8f6dbc0d1f6261',
              partyPubKey: '02697825b023717813d16c30d95f70c1a27fd1473646350794c3ddddc5c3d237b7',
              partyPubKeySignature:
                '3046022100814ee190c42b1a784232701d282430b22a875903ca65ae9e87ab9d3b1391c78b022100ccb813c8157de06aa4a397a1cb2125602167b0b03a171b62c7f590ec35f72fee',
              sequence: 1,
            },
          ],
          state: [],
          initiatedAt: '2022-11-03T11:02:25.997Z',
        }, //,
        // {
        //     "status":"pending",
        //     "_id":"6363a033a1a0b155908d5fc5",
        //     "blockchain":"EthereumGoerli",
        //     "assetId":"ETH:GOERLI",
        //     "assetType":"coin",
        //     "addressFrom":"0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f",
        //     "destination":"0x0123456789012345678901234567890123456789",
        //     "partiesAmount":2,
        //     "transactionHex":"eb80850c11e77e58825208940123456789012345678901234567890123456789871fa8d5ba0cdd4080808080",
        //     "protocolVersion":"secp256k1-v1",
        //     "initiatorPubKey":"036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337",
        //     "partiesState":[
        //         {
        //             "status":"pending",
        //             "accountPubKey":"023a045125d49297ccc30aef1892469f43c63e7c50b5b15ad3a8c013d50faacb85",
        //             "partyPubKey":"036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337",
        //             "partyPubKeySignature":"3046022100cb063811c28ae13743c036fbfbb8a6eb2614db975890e4c836ba46d075a54b0e0221008adfbfa8b1554f4c829867a2a14d54c240ac0d846f555b2e7dcf2ec84fd0e9d1",
        //             "sequence":2
        //         }
        //     ],
        //     "state":[],
        //     "initiatedAt":"2022-11-03T11:04:19.776Z"
        // }
      ],
    },
    status: 200,
  }
}

export const transaction2ByFromResponse = () => {
  return {
    body: {
      status: 'pending',
      _id: '6363a033a1a0b155908d5fc5',
      blockchain: 'EthereumGoerli',
      assetId: 'ETH:GOERLI',
      assetType: CHAIN_ADAPTERS.COIN,
      addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
      destination: '0x0123456789012345678901234567890123456789',
      partiesAmount: 2,
      transactionHex: 'eb80850c11e77e58825208940123456789012345678901234567890123456789871fa8d5ba0cdd4080808080',
      protocolVersion: 'secp256k1-v1',
      initiatorPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
      partiesState: [
        {
          status: 'pending',
          accountPubKey: '023a045125d49297ccc30aef1892469f43c63e7c50b5b15ad3a8c013d50faacb85',
          partyPubKey: '036e1d9bc96c489567f04ba835951277a8c3749057839f1645f0d5860ef76e6337',
          partyPubKeySignature:
            '3046022100cb063811c28ae13743c036fbfbb8a6eb2614db975890e4c836ba46d075a54b0e0221008adfbfa8b1554f4c829867a2a14d54c240ac0d846f555b2e7dcf2ec84fd0e9d1',
          sequence: 2,
        },
      ],
      state: [],
      initiatedAt: '2022-11-03T11:04:19.776Z',
    },
    status: 200,
  }
}

export const transaction3RejectResponse = () => {
  return {
    body: {
      id: '63626566a1a0b155908d5f77',
      status: 'failed',
    },
    status: 200,
  }
}

// MOCKS
export const fetchMockTransactionsWithNoRequests = () => {
  fetchMock.post(transactionsSearchUrl, searchResponseEmpty)
}

export const fetchMockTransactionsWithRequestFromUs = () => {
  fetchMock.post(transactionsSearchUrl, searchWithRequestsFromUsResponse)
}

export const fetchMockTransactionsWithRequestFromUsCreatorNotJoined = () => {
  fetchMock.post(transactionsSearchUrl, searchWithRequestsFromUsCreatorNotJoinedResponse)
}

export const fetchMockTransaction1FromUs = () => {
  fetchMock.post(transaction1Url, transaction1FromUsResponse)
}

export const fetchMockTransaction1FromUsCreatorNotJoined = () => {
  fetchMock.post(transaction1Url, transaction1FromUsCreatorNotJoinedResponse)
}

export const fetchMockTransactionsWithRequestFromThem = () => {
  fetchMock.post(transactionsSearchUrl, searchWithRequestsFromThemResponse)
}

export const fetchMockTransactionsWithRequestFromThemAdvancedVersion = () => {
  fetchMock.post(transactionsSearchUrl, searchWithRequestsFromThemAdvancedVersionResponse)
}
export const fetchMockTransactionsWithRequestFromThemCreatorNotJoined = () => {
  fetchMock.post(transactionsSearchUrl, searchWithRequestsFromThemCreatorNotJoinedResponse)
}

export const fetchMockTransaction1FromThem = () => {
  fetchMock.post(transaction1Url, transaction1FromThemAdvancedVersionResponse)
}

export const fetchMockTransaction1FromThemAdvancedVersion = () => {
  fetchMock.post(transaction1Url, transaction1FromThemResponse)
}

export const fetchMockTransaction1FromThemCreatorNotJoined = () => {
  fetchMock.post(transaction1Url, transaction1FromThemCreatorNotJoinedResponse)
}

export const fetchWalletBalanceRequest = () => {
  fetchMock.get(walletBalanceRequestUrl, walletBalanceRequestResponse)
}

export const fetchMockTransaction2Post = () => {
  fetchMock.post(transactionPostUrl, transaction2PostResponse)
}

export const fetchMockTransactionsWithRequestByUs = () => {
  fetchMock.post(transactionsSearchUrl, searchWithRequestPostedByUsResponse)
}

export const fetchMockTransaction2ByUs = () => {
  fetchMock.get(transaction2Url, transaction2ByFromResponse)
}

export const fetchMockTransaction3Reject = () => {
  fetchMock.post(transaction3RejectUrl, transaction3RejectResponse)
}
