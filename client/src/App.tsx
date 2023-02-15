import React, { useEffect } from 'react';
import './App.css';
import socketIO from 'socket.io-client';

const WS = 'http://localhost:8080';

function App () {
  useEffect(() => {
    const socket = socketIO(WS);
    socket.on('connect', () => {
      console.log('connected');
    });
  }, []);

  return (
    <div className="App">
      Hello
    </div>

  );
}

export default App;
