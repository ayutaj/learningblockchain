// import logo from './logo.svg';
// import './App.css';
// import Web3 from "web3";
// import configuration from "./ImageStorage.json";

// const connect = async ()=> {
//   if (typeof provider !== "undefined") {
//     await provider.request({ method: "eth_requestAccounts" });
//     const accounts = await web3.eth.getAccounts();
//     console.log(web3.eth);
//     const account = accounts[0];
//     console.log(account);
//     // ethereum waalaa 0xC0776E4Fe132324b4565B2C84674D92c7a1384CC
//     //0x9299018cb65f06aed4f37d98837a1478ced63352
//     const contractAddress = "0xC0776E4Fe132324b4565B2C84674D92c7a1384CC";
//     const contractABI = configuration.abi;
//     contract = new web3.eth.Contract(contractABI, contractAddress);
//     console.log("connect successful")

//   } else {
//     console.log("Non-ethereum browser detected.Please install Metamask");
//   }
// };

// let contract;
// let provider = window.ethereum;
// const web3 = new Web3(provider);

// const connect = async ()=> {
//   if (typeof provider !== "undefined") {
//     await provider.request({ method: "eth_requestAccounts" });
//     const accounts = await web3.eth.getAccounts();
//     const account = accounts[0];
//     console.log(account);
//     const contractAddress = "0xC0776E4Fe132324b4565B2C84674D92c7a1384CC";
//     const contractABI = configuration.abi;
//     contract = new web3.eth.Contract(contractABI, contractAddress);
//     // console.log(contract)
//     console.log("connect successful")

//   } else {
//     console.log("Non-ethereum browser detected.Please install Metamask");
//   }
// };

// window.addEventListener('load', async () => {
//   connect();
//   console.log("on load worked correctly");
// });
// async function uploadImage() {
//   const file = document.getElementById('imageInput').files[0];
//   console.log(file);
//   const reader = new FileReader();
//   // console.log(contract.methods.uploadImage.toString());
//   console.log("yo");
//   reader.onloadend = async () => {
//     const ipfsHash = await addToIPFS(reader.result);
//     const accounts = await web3.eth.requestAccounts();
//     const hash = web3.utils.keccak256(ipfsHash);
//     console.log(`hash32byte ${hash}`);
//     await contract.methods.uploadImage(hash, ipfsHash).send({ from: accounts[0] });
//     console.log("upload succesful");
//   };

//   reader.readAsArrayBuffer(file);
// }

// function helper()
// {
//   console.log("button working correctly");
// }

// function arrayBufferToBase64(buffer) {
//   const binary = new Uint8Array(buffer);
//   const bytes = [];
//   binary.forEach(byte => bytes.push(String.fromCharCode(byte)));
//   return btoa(bytes.join(''));
// }

// async function retrieveImage() {

//    const hash = document.getElementById('hashInput').value;
//     console.log(`retrieved hash32byte ${hash}`);
//     const ipfsHash = await contract.methods.getImage(hash).call();

//     // Fetch the image from IPFS
//     const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
//     const buffer = await response.arrayBuffer();

//     // Convert ArrayBuffer to base64 string
//     const base64Image = arrayBufferToBase64(buffer);
//     console.log(base64Image);

//     // Display the image
//     document.getElementById('imageDisplay').innerHTML = `<img src="data:image/jpeg;base64,${base64Image}" alt="Uploaded Image">`;

// }

// //5001
// async function addToIPFS(data) {
//   const formData = new FormData();
//   formData.append('file', data);
//   const res = await fetch('http://localhost:5001/api/v0/add', {
//       method: 'POST',
//       body: formData,
//   });
//   const json = await res.json();
//   console.log(`ipfs hash : ${json.Hash}`);
//   return json.Hash;
// }

// function App() {
//   return (
//     <div className="App">
//       <button onClick={helper}>do something</button>
//       <h1>Image Upload</h1>
//       <input type="file" id="imageInput"/>
//       <button onClick={uploadImage}>Upload</button>
//       <h1>Image Retrieval</h1>
//       <input type="text" id="hashInput" placeholder="Enter image hash"/>
//       <button onClick={retrieveImage}>Retrieve</button>
//       <div id="imageDisplay"></div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import configuration from "./ImageStorage.json";
import { create } from "ipfs-http-client";
const ipfs = create("http://localhost:5001");
let contract;
let provider = window.ethereum;
const web3 = new Web3(provider);

