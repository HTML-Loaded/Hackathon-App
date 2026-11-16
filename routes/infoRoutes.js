import { Router } from "express"
import { getFaqPage, getContactPage } from "../controllers/infoController.js"

const router = Router()

router.get("/faq", getFaqPage)
router.get("/contact", getContactPage)

export default router