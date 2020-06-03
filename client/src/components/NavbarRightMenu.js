import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  link: {
    outline: 'none',
    textDecoration: 'none'
  },
  menuButton: {
    color: '#fff',
    fontSize: '18px',
    marginRight: '-15px',
    textTransform: 'none'
  }
};

class NavbarRightMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, logoutUser, user } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'right-menu' : null}
          aria-haspopup="true"
          className={classes.menuButton}
          onClick={this.handleClick}
        >
          <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          {user.name}
        </Button>
        <Menu
          id="right-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        
          
          <MenuItem onClick={logoutUser}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

NavbarRightMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(NavbarRightMenu);
