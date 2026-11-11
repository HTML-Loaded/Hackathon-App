import { Router } from "express"
import { getLogin, getSignup, login, signup, logout } from "../controllers/authController.js"

const router = Router()

router.route("/login")
    .get(getLogin)
    .post(login)

router.route("/signup")
    .get(getSignup)
    .post(signup)

router.post("/logout", logout)

export default router