const connect = async () => {
  if (typeof provider !== "undefined") {
    await provider.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log(account);
    const contractAddress = "0xC0776E4Fe132324b4565B2C84674D92c7a1384CC";
    const contractABI = configuration.abi;
    contract = new web3.eth.Contract(contractABI, contractAddress);
    // console.log(contract)
    console.log("connect successful");
  } else {
    console.log("Non-ethereum browser detected.Please install Metamask");
  }
};

window.addEventListener("load", async () => {
  connect();
  console.log("one time");
});
function App() {
  const [image, setImage] = useState(null);

  async function uploadImage() {
    const file = document.getElementById("imageInput").files[0];
    // console.log(file);
    const reader = new FileReader();
    // // console.log(contract.methods.uploadImage.toString());
    // console.log("yo");
    reader.onloadend = async () => {
      const ipfsHash = await addToIPFS(file);
      const accounts = await web3.eth.requestAccounts();
      const hash = web3.utils.keccak256(ipfsHash);
      console.log(`hash32byte ${hash}`);
      await contract.methods
        .uploadImage(hash, ipfsHash)
        .send({ from: accounts[0] });
      console.log("upload succesful");
    };
    // const files = form[0].files;

    // if (!files || files.length === 0) {
    //   return alert("No files selected");
    // }

    // const file = files[0];
    // upload files
    // console.log(ipfs);
    // const result = await ipfs.add(file);
    // console.log(result);
    // console.log(result.path)
    //ass
    reader.readAsArrayBuffer(file);
  }

  function helper() {
    console.log("button working correctly");
  }

  async function retrieveImage() {
    const hash = document.getElementById("hashInput").value;
    console.log(`retrieved hash32byte ${hash}`);
    const ipfsHash = await contract.methods.getImage(hash).call();
    // Fetch the image from IPFS
    // const response = await fetch(`http://localhost:8080/ipfs/${ipfsHash}`);
    // console.log(`retrieved ipfs ${ipfsHash}`);

    // if (!response.ok) {
    //   console.error('Failed to retrieve image:', response.statusText);
    //   return;
    // }
    // else
    // {
    // console.log(response);
    // }
    // setImage(response)
    console.log(ipfsHash);
    setImage(`http://127.0.0.1:8080/ipfs/${ipfsHash}`);
    // console.log(imageUrl);
  }

  //5001
  async function addToIPFS(file) {
    const result = await ipfs.add(file);
    console.log(result);
    console.log(result.path);
    return result.path;

    // console.log(data);
    // let enc = new TextDecoder(); // always utf-8
    // let pakoda =enc.decode(data);

    // // let pakoda = data.toString('base64');
    // // console.log(pakoda);

    // // formData.append('file', data);
    // const res = await fetch('http://localhost:5001/api/v0/add', {
    //     method: 'POST',
    //     body: `"${pakoda}"`,
    // });
    // const json = await res.json();
    // console.log(`ipfs hash : ${json.Hash}`);
    // return json.Hash;
  }

  return (
    <div className="App">
      <button onClick={helper}>do something</button>
      <h1>Image Upload</h1>
      <input type="file" id="imageInput" />
      <button onClick={uploadImage}>Upload</button>
      <h1>Image Retrieval</h1>
      <input type="text" id="hashInput" placeholder="Enter image hash" />
      <button onClick={retrieveImage}>Retrieve</button>
      <div id="imageDisplay">
        {image && <img src={image} alt="Uploaded Image" />}
      </div>
    </div>
  );
}

export default App;

// // SPDX-License-Identifier: GPL-3.0
// pragma solidity ^0.8.1;

// contract ImageStorage {
//     mapping(bytes32 => string) private images;
//     struct Set {
//         string[] arr;
//         mapping (string => int) is_in;
//     }

//     Set my_set;

