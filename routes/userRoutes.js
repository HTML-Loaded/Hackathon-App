import { Router } from "express"
import { getUserProfile } from "../controllers/userController.js"
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js"

const router = Router();

// Route for user to view profile
router.get("/", requireAuth, getUserProfile)

export default router