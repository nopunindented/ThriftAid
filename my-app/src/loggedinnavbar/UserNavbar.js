import React from "react";
import Userfront from "@userfront/react";
import SearchButton from "../navbar/searchb.js";
import SignupButton from "../navbar/Signup.js";
import Logo from "../navbar/Logo.js";
import { Link } from "react-router-dom";

const LogoutButton = Userfront.build({
  toolId: "bamlmrd"
});

export default function UserNavbar({ isLoggedIn, handleLogout }) {
  return (
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
        {isLoggedIn && <LogoutButton onClick={handleLogout} />}
      </nav>
    </div>
  );
}
