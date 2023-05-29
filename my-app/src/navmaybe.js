import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import UserNavbar from "./loggedinnavbar/UserNavbar";
import Userfront from "@userfront/react";

export default function NavbarMaybe() {
  const location = useLocation();
  const isLoggedOut = Userfront.accessToken() === null;

  const handleLogout = () => {
    Userfront.logout();
  };

  if (isLoggedOut) {
    return <Navbar />
  } else {
    return <UserNavbar handleLogout={handleLogout} />
  }
}



