import app from "./app/app.ts";

const port = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 8000;
app.start({ port });
console.log(`Start api with port :${port}`);
