import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './Header.scss';

export default () => (
  <AppBar position="static">
    <ToolBar variant="regular">
      <div className="grow" />
      <Typography variant="h4">SNU-CHAT</Typography>
      <div className="grow" />
    </ToolBar>
  </AppBar>
);
