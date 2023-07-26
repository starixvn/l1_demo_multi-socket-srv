import { Server } from "socket.io";
import { initAdapter } from "./adapter";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import http from "http";
import { Chance } from "chance";

import appConfigs from "./app-configs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT || appConfigs.hostingPort);

const httpServer = http.createServer(app);
const roomName = "special-news";
const chance = new Chance();

httpServer.listen(app.get("port"), async () => {
    console.log(`Express server started and running on port ${app.get("port")}!`);
});
app.get("/", (req, res, next) => {
    res.send("I'm Multi-Channel Service !");
});

const initServer = async (httpServer) => {
    const opts = { pingInterval: 25 * 1000, pingTimeout: 60 * 1000 };
    const uuid = uuidv4();
    const io = new Server(httpServer, opts);
    const adapter = await initAdapter();
    io.adapter(adapter);

    io.of(`/`).on("connection", (socket) => {
        io.to(socket.id).emit(appConfigs.defaultEvent, { socketId: socket.id, serverName: uuid });

        if (chance.bool()) {
            socket.join(roomName);
        }
    });

    io.of("/").adapter.on("join-room", (room, id) => {
        console.log(`socket ${id} has joined room ${room}`);
    });
};

initServer(httpServer);
