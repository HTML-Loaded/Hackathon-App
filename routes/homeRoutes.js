import { Router } from "express"
import { getHome, submitSponsor } from "../controllers/homeController.js"

const router = Router()

router.route("/")
    // Route to displayed homepage
    .get(getHome)
    // Sponsor form submission
    .post(submitSponsor)

export default router