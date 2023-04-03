const mongoose = require("mongoose")

const OfficialRegSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username Must Required!!!"],
        unique: true



    },
    password: {
        type: String,
        required: [true, "Password Must Required!!!"],
    }


})
const OfficialRegistration = new mongoose.model("OfficialRegistration", OfficialRegSchema)
module.exports = OfficialRegistration