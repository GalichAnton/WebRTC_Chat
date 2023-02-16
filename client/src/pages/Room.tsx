import React, { useContext, useEffect, type FC } from 'react';
import { useParams } from 'react-router';
import { RoomContext } from '../context/RoomContext';

export const Room: FC = () => {
  const { roomId } = useParams();

  const { ws } = useContext(RoomContext);

  useEffect(() => {
    ws.emit('join-room', roomId);
  }, [roomId]);

  return (
    <div>
      <h1>Room: {roomId}</h1>
    </div>
  );
};
