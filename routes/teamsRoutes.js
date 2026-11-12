import { Router } from "express"
import { getTeamsPage, getTeamPage, submitApplication, approveApplication, getEditTeamPage, saveTeamChanges} from "../controllers/teamsController.js"
import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router()

// All teams
router.get("", getTeamsPage)

// Individual team
router.get("/:id", getTeamPage)

router.post("/:id/apply", requireAuth, submitApplication)

router.post("/:id/approve/:userId", requireAuth, approveApplication)

router.route("/:id/edit")
    .get(requireAuth, getEditTeamPage)
    .post(requireAuth, saveTeamChanges)

export default router