import { Router } from "express"
import { getLogin, getSignup, login, signup, logout } from "../controllers/authController.js"

const router = Router()

router.route("/login")
    // Route to load login page
    .get(getLogin)
    // Route to enter login information
    .post(login)

router.route("/signup")
    // Route to load login page
    .get(getSignup)
    // Route to enter login information
    .post(signup)

router.post("/logout", logout)

export default router