import { Router } from "express"
import { getUserProfile } from "../controllers/userController.js"
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js"

const router = Router();

router.get("/", requireAuth, getUserProfile)

export default router