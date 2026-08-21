import mongoose from "mongoose";
import dns from "node:dns";
import DB_Name from "../constants.js";

const connectDB = async () => {
    const baseUri = process.env.MONGODB_URI?.trim().replace(/\/+$/, "");

    if (!baseUri) {
        throw new Error("MONGODB_URI is not configured");
    }

    const dnsServer = process.env.MONGODB_DNS_SERVER?.trim();
    if (dnsServer) {
        dns.setServers([dnsServer]);
    }

    try {
        const connection = await mongoose.connect(`${baseUri}/${DB_Name}`);
        console.log(`MongoDB connected: ${connection.connection.host}/${DB_Name}`);
        return connection;
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;

     