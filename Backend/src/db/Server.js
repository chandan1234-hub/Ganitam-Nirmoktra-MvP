import mongoose from "mongoose"


const DBconnection = async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDb URI is connected :${}`);
        process.exit(0); 
    } catch (error) {
        console.log("There are some error is the connection is mongoDb Server",error);
        throw error
        process.exit(1)

    }
}