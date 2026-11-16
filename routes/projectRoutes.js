import { Router } from "express"
import { getProjectPage, submitProject } from "../controllers/projectsController.js"

import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/", requireAuth, getProjectPage)

router.post("/", requireAuth, submitProject)

export default router