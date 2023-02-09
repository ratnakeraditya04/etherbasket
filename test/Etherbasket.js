const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Etherbasket", () => {
  it('has a name', async () => {
    const Etherbasket = await ethers.getContractFactory("Etherbasket");
    etherbasket = await Etherbasket.deploy()
    expect(await etherbasket.name()).to.equal("Etherbasket")
  })
})
