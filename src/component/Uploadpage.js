// UploadPage naya wala.js

import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios";

import ImageUpload from "./ImageUpload";
import configuration from "./ImageStorage.json";

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
  const [publicImages, setPublicImages] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(0);

  const handleImageUpload = (image) => {
    // Handle image upload logic here
    console.log("Uploaded image:", image);
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
      await contract.methods
        .uploadImage(hash, encrypted_ipfshashlocal)
        .send({ from: accounts[0] });
      console.log("upload succesful");
      setIsSuccessful(1);
    };
    reader.readAsArrayBuffer(file);

    setPublicImages(image);
  };

  async function show_image() {
    let solidityObject = await contract.methods.get_Array().call();
    let solidityArray = solidityObject.toString();
    let final_array = solidityArray.split(",");
    console.log(final_array);

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
  }

  return (
    <>
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
              show_image();
            }}
          >
            View Images
          </button>
        </div>
      </div>
    </>
  );
};

export default Uploadpage;
