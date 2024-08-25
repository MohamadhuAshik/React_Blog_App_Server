const express = require("express")
const { signUp, logIn, getUser } = require("./user.controller")
const { LoginAuth } = require("../../auth/jwt")

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/getuser", LoginAuth, getUser)

module.exports = router