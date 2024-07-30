import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

export const transactionURL = (blockchainName: BlockchainNames, transactionID: string) => {
  let referenceLink

  if (blockchainName == BlockchainNames.Bitcoin) {
    referenceLink = 'https://live.blockcypher.com/btc/tx/'
  } else if (blockchainName == BlockchainNames.BitcoinTestnet) {
    referenceLink = 'https://live.blockcypher.com/btc-testnet/tx/'
  } else if (blockchainName == BlockchainNames.Litecoin) {
    referenceLink = 'https://live.blockcypher.com/ltc/tx/'
  } else if (blockchainName == BlockchainNames.Dogecoin) {
    referenceLink = 'https://live.blockcypher.com/doge/tx/'
  } else if (blockchainName == BlockchainNames.BitcoinCash) {
    referenceLink = 'https://blockchair.com/bitcoin-cash/'
  } else if (blockchainName == BlockchainNames.Ethereum) {
    referenceLink = 'https://etherscan.io/tx/'
  } else if (blockchainName == BlockchainNames.EthereumRopsten) {
    referenceLink = 'https://ropsten.etherscan.io/tx/'
  } else if (blockchainName == BlockchainNames.EthereumGoerli) {
    referenceLink = 'https://goerli.etherscan.io/tx/'
  } else if (blockchainName == BlockchainNames.BinanceSmartChain) {
    referenceLink = 'https://bscscan.com/tx/'
  } else if (blockchainName == BlockchainNames.Polygon) {
    referenceLink = 'https://polygonscan.com/tx/'
  } else if (blockchainName == BlockchainNames.Avalanche) {
    referenceLink = 'https://snowtrace.io/tx/'
  } else if (blockchainName == BlockchainNames.Optimism) {
    referenceLink = 'https://optimistic.etherscan.io/tx/'
  } else if (blockchainName == BlockchainNames.ArbitrumOne) {
    referenceLink = 'https://arbiscan.io/tx/'
  } else if (blockchainName == BlockchainNames.Tron) {
    referenceLink = 'https://tronscan.org/#/transaction/'
  } else if (blockchainName == BlockchainNames.TronShasta) {
    referenceLink = 'https://shasta.tronscan.org/#/transaction/'
  }

  referenceLink = referenceLink + transactionID

  return referenceLink
}

export const addressURL = (blockchainName: BlockchainNames, address: string) => {
  let explorerLink

  if (blockchainName == BlockchainNames.Bitcoin) {
    explorerLink = 'https://live.blockcypher.com/btc/address/'
  } else if (blockchainName == BlockchainNames.BitcoinTestnet) {
    explorerLink = 'https://live.blockcypher.com/btc-testnet/address/'
  } else if (blockchainName == BlockchainNames.Litecoin) {
    explorerLink = 'https://live.blockcypher.com/ltc/address/'
  } else if (blockchainName == BlockchainNames.Dogecoin) {
    explorerLink = 'https://live.blockcypher.com/doge/address/'
  } else if (blockchainName == BlockchainNames.BitcoinCash) {
    explorerLink = 'https://blockchair.com/bitcoin-cash/'
  } else if (blockchainName == BlockchainNames.Ethereum) {
    explorerLink = 'https://etherscan.io/address/'
  } else if (blockchainName == BlockchainNames.EthereumRopsten) {
    explorerLink = 'https://ropsten.etherscan.io/address/'
  } else if (blockchainName == BlockchainNames.EthereumGoerli) {
    explorerLink = 'https://goerli.etherscan.io/address/'
  } else if (blockchainName == BlockchainNames.BinanceSmartChain) {
    explorerLink = 'https://bscscan.com/address/'
  } else if (blockchainName == BlockchainNames.Polygon) {
    explorerLink = 'https://polygonscan.com/address/'
  } else if (blockchainName == BlockchainNames.Avalanche) {
    explorerLink = 'https://snowtrace.io/address/'
  } else if (blockchainName == BlockchainNames.Optimism) {
    explorerLink = 'https://optimistic.etherscan.io/address/'
  } else if (blockchainName == BlockchainNames.ArbitrumOne) {
    explorerLink = 'https://arbiscan.io/address/'
  } else if (blockchainName == BlockchainNames.Tron) {
    explorerLink = 'https://tronscan.org/#/address/'
  } else if (blockchainName == BlockchainNames.TronShasta) {
    explorerLink = 'https://shasta.tronscan.org/#/address/'
  }

  explorerLink = explorerLink + address

  return explorerLink
}

