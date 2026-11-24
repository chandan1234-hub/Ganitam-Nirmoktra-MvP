import mongoose from "mongoose";

const clerkUserSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        plan: {
            type: String,
            enum: ["free", "pro", "max"],
            default: "free",
        },
    },
    { timestamps: true },
);

export const ClerkUser = mongoose.models.ClerkUser
    || mongoose.model("ClerkUser", clerkUserSchema);
