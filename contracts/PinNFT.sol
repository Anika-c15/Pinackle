// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IUserRegistry {
    function incrementPinCount(address _user) external;
}

contract PinNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Pin {
        uint256 id;
        address creator;
        string contentURI;
        uint256 createdAt;
        uint256 viewCount;
        uint256 likeCount;
        uint256 currentPrice;
    }

    mapping(uint256 => Pin) public pins;
    IUserRegistry public userRegistry;

    event PinCreated(uint256 indexed pinId, address indexed creator, string contentURI);
    event PinViewed(uint256 indexed pinId, uint256 newViewCount);

    constructor(address _userRegistry) ERC721("PinNFT", "PIN") {
        userRegistry = IUserRegistry(_userRegistry);
    }

    function createPin(string memory _contentURI, uint256 _initialPrice) external returns (uint256) {
        _tokenIds.increment();
        uint256 newPinId = _tokenIds.current();

        _mint(msg.sender, newPinId);
        
        pins[newPinId] = Pin({
            id: newPinId,
            creator: msg.sender,
            contentURI: _contentURI,
            createdAt: block.timestamp,
            viewCount: 0,
            likeCount: 0,
            currentPrice: _initialPrice
        });

        userRegistry.incrementPinCount(msg.sender);
        
        emit PinCreated(newPinId, msg.sender, _contentURI);
        return newPinId;
    }
}