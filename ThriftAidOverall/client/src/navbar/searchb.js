import React from "react";
import Button from '@mui/material/Button';



export default function SearchButton() {
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
        left: -300,
        top: 19,
        textTransform: 'none',
        ":hover": {
          bgcolor: "#F7F3F3",
          color: "#25A96F"
        }
      }}
    onClick={'http://localhost:3000/postings'}>
      Search Postings
    </Button>
  );
}