//     function insert_user(string memory val) public {
//         if (my_set.is_in[val]==0) {
//             my_set.arr.push(val);
//             my_set.is_in[val] = 1;
//         }
//     }
//     function check_in_set(string memory key) public view returns(int){
//         return my_set.is_in[key];
//     }

//     function uploadImage(bytes32 hash, string memory ipfsHash) public {
//         images[hash] = ipfsHash;
//     }

//     function getImage(bytes32 hash) public view returns (string memory) {
//         return images[hash];
//     }
// }

const handleDownload = () => {
  const anchor = document.createElement("a");
  anchor.href = image;
  anchor.download = "downloaded_file"; // You can set the desired filename here
  anchor.target = "_blank";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

async function retrieveImage() {
  const hash = document.getElementById("hashInput").value;
  console.log(`retrieved hash32byte ${hash}`);
  const encrypted_ipfshashlocal = await contract.methods.getImage(hash).call();
  try {
    console.log(`encryptd _ipfs hash ${encrypted_ipfshashlocal}`);
    let decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    let decrypted_ipfshashlocal = decrypt.decrypt(encrypted_ipfshashlocal);
    // let decrypted_ipfshashlocal=encrypted_ipfshashlocal;
    console.log(`decrypted ipfshash ${decrypted_ipfshashlocal}`);
    setImage(
      `${process.env.REACT_APP_PINATA_GATEWAY}${decrypted_ipfshashlocal}`
    );
  } catch (e) {
    console.log("error in retrieveing the IPFS hash");
  }
}

setisViewimage(1);
// const hash = document.getElementById('hashInput').value;
// console.log(`retrieved hash32byte ${hash}`);
// const encrypted_ipfshashlocal = await contract.methods.getImage(hash).call();
let final_array = await contract.methods.get_Array(is_private);
if (is_private) {
  try {
    // console.log(`encryptd _ipfs hash ${encrypted_ipfshashlocal}`);
    let decrypt = new JSEncrypt();
    let private_arr;
    decrypt.setPrivateKey(privateKey);
    for (let i = final_array.length - 1; i > -1; i = i - 1) {
      try {
        let decrypted_ipfshashlocal = decrypt.decrypt(final_array[i]);
        if (decrypted_ipfshashlocal !== false) {
          private_arr.push(decrypted_ipfshashlocal);
        }
      } catch (e) {
        console.log(e);
      }
    }
    final_array.length = 0;
    final_array = [...private_arr];
    // // let decrypted_ipfshashlocal=encrypted_ipfshashlocal;
    // console.log(`decrypted ipfshash ${decrypted_ipfshashlocal}`);
    // setImage( `${process.env.REACT_APP_PINATA_GATEWAY}${decrypted_ipfshashlocal}`)
  } catch (e) {
    console.log("error in retrieveing the IPFS hash");
  }
}

if (is_private) final_array.push("private_array");
else final_array.push("public_array");

console.log(final_array);

//     import React from 'react';

// function ViewImagePage(props)
// {
//     let arr=props.imageArraystring_prop.split(',');
//     console.log("viewpage");
//     console.log(arr);
//     return (
//         <div>
//             <button onClick={props.back_to_uploadpage_prop}>Back</button>
//             <div>
//                 {arr.map((link, index) => (
//                     <img key={index} src={link} alt={`Image ${index}`} style={{ width: '200px', height: '200px', margin: '5px' }} />
//                     ))}
//             </div>
//             <div>did it work?</div>
//         </div>
//     )
// }
// export default ViewImagePage;
let publickey =
  "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApcdrBnaHteTXeJo24s/ZoEccsooq5TZtsPpPsSNfSUHaOE68OciHx8blO2Kp/bAcmIBKrqiD4tHsrki2ityXsOHLkzoXTJ3Ckzp/h4fmjAryLo40XdGJaDcbJLsYyflTELYz9oOpcuqxG6FXduhRabcs1hBP82QPuPzQEr8UttWy0UD3oJ4qM97SS3LxRprLq5tP2GIur5jRO63W6cJViyPlfKmvr6706D4TA5Bu0GIQ8H3aSthDpi5LWhTwpeKlZn9EJorr/8CJhx2qHX2hDeQkkSrHpbOcqsJORf0cShtAKNxw1LMUl6U8Keqm3yni48innidnryV7WrCkwtZCHwIDAQAB-----END PUBLIC KEY-----";
let privatekeya =
  "-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEApcdrBnaHteTXeJo24s/ZoEccsooq5TZtsPpPsSNfSUHaOE68OciHx8blO2Kp/bAcmIBKrqiD4tHsrki2ityXsOHLkzoXTJ3Ckzp/h4fmjAryLo40XdGJaDcbJLsYyflTELYz9oOpcuqxG6FXduhRabcs1hBP82QPuPzQEr8UttWy0UD3oJ4qM97SS3LxRprLq5tP2GIur5jRO63W6cJViyPlfKmvr6706D4TA5Bu0GIQ8H3aSthDpi5LWhTwpeKlZn9EJorr/8CJhx2qHX2hDeQkkSrHpbOcqsJORf0cShtAKNxw1LMUl6U8Keqm3yni48innidnryV7WrCkwtZCHwIDAQABAoIBAEl7vcsdm0Zba89/vDiJnZPYMbZKXH1BxRmfutdwMHqOgCZZcEHEy7sYROAv+d4DxIksxO3qsJtIJjuS66dd5Ld5Pv3B0DYb7/XHBmSTLvSAnZ1ZV4kGqnvRgWykqnZM2C8eNKZe8iuIMH1o5RZGIGBV27//dxESF44OMkU9AfeQxi8W9DU3rx0Oz6CbmKNNNSnrFhOB5Kv5wvmTKYivCKMpAELxGTOCaRoVAamqSdZFFMXqW6DGtY2Wy9SjroqxVdOFKp1Xc8AfSmGKT+qKg6XrpTmm2509tj4N3kcSJAU5FgOTN+yNKfqy/28LkLDdwtimLBimtHIp/EagQQJU7vECgYEA6QbuiHXPWgD7rIxXZmV8o+6dPXKh5Db8TMcXJE4OnVmFQNy5Po3B0Q+eea7OaCj9vepIsC4A6ET3uIGgsfBxZRiVo3rK4ChW6mpYNdMv311Arh7nN083VF4YZEUuoPPBsertdcXzoHDmAUQqNDREHiwcG9lYOAh4V+qwn7Uw2P0CgYEAth9MdzPeMmFCPqfL/alju9jWYYKIXapqS8erslhezyzCKX+e+pm5tJygsaW6AteNZgPWAybiZ6BXkoQAGtbKIN8vWZ70OT8klLBWZ8Bi0QmP0Y4XvMljK/F43IMMz5/n6vFFwH4S9IyTCybLyHGPZFLr+JOzGaXPFHN3rXh4cEsCgYAkOZujQw005Ko7LKX5mRVDNrji8IsSOyoFlX2XezryYxQ//RAfFVJn+ZGdQPt9XcH0YBNksAIcGXyZBi3A+6vlF2lLvK8FIcBBOL71vxrWEl0XtF4lTv8+8lHAZLDW/I3D5s17XYZ+Do7y63HUI7vjJOBJxAPe0hJDOIy0hypM0QKBgCxupGQsplgaPGQ24eDIE8n/lAYEJ6raacaFN1Fyl+bpn5EqTqoLGTCESfwtV51b42ZxJyRrty7bAqJ/S9tAbd3pNY8i5aiVzCHuh5YWbMVdFNZmWUo4w9Yzum3qFxUMiTNbm83jtFIvfaxp0avccMRkKqfhuP9X4Za2uQr8aj3TAoGBAJDHXMUbCNIM/unGcb2A5TCl5Y+i1C9hU9n16XhFkgruq04yb1elwRV3Us/vGHcKY1g2OHyCMxUTNC1PAw68eiUwQQdvVKZoQb4LuoPrHk56YzxSt6AZ0JgE3fA9M3799h9i3sPmqMepg7I8onmHCnB9Ri8RHbAGeLTBy5W/8FWp-----END RSA PRIVATE KEY----";
