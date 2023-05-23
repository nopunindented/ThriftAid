import React from "react";
import SearchButton from "./searchb.js";
import SignupButton from "./Signup.js";
import LoginButton from "./Login.js";
import Logo from './Logo.js'
import { Link } from "react-router-dom";

export default function Navbar () {
    return(
        <div>
            <nav>
                <Link to='/'><Logo /></Link>
                <Link to='/postings'><SearchButton /></Link>
                <Link to='/signup'><SignupButton /></Link>
                <Link to='/login'><LoginButton /></Link>
            </nav>
        </div>
    )
}
