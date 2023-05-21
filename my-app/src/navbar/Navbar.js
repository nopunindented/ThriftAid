import React from "react";
import AboutButton from "./aboutb.js";
import SearchButton from "./searchb.js";
import SignupButton from "./Signup.js";
import LoginButton from "./Login.js";

export default function Navbar () {
    return(
        <nav>
            <AboutButton />
            <SearchButton />
            <SignupButton />
            <LoginButton />
        </nav>
    )
}