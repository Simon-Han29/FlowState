import { Client } from "pg";
export const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "FlowStateUserDB",
});

client.connect();
