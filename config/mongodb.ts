import "jsr:@std/dotenv/load";
import querystring from "node:querystring";
import { MongoClient } from "mongo";

const dbDatabes = Deno.env.get("MONGODB_DB_NAME") || "deno_todo";
const dbUsername = Deno.env.get("MONGODB_USERNAME");
const dbPwd = Deno.env.get("MONGODB_PASSWORD") || "";
const dbHost = Deno.env.get("MONGODB_HOST") || "localhost";
const dbPort = Deno.env.get("MONGODB_PORT") || 27017;

const pwd = querystring.escape(dbPwd);

const dbUrl = `mongodb://${dbUsername}:${pwd}@${dbHost}:${dbPort}/?authMechanism=DEFAULT`;

const client = new MongoClient(dbUrl);

await client.connect();
const db = client.db(dbDatabes);

export default db;
