import { Socket } from "socket.io";
import { v4 } from "uuid";

export const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = v4();
        socket.join(roomId);
        socket.emit("room-created", roomId);
        console.log("user create-room");
    }

    const joinRoom = (roomId: string) => {
        console.log("user join-room", roomId);
        socket.join(roomId);
    }


    socket.on("join-room", joinRoom);

    socket.on("create-room", createRoom);
}
