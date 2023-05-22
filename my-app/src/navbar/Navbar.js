import React from "react";
import AboutButton from "./aboutb.js";
import SearchButton from "./searchb.js";
import SignupButton from "./Signup.js";
import LoginButton from "./Login.js";
import Logo from './Logo.js'

export default function Navbar () {
    return(
        <div>
            <nav>
                <Logo />
                <AboutButton />
                <SearchButton />
                <SignupButton />
                <LoginButton />
            </nav>
        </div>
    )
}
