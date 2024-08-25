const mongoose = require("mongoose")


const postSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    datetime: { type: Date, default: () => new Date() },
    body: String,
    updatedDate: Date
})

const modelCreation = mongoose.model("Post", postSchema)

module.exports = modelCreation