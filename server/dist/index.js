"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const roomHandler_1 = require("./roomHandler");
const PORT = 8080;
const app = (0, express_1.default)();
app.use(cors_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
io.on('connection', (socket) => {
    console.log('connection ok', socket.id);
    (0, roomHandler_1.roomHandler)(socket);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
