import React, { useContext, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router';
import { CreateButton } from '../components/CreateButton/CreateButton';
import { RoomContext } from '../context/RoomContext';

export const Home: FC = () => {
  const { ws } = useContext(RoomContext);
  const navigate = useNavigate();

  const enterRoom = (roomId: string) => {
    if (roomId) navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    ws.on('room-created', enterRoom);
  }, []);

  return (
    <div className="App flex items-center justify-center w-screen h-screen">
      <CreateButton />
    </div>
  );
};
