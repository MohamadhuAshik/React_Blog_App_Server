const express = require("express")
const { createPost, editPost, deletePost, getPost } = require("./posts.controller")
const { LoginAuth } = require("../../auth/jwt")

const router = express.Router()

router.get("/get", LoginAuth, getPost)

router.post("/post", LoginAuth, createPost)

router.put("/edit/:id", editPost)

router.delete("/delete/:id", deletePost)

module.exports = router