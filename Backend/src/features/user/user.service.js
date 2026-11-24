import { ClerkUser } from "./clerk-user.model.js";
import { SolutionUsage } from "./solution-usage.model.js";

export const monthlySolutionLimits = {
    free: 5,
    pro: 25,
    max: 50,
};

const currentMonth = () => new Date().toISOString().slice(0, 7);

export const ensureClerkUser = (clerkId) => ClerkUser.findOneAndUpdate(
    { clerkId },
    { $setOnInsert: { clerkId, plan: "free" } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
);

export const recordSolutionUsage = (clerkId) => {
    const month = currentMonth();

    return SolutionUsage.findOneAndUpdate(
        { clerkId, month },
        { $inc: { used: 1 }, $setOnInsert: { clerkId, month } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
    );
};

export const getCurrentSolutionUsage = (clerkId) => SolutionUsage.findOne({
    clerkId,
    month: currentMonth(),
}).lean();
