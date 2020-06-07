import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './Chats.scss';

import { KEYS, SERVER_URL } from '../../defines';
import AuthContext from '../../AuthContext';

interface Chat {
  _id: string;
  message: string | null;
  userName: string;
}

const ChatItem = ({ chat }: { chat: Chat }) => {
  const isMyChat = chat.userName === localStorage.getItem(KEYS.name);
  return (
    <Grid container direction="column" className="chatListItem">
      {isMyChat
        ? (
          <Grid item>
            <Typography variant="caption" className="content my">{chat.message}</Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography variant="subtitle2">{chat.userName}</Typography>
            <Typography variant="caption" className="content">{chat.message}</Typography>
          </Grid>
        )}
    </Grid>
  );
};

export default function Chats() {
  const [message, setMessage] = React.useState<string>('');
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const { isLoggedIn, setError, roomId } = React.useContext(AuthContext);

  const fetchData = React.useCallback(
    () => {
      fetch(`${SERVER_URL}/rooms/${roomId}/chats`)
        .then((res) => res.json())
        .then((json) => setChats(json))
        .catch((err) => {
          setError(JSON.stringify(err));
          setTimeout(() => setError(null), 3000);
        })
        .finally(() => setLoading(false));
    },
    [roomId, setError],
  );

  React.useEffect(() => {
    if (roomId) {
      fetchData();
      setInterval(() => fetchData(), 3000);
    }

    return clearInterval();
  }, [roomId, setError, fetchData]);

  const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (roomId) {
      fetch(`${SERVER_URL}/rooms/${roomId}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Key ${localStorage.getItem(KEYS.accessToken)}`,
        },
        body: JSON.stringify({ message }),
      }).then(() => {
        setMessage('');
      }).catch((err) => {
        setError(JSON.stringify(err));
        setTimeout(() => setError(null), 3000);
      }).finally(() => fetchData());
    } else {
      setError('먼저 로그인을 해주세요!');
    }
  };

  return (
    <>
      <Grid container item direction="column" xs>
        {roomId
          ? (
            <div id="chatList" style={{ height: `${window.innerHeight - 136}px` }}>
              {isLoading
                ? (
                  <>
                    <Grid item xs />
                    <Grid item>
                      <Typography variant="h5" align="center">Loading...</Typography>
                    </Grid>
                    <Grid item xs />
                  </>
                ) : (
                  <>
                    {chats && chats.map((chat) => (
                      <ChatItem key={chat._id} chat={chat} />
                    ))}
                  </>
                )}
            </div>
          ) : (
            <>
              <Grid item xs />
              {isLoggedIn
                ? (
                  <Grid item>
                    <Typography variant="h5" align="center">채팅방을 개설하거나 입장해주세요!</Typography>
                  </Grid>
                ) : (
                  <Grid item>
                    <Typography variant="h5" align="center">로그인을 먼저 해주세요!</Typography>
                  </Grid>
                )}
              <Grid item xs />
            </>
          )}
      </Grid>
      <Grid item container spacing={2}>
        <Grid xs item>
          <TextField
            variant="outlined"
            placeholder="메세지를 입력하세요."
            value={message}
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={handleSend} id="sendButton">전송</Button>
        </Grid>
      </Grid>
    </>
  );
}
