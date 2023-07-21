export default {
    hostingPort: 5000,
    defaultEvent: "ping",
    database: {
        url: "mongodb://lmn_backend:LmnBackend@10.10.50.12:39101,10.10.50.13:39101,10.10.50.14:39101/?replicaSet=L1pLocal&appName=multiChannel",
        options: {
            dbName: "demo",
            collection: "socket.io-adapter-events",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
};
