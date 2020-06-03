import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';

import SettingsIcon from '@material-ui/icons/Settings';

import { Link } from 'react-router-dom';


import ListAltIcon from '@material-ui/icons/ListAlt';


export const FolderListItems = ({ user }) => (
  <div>
    <Link style={{ textDecoration: 'none',color:'black' }} to="/adminhomepage">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
  
  
    <Link style={{ textDecoration: 'none' ,color:'black'}} to="/filemanager">
      <ListItem button>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="File Manager" />
      </ListItem>
    </Link>
  
  </div>
);



FolderListItems.propTypes = {
  user: PropTypes.object.isRequired
};


export const UserFolderListItems = ({ user }) => (
  <div>
    <Link style={{ textDecoration: 'none',color:'black' }} to="/">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
   
  </div>
);

