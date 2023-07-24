export default {
    hostingPort: 5000,
    defaultEvent: "ping",
    database: {
        url: "mongodb://lmn_backend:LmnBackend@10.10.50.12:39100,10.10.50.13:39100,10.10.50.14:39100/?replicaSet=L1Local&appName=multiChannel",
        options: {
            dbName: "demo",
            collection: "socket.io-adapter-events",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
};
