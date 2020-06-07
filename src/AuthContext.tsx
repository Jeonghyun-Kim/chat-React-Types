import React from 'react';

interface MyAuth {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  roomId: string | null;
  setRoomId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const defaultAuthContext: MyAuth = {
  isLoggedIn: false,
  setLoggedIn: () => {},
  error: null,
  setError: () => {},
  name: '',
  setName: () => {},
  roomId: null,
  setRoomId: () => {},
};

export default React.createContext(defaultAuthContext);
