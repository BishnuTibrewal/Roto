import React from "react";
import logo from "./logo.svg";
import { Button, Grid, Typography, Input, Alert } from "@mui/material";
import "./App.css";
import { Buffer } from "buffer";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

import { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import LandingBlock from "./Components/LandingBlock";
import Header from "./Components/Header";
import Solana from "./Components/Solana";
import Toast from './Components/Toast';

// @ts-ignore
window.Buffer = Buffer;

function App() {
  const [secretPhrase, setSecretPhrase] = useState("");
  const[blockState, setBlockState] = useState("Landing");
  const [toastResponse, settoastResponse] = useState<{show:boolean, message: string, severity?:any}>({ show: false, message: "" });

  const handleClick=(state : string)=>{
    setBlockState(state)
    settoastResponse({
      show: true,
      message: "Keep your SEED & Private Keys secret",
      severity: "info",
    });
  }

  
  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        minHeight:'100vh',
        p: "20px",
        pb:'50px',
        display:'flex',
        flexDirection:'column',
      }}
    >
      <Header></Header>
      <Grid px="5%" py='5%' minHeight={'80vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
      {blockState ==='Landing' &&(<LandingBlock handleClick={handleClick}></LandingBlock>)}
      {blockState==='Solana' && (<Solana></Solana>)}</Grid>
      {toastResponse.show && (
        <Toast
          show={toastResponse.show}
          severity={toastResponse?.severity}
          message={toastResponse.message}
          onClose={() => {
            settoastResponse({ show: false, message: "" });
          }}
        ></Toast>
      )}
    </Grid>
  );
}

export default App;
