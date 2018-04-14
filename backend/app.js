const express = require("express");
const app = express();

server = app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

const socket = require("socket.io");
const io = socket(server);

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("SEND_MESSAGE", (data) => {
        io.emit("RECIEVE_MESSAGE", data);
    });
});