const hre = require('hardhat')
const abi = require('../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json')

async function getBal(prov, addr) {
  const balBigInt = await prov.getBalance(addr)
  return hre.ethers.utils.formatEther(balBigInt)
}

async function main() {
  const contractAddr = '0x56Dc1491c7691F13B60521fEa02559749F18dEC9'
  const contractABI = abi.abi

  const prov = new hre.ethers.providers.AlchemyProvider(
    'goerli',
    process.env.GOERLI_API_KEY,
  )
}
