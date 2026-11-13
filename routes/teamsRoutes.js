import { Router } from "express"
import { getTeamsPage, getTeamPage, submitApplication, approveApplication, getEditTeamPage, saveTeamChanges, getCreateTeamPage, submitTeam} from "../controllers/teamsController.js"
import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router()

// All teams
router.get("", getTeamsPage)

router.get("/create", requireAuth, getCreateTeamPage)

router.post("/create", requireAuth, submitTeam)

// Individual team
router.get("/:id", getTeamPage)

router.post("/:id/apply", requireAuth, submitApplication)

router.post("/:id/approve/:userId", requireAuth, approveApplication)

router.route("/:id/edit")
    .get(requireAuth, getEditTeamPage)
    .post(requireAuth, saveTeamChanges)

export default router