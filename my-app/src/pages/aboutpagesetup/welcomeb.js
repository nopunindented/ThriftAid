import React from "react";
import Button from '@mui/material/Button';



export default function WelcomeButton() {
    return(
        <Button
      variant="text"
      sx={{
        color: "black",
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 300,
        textAlign: 'center',
        height: 30,
        left: -300,
        top: 100,
        borderRadius:10,
        textTransform: 'none',
        ":hover": {
          bgcolor: "#F7F3F3",
          color: "#25A96F"
        }
      }}
    onClick={'http://localhost:3000/search'}>
      Welcome!
    </Button>
  );
}
