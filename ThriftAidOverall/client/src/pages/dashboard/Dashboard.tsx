import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect, ConnectedProps } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Dialog, DialogContent } from "@mui/material";
import GoogleMaps from "../postings/googlemaps";
import Logo from "./PostingLogo.tsx";
import mapmarker from "../postings/mapmarker.svg";
import clock from "../postings/clock.svg";
import website from "../postings/internet.svg";
import emailicon from "../postings/email.svg";
import phoneicon from "../postings/phone.svg";
import xmark from "../postings/xmark.png";
import { PaperProps } from "@mui/material";
import { useTheme } from '@mui/material';

// Define types
interface RootState {
  auth: {
    user: {
      email: string;
      usertype: string;
    };
    isAuthenticated: boolean;
  };
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logoutUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

// Component Props
type PropsFromRedux = ConnectedProps<typeof connector>;
type DashboardProps = PropsFromRedux;

const Dashboard: React.FC<DashboardProps> = ({ auth, logoutUser }) => {
  const [focusedPost, setFocusedPost] = useState(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = auth;
  const [acceptedposts, setAcceptedPosts] = useState<any[]>([]);
  const [selectedPostAddress, setSelectedPostAddress] = useState<string | null>(null);
  const [selectedPostin, setSelectedPostin] = useState<any | null>(null);
  const theme= useTheme();

  function PurpleAccepted () {
    return(
    <Button
      type="submit"
      variant="contained"
      sx={{
        position: "absolute",
        display: "flex",
        color: "#F7F3F3",
        fontFamily: "Noto Sans",
        fontWeight: 700,
        textAlign: "center",
        fontStyle: "normal",
        textTransform: "none",
        bgcolor: "#832ed9",
        ":hover": {
          bgcolor: "#832ed9",
          color: "#F7F3F3",
          textTransform: "none",
        },
        [theme.breakpoints.up("xs")]: {
          fontSize: "2.3vh",
          height: "5%",
          left: "4.4%",
          top: "17.6%",
          width: "90.1%",
        },
        [theme.breakpoints.up("sm")]: {
          fontSize: "2.3vh",
          height: "6%",
          left: "2.1%",
          top: "18%",
          width: "59.2%",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "2.3vh",
          height: "6%",
          left: "0.2%",
          top: "20%",
          width: "49.8%",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "2.3vh",
          height: "6%",
          left: "9.5%",
          top: "20%",
          width: "40.8%",
        },
        [theme.breakpoints.up("xl")]: {
          fontSize: "2.3vh",
          height: "6%",
          left: "13.3%",
          top: "18%",
          width: "36.7%",
        },
      }}
    >
      Postings you accepted
    </Button>
  );
    }

function PurpleAcceptedOfYours () {
    return(
    <Button
      type="submit"
      variant="contained"
      sx={{
        position: "absolute",
        display: "flex",
        color: "#F7F3F3",
        fontFamily: "Noto Sans",
        fontWeight: 700,
        textAlign: "center",
        fontStyle: "normal",
        textTransform: "none",
        bgcolor: "#832ed9",
        ":hover": {
          bgcolor: "#832ed9",
          color: "#F7F3F3",
          textTransform: "none",
        },
        [theme.breakpoints.up("xs")]: {
          fontSize: "2.3vh",
          height: "3%",
          left: "4.4%",
          top: "14.6%",
          width: "90.1%",
        },
        [theme.breakpoints.up("sm")]: {
          fontSize: "2.3vh",
          height: "6%",
          left: "2.1%",
          top: "18%",
          width: "60.5%",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "2.3vh",
          height: "6%",
          left: "0.2%",
          top: "20%",
          width: "49.8%",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "2.3vh",
          height: "6%",
          left: "9.5%",
          top: "20%",
          width: "40.8%",
        },
        [theme.breakpoints.up("xl")]: {
          fontSize: "2.3vh",
          height: "6%",
          left: "13.3%",
          top: "18%",
          width: "36.7%",
        },
      }}
    >
      Postings of yours that were Accepted
    </Button>
  );
    }
  const dialogStyle = {
    width: "20%",
    height: "40%",
    backgroundColor: "#f5f2f2",
    overflowY: "auto",
  };

  const handleDialogOpen = (postin: any) => {
    setSelectedPostin(postin);
  };

  const handleHomelessPostClick = (address: string, city: string) => {
    setSelectedPostAddress(`${address}, ${city}`);
  };

  const handleDialogClose = () => {
    setSelectedPostin(null);
  };

  const pickupbutton = {
    position: "absolute",
    display: "flex",
    color: "#F7F3F3",
    fontFamily: "Noto Sans",
    fontSize: "1.4vh",
    fontStyle: "normal",
    fontWeight: 520,
    textAlign: "center",
    top: "80%",
    height: "16%",
    left: "61.5%",
    width: "38%",
    textTransform: "none",
    bgcolor: "#5e5e5e",
    ":hover": {
      bgcolor: "#424242",
      color: "#F7F3F3",
      textTransform: "none",
    },
  };

  const ButtonViewComments = ({ onClick }: { onClick: () => void }) => (
    <Button sx={pickupbutton} onClick={onClick} variant="contained">
      View poster's comments
    </Button>
  );

  const userAcceptedPosts = acceptedposts && acceptedposts.filter(
    (post) => post.posting.email === user.email
  );

  const homelessAcceptedPosts = acceptedposts && acceptedposts.filter(
    (post) => post.userEmail === user.email
  );

  const handlePostFocus = (post) => {
    setFocusedPost(post);
  };

  const handlePostBlur = () => {
    setFocusedPost(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
const thriftAcceptedPosts = useMemo(
  () =>
      userAcceptedPosts &&
      userAcceptedPosts.map((post) => (
        <div
          key={post.posting.email}
          className={`thriftstorepost-dashboard-v3${focusedPost === post ? ' focused' : ''}`}
          tabIndex={0}
          onClick={() => handleHomelessPostClick(post.posting.address, post.posting.city)}
          onFocus={() => handlePostFocus(post)}
          onBlur={handlePostBlur}
        >
          <Logo />
          <div className="thrifted-name">{post.posting.thriftstore}</div>
          <div className="address-dashboard">{post.posting.address}</div>
          <div className="address-dashboard-city">{post.posting.city}, {post.posting.country}</div>
          <div className="time-dashboard-city">{post.posting.pickuptime}, {post.posting.pickupdate}</div>
          <div className="website-dashboard-city">{post.posting.website}</div>
          <div className="email-dashboard-city">{post.userEmail}</div>
          <div className="phone-dashboard-city">{post.posting.numberofphone}</div>
          <img src={mapmarker} className="map-dashboard" alt="Map" />
          <img src={clock} className="clock-dashboard" alt="Clock" />
          <img src={website} className="website-dashboard" alt="Website" />
          <img src={phoneicon} className="phone-dashboard" alt="Phone" />
          <img src={emailicon} className="email-dashboard" alt="Email" />
          {post.posting.pickupcomments && (
            <>
              
              <ButtonViewComments onClick={() => handleDialogOpen(post.posting)} />
              <Dialog
                open={selectedPostin === post.posting}
                onClose={handleDialogClose}
                className="dialoguebackgroundtwice"
                PaperProps={{
                  style: dialogStyle as PaperProps['style'],
                }}
              >
                <DialogContent>
                  <Button onClick={handleDialogClose}>
                    <img src={xmark} className="xmarkdialogue" alt="Close" />
                  </Button>
                  <div className="postercomments">
                    {post.posting.pickupcomments}
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userAcceptedPosts,focusedPost, selectedPostin]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const homelessPosts = useMemo(
  () =>
      homelessAcceptedPosts &&
      homelessAcceptedPosts.map((post) => (
        <div
          key={post.posting.email}
          className={`thriftstorepost-dashboard-v3${focusedPost === post ? ' focused' : ''}`}
          tabIndex={0}
          onClick={() => handleHomelessPostClick(post.posting.address, post.posting.city)}
          onFocus={() => handlePostFocus(post)}
          onBlur={handlePostBlur}
        >
          <Logo />
          <div className="thrifted-name">{post.posting.thriftstore}</div>
          <div className="address-dashboard">{post.posting.address}</div>
          <div className="address-dashboard-city">{post.posting.city}, {post.posting.country}</div>
          <div className="time-dashboard-city">{post.posting.pickuptime}, {post.posting.pickupdate}</div>
          <div className="website-dashboard-city">{post.posting.website}</div>
          <div className="email-dashboard-city">{post.posting.email}</div>
          <div className="phone-dashboard-city">{post.posting.numberofphone}</div>
          <img src={mapmarker} className="map-dashboard" alt="Map" />
          <img src={clock} className="clock-dashboard" alt="Clock" />
          <img src={website} className="website-dashboard" alt="Website" />
          <img src={phoneicon} className="phone-dashboard" alt="Phone" />
          <img src={emailicon} className="email-dashboard" alt="Email" />
          {post.posting.pickupcomments && (
            <>
              <ButtonViewComments onClick={() => handleDialogOpen(post.posting)} />
              <Dialog
                open={selectedPostin === post.posting}
                onClose={handleDialogClose}
                className="dialoguebackgroundtwice"
                PaperProps={{
                  style: dialogStyle as PaperProps['style'],
                }}
              >
                <DialogContent>
                  <Button onClick={handleDialogClose}>
                    <img src={xmark} className="xmarkdialogue" alt="Close" />
                  </Button>
                  <div className="postercomments">
                    {post.posting.pickupcomments}
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [homelessAcceptedPosts, focusedPost, selectedPostin]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      axios
        .post('/api/everyposting/deletedposts')
        .then((response) => {
          setAcceptedPosts(response.data);
        })
        .catch((err) => {
          console.log('Error fetching deleted postings', err);
        });
    }
  }, [isAuthenticated, navigate]);

  const onLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser();
    navigate("/login");
  };

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
            <Button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={onLogoutClick}
              variant="contained"
              color="primary"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (user.usertype === "thrift store") {
    const createPosting = () => {
      navigate("/profile");
    };

    const newPosting = () => {
      navigate("/create");
    };

    return (
      <div>
        <div className="page-container-two">
          <PurpleAcceptedOfYours />
          <div className="postings-container-dashboard-thrift">
            {thriftAcceptedPosts}
          </div>
        </div>
        {selectedPostAddress && <GoogleMaps className="map-container-dashboard-thrift" address={selectedPostAddress} />}
        <Button
          type="submit"
          variant="contained"
          sx={{
            position: "absolute",
            display: "flex",
            color: "#F7F3F3",
            fontFamily: "Noto Sans",
            fontStyle: "normal",
            fontWeight: 700,
            textAlign: "center",
            textTransform: "none",
            bgcolor: "#24a0ed",
            ":hover": {
              bgcolor: "#0792e8",
              color: "#F7F3F3",
              textTransform: "none",
            },
            [theme.breakpoints.up("xs")]: {
              fontSize: "2.3vh",
              height: "5%",
              left: "4.4%",
              top: "104.6%",
              width: "90.1%",
            },
            [theme.breakpoints.up("sm")]: {
              fontSize: "2vh",
              height: "6%",
              left: "64.3%",
              top: "17.5%",
              width: "16.15%",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "2.3vh",
              height: "6%",
              left: "52.3%",
              top: "20.5%",
              width: "18.15%",
            },
            [theme.breakpoints.up("lg")]: {
              fontSize: "2.3vh",
              height: "6%",
              left: "52.3%",
              top: "21.5%",
              width: "18.15%",
            },
            [theme.breakpoints.up("xl")]: {
              fontSize: "2.3vh",
              height: "6%",
              left: "52.3%",
              top: "19.7%",
              width: "18.15%",
            },
          }}
          onClick={createPosting}
        >
          Create/Update Profile
        </Button>
        <Button
          type="submit"
          variant="contained"
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
            left: "71%",
            top: "19.7%",
            width: "18.15%",
            textTransform: "none",
            bgcolor: "#24a0ed",
            ":hover": {
              bgcolor: "#0792e8",
              color: "#F7F3F3",
              textTransform: "none",
            },
            [theme.breakpoints.up("xs")]: {
              fontSize: "2.3vh",
              height: "5%",
              left: "4.4%",
              top: "111.6%",
              width: "90.1%",
            },
            [theme.breakpoints.up("sm")]: {
              fontSize: "2vh",
              height: "6%",
              left: "81.3%",
              top: "17.5%",
              width: "16.15%",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "2.3vh",
              height: "6%",
              left: "71%",
              top: "20.5%",
              width: "18.15%",
            },
            [theme.breakpoints.up("lg")]: {
              fontSize: "2.3vh",
              height: "6%",
              left: "71.1%",
              top: "21.5%",
              width: "18.15%",
            },
            [theme.breakpoints.up("xl")]: {
              fontSize: "2.3vh",
              height: "6%",
              left: "71%",
              top: "19.7%",
              width: "18.15%",
            },
          }}
          onClick={newPosting}
        >
          Create a posting
        </Button>
      </div>
    );
  } else {
    const findPostings = () => {
      navigate("/allpostings");
    };

    return (
      <div>
        <div className="page-container-two" />
        <div className="postings-container-dashboard-thrift">
          {homelessPosts}
        </div>
        <div className="map-container-dashboard">
          {selectedPostAddress && <GoogleMaps className="map-container-dashboard" address={selectedPostAddress} />}
        </div>
        <PurpleAccepted />
        <Button
          type="submit"
          variant="contained"
          sx={{
            position: "absolute",
            display: "flex",
            color: "#F7F3F3",
            fontFamily: "Noto Sans",
            fontStyle: "normal",
            fontWeight: 700,
            textAlign: "center",
            textTransform: "none",
            bgcolor: "#24a0ed",
            ":hover": {
              bgcolor: "#0792e8",
              color: "#F7F3F3",
              textTransform: "none",
            },
            [theme.breakpoints.up("xs")]: {
              fontSize: "2.3vh",
              height: "5%",
              left: "4.4%",
              top: "78.5%",
              width: "91.1%",
            },
            [theme.breakpoints.up("sm")]: {
              height: "6%",
              left: "63%",
              top: "18%",
              width: "36.7%",
            },
            [theme.breakpoints.up("md")]: {
              height: "6%",
              left: "52.3%",
              top: "20%",
              width: "36.7%",
            },
            [theme.breakpoints.up("lg")]: {
              height: "6%",
              left: "52.3%",
              top: "20%",
              width: "36.7%",
            },
            [theme.breakpoints.up("xl")]: {
              height: "6%",
              left: "52.3%",
              top: "18%",
              width: "36.7%",
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
  auth: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      usertype: PropTypes.string.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connector(Dashboard);
