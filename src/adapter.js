import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";
import appConfigs from "./app-configs";

const initAdapter = async () => {
    // const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/?replicaSet=rs0");
    const { database } = appConfigs;
    const mongoClient = new MongoClient(database.url);
    await mongoClient.connect();

    try {
        await mongoClient.db(database.options.dbName).createCollection(database.options.collection, {
            capped: true,
            size: 1e6,
        });
    } catch (e) {
        // collection already exists
        //console.log(e);
    }
    const mongoCollection = mongoClient.db(database.options.dbName).collection(database.options.collection);

    return createAdapter(mongoCollection);
};

export { initAdapter };
