const express = require("express");
const cors = require("cors");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const PORT = 8080;
require("dotenv").config();

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
