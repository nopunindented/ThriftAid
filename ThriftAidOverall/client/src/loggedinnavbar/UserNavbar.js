import React from "react";
import { Link } from "react-router-dom";
import Logo from "../navbar/Logo.js";
import SearchButton from "../navbar/searchb.js";
import SignupButton from "../navbar/Signup.js";
import LoginButton from "../navbar/Login.js";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions.js";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../pages/account/accountnavbar.tsx";

const UserNavbar = ({ auth, logoutUser }) => {
  const navigate = useNavigate();
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
          <AccountMenu logoutUser={logoutUser} />
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
