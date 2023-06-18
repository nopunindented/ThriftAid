import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
    console.log(user && user.email && user.usertype);
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

  else if(user.usertype==='thrift store'){
  return (
    <div>
      <div className="pastpostings">
        Your past postings:
      </div>
      
      <Button
        type="submit"
        sx={{
          position: "absolute",
          display: "flex",
          color: "#F7F3F3",
          fontFamily: "Noto Sans",
          fontSize: 15,
          fontStyle: "normal",
          fontWeight: 700,
          textAlign: "center",
          height: 30,
          left: "40%",
          top: "55%",
          width: 317,
          textTransform: "none",
          bgcolor: "#24a0ed",
          ":hover": {
            bgcolor: "#0792e8",
            color: "#F7F3F3",
            textTransform: "none"
          }
        }}
        >
          Create a posting
        </Button>


    </div>
  )
};
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
