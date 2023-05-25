import React from "react";
import { useLocation } from "react-router-dom";
import { withRouter } from 'react-router-dom';    
import Navbar from "./navbar/Navbar";

export default function NavbarMaybe() {
    let location= useLocation()
    if(location.pathname.match(/signup/) || location.pathname.match(/dashboard/)){
        return null;
    }
    else{
        return(
            <Navbar />
        )
        }
    }