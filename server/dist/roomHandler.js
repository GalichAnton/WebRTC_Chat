"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const uuid_1 = require("uuid");
const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = (0, uuid_1.v4)();
        socket.join(roomId);
        socket.emit("room-created", roomId);
        console.log("user create-room");
    };
    const joinRoom = (roomId) => {
        console.log("user join-room", roomId);
        socket.join(roomId);
    };
    socket.on("join-room", joinRoom);
    socket.on("create-room", createRoom);
};
exports.roomHandler = roomHandler;
