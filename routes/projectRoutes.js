import { Router } from "express"
import { getProjectPage, submitProject } from "../controllers/projectsController.js"

import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router()

// Route to view a users team project page
router.get("/", requireAuth, getProjectPage)

// Route to update a users team project
router.post("/", requireAuth, submitProject)

export default router