import React, { useEffect } from 'react';
import { Box, Button, Avatar, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { styled } from "@mui/material/styles"; // Import styled from the correct location
import Typography from "@mui/material/Typography"; // Import Typography
import { useTheme } from "@mui/material/styles";

import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/authActions';
import store from '../../store';

const AccountMenu = ({ auth, logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Declare navigate here
  const { user, isAuthenticated } = auth;
  const theme= useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const ifThrift= () =>{
    if(user.usertype=== 'thrift store'){
      return(
        <h1>HELLO</h1>
      )
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    navigate('/login');
  };

  const onDashboard = (e) => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // Check if the user is logged in on each App render
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      setAuthToken(jwtToken);
      const decoded : any = jwt_decode(jwtToken);
      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
      }
    }
  }, []);

  return (
    <>
      <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <Button
            variant="text"
            onClick={handleClick}
            sx={{
              color: '#F7F3F3',
              fontFamily: 'Noto Sans',
              fontWeight: 700,
              backgroundColor: 'transparent',

              position: 'absolute',
              ':hover': { bgcolor: '#F7F3F3', color: '#25A96F' },
              [theme.breakpoints.up('xs')]: {
                width: "32vw",
                height: 30,
                fontSize: "2.vh",
                left: "68.5%",
              },
              [theme.breakpoints.up('sm')]: {
                width: "19vw",
                height: 30,
                fontSize: "2.vh",
                left: "73.5%",
              },
              [theme.breakpoints.up('md')]: {
                width: "15.5vw",
                height: 30,
                fontSize: "2.vh",
                left: "76.5%",
              },
              [theme.breakpoints.up('lg')]: {
                width: "12vw",
                height: 30,
                fontSize: "2.vh",
                left: "80%",
              },
              [theme.breakpoints.up('xl')]: {
                width: "12vw",
                height: 30,
                fontSize: "2.vh",
                left: "85%",
              },
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {isAuthenticated ? auth.user.email : ''}
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 55,
              height: 36,
              ml: 0.3,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onDashboard}>
          <Avatar /> Dashboard
        </MenuItem>
        <MenuItem onClick={onLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

AccountMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(AccountMenu);
