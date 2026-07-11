import mongoose from "mongoose"
import DB_Name from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log(`MongoDB server connection is successful! DB_HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Something is wrong in MongoDB server connection", error)
        throw error
    }
}

export default connectDB
