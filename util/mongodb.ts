import { Db, MongoClient } from "mongodb";
import { RawItemDocument } from "../types/ItemModel";

interface MongoConnection {
  db: Db;
  client: MongoClient;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
let cachedConnection: MongoConnection;
let promise: Promise<MongoConnection>;

type ConnectToDatabase = () => Promise<MongoConnection>;
export const connectToDatabase: ConnectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const { MONGODB_URI: mongoUri, MONGODB_DB: mongoDb } = process.env;

  if (!mongoUri) {
    throw new Error("Please define the mongo Uri environment variable inside .env.local or pass as options");
  }

  if (!mongoDb) {
    throw new Error("Please define the mongo Db environment variable inside .env.local or pass as options");
  }

  if (!promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    promise = MongoClient.connect(mongoUri!, opts).then((client) => {
      const db = client.db(mongoDb);
      cachedConnection = {
        db,
        client,
      };

      return cachedConnection;
    });
  }

  const connection = await promise;
  return connection;
};

type GetAllItems = () => Promise<RawItemDocument[]>;
export const getAllItems: GetAllItems = async () => {
  const { db } = await connectToDatabase();
  return db
    .collection("items")
    .find({})
    .toArray();
};
