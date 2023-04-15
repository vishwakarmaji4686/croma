const express = require("express");
const app = express();
const userRouter = require("./user/userRouter")
app.use("/", userRouter)
module.exports = app;