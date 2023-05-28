import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import UserNavbar from "./loggedinnavbar/UserNavbar";
import Userfront from "@userfront/react";

export default function NavbarMaybe() {
  const location = useLocation();

  // Check if the user is logged in
  const isLoggedIn = Userfront.accessToken() !== null;

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    Userfront.logout();
    setIsLoggedOut(true);
  };

  if (isLoggedIn) {
    // If the user is logged in, render UserNavbar
    return (
      <>
        {isLoggedOut ? (
          <Navbar />
        ) : (
          <UserNavbar handleLogout={handleLogout} />
        )}
      </>
    );
  } else {
    // If the user is not logged in, render Navbar
    return <Navbar />;
  }
}

