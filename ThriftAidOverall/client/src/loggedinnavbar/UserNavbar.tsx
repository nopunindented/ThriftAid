import React from "react";
import { Link } from "react-router-dom";
import Logo from "../navbar/Logo.tsx";
import SearchButton from "../navbar/searchb.tsx";
import SignupButton from "../navbar/Signup.tsx";
import LoginButton from "../navbar/Login.tsx";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions.js";
import AccountMenu from "../pages/account/accountnavbar.tsx";

const UserNavbar = ({ auth, logoutUser }) => {
  const currentPath = window.location.pathname;

  if (auth.isAuthenticated) {
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
    );
  } else if (currentPath === "/login" || currentPath === "/register") {
    return null;
  } else {
    return (
      <div>
        <nav>
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/postings">
            <SearchButton />
          </Link>
          <SignupButton />
          <LoginButton />
        </nav>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(UserNavbar);
