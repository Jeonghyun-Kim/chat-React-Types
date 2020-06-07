import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import './Login.scss';

import AuthContext from '../../AuthContext';
import { KEYS, SERVER_URL } from '../../defines';

export default function Login() {
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const {
    name, setName, setError, isLoggedIn, setLoggedIn,
  } = React.useContext(AuthContext);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    }).then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
          setTimeout(() => setError(null), 3000);
        } else {
          setName(json.name);
          localStorage.setItem(KEYS.accessToken, json.key);
          localStorage.setItem(KEYS.name, json.name);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setError(JSON.stringify(err));
        setTimeout(() => setError(null), 3000);
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setName('');
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <Grid container item direction="column" className="login">
      {isLoggedIn
        ? (
          <div className="center">
            <Grid item xs>
              <Typography variant="h4" align="center">{name}님 환영합니다.</Typography>
            </Grid>
            <Grid item xs id="logoutButton">
              <Button variant="contained" onClick={handleLogout}>로그아웃</Button>
            </Grid>
          </div>
        ) : (
          <div className="center">
            {isLoading
              ? (
                <Grid item>
                  <Typography variant="h5" align="center">Loading...</Typography>
                </Grid>
              ) : (
                <form>
                  <Grid item id="idInput">
                    <TextField
                      label="이름"
                      placeholder="아이디를 입력하세요."
                      variant="outlined"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item id="loginButton">
                    <Button variant="contained" onClick={handleSubmit} type="submit">로그인</Button>
                  </Grid>
                </form>
              )}
          </div>
        )}
    </Grid>
  );
}
