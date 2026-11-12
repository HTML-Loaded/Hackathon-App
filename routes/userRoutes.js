import { Router } from "express"
import { getUserProfile, getPublicProfile, getEditProfile, updateProfile } from "../controllers/userController.js"
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js"

const router = Router();

// Route for user to view their profile or another profile
router.get("/", requireAuth, getUserProfile)

router.get("/:id", getPublicProfile)

// Route for user to edit profile
router.route("/edit")
    .get(requireAuth, getEditProfile)
    .post(requireAuth, updateProfile)


export default router