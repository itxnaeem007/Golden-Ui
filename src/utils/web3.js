import Web3 from 'web3'

// const RPC_URL = "https://rpc-mainnet.maticvigil.com/v1/71b393674f070620b17f5605ca77fe6c9cce093f"
const RPC_URL = "https://rinkeby.infura.io/v3/c4eca0a0bdfc41028e1df062238c527b"

const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}



export { getWeb3NoAccount }
export default web3NoAccount
