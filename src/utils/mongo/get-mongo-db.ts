import { Db, MongoClient, MongoClientOptions } from 'mongodb';

import { MONGODB } from '../env';

let clientPromise: Promise<MongoClient>;
let db: Db;

const options: MongoClientOptions = {
  ignoreUndefined: true,
};

export const getMongoDB = async (): Promise<Db> => {
  if (!db) {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!(global as any).mongoClientPromise) {
      const mongoClient = new MongoClient(MONGODB, options);
      (global as any).mongoClientPromise = mongoClient.connect();
    }

    clientPromise = (global as any).mongoClientPromise;

    const client = await clientPromise;
    db = client.db('spongebob');
  }

  return db;
};
