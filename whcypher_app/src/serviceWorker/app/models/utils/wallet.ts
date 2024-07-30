import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import { SUPPORTED_PROTOCOLS } from '../../lib/constants/protocols'

const bippath = require('bip32-path')

const validateAccountPubKey = (accountPubKey) => {
  if (
    !(accountPubKey.toLowerCase().length >= 60 && accountPubKey.toLowerCase().length <= 66) &&
    !accountPubKey.toLowerCase().match('[^a-f0-9]')
  ) {
    return `Invalid Account Public Key ${accountPubKey}`
  }
}

const validateWalletBlockchain = (blockchain) => {
  if (!Object.values(BlockchainNames).includes(blockchain)) {
    return `Invalid Blockain ${blockchain}`
  }
}

const validateCalculatedPubKey = (calculatedPubKey) => {
  if (
    !(calculatedPubKey.toLowerCase().length >= 60 && calculatedPubKey.toLowerCase().length <= 66) &&
    !calculatedPubKey.toLowerCase().match('[^a-f0-9]')
  ) {
    return `Invalid Calculated Public Key ${calculatedPubKey}`
  }
}

const validateCreatedAt = (createdAt) => {
  const dateCreatedAt = new Date(createdAt)
  const dateNow = new Date()
  if (!(dateCreatedAt <= dateNow) && dateCreatedAt.getFullYear() < dateNow.getFullYear() - 10) {
    return `Invalid Created Date ${createdAt}`
  }
}

const validateMinimumSigAmount = (minimumSigAmount, partiesAmount) => {
  if (
    !(minimumSigAmount.length >= 2 && minimumSigAmount.length <= 16) &&
    minimumSigAmount.length < partiesAmount.length
  ) {
    return `Invalid Minimumum Sig Amount ${minimumSigAmount}`
  }
}

const validateName = (name) => {
  const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/)
  if (pattern.test(name)) {
    return `Invalid Name ${name}`
  }
}

const validateProtocolVersion = (protocolVersion) => {
  if (!!protocolVersion || !Object.keys(SUPPORTED_PROTOCOLS).includes(protocolVersion)) {
    return `Invalid protocol version ${protocolVersion}`
  }
}

const validatePaillierPubKeys = (paillierPubKeys, partiesAmount) => {
  if (!(Object.keys(paillierPubKeys).length >= 1 && Object.keys(paillierPubKeys).length <= partiesAmount)) {
    return `Invalid PaillierPubKeys ${paillierPubKeys}`
  }
}

const validatePartiesAmount = (partiesAmount) => {
  if (!(partiesAmount >= 2 && partiesAmount <= 16)) {
    return `Invalid PartiesAmount ${partiesAmount}`
  }
}

const validatePartyId = (partyId) => {
  if (!(partyId >= 1 && partyId <= 16)) {
    return `Invalid PartyId ${partyId}`
  }
}

const validateSecretsEncrypted = (secretsEncrypted) => {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
  if (!(secretsEncrypted.length >= 10 && secretsEncrypted.length <= 16000) && !base64regex.test(secretsEncrypted)) {
    return `Invalid SecretsEncrypted ${secretsEncrypted}`
  }
}

const validateSessionId = (sessionId) => {
  if (
    !(sessionId.toLowerCase().length >= 10 && sessionId.toLowerCase().length <= 32) &&
    !sessionId.toLowerCase().match('[^a-f0-9]')
  ) {
    return `Invalid SessionId ${sessionId}`
  }
}

const validatePath = (path) => {
  if (!bippath.validateString(path)) {
    return `Invalid Path ${path}`
  }
}

export const validateWallet = (walletsData) => {
  let walletErrors = {}
  const errors = []

  const walletName = walletsData.name

  // errors.push(validateAccountPubKey(walletsData.accountPubKey));
  errors.push(validateWalletBlockchain(walletsData.blockchain))
  errors.push(validateCalculatedPubKey(walletsData.calculatedPubKey))
  errors.push(validateCreatedAt(walletsData.createdAt))
  errors.push(validateMinimumSigAmount(walletsData.minimumSigAmount, walletsData.partiesAmount))
  errors.push(validateName(walletsData.name))
  errors.push(validateProtocolVersion(walletsData.protocolVersion))
  errors.push(validatePaillierPubKeys(walletsData.paillierPubKeys, walletsData.partiesAmount))
  errors.push(validatePartiesAmount(walletsData.partiesAmount))
  errors.push(validatePartyId(walletsData.partyId))
  errors.push(validateSecretsEncrypted(walletsData.secretsEncrypted))
  errors.push(validateSessionId(walletsData.sessionId))
  errors.push(validatePath(walletsData.path))

  const filteredErrors = errors.filter((item) => item)
  if (filteredErrors.length > 0) {
    walletErrors = {
      [walletName]: filteredErrors,
    }
  }

  return walletErrors
}
