import React from "react";
import { Button, Grid, Typography, Input, FormControl } from "@mui/material";
import { Buffer } from "buffer";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

import { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ClearIcon from '@mui/icons-material/Clear';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import bs58 from "bs58";
import Toast from "./Toast";
import "./components.css";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Wallet from "./Wallet";

// @ts-ignore
window.Buffer = Buffer;

export default function Solana() {
  const [toastResponse, settoastResponse] = useState<{
    show: boolean;
    message: string;
    severity?: any;
  }>({ show: false, message: "" });

  const [secretPhrase, setSecretPhrase] = useState("");
  const [index, setIndex] = useState(0);
  const [secretArray, setSecretArray] = useState<String[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [wallets, setWallets] = useState<
    { publicKey: string; privateKey: string }[]
  >([]);
  const [buttonText, setButtonText] = useState("Generate Wallet");

  useEffect(() => {
    console.log(secretPhrase, "abcd");
    if (secretPhrase !== "") {
      setButtonText("Fetch Wallet");
    }
    setSecretArray(secretPhrase.split(" "));
  }, [secretPhrase]);

  const handleGenerate = () => {
    setIsGenerated(true);
    let seed;
    if (secretPhrase === "") {
      const mnemonic = generateMnemonic();
      setSecretPhrase(mnemonic);
      seed = mnemonicToSeedSync(mnemonic);
    } else {
      seed = mnemonicToSeedSync(secretPhrase);
    }
    const path = `m/44'/501'/0'/${index}'`; // This is the derivation path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    setIndex(index + 1);
    let demo = wallets;
    demo.push({
      publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
      privateKey: bs58.encode(secret),
    });
    setWallets(demo);
    settoastResponse({
      show: true,
      message: "Your Solana wallet(s) are updated !!",
      severity: "success",
    });
  };

  return (
    <Grid display={"flex"} flexDirection={"column"} rowGap={"30px"}>
      {!isGenerated && (
        <>
        <Typography variant="h3" sx={{fontFamily:'cursive',}}>Secret Recovery Phrase</Typography>
        <Typography variant="h6" >Keep them highly confidential</Typography>
          <Input
            onChange={(event) => {
              setSecretPhrase(event.target.value);
              console.log("abcdeeeeee", secretPhrase);
            }}
            type="password"
            placeholder="Enter your SEED (Secret Recovery Phrase), Or leave empty to create new"
            fullWidth
          ></Input>
          <Button
            className="button"
            variant="contained"
            onClick={handleGenerate}
            sx={{
              backgroundColor: "black",
              minWidth: "20%",
              maxWidth:'50%',
              "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
            }}
          >
            {buttonText}
          </Button>
        </>
      )}

      {isGenerated && (
        <Accordion sx={{border:'1px solid lightgray'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6" sx={{fontFamily:'cursive', fontWeight:'bold'}}>Your Secret Phrase</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container rowGap={"10px"}>
              {secretArray.map((key, index) => {
                return (
                  <Grid
                    item
                    xs={4}
                    md={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        minWidth: "50%",
                        backgroundColor: "black",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(key.toString());
                        settoastResponse({
                          show: true,
                          message: "Word copied to Clipboard.",
                          severity: "success",
                        });
                      }}
                    >
                      {key}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
            <Grid pt={"20px"}>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(secretPhrase);
                  settoastResponse({
                    show: true,
                    message: "Phrase copied to Clipboard.",
                    severity: "success",
                  });
                }}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                COPY YOUR SEED
              </Button>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {isGenerated && (
        <Grid display="flex" container mt={'5%'}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{fontFamily:'cursive'}}>{"Solana Wallet(s)"}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            justifyContent={"flex-end"}
            gap="10px"
          >
            <Button
              className="button"
              onClick={handleGenerate}
              variant="contained"
              sx={{
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Add Wallet
            </Button>
            <Button
            className="deleteButton"
              onClick={() => {
                setIndex(0);
                setWallets([]);
              }}
              variant="contained"
              sx={{
                backgroundColor: "red",
                minWidth:'220px',
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              <Typography className='deleteText'>Delete</Typography>
              <ClearIcon  name='deleteIcon'></ClearIcon>
            </Button>
          </Grid>
        </Grid>
      )}

      {isGenerated && (
        <Grid container rowGap={"20px"}>
          {wallets.map((wallet, index) => {
            return (
              <Grid item xs={12}>
                <Wallet index={index} pair={wallet}></Wallet>
              </Grid>
            );
          })}
        </Grid>
      )}

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
