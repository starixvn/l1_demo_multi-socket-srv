import { Server } from "socket.io";
import { initAdapter } from "./adapter";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import http from "http";
import { Chance } from "chance";
import mongoose from "mongoose";
import session from "./models/session";

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

    await mongoose.connect(appConfigs.database.url, { dbName: appConfigs.database.options.dbName });

    io.of(`/`).on("connection", async (socket) => {
        io.to(socket.id).emit(appConfigs.defaultEvent, { socketId: socket.id, serverName: uuid });

        const socketSession = new session({ socketId: socket.id, playerSession: "aaaa", time: Date.now() });
        await socketSession.save();

        if (chance.bool()) {
            socket.join(roomName);
        }

        socket.on("signIn", async (data) => {
            if (data.session === "session-3") {
                await session.deleteOne({ socketId: socket.id });

                console.log(`Kick ${socket.id} out!!!`);

                socket.disconnect();
            }
        });
    });

    io.of("/").adapter.on("join-room", (room, id) => {
        console.log(`socket ${id} has joined room ${room}`);
    });

    io.of("/").adapter.on("leave-room", (room, id) => {
        console.log(`socket ${id} has leaved room ${room}`);
    });
};

initServer(httpServer);
