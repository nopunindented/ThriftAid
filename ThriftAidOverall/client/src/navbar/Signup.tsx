import React from "react";
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles"; // Import styled from the correct location
import Typography from "@mui/material/Typography"; // Import Typography
import { useTheme } from "@mui/material/styles";

const handleSignupBClick = () => {
  window.location.href = 'http://localhost:3000/register';
};

export default function SignupButton() {
    const theme= useTheme();
    return(
        <Button
      variant="text"
      sx={{
        color: "#F7F3F3",
        fontFamily: 'Noto Sans',
        fontSize: "4vh",
        fontStyle: 'normal',
        fontWeight: 700,
        textAlign: 'center',
        height: "50%",
        left: "73%",
        top: "24%",
        textTransform: 'none',
        ":hover": {
          bgcolor: "#F7F3F3",
          color: "#25A96F"
        },
        [theme.breakpoints.up('xl')]: {
          height: "50%",
          left: "74%",
          top: "24%",
        },
        [theme.breakpoints.up('lg')]: {
          height: "50%",
          left: "72.9%",
          top: "24%",
        },
        [theme.breakpoints.up('md')]: {
          height: "50%",
          left: "62.9%",
          top: "24%",
        },
        [theme.breakpoints.up('sm')]: {
          height: "50%",
          left: "50%",
          top: "24%",
        },
        [theme.breakpoints.up('xs')]: {
          height: "50%",
          left: "10%",
          top: "46%",
        },
      }}
    onClick={handleSignupBClick}>
      Sign up
    </Button>
  );
}