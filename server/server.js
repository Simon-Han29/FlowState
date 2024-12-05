const express = require("express");
const cors = require("cors");
const authRouter = require("./authRouter");
const PORT = 8080;

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRouter);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
