const express = require("express")
const model = require("./posts.model")
const userModel = require("../User/user.model")

module.exports = {
    createPost: async (req, res) => {
        try {
            const { title, body } = req.body
            if (!title || !body) {
                res.status(400).json({ message: "Required fields are missing" })
            }
            const userCheck = await userModel.findOne({ userMailId: req.mailId })
            console.log("userCheck", userCheck)
            if (!userCheck) {
                return res.status(404).json({ message: "Invalid user" })
            }
            const postData = model({
                user: userCheck._id,
                title: title,
                body: body,
            })
            await postData.save()
            res.status(200).json({ response_code: 200, message: "Post Save Successfully" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    },

    editPost: async (req, res) => {
        try {
            const id = req.params
            const { title, body } = req.body
            if (!title || !body) {
                res.status(400).json({ message: "Required fields are missing" })
            }
            const postCheck = await model.findOne({ _id: id.id })
            if (!postCheck) {
                return res.status(404).json({ message: "Post Not Found" })
            }
            const result = await model.updateOne(
                { _id: id.id },
                {
                    $set: {
                        title: title,
                        body: body,
                        updatedDate: new Date()
                    }
                }
            )
            if (!result.acknowledged) {
                return res.status(400).json({ message: "update Failure" })
            }
            res.status(200).json({ response_code: 200, message: "Post Update Successfully" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server Error", err: err.message })
        }
    },

    deletePost: async (req, res) => {
        try {
            const id = req.params


        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    }

}