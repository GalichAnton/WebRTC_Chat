import express from 'express';
import http from "http";
import {Server, Socket} from "socket.io";
import cors from 'cors';
import { roomHandler } from './roomHandler';
const PORT = 8080;

const app = express();
app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

io.on('connection', (socket: Socket) => {
  console.log('connection ok',socket.id);

  roomHandler(socket)

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})