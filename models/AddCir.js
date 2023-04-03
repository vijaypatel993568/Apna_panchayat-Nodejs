const mongoose = require("mongoose")

const AddCirSchema = new mongoose.Schema({
    circularNumber: {
        type: Number,
        required: [true, " circularNumber Must Required!!!"],



    },
    subject: {
        type: String,
        required: [true, " subject Must Required!!!"]
    },
    category: {
        type: String,
        required: [true, "category Must Required!!!"],

    },
    language: {
        type: String,
        required: [true, "language Must Required!!!"],

    },
    description: {
        type: String,
        required: [true, "description Must Required!!!"],
        default: ""
    },
    issuedOn: {
        type: String,
        required: [true, "issuedOn Must Required!!!"],
    },
    issuedBy: {
        type: String,
        required: [true, "issuedBy Must Required!!!"],
    },
    file: {
        type: String,
        required: [true, "file Must Required!!!"],
    },

})
const AddCir = new mongoose.model("AddCircular", AddCirSchema)
module.exports = AddCir