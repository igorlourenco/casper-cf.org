import { MongoClient, Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import url from "url";

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  let { ...data } = request.body;

  const db = await connectToDatabase(process.env.NEXT_PUBLIC_MONGODB_URI);
  const collection = db.collection("fundings");

  await collection.insertOne({
    ...data,
    registeredAt: new Date(),
  });

  return response.status(201).json({ ok: true });
};
