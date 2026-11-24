import mongoose from "mongoose";

const solutionUsageSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        used: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true },
);

solutionUsageSchema.index({ clerkId: 1, month: 1 }, { unique: true });

export const SolutionUsage = mongoose.models.SolutionUsage
    || mongoose.model("SolutionUsage", solutionUsageSchema);
