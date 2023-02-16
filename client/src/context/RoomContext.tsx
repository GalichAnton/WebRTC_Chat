import socketIOClient from 'socket.io-client';
import { createContext, type ReactNode, type FC } from 'react';

const WS = 'http://localhost:8080';

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

interface RoomContextProviderProps {
  children: ReactNode;
}

export const RoomContextProvider: FC<RoomContextProviderProps> = ({ children }) => {
  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};
