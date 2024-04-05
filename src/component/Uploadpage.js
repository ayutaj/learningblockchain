// UploadPage naya wala.js

import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { JSEncrypt } from "jsencrypt";

import ImageUpload from "./ImageUpload";
import configuration from "./ImageStorage.json";
import Navbar from "./Navbar";
import "./Uploadpage.css";

let contract;
let provider = window.ethereum;
const web3 = new Web3(provider);

const connect = async () => {
  if (typeof provider !== "undefined") {
    await provider.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log(account);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contractABI = configuration.abi;
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("connect successful");
  } else {
    console.log("Non-ethereum browser detected.Please install Metamask");
  }
};

window.addEventListener("load", async () => {
  connect();
  console.log("on load worked correctly");
});

const Uploadpage = (props) => {
  const publicKey = `-----BEGIN PUBLIC KEY-----${process.env.REACT_APP_PUBLIC_KEY}=-----END PUBLIC KEY-----`;
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----${process.env.REACT_APP_PRIVATEKEY}=-----END RSA PRIVATE KEY-----`;

  const [publicImages, setPublicImages] = useState(null);
  const [privateImages, setPrivateImages] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(0);

  const handleImageUpload = (image, privacy) => {
    // Handle image upload logic here
    console.log("Uploaded image:", image);
    console.log("Privacy setting:", privacy);
    setIsSuccessful(0);
    const file = image;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const formData = new FormData();
      formData.append("file", file);
      const resFile = await axios({
        method: "post",
        url: process.env.REACT_APP_PINATA_URL,
        data: formData,
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      const ipfsHash = resFile.data.IpfsHash;
      console.log(`ipfs hash ${ipfsHash}`);
      const accounts = await web3.eth.requestAccounts();
      const hash = web3.utils.keccak256(ipfsHash);
      console.log(`hash32byte ${hash}`);
      let encrypted_ipfshashlocal = ipfsHash;
      let is_private = privacy === "private";
      if (is_private) {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        encrypted_ipfshashlocal = encrypt.encrypt(ipfsHash);
      }

      console.log(`encryptd _ipfs hash ${encrypted_ipfshashlocal}`);
      await contract.methods
        .uploadImage(hash, encrypted_ipfshashlocal, is_private)
        .send({ from: accounts[0] });
      console.log("upload succesful");
      setIsSuccessful(1);
    };
    reader.readAsArrayBuffer(file);

    if (privacy === "public") {
      setPublicImages(image);
    } else {
      setPrivateImages(image);
    }
  };

  async function show_image(is_private) {
    let solidityObject = await contract.methods.get_Array(is_private).call();
    let solidityArray = solidityObject.toString();
    let final_array = solidityArray.split(",");
    console.log(final_array);

    if (is_private) {
      try {
        // console.log(`encryptd _ipfs hash ${encrypted_ipfshashlocal}`);
        let decrypt = new JSEncrypt();
        let private_arr = [];
        decrypt.setPrivateKey(privateKey);
        console.log("happy");
        for (let i = final_array.length - 1; i > -1; i = i - 1) {
          try {
            let decrypted_ipfshashlocal = decrypt.decrypt(final_array[i]);
            console.log(`decyphered result ${decrypted_ipfshashlocal}`);
            console.log("new year");
            if (decrypted_ipfshashlocal !== null) {
              private_arr.push(decrypted_ipfshashlocal);
            }
          } catch (e) {
            console.log(e);
          }
        }
        final_array.length = 0;
        final_array = [...private_arr];
      } catch (e) {
        console.log(e);
        console.log("error in retrieveing the IPFS hash");
      }
    }

    for (let i = 0; i < final_array.length; i = i + 1) {
      final_array[
        i
      ] = `${process.env.REACT_APP_PINATA_GATEWAY}${final_array[i]}`;
    }
    console.log(final_array);
    let tempimagestring = final_array.join(",");
    props.setImageArraystring_prop(tempimagestring);
    console.log("array string");
    console.log(props.ImageArraystring_prop);
    props.setisViewimage_prop(1);
    // console.log(props);
  }

  async function addUser() {
    const account_to_be_added = prompt("Enter the users account key");
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .add_user(account_to_be_added)
        .send({ from: accounts[0] });
      console.log("upload succesful");
      alert("Account added succesfully");
    } catch (e) {
      console.log(e);
      alert("Could not add account");
    }
    console.log(account_to_be_added);
  }

  return (
    <>
      <Navbar addUser_prop={addUser}></Navbar>
      <div className="upload-page-container">
        <h2>Upload Image</h2>
        <ImageUpload
          onUpload={handleImageUpload}
          setIsSuccessful_prop={setIsSuccessful}
          className="Imageupload"
        />
        <div>
          {isSuccessful === 1 && (
            <div>
              <p>Uploaded successfully</p>
            </div>
          )}
        </div>
        <div className="button-container">
          <button
            className="view-button"
            onClick={() => {
              show_image(false);
            }}
          >
            View Public Images
          </button>
          <button
            className="view-button"
            onClick={() => {
              show_image(true);
            }}
          >
            View Private Images
          </button>
        </div>
      </div>
    </>
  );
};

export default Uploadpage;
