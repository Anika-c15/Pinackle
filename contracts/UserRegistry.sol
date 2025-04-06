// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct UserProfile {
        string username;
        string bio;
        uint256 reputation;
        uint256 pinCount;
    }

    mapping(address => UserProfile) public users;
    mapping(string => address) public usernameToAddress;

    event UserRegistered(address indexed userAddress, string username);

    function registerUser(string memory _username, string memory _bio) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(usernameToAddress[_username] == address(0), "Username already taken");
        require(users[msg.sender].reputation == 0, "User already registered");

        users[msg.sender] = UserProfile(_username, _bio, 100, 0);
        usernameToAddress[_username] = msg.sender;

        emit UserRegistered(msg.sender, _username);
    }

    function updateBio(string memory _newBio) external {
        require(users[msg.sender].reputation > 0, "User not registered");
        users[msg.sender].bio = _newBio;
    }

    function incrementPinCount(address _user) external {
        users[_user].pinCount += 1;
    }

    function getUser(address _user) external view returns (UserProfile memory) {
        return users[_user];
    }
}