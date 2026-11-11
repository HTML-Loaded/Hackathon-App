import { findUserById } from "../services/userService.js"

export const getUserProfile = async (req, res, next) => {
    try {
        const user = await findUserById(req.session.userId)

        if (!user) {
            return res.sendStatus(404)
        }

        res.render("user", { user })
    }
    catch (error) {
        next(error)
    }
}