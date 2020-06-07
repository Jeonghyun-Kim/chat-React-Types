import React from 'react';
import Grid from '@material-ui/core/Grid';

import './App.scss';

import AuthContext from './AuthContext';
import { KEYS } from './defines';

import Header from './components/Header/Header';
import Login from './components/Login/Login';

export default function App() {
  const [name, setName] = React.useState<string>('');
  const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const achievedToken = localStorage.getItem(KEYS.accessToken);
    const achievedName = localStorage.getItem(KEYS.name);

    if (achievedToken && achievedName) {
      setLoggedIn(true);
      setName(achievedName);
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{
        isLoggedIn, setLoggedIn, error, setError, name, setName,
      }}
      >
        <Header />
        {error && (
          <h6>{error}</h6>
        )}
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Login />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div>Hello World!</div>
          </Grid>
        </Grid>
      </AuthContext.Provider>
    </div>
  );
}
