// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

contract ImageStorage {


    //array to store public and private image ipfshash and encrypted image hash
    string[] public publicimagearray;    

    function add_ipfs_to_array(string memory ipfshash) public {
        publicimagearray.push(ipfshash);
    }

    function get_array_len() public view returns (uint) {
        return publicimagearray.length;
    }
    function get_Array() public view returns (string[] memory) {
        return publicimagearray;
    }


    //------------------------------------------------------------    
    //map and functions of private and public image
    mapping(bytes32=> string) public publicimages;
    
    function uploadImage(bytes32 hash, string memory ipfsHash) public {   
            publicimages[hash] = ipfsHash;
            add_ipfs_to_array(ipfsHash);
    }

    function getImagebyhash(bytes32 hash) public view returns (string memory) {
            return publicimages[hash];
    }

    //map to maintain and add the users
    mapping (string => int) public users;
    function add_user(string memory key) public{
        users[key]=1;
    }
    function check_user(string memory key) public view returns(int){
        return users[key];
    }
}

