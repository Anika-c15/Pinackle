// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPinNFT {
    struct Pin {
        uint256 id;
        address creator;
        string contentURI;
        uint256 createdAt;
        uint256 viewCount;
        uint256 likeCount;
        uint256 currentPrice;
    }
    
    function pins(uint256) external view returns (
        uint256 id,
        address creator,
        string memory contentURI,
        uint256 createdAt,
        uint256 viewCount,
        uint256 likeCount,
        uint256 currentPrice
    );
    
    function updatePrice(uint256 _pinId, uint256 _newPrice) external;
}

contract DynamicPricingOracle {
    IPinNFT public pinNFTContract;
    uint256 public baseMultiplier = 1 ether;

    event PriceUpdated(uint256 indexed pinId, uint256 newPrice);

    constructor(address _pinNFTAddress) {
        pinNFTContract = IPinNFT(_pinNFTAddress);
    }

    function calculateNewPrice(uint256 _pinId) public view returns (uint256) {
        (, , , , uint256 viewCount, uint256 likeCount, ) = pinNFTContract.pins(_pinId);
        return baseMultiplier + (viewCount * 0.001 ether) + (likeCount * 0.01 ether);
    }

    function updatePrice(uint256 _pinId) external {
        uint256 newPrice = calculateNewPrice(_pinId);
        pinNFTContract.updatePrice(_pinId, newPrice);
        emit PriceUpdated(_pinId, newPrice);
    }
}