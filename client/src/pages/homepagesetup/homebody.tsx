import React from "react";
import { styled } from "@mui/material/styles"; // Import styled from the correct location

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
    top: "42.5%",
    left: "15%",
    fontWeight: 400,
    fontSize: "9vh",
  },
  [theme.breakpoints.up('sm')]: {
    top: "37.5%",
    left: "13%",
    fontWeight: 400,
    fontSize: "16vh",
  },
  [theme.breakpoints.up('md')]: {
    top: "37.5%",
    left: "25%",
    fontWeight: 400,
    fontSize: "16vh",
  },
  [theme.breakpoints.up('lg')]: {
    top: "33.5%",
    left: "28.7%",
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

const HometextSecondary = styled('p')(({ theme }) => ({
    position: 'absolute',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    lineHeight: "135%",
    textAlign: 'center',
    letterSpacing: '0.05em',
    
    color: "#FFFFFF",
    mixBlendMode: 'normal',
    [theme.breakpoints.up('xs')]: {
        top: "57%",
        left: "20.5%",
        width: "66vw",
        fontWeight: 600,
        fontSize: "1.4vh",
    },
    [theme.breakpoints.up('sm')]: {
        top: "61%",
        left: "21.1%",
        width: "60vw",
        fontWeight: 600,
        fontSize: "1.8vh",
    },
    [theme.breakpoints.up('md')]: {
        top: "61%",
        left: "30.1%",
        width: "48vw",
        fontWeight: 600,
        fontSize: "1.8vh",
    },
    [theme.breakpoints.up('lg')]: {
        top: "58%",
        left: "33.5%",
        width: "40vw",
        fontWeight: 600,
        fontSize: "2vh",
    },
    [theme.breakpoints.up('xl')]: {
        top: "58%",
        left: "25.1%",
        width: "58vw",
        fontWeight: 600,
        fontSize: "2.4vh",
    },
  }));
  const EllipseOne = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: '42vw',
    height: '90%',
    left: '-8%',
    top: '-32%',
    borderRadius: '50%',
    background: 'rgba(120, 240, 187, 0.21)',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.up('xs')]: {
        width: '76vw',
        height: '90%',
        left: '-20%',
        top: '-40%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '46vw',
        height: '90%',
        left: '-10%',
        top: '-40%',
    },
    [theme.breakpoints.up('md')]: {
        width: '42vw',
        height: '90%',
        left: '-8%',
        top: '-32%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '42vw',
        height: '90%',
        left: '-8%',
        top: '-32%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '42vw',
        height: '90%',
        left: '-8%',
        top: '-32%',
    },
  }));

  const EllipseTwo = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: '50%',
    height: '90%',
    left: '80%',
    top: '-47%',
    borderRadius: '50%',
    background: 'rgba(120, 240, 187, 0.28)',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    [theme.breakpoints.up('xs')]: {
        width: '60%',
        height: '90%',
        left: '80%',
        top: -'47%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '50%',
        height: '90%',
        left: '80%',
        top: -'47%',
    },
    [theme.breakpoints.up('md')]: {
        width: '50%',
        height: '90%',
        left: '80%',
        top: -'47%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '50%',
        height: '90%',
        left: '80%',
        top: -'47%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '50%',
        height: '90%',
        left: '80%',
        top: '-47%',
    },
  }));

  const EllipseThree = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: '50%',
    height: '82%',
    left: '47%',
    top: '72%',
    borderRadius: '50%',
    background: 'rgba(120, 240, 187, 0.28)',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    [theme.breakpoints.up('xs')]: {
        width: '50%',
        height: '90%',
        left: '75%',
        top: -'47%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '50%',
        height: '90%',
        left: '80%',
        top: -'47%',
    },
    [theme.breakpoints.up('md')]: {
        width: '50%',
        height: '90%',
        left: '80%',
        top: -'47%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '50%',
        height: '82%',
        left: '47%',
        top: '72%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '50%',
        height: '82%',
        left: '47%',
        top: '72%',
    },
  }));
  
export default function Homebody() {
  return (
    <div>
      <div className="bodyofhome">
        <HometextMain>ThriftAid</HometextMain>
        <HometextSecondary>
          ThriftAid is an application that links thrift stores and homeless shelters, 
          with the goal of reducing waste. Thrift stores with excess clothes can post a listing,
          and a homeless shelter on the platform can choose to accept it. 
        </HometextSecondary>
        <EllipseOne />
        <EllipseTwo />
        <EllipseThree />
      </div>
    </div>
  );
}
