// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

contract ImageStorage {


    //array to store public and private image ipfshash and encrypted image hash
    string[] public privateimagearray;
    string[] public publicimagearray;    
    function add_ipfs_to_array(string memory ipfshash, bool is_private) public {
        if(is_private==true)
            privateimagearray.push(ipfshash);
        else 
            publicimagearray.push(ipfshash);
    }
    function get_array_len(bool is_private) public view returns (uint) {
        if(is_private==true)
            return privateimagearray.length;
        else 
            return publicimagearray.length;
    }
    function get_Array( bool is_private) public view returns (string[] memory) {
        if(is_private==true)
            return privateimagearray;
        else 
            return publicimagearray;
    }


    //------------------------------------------------------------    
    //map and functions of private and public image
    mapping(bytes32 => string) private privateimages;
    mapping(bytes32=> string) private publicimages;
    
    function uploadImage(bytes32 hash, string memory ipfsHash, bool is_private) public {
        if(is_private==true)
        {
            privateimages[hash] = ipfsHash;
            add_ipfs_to_array(ipfsHash,true);
        }
        else 
        {   
            publicimages[hash] = ipfsHash;
            add_ipfs_to_array(ipfsHash,false);
        }    
    }

    function getImagebyhash(bytes32 hash,bool is_private) public view returns (string memory) {
        if(is_private==true)
            return privateimages[hash];
        else 
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
