import React from "react";
import { Link } from "react-router-dom";
import Logo from "../navbar/Logo.js";
import SearchButton from "../navbar/searchb.js";
import SignupButton from "../navbar/Signup.js";
import Userfront from "@userfront/react";
import LoginButton from "../navbar/Login.js";
import Logoutb from "../pages/account/loginpage/Logoutbutton.js";
import AccountMenu from "../pages/account/accountnavbar.tsx";

export default function UserNavbar() {
  const handleLogout = () => {
    Userfront.logout();
  };

  if(Userfront.accessToken()){
  return (
    <div>
      <nav>
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/postings">
          <SearchButton />
        </Link>
        <AccountMenu />
      </nav>
    </div>
  )
  }
  else{
    return(
        <div>
        <nav>
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/postings">
            <SearchButton />
          </Link>
          <Link to="/signup">
            <SignupButton />
          </Link>
          <Link to="/login">
            <LoginButton />
          </Link>
        </nav>
      </div> 
    )
  }
}