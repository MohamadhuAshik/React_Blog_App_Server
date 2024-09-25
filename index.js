const express = require("express");
const dotenv = require("dotenv");
const connectionToDataBase = require("./db/db.config");
dotenv.config();
const user = require("./src/User/user.routes")
const posts = require("./src/Posts/post.routes")
const cors = require("cors")





const app = express()

const PORT = 6969

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/user", user)

app.use("/posts", posts)

connectionToDataBase()

/*--------------- FIREBASE SERVICE_ACCOUNT FILE ENCODEING CODE START---------------------------- */
// const base64 = require("base-64");
// const fs = require('fs');
// const path = require("path")
// const serviceAccountFile = path.join(__dirname, "service_account.json")

// fs.readFile(serviceAccountFile, (err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//         const encodedString = base64.encode(data);
//         console.log(encodedString);
//     }
// });
// const encodedData = encodedString
// var decodedData = base64.decode(encodedData);
/*--------------- FIREBASE SERVICE_ACCOUNT FILE ENCODEING CODE END---------------------------- */


app.get("/", (req, res) => {
    res.json({ message: "Server Run successfully" })
})




app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log(`Server is running on http://localhost:${PORT}`)
})