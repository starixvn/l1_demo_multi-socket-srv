import { MongoClient } from "mongodb";
import { Emitter } from "@socket.io/mongo-emitter";
import appConfigs from "./app-configs";

const initEmitter = async (event) => {
    const { database } = appConfigs;
    const mongoClient = new MongoClient(database.url, {
        useUnifiedTopology: true,
    });

    await mongoClient.connect();

    const mongoCollection = mongoClient.db(database.options.dbName).collection(database.options.collection);
    const emitter = new Emitter(mongoCollection);

    setInterval(() => {
        emitter.emit(event, new Date());
    }, 10000);
};

export { initEmitter };
