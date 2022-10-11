const hre = require('hardhat')

async function getBal(address) {
  const balBigInt = await hre.ethers.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balBigInt)
}

async function printBals(addresses) {
  let x = 0
  for (const address of addresses) {
    console.log(`Address ${x} bal: `, await getBal(address))
    x++
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp
    const tipper = memo.name
    const tipperAddr = memo.from
    const msg = memo.message
    console.log(`At ${timestamp}, ${tipper} (${tipperAddr}) said: "${msg}"`)
  }
}

async function main() {
  const [owner, tipper, tipper1, tipper2] = await hre.ethers.getSigners()

  const BuyMeACoffee = await hre.ethers.getContractFactory('BuyMeACoffee')
  const buyMeACoffee = await BuyMeACoffee.deploy()

  await buyMeACoffee.deployed()
  console.log('BuyMeACoffee deployed to: ', buyMeACoffee.address)

  const addresses = [owner.address, tipper.address, buyMeACoffee.address]
  console.log('== start ==')
  await printBals(addresses)

  const tip = { value: hre.ethers.utils.parseEther('1') }
  await buyMeACoffee
    .connect(tipper)
    .buyCoffee('Vitalik', 'Keep learning dude!', tip)
  await buyMeACoffee
    .connect(tipper1)
    .buyCoffee('Satoshi', "You'll get there", tip)
  await buyMeACoffee
    .connect(tipper2)
    .buyCoffee('AlchUni', 'Proof of knowledge is key', tip)

  console.log('== bought cofee ==')
  await printBals(addresses)

  await buyMeACoffee.connect(owner).withdrawTips()

  console.log('== withdrawTips ==')
  await printBals(addresses)

  console.log('== memos ==')
  const memos = await buyMeACoffee.getMemos()
  printMemos(memos)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
