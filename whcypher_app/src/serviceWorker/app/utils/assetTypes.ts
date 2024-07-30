// Move this to src/serviceWorker/app/helpers/...
export const isNft = (assetType?: string | null) => {
  return assetType && ['ERC721', 'TRC721'].includes(assetType)
}
