// LoginPage naya waala.js

import React from "react";
import "./LoginPage.css";
import Web3 from "web3";
import configuration from "./ImageStorage.json";

async function addUser(acc, account__a) {
  try {
    console.log("upload succesful");
    alert("Account added succesfully");
  } catch (e) {
    console.log(e);
    alert("Could not add account");
  }
}

function Loginpage(props) {
  const checkAuthentication = async () => {
    const provider = window.ethereum;
    if (typeof provider !== "undefined") {
      const web3 = new Web3(provider);
      await provider.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const contractABI = configuration.abi;
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log(account);
      console.log(contract);
      try {
        let isuser = await contract.methods.users(account).call();
        console.log(isuser);
        isuser = Number(isuser);
        if (props.isauntenticated_prop !== "2") {
          if (isuser !== 1) {
            await contract.methods.add_user(account).send({ from: account });
          }
          props.setisAuthenticated_prop("2");
        }
      } catch (e) {
        console.log(e);
        console.log("you are not authorized");
        alert(
          "You can not login this network, ask admin to add you in network"
        );
      }
    } else {
      console.log("Non-ethereum browser detected.Please install Metamask");
      alert("install metamask");
      return;
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p className="welcome">
        <strong>📸PICVAULT🔐</strong>
      </p>
      <button onClick={checkAuthentication} className="login-button">
        Connect to MetaMask
      </button>
    </div>
  );
}

export default Loginpage;
