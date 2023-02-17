import React, { type FC } from 'react';
import { CreateButton } from '../components/CreateButton/CreateButton';

export const Home: FC = () => {
  return (
    <div className="App flex items-center justify-center w-screen h-screen">
      <CreateButton />
    </div>
  );
};
