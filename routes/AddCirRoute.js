const express = require("express")
const AddCir = require("../models/AddCir")
const multer = require("multer")
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/AddCirFile')
    },
    fieldSize: 104857600,
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })


router.post("/", upload.single("file"), async (req, res) => {
    try {
        var data = new AddCir(req.body)

        if (req.file) {

            data.file = req.file.filename
        }
        await data.save()
        res.send({ result: "Done", message: "Record is Created!!!", data: data })
    }
    catch (error) {

        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "circularNumber Must Be Unique" })

        else if (error.errors.subject)
            res.status(400).send({ result: "Fail", message: error.errors.subject.message })
        else if (error.errors.category)
            res.status(400).send({ result: "Fail", message: error.errors.category.message })
        else if (error.errors.language)
            res.status(400).send({ result: "Fail", message: error.errors.language.message })
        else if (error.errors.description)
            res.status(400).send({ result: "Fail", message: error.errors.description.message })
        else if (error.errors.description)
            res.status(400).send({ result: "Fail", message: error.errors.description.message })
        else if (error.errors.issuedBy)
            res.status(400).send({ result: "Fail", message: error.errors.issuedBy.message })
        else if (error.errors.issuedOn)
            res.status(400).send({ result: "Fail", message: error.errors.issuedOn.message })
        else if (error.errors.file)
            res.status(400).send({ result: "Fail", message: error.errors.file.message })

        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})

router.get("/", async (req, res) => {
    try {
        var data = await AddCir.find().sort({ _id: -1 })
        res.send({ result: "Done", total: data.length, data: data })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})



router.delete("/:_id", async (req, res) => {
    try {
        await AddCir.deleteOne({ _id: req.params._id })
        res.send({ result: "Done", message: "Record is Deleted!!!" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})

module.exports = router