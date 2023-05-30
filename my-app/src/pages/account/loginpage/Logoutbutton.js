import React from "react";
import Userfront from "@userfront/react";
import Button from '@mui/material/Button';

Userfront.init("rbv5jmqn");


export default function Logoutb() {
  const handleLogout = () => {
    Userfront.logout();
  };
  return(
      <Button
    variant="text"
    sx={{
      color: "#F7F3F3",
      fontFamily: 'Noto Sans',
      fontSize: 30,
      fontStyle: 'normal',
      fontWeight: 700,
      textAlign: 'center',
      height: 50,
      left: 500,
      top: 19,
      textTransform: 'none',
      ":hover": {
        bgcolor: "#F7F3F3",
        color: "#25A96F"
      }
    }}
  onClick={handleLogout}>
    Logout
  </Button>
);
}