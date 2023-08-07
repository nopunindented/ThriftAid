import React from "react";
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const CustomButton = styled(Button)({
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
  backgroundColor: "#25A96F",
  "&:hover": {
    backgroundColor: "#F7F3F3",
    color: "#25A96F"
  }
});

export default function SearchButton() {
  const handleButtonClick = () => {
    window.location.href = 'http://localhost:3000/postings';
  };

  return (
    <CustomButton variant="text" onClick={handleButtonClick}>
      Search Postings
    </CustomButton>
  );
}