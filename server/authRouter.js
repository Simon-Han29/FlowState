const express = require("express");
const router = express.Router();
const client = require("./db");
const { v4: uuidv4 } = require("uuid");
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const isConflicting = await doesAccExist(username);
        if (!isConflicting) {
            await createUser(username, password);
            res.status(201).send({ msg: "User created Successfully" });
        } else {
            res.status(409).send({ msg: "Username already in use" });
        }

        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Server Error" });
    }
});

async function doesAccExist(username) {
    const doesAccExistQ = `
        SELECT * FROM users
        WHERE username=$1
    `;
    const res = await client.query(doesAccExistQ, [username]);
    if (res.rowCount === 0) {
        return false;
    } else {
        return true;
    }
}

async function createUser(username, password) {
    const createUserQ = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
    `;
    await client.query(createUserQ, [username, password]);
}

module.exports = router;
