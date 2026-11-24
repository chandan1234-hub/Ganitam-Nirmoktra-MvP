import { verifyToken } from "@clerk/backend";

export const requireClerkAuth = async (req, res, next) => {
    const authorization = req.get("authorization");
    const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Authentication is required." });
    }

    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
        console.error("CLERK_SECRET_KEY is not configured.");
        return res.status(503).json({ success: false, message: "Authentication is unavailable." });
    }

    try {
        const claims = await verifyToken(token, { secretKey });
        if (!claims.sub) {
            return res.status(401).json({ success: false, message: "The authentication token is invalid." });
        }

        req.auth = { clerkId: claims.sub };
        return next();
    } catch (error) {
        console.warn("Clerk token verification failed:", error.message);
        return res.status(401).json({ success: false, message: "The authentication token is invalid." });
    }
};
