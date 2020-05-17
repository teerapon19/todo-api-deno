import {
  init,
  MongoClient
} from "https://deno.land/x/mongo@v0.6.0/mod.ts";

await init();

const client = new MongoClient();

const dbDatabes = Deno.env.get("DB_NAME") || "deno_todo";
const dbUrl = Deno.env.get("DB_URL") || "mongodb://localhost:27017";

client.connectWithUri(dbUrl);
const db = client.database(dbDatabes);

export default db;