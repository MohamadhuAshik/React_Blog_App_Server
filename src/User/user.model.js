const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: String,
    userPassword: String,
    userMailId: String,
    createdDate: { type: Date, default: () => new Date() },
    updatedDate: Date,
    FCM_Token: String
})
const modelCreation = mongoose.model("User", userSchema)

module.exports = modelCreation