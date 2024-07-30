import * as yup from 'yup'
const ERROR_TYPE = {
  RPC_INVALID_URL: 'Invalid RPC URL',
  NODE_INVALID_URL: 'Invalid NODE URL',
}
const validationSchema = yup.object().shape({
  rpcURLethereummainnet: yup.string().url(ERROR_TYPE.RPC_INVALID_URL),
  rpcURLropstenmmainnet: yup.string().url(ERROR_TYPE.RPC_INVALID_URL),
  rpcURLgoerlimainnet: yup.string().url(ERROR_TYPE.RPC_INVALID_URL),
  rpcURLbinancesmartchainmainnet: yup.string().url(ERROR_TYPE.RPC_INVALID_URL),
  rpcURLpolygonmainnet: yup.string().url(ERROR_TYPE.RPC_INVALID_URL),
  rpcURLarbitrummainnet: yup.string().url(ERROR_TYPE.RPC_INVALID_URL),
  rpcURLavalanchemainnet: yup.string().url(ERROR_TYPE.RPC_INVALID_URL),
  rpcURLoptimismmainnet: yup.string().url(ERROR_TYPE.RPC_INVALID_URL),
})

export default validationSchema
