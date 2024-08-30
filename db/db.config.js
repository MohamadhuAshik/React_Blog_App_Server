const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()

const ConnectionString = process.env.DB_CONNECTION  /* ||   "mongodb://localhost:27017/React_Blog" */
const connectionToDataBase = async () => {
    try {
        await mongoose.connect(ConnectionString)
        console.log("MongoDB Connected")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectionToDataBase



