//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Etherbasket {
    // Code Goes Here.....
    string public name = "Etherbasket";
    address public owner ; 

    struct Item {
        uint256 id; 
        string name;
        string category; 
        string image;
        uint256 cost; 
        uint256 rating; 
        uint256 stock;
    }
    struct Order {
        uint256 time ; 
        Item item ;
    }
    // It;'s like a store house of different key value pairs.
    mapping(uint256 => Item) public items ;
    // Address of the User who Place the order. 
    mapping(address => uint256) public orderCount; 
    mapping(address => mapping(uint256 => Order)) public orders ;


    event List(string name , uint256 cost , uint256 quantity); 
    event Buy(address buyer, uint256 orderId, uint256 itemId); 

    // Modifier is Created so as to allow only owner to access the necessary requirement.  
    modifier onlyOwner() {
        require(msg.sender == owner, "Listing of Products needs to be addressed by Owner"); 
        _;
    }
    constructor() { 
        name = "Etherbasket";
        // Person who is deploying the smart contract will become the owner. 
        owner = msg.sender; 
    }

//  Lists Products  
     
    function list(uint256 _id, 
            string memory _name, 
            string memory _category, 
            string memory _image,
            uint256 _cost, 
            uint256 _rating,
            uint256 _stock 
        ) public onlyOwner {
        // Code Goes Here....
        // Create a object of that struct 
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );
        // Save Items to BlockChain. Store it in the mapping we created above.   
        items[_id] = item ; 
        // Emit an Event - Can be used to alert and publish notifications.
        // By fetching every stream we can check the log of how many times the event is called. 
        emit List(_name, _cost, _stock) ;
    }
    



    // Buy Products 

    function buy(uint256 _id) public payable {
        // Receive Funds from Users - Using Payable
        // Read Item from Mapping we created 
        Item memory item = items[_id]; 
        // Require enough ether to buy items. 
        require(msg.value >= item.cost, "Insufficient Balance") ;

        // Require Item is in stock 
        require(item.stock > 0, "Insufficient Stock"); 

        // Create an order
        Order memory order  = Order(block.timestamp, item); 

        // Add order for user.  
        orderCount[msg.sender]++ ;
        orders[msg.sender][orderCount[msg.sender]] = order ;


        // Subtract Stock
        items[_id].stock = items[_id].stock - 1 ; 
        // Emit event
        emit Buy(msg.sender , orderCount[msg.sender], item.id); 
    }



    // Withdraw Funds 

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value : address(this).balance}("");
        require(success) ; 
    }

} 