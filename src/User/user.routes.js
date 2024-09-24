const express = require("express")
const { signUp, logIn, getUser } = require("./user.controller")
const { LoginAuth } = require("../../auth/jwt")
const passport = require("passport")
require("../../auth/passport")

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/getuser", LoginAuth, getUser)

router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }))

module.exports = router