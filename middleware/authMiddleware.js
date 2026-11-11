import { findUserById } from "../services/userService.js"

export const requireAuth = async (req, res, next) => {
    try {

        console.log("Session:", req.session)
        console.log("User ID:", req.session.userId)

        if (!req.session.userId) {
            return res.redirect("/login")
        }

        const user = await findUserById(req.session.userId)

        if (!user) {
            return res.status(401).send("Invalid session")
        }

        req.user = user
        next()
    }
    catch (error) {
        next(error)
    }
}

export const requireAdmin = (req, res, next) => {
    if (req.user.roles !== "admin") {
        return res.sendStatus(403)
    }

    next()
}