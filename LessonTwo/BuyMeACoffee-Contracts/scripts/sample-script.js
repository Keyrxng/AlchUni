const hre = require('hardhat')

async function getBal(address) {
  const balBigInt = await hre.ethers.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balBigInt)
}
