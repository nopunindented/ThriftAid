import React from "react";
import { styled } from "@mui/material/styles"; // Import styled from the correct location
import Typography from "@mui/material/Typography"; // Import Typography
import { useTheme } from "@mui/material/styles";

const HometextMain = styled('h1')(({ theme }) => ({ // Rename the component to start with an uppercase letter
  position: 'absolute',
  top: "25.5%",
  left: "21.7%",
  fontWeight: 400,
  fontSize: "24vh",
  lineHeight: "66%",
  letterSpacing: "0.1em",
  fontFamily: 'Share Tech Mono',
  fontStyle: 'normal',
  color: "#F7F3F3",
  mixBlendMode: 'normal',
  textShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)',
  [theme.breakpoints.up('xs')]: {
    top: '89%',
    width: "90%",
    left: '0.8%',
  },
  [theme.breakpoints.up('sm')]: {
    top: '106%',
    width: "85%",
    left: '0.8%',
  },
  [theme.breakpoints.up('md')]: {
    top: '108%',
    width: '77.6%',
    left: '5%',
  },
  [theme.breakpoints.up('lg')]: {
    top: "30.5%",
    left: "24.7%",
    fontWeight: 400,
    fontSize: "17vh",
  },
  [theme.breakpoints.up('xl')]: {
    top: "25.5%",
    left: "21.7%",
    fontWeight: 400,
    fontSize: "24vh",
  },
}));

export default function Homebody() {
  return (
    <div>
      <div className="bodyofhome">
        <HometextMain>ThriftAid</HometextMain>
        <p className="hometextsecondary">
          ThriftAid is an application that links thrift stores and homeless shelters, 
          with the goal of reducing waste. Thrift stores with excess clothes can post a listing,
          and a homeless shelter on the platform can choose to accept it. 
        </p>
        <ellipse className="ellipse1" />
        <ellipse className="ellipse2" />
        <ellipse className="ellipse3" />
      </div>
    </div>
  );
}
