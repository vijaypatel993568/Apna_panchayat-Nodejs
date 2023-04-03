const express = require("express")

require("./dbConnect")
const PublicReg = require("./routes/PublicRegRoute")
const OfficialReg = require("./routes/OffcialRegRoute")
const AddCir = require("./routes/AddCirRoute")



const app = express()
app.use("/public", express.static("public"))
const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use("/api/publicreg", PublicReg)
app.use("/api/officialreg", OfficialReg)
app.use("/api/addcir", AddCir)


var port = 8080
app.listen(port, () => {
    console.log(`Server is Running at Port http://localhost:${port}`);
})