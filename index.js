const express = require("express");
const dotenv = require("dotenv");
const connectionToDataBase = require("./db/db.config");
dotenv.config();
const user = require("./src/User/user.routes")
const posts = require("./src/Posts/post.routes")

const app = express()

const PORT = 6969

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/user", user)

app.use("/posts", posts)

connectionToDataBase()

app.get("/", (req, res) => {
    res.json({ message: "Server Run successfully" })
})

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log(`Server is running on http://localhost:${PORT}`)
})