import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import './ChatroomList.scss';

import AuthContext from '../../AuthContext';
import { KEYS, SERVER_URL } from '../../defines';

interface Room {
  _id: string;
  name: string;
}

const ChatroomItem = ({ room, roomId, setRoomId }: {
  room: Room, roomId: string | null, setRoomId: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const handleEnterChatroom = () => {
    setRoomId(room._id);
  };

  return (
    <div className="chatroomName">
      <Button
        color={(roomId === room._id) ? 'primary' : 'secondary'}
        variant="outlined"
        onClick={handleEnterChatroom}
      >
        {room.name}
      </Button>
    </div>
  );
};

export default function ChatroomList() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [chatroomName, setChatroomName] = React.useState<string>('');

  const {
    isLoggedIn, roomId, setError, setRoomId,
  } = React.useContext(AuthContext);

  const fetchData = () => {
    fetch(`${SERVER_URL}/rooms`)
      .then((res) => res.json())
      .then((json) => setRooms(json))
      .catch((err) => setError(JSON.stringify(err)));
  };

  React.useEffect(() => {
    fetchData();
  });

  const handleCreateChatroom = () => {
    fetch(`${SERVER_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${localStorage.getItem(KEYS.accessToken)}`,
      },
      body: JSON.stringify({ name: chatroomName }),
    }).then(() => setChatroomName(''))
      .catch((err) => {
        setError(JSON.stringify(err));
        setTimeout(() => setError(null), 3000);
      })
      .finally(fetchData);
  };

  return (
    <>
      {isLoggedIn
        ? (
          <>
            <Typography variant="h5" align="center">채팅방 목록</Typography>
            <div className="spacer" />
            <Grid container spacing={2} id="createBox">
              <Grid item xs>
                <TextField
                  variant="outlined"
                  placeholder="채팅방 이름"
                  label="이름"
                  fullWidth
                  value={chatroomName}
                  onChange={(e) => setChatroomName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleCreateChatroom} id="createButton">방 만들기</Button>
              </Grid>
            </Grid>
            <div className="spacer" />
            {rooms.map((room) => (
              <ChatroomItem
                room={room}
                roomId={roomId}
                setRoomId={setRoomId}
                key={room._id}
              />
            ))}
          </>
        ) : (
          <Typography variant="h5" align="center">로그인을 먼저 해주세요!</Typography>
        )}
    </>
  );
}
