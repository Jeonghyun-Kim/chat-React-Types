import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AuthContext from './AuthContext';
import { KEYS } from './defines';

import './App.scss';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import ChatroomList from './components/ChatroomList/ChatroomList';
import Chats from './components/Chats/Chats';

export default function App() {
  const [name, setName] = React.useState<string>('');
  const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [roomId, setRoomId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const achievedToken = localStorage.getItem(KEYS.accessToken);
    const achievedName = localStorage.getItem(KEYS.name);

    if (achievedToken && achievedName) {
      setLoggedIn(true);
      setName(achievedName);
    }
  }, []);

  return (
    <div className="root">
      <AuthContext.Provider value={{
        isLoggedIn, setLoggedIn, error, setError, name, setName, roomId, setRoomId,
      }}
      >
        <Header />
        {error && (
          <Typography variant="h5" align="center">{error}</Typography>
        )}
        <Grid container id="motherGrid">
          <Grid container item direction="column" justify="space-around" xs={12} sm={6} className="halfGrid">
            <Login />
            <Grid item>
              <ChatroomList />
            </Grid>
          </Grid>
          <Grid container item direction="column" justify="space-between" xs={12} sm={6} className="halfGrid">
            <Chats />
          </Grid>
        </Grid>
      </AuthContext.Provider>
    </div>
  );
}
