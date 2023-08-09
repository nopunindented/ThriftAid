import React from "react";
import Button from '@mui/material/Button';
import { useTheme } from "@mui/material/styles";

const handleLoginClick = () => {
  window.location.href = 'https://thriftaidforall.com/login';
};

export default function LoginButton() {
  const theme= useTheme();
    return(
        <Button
      variant="text"
      sx={{
        color: "#F7F3F3",
        fontFamily: 'Noto Sans',
        fontSize: "4.2vh",
        fontStyle: 'normal',
        fontWeight: 700,
        textAlign: 'center',
        height: "50%",
        left: "56.5%",
        top: "23%",
        textTransform: 'none',
        ":hover": {
          bgcolor: "#F7F3F3",
          color: "#25A96F"
        },
        [theme.breakpoints.up('xl')]: {
          height: "50%",
          left: "56.5%",
          top: "23%",
        },
        [theme.breakpoints.up('lg')]: {
          height: "50%",
          left: "55%",
          top: "23%",
        },
        [theme.breakpoints.up('md')]: {
          height: "50%",
          left: "41.5%",
          top: "23%",
        },
        [theme.breakpoints.up('sm')]: {
          height: "50%",
          left: "22.5%",
          top: "23%",
        },
        [theme.breakpoints.up('xs')]: {
          height: "42%",
          left: "74%",
          top: "-48%",
        },
      }}
    onClick={handleLoginClick}>
      Login
    </Button>
  );
}