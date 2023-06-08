import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ auth, logoutUser }) => {
  console.log(auth);
  const navigate = useNavigate();
  const { user, isAuthenticated } = auth;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner or any other indication
  }

  if (!user || !user.email) {
    console.log(user); // Add this line
    console.log(user && user.email);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> User
            </h4>
            <p className="flow-text grey-text text-darken-1">
              An error occurred while retrieving user data.
            </p>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hey there,</b> {user.email}
          </h4>
          <p className="flow-text grey-text text-darken-1">
            Your user type is: {user.usertype}
          </p>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
