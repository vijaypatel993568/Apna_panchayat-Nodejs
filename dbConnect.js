const mongoose = require("mongoose")

// mongoose.connect("mongodb:127.0.0.1:27017/Server5pm")
// .then(()=>{
//     console.log("Data Base is Connected!!!")
// })
// .catch(error=>{
//     console.log(error)
// })


async function getConnect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/PanchayatServer")
        console.log("Data Base is Connected!!!");
    }
    catch (error) {
        console.log(error);
    }
}
getConnect()