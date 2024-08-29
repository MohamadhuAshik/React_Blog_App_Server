const express = require("express")
const model = require("./user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    signUp: async (req, res) => {
        try {
            const { name, password, mailId } = req.body
            if (!name || !password || !mailId) {
                return res.status(400).json({ message: "Required fields are missing" })
            }
            const userCheck = await model.findOne({ userMailId: mailId })
            if (userCheck) {
                return res.status(409).json({
                    response_code: 409,
                    success: false,
                    errors: "Existing user Found with same mailId",
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const postuser = model({
                userName: name,
                userPassword: hashedPassword,
                userMailId: mailId
            })
            await postuser.save()
            res.status(200).json({ response_code: 200, success: true, message: "signup Successfully" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    },

    logIn: async (req, res) => {
        try {
            const { mailId, password } = req.body
            if (!mailId || !password) {
                return res.status(400).json({ message: "Required fields are missing" })
            }
            const userCheck = await model.findOne({ userMailId: mailId })
            if (!userCheck) {
                return res.status(404).json({ message: "MailId Not Found" })
            }
            const isPasswordMatch = await bcrypt.compare(password, userCheck.userPassword)
            if (!isPasswordMatch) {
                return res.status(404).json({ message: "Wrong Password" })
            }
            const userData = {
                mailId: mailId,
            }
            const token = jwt.sign(userData, process.env.JWT_SECRET_KEY)
            res.status(200).json({
                response_code: 200, message: "Login SuccessFully", token: token, userName: userCheck.userName
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    },

    getUser: async (req, res) => {
        try {
            const userFind = await model.findOne({ userMailId: req.mailId })
            if (!userFind) {
                return res.status(404).json({ message: "User not Found" })
            }
            res.status(200).json({ response_code: 200, user: userFind })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error" })
        }
    }

}