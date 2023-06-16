import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser } from '../../actions/authActions';
import { logoutUser } from '../../actions/authActions';
import store from '../../store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AccountMenu: React.FC<any> = ({ auth, logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate(); // Declare navigate here
  const { user, isAuthenticated }: any = auth;

  const onLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    logoutUser();
    navigate('/login');
  };

  useEffect(() => {
    // Check if the user is logged in on each App render
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      setAuthToken(jwtToken);
      const decoded: any = jwt_decode(jwtToken);
      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <Button
            variant="text"
            onClick={handleClick}
            sx={{
              width: 180,
              height: 30,
              backgroundColor: 'transparent',
              fontSize: 12,
              color: '#F7F3F3',
              fontFamily: 'Noto Sans',
              fontWeight: 700,
              left: 1330,
              position: 'absolute',
              ':hover': { bgcolor: '#F7F3F3', color: '#25A96F' },
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {user.email}
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
        <MenuItem onClick={handleClose}>
          <Avatar /> Dashboard
        </MenuItem>
        <MenuItem onClick={onLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
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
