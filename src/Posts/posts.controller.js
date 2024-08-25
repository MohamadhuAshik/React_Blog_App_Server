const express = require("express")
const model = require("./posts.model")
const userModel = require("../User/user.model")


module.exports = {
    getPost: async (req, res) => {
        try {
            const userFind = await userModel.findOne({ userMailId: req.mailId })
            if (!userFind) {
                return res.status(404).json({ message: "User not found" })
            }


            const postFind = await model.find({ user: userFind._id })
            res.status(200).json({ response_code: 200, posts: postFind })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    },

    createPost: async (req, res) => {
        try {
            const { title, body } = req.body
            if (!title || !body) {
                res.status(400).json({ message: "Required fields are missing" })
            }
            const userCheck = await userModel.findOne({ userMailId: req.mailId })
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
            const result = await model.deleteOne({
                _id: id.id
            })
            if (!result.acknowledged) {
                res.status(400).json({ message: "Delete Failure" })
            }
            res.status(200).json({ response_code: 200, message: "Post Delete Successfully" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error", err: err.message })
        }
    }

}