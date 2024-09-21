import React from 'react'
import { Button, Grid, Typography, Input } from "@mui/material";

export default function Header() {
  return (
    <Grid sx={{ display: "flex", flexDirection: "row" }}>
        <img src="cryptoWallet.png" alt="logo" style={{ width: "50px" }}></img>
        <Typography
          sx={{
            fontSize: "30px",
            fontFamily:'cursive',
            lineHeight: "1",
            display: "flex",
            alignItems: "flex-end",
            pl: "10px",
          }}
        >
          Roto
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>v1.0</Typography>
      </Grid>
  )
}
