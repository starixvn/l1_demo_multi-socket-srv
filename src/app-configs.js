export default {
    hostingPort: 3000,
    defaultEvent: "ping",
    database: {
        url: "mongodb://127.0.0.1:27017/?replicaSet=rs0",
        options: {
            dbName: "notifications",
            collection: "socket.io-adapter-events",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
};
