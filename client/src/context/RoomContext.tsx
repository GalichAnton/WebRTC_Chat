import socketIOClient from 'socket.io-client';
import { createContext, type ReactNode, type FC, useState, useEffect, useReducer } from 'react';
import Peer from 'peerjs';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import { peerReducer } from './peerReducer';
import { addPeerAction, removePeerAction } from './peerActions';

const WS = 'http://localhost:8080';

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

interface RoomContextProviderProps {
  children: ReactNode;
}

export const RoomContextProvider: FC<RoomContextProviderProps> = ({ children }) => {
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});
  const [screenShareId, setScreenShareId] = useState('');
  const [roomId, setRoomId] = useState('');

  const navigate = useNavigate();

  const enterRoom = (roomId: string) => {
    if (roomId) navigate(`/room/${roomId}`);
  };

  const getUsers = ({ roomId, partisipants }: { roomId: string; partisipants: string[] }) => {
    console.log(`${roomId} - ${partisipants}`);
  };

  const switchStream = (stream: MediaStream) => {
    setStream(stream);
    setScreenShareId(me?.id ?? '');
    Object.values(me?.connections ?? {}).forEach((connection: any) => {
      const videoTrack = stream?.getTracks().find((track) => track.kind === 'video');
      connection[0].peerConection
        .getSenders()[1]
        .replaceTrack(videoTrack)
        .catch((error: any) => {
          console.log(error);
        });
    });
  };

  const shareScreen = () => {
    if (screenShareId) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(switchStream);
    } else {
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(switchStream);
    }
  };

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  };

  useEffect(() => {
    const peerId = v4();
    const peer = new Peer(peerId, {
      host: 'localhost',
      port: 9000,
      path: '/',
    });
    setMe(peer);

    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setStream(stream);
      });
    } catch (error) {
      console.log(error);
    }

    ws.on('room-created', enterRoom);
    ws.on('room-joined', (data) => {
      getUsers(data);
    });
    ws.on('user-disconnect', removePeer);
    ws.on('user-start-sharing', (peerId) => {
      setScreenShareId(peerId);
    });
    ws.on('user-stop-sharing', () => {
      setScreenShareId('');
    });

    return () => {
      ws.off('room-created');
      ws.off('room-joined');
      ws.off('user-disconnect');
      ws.off('user-start-sharing');
      ws.off('user-stop-sharing');
    };
  }, []);

  useEffect(() => {
    if (!me || !stream) return;
    ws.on('user-connected', (peerId: string) => {
      const call = me.call(peerId, stream);
      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });

    me.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  useEffect(() => {
    if (screenShareId) {
      ws.emit('start-screen-share', { peerId: screenShareId, roomId });
    } else {
      ws.emit('stop-screen-share');
    }
  }, [screenShareId, roomId]);

  return (
    <RoomContext.Provider value={{ ws, me, stream, peers, shareScreen, screenShareId, setRoomId }}>
      {children}
    </RoomContext.Provider>
  );
};
