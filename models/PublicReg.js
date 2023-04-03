const mongoose = require("mongoose")

const PublicRegSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "User Must Required!!!"],


    },
    mobile: {
        type: String,
        required: [true, "Email Must Required!!!"]

    },
    email: {
        type: String,
        required: [true, "Email Must Required!!!"],

    },
    name: {
        type: String,
        required: [true, "Name Must Required!!!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password Must Required!!!"],


    },
    photo: {
        type: String,
        default: ""
    }

})
const PublicReg = new mongoose.model("PublicRegistration", PublicRegSchema)
module.exports = PublicReg