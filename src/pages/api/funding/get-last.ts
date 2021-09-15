import { MongoClient, Db, ObjectId } from "mongodb";
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
  let { id } = request.query;

  const db = await connectToDatabase(process.env.NEXT_PUBLIC_MONGODB_URI);
  const collection = db.collection("fundings");

  const data = await collection
    .find({})
    .sort({ active: -1, registeredAt: -1 })
    .limit(10);

  const fundings = await data.toArray();

  return response.status(201).json({ fundings });
};
