import React from "react";
import Button from '@mui/material/Button';


const handleLoginClick = () => {
  window.location.href = 'http://localhost:3000/login';
};

export default function LoginButton() {
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
        }
      }}
    onClick={handleLoginClick}>
      Login
    </Button>
  );
}