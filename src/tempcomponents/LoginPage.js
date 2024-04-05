import React, {useState} from 'react';
import Web3 from "web3";


function Login(props)
{
    return (
        <div>
            <button onClick={props.checkAuthentication_prop}>login</button>
        </div>
        );
}
export default Login;