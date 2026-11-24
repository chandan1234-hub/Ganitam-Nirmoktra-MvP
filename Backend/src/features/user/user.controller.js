import { ClerkUser } from "./clerk-user.model.js";
import { getCurrentSolutionUsage, monthlySolutionLimits, ensureClerkUser } from "./user.service.js";

export const syncClerkUser = async (req, res) => {
    try {
        const user = await ensureClerkUser(req.auth.clerkId);
        return res.status(200).json({
            success: true,
            data: { clerkId: user.clerkId, plan: user.plan },
        });
    } catch (error) {
        console.error("Could not sync Clerk user:", error.message);
        return res.status(500).json({ success: false, message: "Could not sync the user account." });
    }
};

export const getSolutionUsage = async (req, res) => {
    try {
        const user = await ensureClerkUser(req.auth.clerkId);
        const usage = await getCurrentSolutionUsage(req.auth.clerkId);

        return res.status(200).json({
            success: true,
            data: {
                plan: user.plan,
                used: usage?.used ?? 0,
                limit: monthlySolutionLimits[user.plan] ?? monthlySolutionLimits.free,
            },
        });
    } catch (error) {
        console.error("Could not load solution usage:", error.message);
        return res.status(500).json({ success: false, message: "Could not load solution usage." });
    }
};
