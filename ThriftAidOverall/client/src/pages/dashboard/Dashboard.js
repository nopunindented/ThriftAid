import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import GoogleMaps from "../postings/googlemaps";
import Logo from "./PostingLogo";
import mapmarker from "../postings/mapmarker.svg"
import clock from "../postings/clock.svg"
import website from "../postings/internet.svg"
import emailicon from "../postings/email.svg"
import phoneicon from "../postings/phone.svg"

const Dashboard = ({ auth, logoutUser }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = auth;
  const [acceptedposts, setAcceptedPosts] = useState(null);
  const [selectedPostAddress, setSelectedPostAddress] = useState(null);


  const handleThriftPostClick = (address, city) => {
    setSelectedPostAddress(address, city);
  };

  const handleHomelessPostClick = (address, city) => {
    setSelectedPostAddress(address, city);
  };


  const userAcceptedPosts = acceptedposts && acceptedposts.filter(
    (post) => post.posting.email === user.email
  );


  const homelessAcceptedPosts = acceptedposts && acceptedposts.filter(
    (post) => post.userEmail === user.email
  );

  const thriftAcceptedPosts= useMemo(() => (
        userAcceptedPosts && userAcceptedPosts.map((post) => (
          <div  key={post.posting.email} className="thriftstorepost-dashboard" tabIndex="0" onClick={() => handleThriftPostClick(post.posting.address, post.posting.city)}>
            <Logo />
            {post.posting.thriftstore} - {post.posting.email}
          </div>
        ), [userAcceptedPosts])
  )
  )

  const homelessPosts= useMemo(() => (
        homelessAcceptedPosts && homelessAcceptedPosts.map((post) => (
          <div  key={post.posting.email} className="thriftstorepost-dashboard" tabIndex="0" onClick={() => handleHomelessPostClick(post.posting.address, post.posting.city)}>
            <Logo />
            <div className="thrifted-name">{post.posting.thriftstore}</div>
            <div className="address-dashboard">{post.posting.address}</div>
            <div className="address-dashboard-city">{post.posting.city}, {post.posting.country}</div>
            <img src= {mapmarker} className="map-dashboard" />
            <img src= {clock} className="clock-dashboard" />
            <img src= {website} className="website-dashboard" />
            <img src= {phoneicon} className= "phone-dashboard" />
            <img src= {emailicon} className="email-dashboard" />
            {post.posting.email}
          </div>
        ), [userAcceptedPosts])
  )
  )

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      axios
        .post('http://localhost:5000/api/everyposting/deletedposts')
        .then((response) => {
          setAcceptedPosts(response.data);
        })
        .catch((err) => {
          console.log('Error fetching deleted postings', err);
        });
    }
  }, [isAuthenticated, navigate]);

  if (!user || !user.email) {
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

  else if (user.usertype === "thrift store") {
    const createPosting = () => {
      navigate("/profile");
    };
    const newPosting = () => {
      navigate("/create");
    };

    const findPostings = () => {
      navigate("/allpostings");
    };


    return (
      <div>
        <div className="pastpostings">Your past postings: </div>
        <div className="page-container-two">
      <div className="postings-container-dashboard">
          {thriftAcceptedPosts}
      </div>
      </div>
      {selectedPostAddress && <GoogleMaps address={selectedPostAddress} />}
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
            top: "75%",
            width: 317,
            textTransform: "none",
            bgcolor: "#24a0ed",
            ":hover": {
              bgcolor: "#0792e8",
              color: "#F7F3F3",
              textTransform: "none",
            },
          }}
          onClick={createPosting}
        >
          Check Profile
        </Button>
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
            top: "80%",
            width: 317,
            textTransform: "none",
            bgcolor: "#24a0ed",
            ":hover": {
              bgcolor: "#0792e8",
              color: "#F7F3F3",
              textTransform: "none",
            },
          }}
          onClick={newPosting}
        >
          Create a posting
        </Button>
      </div>
    );
  }
  else{
    const findPostings = () => {
      navigate("/allpostings");
    };


    console.log(acceptedposts)
    return (
      <div>
      <div className="page-container-two" />
      <div className="postings-container-dashboard">
        {homelessPosts}
      </div>
      <div className= "map-container-dashboard">
      {selectedPostAddress && <GoogleMaps className="map-container-dashboard" address={selectedPostAddress} />}
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
            height: "6%",
            left: "13.3%",
            top: "20%",
            width: "36.7%",
            textTransform: "none",
            bgcolor: "#832ed9",
            ":hover": {
              bgcolor: "#832ed9",
              color: "#F7F3F3",
              textTransform: "none",
            },
          }}
        >
          Postings you Accepted
        </Button>
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
            height: "6%",
            left: "52.3%",
            top: "20%",
            width: "36.7%",
            textTransform: "none",
            bgcolor: "#24a0ed",
            ":hover": {
              bgcolor: "#0792e8",
              color: "#F7F3F3",
              textTransform: "none",
            },
          }}
          onClick={findPostings}
        >
          Find Postings
        </Button>
      </div>
    );
  }
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
