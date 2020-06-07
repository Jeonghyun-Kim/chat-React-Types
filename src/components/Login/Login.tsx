import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    <div className="login">
      {isLoggedIn
        ? (
          <>
            <Typography>{name}님 환영합니다.</Typography>
            <Button variant="contained" onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <>
            {isLoading
              ? (
                <Typography variant="h5">Loading...</Typography>
              ) : (
                <form>
                  <TextField variant="outlined" onChange={(e) => setName(e.target.value)} />
                  <Button variant="contained" onClick={handleSubmit} type="submit">로그인</Button>
                </form>
              )}
          </>
        )}
    </div>
  );
}
