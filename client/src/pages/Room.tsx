import React, { useContext, useEffect, type FC } from 'react';
import { useParams } from 'react-router';
import { ShareButton } from '../components/ShareButton/ShareButton';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { type PeerState } from '../context/peerReducer';
import { RoomContext } from '../context/RoomContext';

export const Room: FC = () => {
  const { roomId } = useParams();

  const { ws, me, stream, peers, shareScreen, screenShareId, setRoomId } = useContext(RoomContext);

  useEffect(() => {
    if (me) ws.emit('join-room', { roomId, peerId: me.id });
  }, [roomId, me]);

  useEffect(() => {
    setRoomId(roomId);
  }, [roomId]);

  const screenSharingVideo = screenShareId === me?.id ? stream : peers[screenShareId]?.stream;
  const { [screenShareId]: sharing, ...peersToShow } = peers;
  return (
    <>
      <h1>Room: {roomId}</h1>
      <div className="flex">
        {screenSharingVideo && (
          <div className="w-4/5 pr-4">
            <VideoPlayer stream={screenSharingVideo} />
          </div>
        )}
        <div
          className={`grid grid-cols-4 gap-4 ${
            screenSharingVideo ? 'w-1/5 grid-col-1' : 'grid-cols-4'
          }`}
        >
          {screenShareId !== me?.id ?? <VideoPlayer stream={stream} />}
          {Object.values(peersToShow as PeerState).map((peer, i) => {
            return <VideoPlayer key={i} stream={peer.stream} />;
          })}
        </div>
      </div>

      <div className="fixed bottom- 0 p-6 w-full flex justify-center borer-t-2 bg-white">
        <ShareButton handler={shareScreen} />
      </div>
    </>
  );
};
