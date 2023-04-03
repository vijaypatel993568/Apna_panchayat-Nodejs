const express = require("express")
const PublicReg = require("../models/PublicReg")
const multer = require("multer")
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/userpic')
    },
    fieldSize: 104857600,
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })


router.post("/", upload.single("photo"), async (req, res) => {
    try {
        var data = new PublicReg(req.body)
        if (req.file)
            data.photo = req.file.filename
        await data.save()
        res.send({ result: "Done", message: "Record is Created!!!", data: data })
    }
    catch (error) {
        console.log(error);
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique" })

        else if (error.errors.user)
            res.status(400).send({ result: "Fail", message: error.errors.user.message })
        else if (error.errors.mobile)
            res.status(400).send({ result: "Fail", message: error.errors.mobile.message })
        else if (error.errors.email)
            res.status(400).send({ result: "Fail", message: error.errors.email.message })
        else if (error.errors.password)
            res.status(400).send({ result: "Fail", message: error.errors.password.message })

        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})

router.get("/", async (req, res) => {
    try {
        var data = await PublicReg.find().sort({ _id: -1 })
        res.send({ result: "Done", total: data.length, data: data })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})

router.post("/login", async (req, res) => {
    try {
        var data = await PublicReg.findOne({ $and: [{ mobile: req.body.mobile }, { password: req.body.password }] })
        if (data) {
            if (req.body.mobile === data.mobile) {
                res.send({ result: "Done", data: data, message: "Public User Login" })
            }
            else
                res.status(404).send({ result: "Fail", message: "Mobile or Password Incorrect!!!" })
        }
        else {
            res.status(404).send({ result: "Fail", message: "Mobile or Password Incorrect!!!" })
        }
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})

module.exports = router