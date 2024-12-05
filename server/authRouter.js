const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
    console.log("gets here");
    console.log(req.body.username);
    console.log(req.body.password);

    res.status(201).send();
});

module.exports = router;
