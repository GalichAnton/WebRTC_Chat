import { Socket } from "socket.io";
import { v4 } from "uuid";

interface Room {
  roomId: string;
  peerId: string;
}

const rooms : Record<string, string[]> = {};

export const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = v4();
        rooms[roomId] = [];
        socket.join(roomId);
        socket.emit("room-created", roomId);
        console.log("user create-room");
    }

    const joinRoom = ({roomId, peerId}: Room) => {
      if(rooms[roomId]) {
        console.log("user join-room", roomId);
        rooms[roomId].push(peerId);
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", peerId);
        socket.emit("room-joined", {roomId, partisipants: rooms[roomId]});
      }

      socket.on("disconnect", () => {
        console.log("user disconnect-room");
        if(rooms[roomId]) {
          rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
          socket.to(roomId).emit("user-disconnect", peerId)
        }
      });
    }

    const startSharing = ({roomId, peerId}: Room) => {
      socket.to(roomId).emit("user-start-sharing", peerId);
    }

    const stopSharing = ({roomId, peerId}: Room) => {
      socket.to(roomId).emit("user-stop-sharing", peerId);
    }

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
    socket.on('start-sharing', startSharing);
    socket.on('stop-sharing', stopSharing);

}
