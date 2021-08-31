const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        type: String,
        required: true

    },
    register_date: {
        default: Date.now,
        type: Date
    }
})

module.exports = User = mongoose.model("user", userSchema)