const express = require("express")
const cors = require("cors")
const serverless = require("serverless-http");

const db = require("./db");
const userRouter = require("./routes/user-router")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.get("/", (req, res) => {
  res.send("Welcome to Wine Shop")
});

app.use("/api", userRouter)

export const handler = serverless(app);
