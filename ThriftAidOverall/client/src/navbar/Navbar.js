import React from "react";
import SearchButton from "./searchb.js";
import SignupButton from "./Signup.tsx";
import Logo from './Logo.js';
import { Link } from "react-router-dom";
import Userfront from "@userfront/react";
import LoginButton from "./Login.js";

export default function Navbar() {
  const isLoggedOut = Userfront.accessToken() === null;

  return (
    <div>
      <nav>
        <Link to='/'><Logo /></Link>
        <Link to='/postings'><SearchButton /></Link>
        <Link to='/signup'><SignupButton /></Link>
        <Link to='/login'><SignupButton /><LoginButton /></Link>
      </nav>
    </div>
  )
}



