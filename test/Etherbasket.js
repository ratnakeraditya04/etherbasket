const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Etherbasket", () => {
  let etherbasket
  let deployer , buyer
  beforeEach(async () => {

    // SetUp Accounts 
    [deployer,buyer]  = await ethers.getSigners()
    console.log(deployer.address , buyer.address)
    

    // Deploy Contract Each time before each time a test is called. This will act as a hook. 
    // Get Contract from the factory named Etherbasket.  
    const Etherbasket = await ethers.getContractFactory("Etherbasket");
    // Deploy a copy of it. 
    etherbasket = await Etherbasket.deploy()
  })



  describe("Deployment" , () =>{
    it('sets the owner', async () => {
      // Fetch the address from it so as to check if it matches our provided value.
          expect(await etherbasket.owner()).to.equal(deployer.address)
        })
    // Used only for testing and setting up our contracts folder purpose. 
    it('has a name', async () => {
    // Fetch the name from it so as to check if it matches our provided value.
        expect(await etherbasket.name()).to.equal("Etherbasket")
      })
  })
  






  describe("Listing" , () =>{
    let transaction 
    const ID = 1 ;
    const NAME = "Shoes" ; 
    const CATEGORY = "Clothing"
    const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
    // Cost of the Price Given here is expressed in the ether itself through token. 
    const COST = tokens(1); 
    const RATING = 4;
    const STOCK = 5; 
    beforeEach(async () => {
        transaction = await etherbasket.connect(deployer).list (
        ID, 
        "Shoes",
        "Clothing",
        "IMAGE",
        1,
        4,
        5

        )
    });
    it('list the product', async () => {
      // Fetch the address from it so as to check if it matches our provided value.
          expect(await etherbasket.owner()).to.equal(deployer.address)
        })
    // Used only for testing and setting up our contracts folder purpose. 
    it('has a name', async () => {
    // Fetch the name from it so as to check if it matches our provided value.
        expect(await etherbasket.name()).to.equal("Etherbasket")
      })
  })

}) 
 