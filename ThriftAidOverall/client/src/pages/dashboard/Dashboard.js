import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import ScrollButton from "./Scroll";

const Dashboard = ({ auth, logoutUser }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = auth;
  const [acceptedposts, setAcceptedPosts] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    setScrollPosition((prevPosition) => prevPosition - 100);
  };

  const scrollRight = () => {
    setScrollPosition((prevPosition) => prevPosition + 100);
  };



  const userAcceptedPosts = acceptedposts && acceptedposts.filter(
    (post) => post.posting.email === user.email
  );


  const homelessAcceptedPosts = acceptedposts && acceptedposts.filter(
    (post) => post.userEmail === user.email
  );

  const thriftAcceptedPosts= useMemo(() => (
        userAcceptedPosts && userAcceptedPosts.map((post) => (
          <div  key={post.posting.email} className="thriftstorepost">
            {post.posting.thriftstore} - {post.posting.email}
          </div>
        ), [userAcceptedPosts])
  )
  )

  const homelessPosts= useMemo(() => (
        homelessAcceptedPosts && homelessAcceptedPosts.map((post) => (
          <div  key={post.posting.email} className="thriftstorepost-dashboard">
            {post.posting.thriftstore} - {post.posting.email}
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
      <div className="scroll-buttons">
        <ScrollButton direction="left" onClick={scrollLeft} onMouseOver={scrollLeft} />
        <ScrollButton direction="right" onClick={scrollRight} onMouseOver={scrollRight} />
      </div>
      <div className="postings-container-dashboard" style={{ transform: `translateX(${scrollPosition}px)` }}>
          {thriftAcceptedPosts}
      </div>
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
      <div className="page-container-two">
      <div className="scroll-buttons">
        <ScrollButton direction="left" onClick={scrollLeft} onMouseOver={scrollLeft} />
        <ScrollButton direction="right" onClick={scrollRight} onMouseOver={scrollRight} />
      </div>
      <div className="postings-container-dashboard" style={{ transform: `translateX(${scrollPosition}px)` }}>
        {homelessPosts}
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
            top: "65%",
            width: 317,
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
      </div>
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
