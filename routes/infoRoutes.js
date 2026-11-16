import { Router } from "express"
import { getFaqPage, getContactPage } from "../controllers/infoController.js"

const router = Router()

// Route too view faq page
router.get("/faq", getFaqPage)

// Route too view contact us page
router.get("/contact", getContactPage)

export default router