export const assetURL = (blockchainName: BlockchainNames, address: string, type: string) => {
  let explorerLink

  if (
    blockchainName == BlockchainNames.Bitcoin ||
    blockchainName == BlockchainNames.BitcoinTestnet ||
    blockchainName == BlockchainNames.Litecoin ||
    blockchainName == BlockchainNames.Dogecoin ||
    blockchainName == BlockchainNames.BitcoinCash
  ) {
    return ''
  }

  if (blockchainName == BlockchainNames.BitcoinCash) {
    explorerLink = 'https://blockchair.com/bitcoin-cash/'
  } else if (blockchainName == BlockchainNames.Ethereum) {
    explorerLink = 'https://etherscan.io/token/'
  } else if (blockchainName == BlockchainNames.EthereumRopsten) {
    explorerLink = 'https://ropsten.etherscan.io/token/'
  } else if (blockchainName == BlockchainNames.EthereumGoerli) {
    explorerLink = 'https://goerli.etherscan.io/token/'
  } else if (blockchainName == BlockchainNames.BinanceSmartChain) {
    explorerLink = 'https://bscscan.com/token/'
  } else if (blockchainName == BlockchainNames.Polygon) {
    explorerLink = 'https://polygonscan.com/token/'
  } else if (blockchainName == BlockchainNames.Avalanche) {
    explorerLink = 'https://snowtrace.io/token/'
  } else if (blockchainName == BlockchainNames.Optimism) {
    explorerLink = 'https://optimistic.etherscan.io/token/'
  } else if (blockchainName == BlockchainNames.ArbitrumOne) {
    explorerLink = 'https://arbiscan.io/token/'
  } else if (blockchainName == BlockchainNames.Tron) {
    if (type === 'TRC10') {
      explorerLink = 'https://tronscan.org/#/token/'
    } else if (type === 'TRC20') {
      explorerLink = 'https://tronscan.org/#/token20/'
    } else if (type === 'TRC721') {
      explorerLink = 'https://tronscan.org/#/token721/'
    }
  } else if (blockchainName == BlockchainNames.TronShasta) {
    if (type === 'TRC10') {
      explorerLink = 'https://shasta.tronscan.org/#/token/'
    } else if (type === 'TRC20') {
      explorerLink = 'https://shasta.tronscan.org/#/token20/'
    } else if (type === 'TRC721') {
      explorerLink = 'https://shasta.tronscan.org/#/token721/'
    }
  }

  explorerLink = explorerLink + address

  return explorerLink
}

export const nftURL = (blockchainName: BlockchainNames, address: string, tokenId: string) => {
  let explorerLink = ''

  if (
    blockchainName == BlockchainNames.Bitcoin ||
    blockchainName == BlockchainNames.BitcoinTestnet ||
    blockchainName == BlockchainNames.Litecoin ||
    blockchainName == BlockchainNames.Dogecoin ||
    blockchainName == BlockchainNames.BitcoinCash
  ) {
    return ''
  }

  if (blockchainName == BlockchainNames.Ethereum) {
    explorerLink = 'https://etherscan.io/token/' + address + '?a=' + tokenId
  } else if (blockchainName == BlockchainNames.EthereumRopsten) {
    explorerLink = 'https://ropsten.etherscan.io/token/' + address + '?a=' + tokenId
  } else if (blockchainName == BlockchainNames.EthereumGoerli) {
    explorerLink = 'https://goerli.etherscan.io/token/' + address + '?a=' + tokenId
  } else if (blockchainName == BlockchainNames.BinanceSmartChain) {
    explorerLink = 'https://bscscan.com/token/' + address + '?a=' + tokenId
  } else if (blockchainName == BlockchainNames.Polygon) {
    explorerLink = 'https://polygonscan.com/token/' + address + '?a=' + tokenId
  } else if (blockchainName == BlockchainNames.Avalanche) {
    explorerLink = 'https://snowtrace.io/token/' + address + '?a=' + tokenId
  } else if (blockchainName == BlockchainNames.Optimism) {
    explorerLink = 'https://optimistic.etherscan.io/token/' + address + '?a=' + tokenId
  } else if (blockchainName == BlockchainNames.ArbitrumOne) {
    explorerLink = 'https://arbiscan.io/token/' + address + '?a=' + tokenId
  } else if (blockchainName == BlockchainNames.Tron) {
    explorerLink = 'https://tronscan.org/#/token721/' + address + '/' + tokenId
  } else if (blockchainName == BlockchainNames.TronShasta) {
    explorerLink = 'https://shasta.tronscan.org/#/token721/' + address + '/' + tokenId
  }

  return explorerLink
}
