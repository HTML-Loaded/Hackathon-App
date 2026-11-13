import { Router } from "express"
import { getEventsPage, getCreateEventPage, registerForEvent, submitEvent } from "../controllers/eventsController.js"

import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/", getEventsPage)
router.get("/create", requireAuth, getCreateEventPage)
router.post("/create", requireAuth, submitEvent)
router.post("/:id/register", requireAuth, registerForEvent)

export default router