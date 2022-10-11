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

  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, prov)

  const buyMeACoffee = new hre.ethers.Contract(
    contractAddr,
    contractABI,
    signer,
  )

  console.log(
    'current balance of owner: ',
    await getBal(prov, signer.address),
    'ETH',
  )
  const contractBal = await getBal(prov, buyMeACoffee.address)
  console.log(
    'current balance of contract: ',
    await getBal(prov, buyMeACoffee.address),
    'ETH',
  )

  if (contractBal !== '0.0') {
    console.log('withdrawing funds...')
    const withdrawnTxn = await buyMeACoffee.withdrawTips()
    await withdrawnTxn.wait()
  } else {
    console.log('no funds to withdraw!')
  }

  console.log(
    'current balance of woner: ',
    await getBal(prov, signer.address),
    'ETH',
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
