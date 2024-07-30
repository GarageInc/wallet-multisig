import Account from "../models/Account"

export const getPrivateKey = async () => {
  const account = await Account.getActiveAccount()

  return (await account?.getPrivateKey())?.privKey
}