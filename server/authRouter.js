const express = require("express");
const router = express.Router();
const client = require("./db");
const { v4: uuidv4 } = require("uuid");
const { jwtDecode } = require("jwt-decode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    console.log(userData);
    if (userData === null) {
        res.status(404).send({ msg: "username not found" });
    } else {
        const data = {
            username: userData.username,
            id: userData.id,
        };
        console.log(process.env.SECRET_KEY);
        const token = jwt.sign(data, process.env.SECRET_KEY);
        res.status(201).send({ msg: "Login Successful", token: token });
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
        INSERT INTO users (username, password)
        VALUES ($1, $2)
    `;
    await client.query(createUserQ, [username, password]);
}

module.exports = router;
