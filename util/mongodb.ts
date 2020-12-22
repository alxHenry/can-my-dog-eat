import { Db, MongoClient } from "mongodb";

interface MongoConnection {
  db: Db;
  client: MongoClient;
}

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
let cachedConnection: MongoConnection;
let promise: Promise<MongoConnection>;

type ConnectToDatabase = () => Promise<MongoConnection>;
export const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    promise = MongoClient.connect(MONGODB_URI!, opts).then((client) => {
      const db = client.db(MONGODB_DB);
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
