import React from "react";
import { Button, Grid, Typography, Input } from "@mui/material";

export default function LandingBlock({
  handleClick,
}: {
  handleClick: (state: string) => void;
}) {
  return (
    <>
      <Typography variant="h2" sx={{fontFamily:'cursive',}}>One Stop : Multiple Blockchains </Typography>
      <Grid>
        <Typography variant="h6" >Choose your preffered blockchain</Typography>
        <Grid sx={{ display: "flex", gap: "10px" }}>
          <Button
          className="button"
            variant="contained"
            onClick={() => {
              handleClick("Solana");
            }}
            sx={{
              backgroundColor: "black",
              "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
            }}
          >
            SOLANA
          </Button>
          <Button variant="contained" disabled>
            BITCOIN
          </Button>
          <Button variant="contained" disabled>
            ETHERIUM
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
