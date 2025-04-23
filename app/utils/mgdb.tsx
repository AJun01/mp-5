import { MongoClient, Collection, Document } from 'mongodb';



export interface UrlDoc extends Document {
  alias: string;
  url: string;
}

export const POSTS_COLLECTION = 'urls';
let col: Collection<UrlDoc> | undefined;
export default async function getCollection(): 
    Promise<Collection<UrlDoc>> 
    {
  if (!col) {

    const client = new MongoClient(process.env.MONGODB_URI as string);
    
    await client.connect();

    const db = client.db(process.env.MONGODB_DB);
    col = db.collection<UrlDoc>(POSTS_COLLECTION)
    await col.createIndex({ alias: 1 }, { unique: true });
  }
  return col
}