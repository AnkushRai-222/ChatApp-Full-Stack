const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim:true
    },
    lastname: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    }
},{timestamps:true})
module.exports = mongoose.model("User",UserSchema)