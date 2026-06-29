import mongoose from "mongoose"
import DB_Name from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log(`MongoDb Server Connection is Successful! DB_HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("Something is wrong in MongoDb Server Connection", error);
        throw error
        process.exit(1)
    }
}
export default connectDB