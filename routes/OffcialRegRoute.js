const express = require("express")
const OfficialReg = require("../models/OfficialReg")

const router = express.Router()





router.post("/login", async (req, res) => {
    try {
        var data = await OfficialReg.findOne({ username: req.body.username })
        if (data) {
            if (req.body.password === data.password) {
                res.send({ result: "Done", data: data, message: "Official User Login" })
            }
            else
                res.status(404).send({ result: "Fail", message: "Username or Password Incorrect!!!" })
        }
        else {
            res.status(404).send({ result: "Fail", message: "Username or Password Incorrect!!!" })
        }
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})

module.exports = router