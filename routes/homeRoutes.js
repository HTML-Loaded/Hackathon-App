import Router from "express"
import { getHome, submitSponsor } from "../controllers/homeController.js"

const router = Router()

router.route("/")
    .get(getHome)
    .post(submitSponsor)

export default router