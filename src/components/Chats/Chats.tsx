import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './Chats.scss';

import { KEYS, SERVER_URL } from '../../defines';
import AuthContext from '../../AuthContext';

export default function Chats() {
  const [message, setMessage] = React.useState<string>('');

  const { isLoggedIn, setError, roomId } = React.useContext(AuthContext);

  const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <Grid container direction="column">
      <Grid item xs>
        <Typography>HelloWorld!</Typography>
      </Grid>
      <Grid item container direction="row">
        <form>
          <Grid item xs>
            <TextField
              variant="outlined"
              placeholder="메세지를 입력하세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={handleSend}>전송</Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
