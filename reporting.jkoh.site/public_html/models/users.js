const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    email: {
        type:String
    },
    role: {
        type: String,
        default: "user",
        enum:["user","admin"]
    }
}, {timestamps: true})

module.exports = model('users', UserSchema)