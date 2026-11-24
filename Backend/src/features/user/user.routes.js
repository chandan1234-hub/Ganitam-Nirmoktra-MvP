import express from "express";
import { getSolutionUsage, syncClerkUser } from "./user.controller.js";
import { requireClerkAuth } from "../../middlewares/requireClerkAuth.middleware.js";

const router = express.Router();

router.use(requireClerkAuth);
router.post("/sync", syncClerkUser);
router.get("/usage", getSolutionUsage);

export default router;
