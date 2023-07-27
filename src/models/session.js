import mongoose from "mongoose";

const schema = new mongoose.Schema({
    playerSession: { type: String, required: true },
    socketId: { type: String, required: true },
    time: { type: Date, required: true },
});

export default mongoose.model("socket-session", schema);
