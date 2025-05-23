import { Collection, MongoClient } from "mongodb";
import { configDotenv } from "dotenv";
configDotenv();
let client=null;
const Url=process.env.MongoDB
 export const connectToMongoDB = async () => {
      if(!client){
        const mongoClient = new MongoClient(Url);
        client= await mongoClient.connect();
      }
      return client ;
 }
  export const getCollection =async (dbName ,collectionName)=>{
    const client =await connectToMongoDB();
    return client.db(dbName).collection(collectionName);
  }
   const closeMongoDB =async ()=>{
    if(client){
      const mongoClient =await client;
      await mongoClient.close();
      client =null;
      console.log("mongodb connection is closed ... ")
    }
   }