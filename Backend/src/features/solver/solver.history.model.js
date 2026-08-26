import mongoose from 'mongoose'

const solverHistorySchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },
        solution: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            default: 'mathematics',
        },
        grade: {
            type: String,
            default: 'general',
        },
    },
    { timestamps: true },
)

export const SolverHistory = mongoose.model('SolverHistory', solverHistorySchema)
