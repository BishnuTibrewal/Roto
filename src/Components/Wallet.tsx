import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Grid, Typography } from "@mui/material";
import './components.css'

export default function Wallet({
  index,
  pair,
}: {
  index: number;
  pair: { publicKey: string; privateKey: string };
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
        <Box border={'1px solid lightgray'} borderRadius='10px' sx={{boxShadow:'20px'}}>
            <Typography variant='h5' fontWeight={'medium'} sx={{padding:'20px' }}>{`Wallet${index+1}`}</Typography>
            <Box sx={{backgroundColor:'lightgray', padding:'20px'}}>
        <Typography variant='h6'paddingTop={'20px'}>PUBLIC KEY</Typography>
        <Grid display={"flex"} container>
          <Grid item xs={10}>
            <Typography>{pair.publicKey}</Typography>
          </Grid>
          
        </Grid>
      </Box>
      <Box sx={{backgroundColor:'lightgray', padding:'20px'}}>
        <Typography variant='h6' paddingTop={'20px'}>PRIVATE KEY</Typography>
        <Grid display={"flex"} container>
          <Grid item xs={11}>
            {!showPassword && (<Typography variant="h5">...........................................................</Typography>)}
            {showPassword && (<Typography>{pair.privateKey}</Typography>)}
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              className="showHideIcon"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Grid>
        </Grid>
      </Box></Box>
  );
}
