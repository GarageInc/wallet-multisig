import { CHAIN_CONFIGS, EthereumFamilyChains, EVM_CHAINS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { IMessage } from 'src/shared/interfaces/interfaces'

import { CHANNELS } from '../../../app/constants/browserChannels'
import logger from '../../../app/helpers/appLogger'
import { ConfigChanges } from '../../helpers/getConfigChanges'
import { getIChainTypeByNetworkId } from '../../helpers/getIChainTypeByNetworkId'
import { RequestAccounts } from '../../types/inpage-types'
import LocalMessageDuplexStream from '../post-message-stream/PostMessageStream'
import { genPayloadId } from './genPayloadId'
import TotalSigWeb3Provider from './web3provider'

const isDebug = process.env.NODE_ENV !== 'production'

const options = (callBacksMap: any, msgStream: any, ethProvCfg: { chainId: number; prioritiseMultisig: boolean }) => {
  // TODO: check for custom RPC URLs here ?
  const chainId = getIChainTypeByNetworkId(ethProvCfg.chainId)

  const rpc: any = {}
  EVM_CHAINS.forEach((chainId: EthereumFamilyChains) => {
    rpc[Number(CHAIN_CONFIGS[chainId].config.chainId!)] = CHAIN_CONFIGS[chainId].config.rpcUrl
  })

  const handler = (ethMethod: string) => (params: any, cb: any) => {
    if (isDebug) logger.info(`<===== ${ethMethod}`, params, cb)
    const pId = genPayloadId()
    const msg = {
      name: CHANNELS.PROVIDER,
      data: {
        chainId,
        origin: undefined,
        messageId: pId,
        raw: {
          id: pId,
          method: ethMethod,
          params,
        },
        time: Date.now(),
      } as IMessage,
    }
    callBacksMap.set(pId, cb)
    msgStream.write(msg)
  }

  return {
    chainId: ethProvCfg.chainId,
    isMetaMask: ethProvCfg.prioritiseMultisig,
    rpc,
    pollingInterval: 60000,
    isDebug,
    hookedFunctions: {
      getAccounts: (cb: any) => {
        if (isDebug) logger.info('<===== getAccounts called', cb)
        const pId = genPayloadId()
        const msg = {
          name: CHANNELS.PROVIDER,
          data: {
            messageId: pId,
            origin: undefined,
            chainId,
            raw: {
              id: pId,
              method: 'eth_requestAccounts',
              params: [],
            },
            time: Date.now(),
          } as IMessage,
        }
        callBacksMap.set(msg.data.raw.id, cb)
        msgStream.write(msg)
      },
      decrypt: handler('eth_decrypt'),
      getEncryptionPublicKey: handler('eth_getEncryptionPublicKey'),
      walletRequestPermissions: handler('wallet_requestPermissions'),
      processPersonalEcRecover: handler('personal_ecRecover'),
      processPersonalMessage: handler('personal_sign'),
      processTypedMessage: handler('eth_signTypedData'),
      processSignTransaction: handler('eth_signTransaction'),
      processTransaction: handler('eth_sendTransaction'),
      addEthereumChain: handler('wallet_addEthereumChain'),
      updateEthereumChain: handler('wallet_updateEthereumChain'),
      watchAsset: handler('wallet_watchAsset'),
      blockNumber: handler('eth_blockNumber'),
      getBlockByNumber: handler('eth_getBlockByNumber'),
      estimateGas: handler('eth_estimateGas'),
      getTransactionByHash: handler('eth_getTransactionByHash'),
    },
  }
}

const _initWeb3Provider = (
  msgStream: any,
  callBacksMap: Map<number, any>,
  ethProvCfg: { chainId: number; prioritiseMultisig: boolean; rpcUrl?: string },
) => {
  const web3Provider = new TotalSigWeb3Provider(options(callBacksMap, msgStream, ethProvCfg))
  return web3Provider
}

if (!window) {
  throw Error('InPage: window is not defined')
}

const callBacksMap = new Map<number, any>()

// setup background connection
const msgStream = new LocalMessageDuplexStream({
  target: CHANNELS.CONTENT_SCRIPT,
  name: CHANNELS.PAGE,
})

if (window.totalsigWeb3) {
  throw Error('InPage: window.totalsig is already defined')
} else {
  // need to inject ethereum early to make rainbowkit happy
  window.totalsigWeb3 = {
    installed: true,
    ethereum: _initWeb3Provider(msgStream, callBacksMap, {
      chainId: 1,
      prioritiseMultisig: true,
    }),
  }
}

const overrideWindowEthereum = (cfg: ConfigChanges | undefined) =>
  !window.ethereum?.isTotalSig && cfg?.prioritiseMultisig

const requestAccounts: RequestAccounts = (chainId: BlockchainNames, callbackFunction: any) => {
  const pId = genPayloadId()

  const msgData: IMessage = {
    messageId: pId,
    origin: undefined,
    chainId,
    raw: {
      id: pId,
      method: 'request_accounts',
      params: {},
    },
    time: Date.now(),
  }

  const msg = {
    name: CHANNELS.PROVIDER,
    data: msgData,
  }

  if (callbackFunction && callBacksMap) {
    callBacksMap.set(msg.data.raw.id, callbackFunction)
  }

  msgStream.write(msg)
}

const setupEthereumProvider = (cfg: ConfigChanges) => {
  if (!cfg.ethereumProvider) {
    return
  }

  window.totalsigWeb3 = {
    ...window.totalsigWeb3,
    ethereum: _initWeb3Provider(msgStream, callBacksMap, {
      chainId: cfg.ethereumProvider.chainId || 1,
      rpcUrl: cfg.ethereumProvider.rpcUrl,
      prioritiseMultisig: cfg.prioritiseMultisig === undefined ? false : cfg.prioritiseMultisig,
    }),
  }

  const _injectEthereum = () => {
    try {
      if (overrideWindowEthereum(cfg)) {
        // override MetaMask if Pretend MetaMask is true
        if (isDebug && !window.ethereum) {
          logger.info('TotalSig: no window.ethereum -- injecting')
        }
        if (isDebug && !window.ethereum?.__TotalSig) {
          logger.info('TotalSig: external provider detected, overriding')
        }
        window.ethereum = window.totalsigWeb3.ethereum
        window.web3 = {
          currentProvider: new Proxy(window.ethereum, {}),
        }
        setTimeout(() => window?.ethereum?._ready?.go())
      } else {
        setTimeout(() => window?.totalsigWeb3.ethereum?._ready?.go())
      }
    } catch (e) {
      logger.error(`TotalSig: Failed to start TotalSigWeb3Provider: ${e}`)
    }
  }

  try {
    _injectEthereum()
  } catch (error) {
    logger.error(`TotalSig: Failed to inject Ethereum: ${error}`)
  }
  setTimeout(_injectEthereum, 1000) // Maybe try catch and log error?

  logger.info('TotalSig: window.ethereum injected', window.ethereum)
}

const initializeProviders = (cfg: ConfigChanges) => {
  try {
    if (isDebug) logger.info('TotalSig: window.totalsigWeb3 initializeProviders', cfg, window.totalsigWeb3)
    setupEthereumProvider(cfg)

    window.totalsigWeb3 = {
      ...window.totalsigWeb3,
      info: {
        lastConfigChanges: {},
        version: 'v1',
      },
      common: {
        requestAccounts,
      },
    }

    if (isDebug) logger.info('TotalSig: window.totalsigWeb3 injected', window.totalsigWeb3)
  } catch (e) {
    logger.error({ msg: 'initializeProviders failed', e })
    throw e
  }
}

msgStream.on('data', (msgRaw: any) => {
  try {
    if (!msgRaw) {
      if (isDebug) logger.info('<===== received empty msg')
      return
    }

    if (isDebug) logger.info('<===== inpage received raw msg', msgRaw)
    const msg = msgRaw.data

    if (isDebug) logger.info('<=====InPage received data', msg)
    const msgId = msg.messageId || msg.id

    if (callBacksMap.has(msgId)) {
      const callback = callBacksMap.get(msgId)
      callBacksMap.delete(msgId)

      callback(msg.error ? msg.error : null, msg.result ? msg.result : msg, msgId)
    } else {
      if (isDebug) {
        logger.info('<===== no callback found for msg id ', msgId)
      }

      const { configChanges }: { configChanges: ConfigChanges; method: string } = msg
      if (configChanges) {
        if (isDebug) logger.info('<===== ConfigChanges <<<', configChanges)

        if (configChanges.initialization) {
          initializeProviders(configChanges)
        }

        if (window.totalsigWeb3.info) {
          window.totalsigWeb3.info.lastConfigChanges = configChanges
        }

        if (configChanges.ethereumProvider) {
          if (isDebug) logger.info('<==== ethereum config Changes')
          const ethereum = window.totalsigWeb3?.ethereum

          if (ethereum?.updateState) {
            const { chainId, rpcUrl, accounts } = configChanges.ethereumProvider

            if (chainId && rpcUrl) {
              if (isDebug) {
                logger.info('<==== ethereum switchconfig', chainId, rpcUrl)
              }
              ethereum.updateState({
                chainId,
                rpcUrl,
                networkId: String(chainId),
              })
            }
            // NOTE: We must do two calls for updateState
            // because we need to update the chainId first
            if (Array.isArray(accounts)) {
              if (isDebug) {
                logger.info('<==== ethereum accounts changed', accounts)
              }
              ethereum.updateState({ accounts, rpcUrl })
            }
          }
        }
      }
    }
  } catch (e) {
    logger.error(`TotalSig: Failed to process message ${e}`)
  }
})
