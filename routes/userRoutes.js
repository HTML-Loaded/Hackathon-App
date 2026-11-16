import { Router } from "express"
import { getUserProfile, getPublicProfile, getEditProfile, updateProfile } from "../controllers/userController.js"
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js"

const router = Router();

// Route for user to view their profile
router.get("/", requireAuth, getUserProfile)

// Route for user to edit profile
router.route("/edit")
    .get(requireAuth, getEditProfile)
    .post(requireAuth, updateProfile)

// Route to view another users profile
router.get("/:id", getPublicProfile)


export default router