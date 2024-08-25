const express = require("express")
const { createPost, editPost, deletePost } = require("./posts.controller")
const { LoginAuth } = require("../../auth/jwt")

const router = express.Router()

router.post("/post", LoginAuth, createPost)

router.put("/edit/:id", editPost)

router.delete("/delete/:id", deletePost)

module.exports = router