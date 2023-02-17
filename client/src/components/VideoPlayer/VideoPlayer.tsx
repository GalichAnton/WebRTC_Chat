import React, { useEffect, useRef, type FC } from 'react';

interface VideoPlayerProps {
  stream: MediaStream;
}
export const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const { stream } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream]);
  return <video ref={videoRef} muted></video>;
};
