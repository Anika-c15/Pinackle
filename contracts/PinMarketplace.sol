// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PinMarketplace {
    struct Pin {
        address owner;
        uint256 price;
        uint256 viewCount;
        uint256 createdAt;
        string metadataURI;
    }
    
    mapping(uint256 => Pin) public pins;
    uint256 public pinCount;
    
    event PinCreated(uint256 pinId, address owner, string metadataURI);
    event PinPurchased(uint256 pinId, address newOwner, uint256 price);
    
    function createPin(string memory _metadataURI, uint256 _initialPrice) public {
        pinCount++;
        pins[pinCount] = Pin({
            owner: msg.sender,
            price: _initialPrice,
            viewCount: 0,
            createdAt: block.timestamp,
            metadataURI: _metadataURI
        });
        emit PinCreated(pinCount, msg.sender, _metadataURI);
    }
    
    function purchasePin(uint256 _pinId) public payable {
        Pin storage pin = pins[_pinId];
        require(msg.value >= pin.price, "Insufficient funds");
        require(msg.sender != pin.owner, "Cannot buy your own pin");
        
        uint256 dynamicPrice = calculateDynamicPrice(_pinId);
        require(msg.value >= dynamicPrice, "Insufficient funds for current price");
        
        payable(pin.owner).transfer(dynamicPrice);
        pin.owner = msg.sender;
        pin.price = dynamicPrice;
        
        emit PinPurchased(_pinId, msg.sender, dynamicPrice);
    }
    
    function calculateDynamicPrice(uint256 _pinId) public view returns (uint256) {
        Pin memory pin = pins[_pinId];
        // Base price + 0.001 ETH per 100 views
        return pin.price + (pin.viewCount / 100) * 0.001 ether;
    }
    
    function incrementViewCount(uint256 _pinId) public {
        pins[_pinId].viewCount++;
    }
}
