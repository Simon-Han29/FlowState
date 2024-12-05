const client = require("./db");

async function createUsers() {
    const createUsersTableQ = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL
        )
    `;

    try {
        await client.query(createUsersTableQ);
        console.log("Users table created successfully");
    } catch (err) {
        console.log(err);
    }
}
async function initDB() {
    await createUsers();
    client.end();
}

initDB();
