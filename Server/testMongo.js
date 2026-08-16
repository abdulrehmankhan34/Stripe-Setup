import dns from "dns";
dns.setServers(["8.8.8.8"]);

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
});

try {
  await client.connect();

  console.log("MongoDB Connected Successfully");

  await client.db("miniShop").command({ ping: 1 });

  console.log("MongoDB Ping Successful");
} catch (error) {
  console.error("MongoDB Error:", error);
} finally {
  await client.close();
}