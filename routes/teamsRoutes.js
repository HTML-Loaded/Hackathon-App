import { Router } from "express"
import { getTeamsPage, getTeamPage, submitApplication, approveApplication, getEditTeamPage, saveTeamChanges, getCreateTeamPage, submitTeam} from "../controllers/teamsController.js"
import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router()

// All teams
router.get("", getTeamsPage)

// Route to view and use the create a team page
router.route("/create")
    .get(requireAuth, getCreateTeamPage)
    .post(requireAuth, submitTeam)
    
// Route to view a individual team
router.get("/:id", getTeamPage)

// Route to apply to a team
router.post("/:id/apply", requireAuth, submitApplication)

// Route to approve a team application
router.post("/:id/approve/:userId", requireAuth, approveApplication)

// Route to view and use the edit team page
router.route("/:id/edit")
    .get(requireAuth, getEditTeamPage)
    .post(requireAuth, saveTeamChanges)

export default router