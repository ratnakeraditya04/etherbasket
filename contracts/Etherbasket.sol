//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Etherbasket {
    // Code Goes Here.....
    string public name = "Etherbasket";
    address public owner ; 

    struct Item {
        uint256 id ; 
        string name;
        string category; 
        string image;
        uint256 cost; 
        uint256 rating; 
        uint256 stock;
    }
    // It;'s like a store house of different key value pairs.
    mapping(uint256 => Item) public items ;
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
        ) public  {
        // Code Goes Here....
        // Create a object of that struct 
        Item memory item = Item(_id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );
        // Save Items to BlockChain. AStore it in the mapping we created above.   
        items[_id] = item ; 
    }
    

} 