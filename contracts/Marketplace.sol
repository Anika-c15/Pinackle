// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// Add this interface for PinNFT
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
    
    function getPin(uint256 _pinId) external view returns (Pin memory);
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
}

contract Marketplace {
    IPinNFT public pinNFTContract;  // Changed from IERC721 to IPinNFT
    uint256 public platformFeePercentage = 5; // 5%

    event PinPurchased(uint256 indexed pinId, address buyer, address seller, uint256 price);

    constructor(address _pinNFTAddress) {
        pinNFTContract = IPinNFT(_pinNFTAddress);
    }

    function buyPin(uint256 _pinId) external payable {
        address seller = pinNFTContract.ownerOf(_pinId);
        IPinNFT.Pin memory pin = pinNFTContract.getPin(_pinId);
        uint256 price = pin.currentPrice;
        
        require(msg.value >= price, "Insufficient funds");
        require(seller != msg.sender, "Cannot buy your own pin");

        uint256 platformFee = (price * platformFeePercentage) / 100;
        uint256 sellerProceeds = price - platformFee;

        payable(seller).transfer(sellerProceeds);
        pinNFTContract.safeTransferFrom(seller, msg.sender, _pinId);

        emit PinPurchased(_pinId, msg.sender, seller, price);
    }

    function setPlatformFee(uint256 _newFeePercentage) external {
        // In a real implementation, you'd restrict this to admin/owner
        platformFeePercentage = _newFeePercentage;
    }
}
