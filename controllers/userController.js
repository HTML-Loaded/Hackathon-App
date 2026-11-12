import { findUserById, updateUser} from "../services/userService.js"

export const getUserProfile = async (req, res, next) => {
    try {
        const user = await findUserById(req.session.userId)

        if (!user) {
            return res.sendStatus(404)
        }

        res.render("user", { user, canEdit: true})
    }
    catch (error) {
        next(error)
    }
}

export const getPublicProfile = async (req, res, next) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.sendStatus(404)
        }

        const user = await findUserById(id)

        if (!user) {
            return res.sendStatus(404)
        }

        res.render("user", {
            user,
            canEdit: req.session?.userId === user.id
        })
    }
    catch (error) {
        next(error)
    }
}

export const getEditProfile = (req, res) => {
    res.render("editUser", {user: req.user})
}

export const updateProfile = async (req, res, next) => {
    try {
        const { name, description, skills } = req.body

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).send("Name is required")
        }

        if (typeof description !== "string" || typeof skills !== "string") {
            return res.status(400).send("Invalid profile information")
        }

        const updates = {
            name: name.trim(),
            description: description.trim(),
            skills: skills.split(",")
                .map(skill => skill.trim())
                .filter(skill => skill !== "")
        }

        const updatedUser = await updateUser(req.user.id, updates)

        if (!updatedUser) {
            return res.sendStatus(404)
        }

        res.redirect("/user")
    }
    catch (error) {
        next(error)
    }
}