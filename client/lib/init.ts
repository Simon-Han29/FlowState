import { client } from "./db.js";

async function createUsersTable() {
    const delUsersTableQ = `
        DROP TABLE IF EXISTS users;
    `;

    const createUsersTableQ = `
        CREATE TABLE IF NOT EXISTS users (
            uid VARCHAR(10) NOT NULL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
        )
    `;
    try {
        await client.query(delUsersTableQ);
        await client.query(createUsersTableQ);
    } catch (err) {
        console.log("Error creating tables: " + err);
    }
}

async function initDB() {
    await createUsersTable();
    client.end();
}

initDB();
