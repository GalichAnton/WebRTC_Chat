import React, { useContext, type FC } from 'react';
import { RoomContext } from '../../context/RoomContext';

export const CreateButton: FC = () => {
  const { ws } = useContext(RoomContext);

  const createRoom = () => {
    ws.emit('create-room');
  };

  return (
    <button
      onClick={createRoom}
      className={
        'bg-blue-500 px-8 py-2 rounded-lg text-xl hover:bg-blue-300 transition-all text-green-200'
      }
    >
      Start new meeting
    </button>
  );
};
