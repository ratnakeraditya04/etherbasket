const { expect } = require("chai")
const { ethers } = require("hardhat")
// Will help in conversion from Ether and Wei 
// Tokens(1) = 1000000000000000000 Wei's
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}
const ID = 1 ;
const NAME = "Shoes" ; 
const CATEGORY = "Clothing"
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
// Cost of the Price Given here is expressed in the ether itself through token. 
const COST = tokens(1); 
const RATING = 4;
const STOCK = 5; 
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
  
  describe("Core Functionalities - List, Buy and Withdraw" , () =>{
    let transaction 
    let balanceBefore
    beforeEach(async () => {
        transaction = await etherbasket.connect(deployer).list (
        ID, 
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
        )
        await transaction.wait() 


        // Buy an Item 
        // I was able to add value only because our buy fuunction in our contract is payable. 
        await etherbasket.connect(buyer).buy(ID, {value : COST})
        await transaction.wait(); 

        // Get Deployer Balance Before 
        balanceBefore = await ethers.provider.getBalance(deployer.address);
        
        // Withdraw  
        transaction = await etherbasket.connect(deployer).withdraw() 
        await transaction.wait();

        

    });

    // it('checks item attributes', async () => {
    //   // Fetch the first item and test it. 
    //       const item = await etherbasket.items(1)
    //       expect(item.id).to.equal(ID)
    //       expect(item.name).to.equal(NAME)
    //       expect(item.category).to.equal(CATEGORY)
    //       expect(item.image).to.equal(IMAGE)
    //       expect(item.cost).to.equal(COST)
    //       expect(item.rating).to.equal(RATING)
    //       expect(item.stock).to.equal(STOCK)
    //     })


      it('emit List event', () => {
        expect(transaction).to.emit(etherbasket, "List") ;
      })

      it('updates the buyer(s) order count' , async () => {
        const result = await etherbasket.orderCount(buyer.address)
        expect(result).to.equal(1);  
      })

      it('adds the order' , async () => {
        const order = await etherbasket.orders(buyer.address , 1); 

        expect(order.time).to.be.greaterThan(0); 
        expect(order.item.name).to.equal(NAME); 
      })
      
      
      it('updates the contract balance' , async () => {
        const result = await ethers.provider.getBalance(etherbasket.address); 
        console.log(result); 
        expect(result).to.equal(0);
      })

      it('emits the buy event' , () => {
        expect(transaction).to.emit(etherbasket, "Buy"); 
      })

      it('updates the owner balance', async () => {
        const balanceAfter = await ethers.provider.getBalance(deployer.address); 
        expect(balanceAfter).to.be.greaterThan(balanceBefore); 
      })
  })
}) 
 