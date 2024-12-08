const client = require("./db");

async function createUsers() {
    const dropTablesQ = `
        DROP TABLE IF EXISTS job_applications;
        DROP TABLE IF EXISTS users;
    `;

    const createUsersTableQ = `
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            job_applications JSONB NOT NULL
        );
    `;

    const createJobAppTableQ = `
        CREATE TABLE IF NOT EXISTS job_applications (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            job_title VARCHAR(255) NOT NULL,
            company VARCHAR(225) NOT NULL,
            date_applied VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
        )
    `;
    try {
        await client.query(dropTablesQ);
        await client.query(createUsersTableQ);
        await client.query(createJobAppTableQ);
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
