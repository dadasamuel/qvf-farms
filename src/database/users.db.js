mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
mongoose.set("strictQuery", false)
exports.connectDb = async () => {
    try {
        await mongoose.connect(process.env.Mongodb_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("connected to QVF Farms")
    } catch (error) {
        console.log(error);
    }
};