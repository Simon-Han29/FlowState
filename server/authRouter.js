const express = require("express");
const router = express.Router();
const client = require("./db");
const jwt = require("jsonwebtoken");

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

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userData = await getUser(username);
    if (userData === null) {
        res.status(404).send({ msg: "username not found" });
    } else {
        if (userData.password !== password) {
            res.status(401).send({ msg: "password does not match" });
        } else {
            const data = {
                username: userData.username,
                id: userData.id,
                job_applications: userData.job_applications,
            };
            const token = jwt.sign(data, process.env.SECRET_KEY);
            res.status(201).send({ msg: "Login Successful", token: token });
        }
    }
});

async function getUser(username) {
    const getUserQ = `
        SELECT * FROM users
        WHERE username=$1
    `;
    const res = await client.query(getUserQ, [username]);
    if (res.rowCount === 0) {
        return null;
    } else {
        return res.rows[0];
    }
}

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
        INSERT INTO users (username, password, job_applications)
        VALUES ($1, $2, $3)
    `;
    await client.query(createUserQ, [username, password, "[]"]);
}

module.exports = router;
