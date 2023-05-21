import React from "react";
import Button from '@mui/material/Button';



export default function AboutButton() {
    return(
        <Button
      variant="text"
      sx={{
        color: "#F7F3F3",
        ":hover": {
          bgcolor: "#F7F3F3",
          color: "#25A96F"
        }
      }}
    >
      About
    </Button>
  );
}